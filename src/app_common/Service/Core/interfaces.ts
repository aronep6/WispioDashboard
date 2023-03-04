export interface FirebaseServiceConfiguration {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
}

export const firebaseDatabaseConfiguration = {
    experimentalForceLongPolling: true
} as const;