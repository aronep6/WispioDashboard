import { initializeApp } from "firebase/app";
import { getAuth, type Auth, type User } from "firebase/auth";
import { type Analytics, getAnalytics, logEvent } from "firebase/analytics";
import { getFunctions, httpsCallable, connectFunctionsEmulator, type Functions, HttpsCallableResult } from "firebase/functions";
import { 
    Firestore, 
    DocumentData, 
    DocumentReference, 
    CollectionReference,
    updateDoc,
    initializeFirestore, 
    collection, 
    doc,
    getDoc,
    getDocs,
    serverTimestamp,
} from "firebase/firestore";

import {
    firebaseDatabaseConfiguration,
    FirebaseRootCollection,
    type MultipleDocumentsResponse,
    type FirebaseServiceConfiguration,
    UserAccessibleCollection,
    CallableFunctions,
    OnCallFunctionResponse,
    UserAccessibleClaims
} from "./interfaces";

const service_config: FirebaseServiceConfiguration = {
    apiKey: "AIzaSyBNj53fDhpeh0k6-cdKcYOFYlgw1ve2ETU",
    authDomain: "wispiostaging.firebaseapp.com",
    projectId: "wispiostaging",
    storageBucket: "wispiostaging.appspot.com",
    messagingSenderId: "178535508231",
    appId: "1:178535508231:web:056f27013f06d5baa5bda2",
    region_functions_emplacement: "europe-west1",
};

// Dev variables
const use_local_emulators = import.meta.env.DEV;
const _server_ip = "localhost";
const _local_functions_port = 5001;

// App initialization
const app = initializeApp(service_config);

// Database initialization
const db = initializeFirestore(app, firebaseDatabaseConfiguration);

// Authentification initialization and configuration
const auth = getAuth(app);

// Functions initialization
const functions = getFunctions(app, service_config.region_functions_emplacement);

// Binding to local emulators (if needed)
if (use_local_emulators) {
    connectFunctionsEmulator(functions, `${_server_ip}`, _local_functions_port);
};

// Analytics initialization
const analyticsProvider = getAnalytics(app);

// Sleep function
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

class Core {
    db: Firestore;
    auth: Auth;
    sleep: (ms: number) => Promise<unknown>;
    functions: Functions;
    analyticsProvider: Analytics;
    constructor() {
        this.db = db;
        this.auth = auth;
        this.sleep = sleep;
        this.functions = functions;
        this.analyticsProvider = analyticsProvider;
    }

    protected analytics = (event: any, payload: any = {}): void => {
        if (!import.meta.env.PROD) return console.warn("Analytics are disabled in development mode");
        return logEvent(this.analyticsProvider, event, payload);
    }

    protected logError = (error: any): void => {
        console.warn("An error occured at Wispio Service level: ", error);
    }

    protected getCurrentUser = (): User => {
        return this.auth.currentUser as User;
    }

    protected getCurrentUserID = (): string => {
        const userId = this.auth.currentUser?.uid;
        if (!userId) {
            let error_message = "User is not logged in!";
            this.logError(error_message);
            throw new Error(error_message);
        }
        return userId;
    }

    protected getDocumentReference = (
        collection: UserAccessibleCollection, 
        document: string
    ): DocumentReference => {
        try {
            const userId = this.getCurrentUserID();

            return doc(this.db, FirebaseRootCollection, userId, collection, document);

        } catch (error: any) {
            this.logError(error);
            throw new Error(error.message);
        }
    };

    protected getCollectionReference = (
        target_collection: UserAccessibleCollection
    ): CollectionReference => {
        try {
            const userId = this.getCurrentUserID();

            return collection(this.db, FirebaseRootCollection, userId, target_collection);
        } catch (error: any) {
            this.logError(error);
            throw new Error(error.message);
        }
    };      

    protected getDocument = async (
        collection: UserAccessibleCollection,
        document: string
    ): Promise<DocumentData> => {
        try {
            const docRef = this.getDocumentReference(collection, document);

            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                const error_message = "The target document does not exist, or you're not authorized to access it.";
                this.logError(error_message);
                throw new Error(error_message);
            }

        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    
    protected getMultipleDocuments = async (
        target_collection: UserAccessibleCollection,
    ): Promise<MultipleDocumentsResponse[]> => {
        try {
            const collectionRef = this.getCollectionReference(target_collection);
            const docSnap = await getDocs(collectionRef);

            return docSnap.docs.map((doc) => {
                return {
                    id: doc.id,
                    data: doc.data(),
                }
            });
        } catch (error: any) {
            this.logError(error);
            throw new Error(error.message);
        }
    }

    protected updateLastUpdateTaskFieldToNow = async (
        taskId: string, 
    ): Promise<void> => {
        const docRef = this.getDocumentReference(UserAccessibleCollection.Tasks, taskId);

        try {
            await updateDoc(docRef, {
                lastUpdate: serverTimestamp(),
            });
        } catch (error) {
            this.logError(error);
        }
    }

    private async httpCallableBuilder (
        functionName: CallableFunctions,
        payload?: any,
    ): Promise<HttpsCallableResult> {
        const function_instance = httpsCallable(this.functions, functionName);

        try {
            return await function_instance(payload ? payload : {});
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    protected async fetchStrawberryAPI<T>(
        functionName: CallableFunctions,
        payload?: any,
    ): Promise<T | undefined> {
        try {
            const { data } = await this.httpCallableBuilder(functionName, payload) as OnCallFunctionResponse<T>;
            return data;
        } catch (error: any) {
            this.logError(error);
            throw new Error(error.message);
        }
    };

    protected getUserClaim = async (
        claim: UserAccessibleClaims
    ): Promise<string | null> => {
        const user = this.getCurrentUser();
        if (user) {
            const token = await user.getIdTokenResult();
            return token.claims[claim];
        } else {
            return null;
        }
    };
}

export default Core;