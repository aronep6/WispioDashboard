import type { DocumentData } from "firebase/firestore";

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

export interface MultipleDocumentsResponse {
    id: string,
    data: DocumentData,
}

export enum UserAccessibleCollection {
    Tasks = "tasks",
    Files = "files",
}

export const FirebaseRootCollection = "application" as const;