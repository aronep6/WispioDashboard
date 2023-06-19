import { initializeApp } from "firebase/app"
import { getAuth, type Auth, type User, connectAuthEmulator } from "firebase/auth"
import { type Analytics, getAnalytics, logEvent } from "firebase/analytics"
import { getFunctions, httpsCallable, connectFunctionsEmulator, type Functions, HttpsCallableResult } from "firebase/functions"
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
} from "firebase/firestore"

import {
    firebaseDatabaseConfiguration,
    FirebaseRootCollection,
    type MultipleDocumentsResponse,
    UserAccessibleCollection,
    CallableFunctions,
    UserAccessibleClaims,
    StrawberryError,
    ClientError
} from "./interfaces"

import { 
    service_config, 
    use_offline_dev_mode,
    is_production_env,
    use_local_emulators,
} from "./core.config"

// Dev variables
const _server_ip = "localhost"
const _local_functions_port = 5001

// App initialization
const app = initializeApp(service_config)

// Database initialization
const db = initializeFirestore(app, firebaseDatabaseConfiguration)

// Authentification initialization and configuration
const auth = getAuth(app)

// Functions initialization
const functions = getFunctions(app, service_config.region_functions_emplacement)

// Binding to local emulators (if needed)
if (use_local_emulators && !is_production_env) {
    connectFunctionsEmulator(functions, `${_server_ip}`, _local_functions_port)
    connectAuthEmulator(auth, "http://127.0.0.1:9099");
}

// Analytics initialization
const analyticsProvider = getAnalytics(app)

// Sleep function
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

class Core {
    db: Firestore
    auth: Auth
    sleep: (ms: number) => Promise<unknown> | undefined
    functions: Functions
    isProductionEnv: boolean
    useOfflineDevMode: boolean
    analyticsProvider: Analytics
    application_name: string;
    constructor() {
        this.db = db
        this.auth = auth
        this.sleep = sleep
        this.functions = functions
        this.isProductionEnv = is_production_env
        this.analyticsProvider = analyticsProvider
        this.useOfflineDevMode = use_offline_dev_mode,
        this.application_name = import.meta.env.VITE_APPLICATION_NAME
    }

    protected analytics(event: any, payload: any = {}): void {
        if (!this.isProductionEnv) return console.warn("Analytics are disabled in development mode")
        return logEvent(this.analyticsProvider, event, payload)
    }

    protected logError(error: any): void {
        if (!this.isProductionEnv) return console.warn("An error occured at Wispio Service level: ", error)
    }

    protected getCurrentUser(): User {
        return this.auth.currentUser as User
    }

    protected getCurrentUserID(): string {
        const userId = this.auth.currentUser?.uid
        if (!userId) {
            let err_msg = "User is not logged in!"
            this.logError(err_msg)
            throw new Error(err_msg)
        }
        return userId
    }

    protected getDocumentReference(
        collection: UserAccessibleCollection, 
        document: string
    ): DocumentReference {
        try {
            const userId = this.getCurrentUserID()

            return doc(this.db, FirebaseRootCollection, userId, collection, document)

        } catch (error: any) {
            this.logError(error)
            throw new Error(error.message)
        }
    }

    protected getCollectionReference(
        target_collection: UserAccessibleCollection
    ): CollectionReference {
        try {
            const userId = this.getCurrentUserID()

            return collection(this.db, FirebaseRootCollection, userId, target_collection)
        } catch (error: any) {
            this.logError(error)
            throw new Error(error.message)
        }
    }      

    protected async getDocument(
        collection: UserAccessibleCollection,
        document: string
    ): Promise<DocumentData> {
        try {
            const docRef = this.getDocumentReference(collection, document)

            if (this.useOfflineDevMode) throw ClientError.OfflineDevModeIsEnabled;

            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                return docSnap.data()
            } else {
                const error_message = "The target document does not exist, or you're not authorized to access it."
                this.logError(error_message)
                throw new Error(error_message)
            }

        } catch (error: any) {
            throw new Error(error.message)
        }
    }
    
    protected async getMultipleDocuments(
        target_collection: UserAccessibleCollection,
    ): Promise<MultipleDocumentsResponse[]> {
        try {
            const collectionRef = this.getCollectionReference(target_collection)

            if (this.useOfflineDevMode) throw ClientError.OfflineDevModeIsEnabled;

            const docSnap = await getDocs(collectionRef)

            return docSnap.docs.map((doc) => {
                return {
                    id: doc.id,
                    data: doc.data(),
                }
            })
        } catch (error: any) {
            this.logError(error)
            throw new Error(error.message)
        }
    }

    protected async updateLastUpdateTaskFieldToNow(
        taskId: string, 
    ): Promise<void> {
        const docRef = this.getDocumentReference(UserAccessibleCollection.Tasks, taskId)

        try {
            if (this.useOfflineDevMode) throw ClientError.OfflineDevModeIsEnabled;

            await updateDoc(docRef, {
                lastUpdate: serverTimestamp(),
            })
        } catch (error) {
            this.logError(error)
        }
    }

    private async httpCallableBuilder(
        functionName: CallableFunctions,
        payload?: any,
    ): Promise<HttpsCallableResult> {
        const function_instance = httpsCallable(this.functions, functionName)

        try {
            if (this.useOfflineDevMode) throw ClientError.OfflineDevModeIsEnabled;

            return await function_instance(payload ?? {})
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    protected async fetchStrawberryAPI<T>(
        functionName: CallableFunctions,
        payload?: any,
    ): Promise<T | undefined> {
        try {
            if (this.useOfflineDevMode) throw ClientError.OfflineDevModeIsEnabled;

            const response = await this.httpCallableBuilder(functionName, payload)
            const data = response.data as T

            if (data === StrawberryError.InternalError) {
                throw new Error("An internal error occured on the server side.")
            }
            
            return data
        } catch (error: any) {
            this.logError(error)
            throw new Error(error.message)
        }
    }

    protected async getUserClaim(
        claim: UserAccessibleClaims
    ): Promise<string | null> {
        try {
            if (this.useOfflineDevMode) throw ClientError.OfflineDevModeIsEnabled;
            
            const user = this.getCurrentUser()
            if (user) {
                const token = await user.getIdTokenResult()
                return token.claims[claim]
            } else {
                return null
            }
        } catch (error: any) {
            return null;
        }
    }
}

export default Core