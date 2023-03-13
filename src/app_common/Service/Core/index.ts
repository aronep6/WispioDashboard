import { initializeApp } from "firebase/app";

import type { Firestore } from "firebase/firestore";
import { initializeFirestore } from "firebase/firestore";

import type { Auth } from "firebase/auth";
import { getAuth } from "firebase/auth";

import { 
    firebaseDatabaseConfiguration, 
    FirebaseServiceConfiguration
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
}

export default Core;