import type { FirebaseServiceConfiguration } from "./interfaces";

// Firebase configuration filled with environment variables
const service_config: FirebaseServiceConfiguration = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    region_functions_emplacement: import.meta.env.VITE_FIREBASE_REGION_FUNCTIONS_EMPLACEMENT || "europe-west1",
};

// Use local emulators (if needed)
const use_local_emulators = import.meta.env.VITE_USE_LOCAL_EMULATORS === "true";

// Is production environment
const is_production_env = import.meta.env.PROD;

export { service_config, use_local_emulators, is_production_env };