import type { DocumentData } from "firebase/firestore";

export interface FirebaseServiceConfiguration {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    region_functions_emplacement: string;
}

export enum WebErrorCode {
    InternalServiceError = 500,
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
    Outputs = "outputs",
    Notifications = "notifications",
}

export enum CallableFunctions {
    GetBillingInformations = "getBillingInformations"
}

export interface OnCallFunctionRequest {
    data: any,
    context: any,
}

export interface OnCallFunctionResponse<T> {
    success: boolean
    data: T | undefined,
    error: Error | null,
    errorCode?: WebErrorCode
}

export enum UserAccessibleClaims {
    Plan = "plan",
    BillingIsActive = "billing_is_active",
}

export const FirebaseRootCollection = "application" as const;