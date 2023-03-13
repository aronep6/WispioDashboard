import { initializeApp } from "firebase/app";

import type { Firestore, DocumentData } from "firebase/firestore";
import { initializeFirestore, collection, doc, getDoc, getDocs } from "firebase/firestore";

import type { Auth } from "firebase/auth";
import { getAuth } from "firebase/auth";

import {
    firebaseDatabaseConfiguration,
    FirebaseRootCollection,
    MultipleDocumentsResponse,
    type FirebaseServiceConfiguration,
    type UserAccessibleCollection
} from "./interfaces";

const service_config: FirebaseServiceConfiguration = {
    apiKey: "AIzaSyBNj53fDhpeh0k6-cdKcYOFYlgw1ve2ETU",
    authDomain: "wispiostaging.firebaseapp.com",
    projectId: "wispiostaging",
    storageBucket: "wispiostaging.appspot.com",
    messagingSenderId: "178535508231",
    appId: "1:178535508231:web:056f27013f06d5baa5bda2"
};

// App initialization
const app = initializeApp(service_config);

// Database initialization
const db = initializeFirestore(app, firebaseDatabaseConfiguration);

// Authentification initialization and configuration
const auth = getAuth(app);

// Sleep function
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

class Core {
    db: Firestore;
    auth: Auth;
    sleep: (ms: number) => Promise<unknown>;
    constructor() {
        this.db = db;
        this.auth = auth;
        this.sleep = sleep;
    }

    getCurrentUserID = () => {
        return this.auth.currentUser?.uid as string;
    }

    getDocument = async (
        collection: UserAccessibleCollection,
        document: string
    ): Promise<DocumentData> => {
        try {
            const userId = this.getCurrentUserID();

            if (!userId) throw new Error("User is not logged in!");

            const docRef = doc(this.db, FirebaseRootCollection, userId, collection, document);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                throw new Error("The target document does not exist, or you're not authorized to access it.");
            }

        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    
    getMultipleDocuments = async (
        target_collection: UserAccessibleCollection,
    ): Promise<MultipleDocumentsResponse[]> => {
        try {
            const userId = this.getCurrentUserID();

            if (!userId) throw new Error("User is not logged in!");


            const collectionRef = collection(this.db, FirebaseRootCollection, userId, target_collection);
            const docSnap = await getDocs(collectionRef);

            return docSnap.docs.map((doc) => {
                return {
                    id: doc.id,
                    data: doc.data(),
                }
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default Core;