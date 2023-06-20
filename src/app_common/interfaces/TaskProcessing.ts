import type { DocumentReference } from "firebase/firestore"

export type UserId = string
export type TaskId = string

export interface TaskReference {
    userId: UserId
    taskId: TaskId
}

export enum TaskReferenceKeyForRequest {
    UserId = "X-Injected-Reference-UserId",
    TaskId = "X-Injected-Reference-TaskId",
}

export enum ModelSize {
    Default = "medium",
    Tiny = "tiny",
    Base = "base",
    Small = "small",
    Medium = "medium",
    Large = "large",
}

export const modelSizeListReadable: { value: ModelSize, label: string }[] = [
    { value: ModelSize.Tiny, label: "🪶 XS (précision très faible)" },
    { value: ModelSize.Base, label: "📦 S (précision faible)" },
    { value: ModelSize.Small, label: "🚗 M (précision moyenne)" },
    { value: ModelSize.Medium, label: "🚚 L (précision élevée)" },
    { value: ModelSize.Large, label: "✈️ XL (précision très élevée)" },
];

export enum Language {
    English = "English",
    Spanish = "Spanish",
    Italian = "Italian",
    Portuguese = "Portuguese",
    German = "German",
    Japanese = "Japanese",
    Polish = "Polish",
    Russian = "Russian",
    Dutch = "Dutch",
    Indonesian = "Indonesian",
    Catalan = "Catalan",
    French = "French",
    Turkish = "Turkish",
    Swedish = "Swedish",
    Ukrainian = "Ukrainian",
};

export type ReadableFlaggedLanguageName = `${string} ${string}`;

export const readableLanguageName: { value: Language, label: ReadableFlaggedLanguageName }[] = [
    { value: Language.English, label: "🇬🇧 English" },
    { value: Language.Spanish, label: "🇪🇸 Español" },
    { value: Language.Italian, label: "🇮🇹 Italiano" },
    { value: Language.Portuguese, label: "🇵🇹 Português" },
    { value: Language.German, label: "🇩🇪 Deutsch" },
    { value: Language.Japanese, label: "🇯🇵 日本語" },
    { value: Language.Polish, label: "🇵🇱 Polski" },
    { value: Language.Russian, label: "🇷🇺 Русский" },
    { value: Language.Dutch, label: "🇳🇱 Nederlands" },
    { value: Language.Indonesian, label: "🇮🇩 Bahasa Indonesia" },
    { value: Language.Catalan, label: "🇨🇦 Català" },
    { value: Language.French, label: "🇫🇷 Français" },
    { value: Language.Turkish, label: "🇹🇷 Türkçe" },
    { value: Language.Swedish, label: "🇸🇪 Svenska" },
    { value: Language.Ukrainian, label: "🇺🇦 Українська" },
];

export const languageWordErrorRate: { value: Language, wer: number }[] = [
    { value: Language.Spanish, wer: 0.03 },
    { value: Language.Italian, wer: 0.04 },
    { value: Language.English, wer: 0.042 },
    { value: Language.Portuguese, wer: 0.043 },
    { value: Language.German, wer: 0.045 },
    { value: Language.Japanese, wer: 0.053 },
    { value: Language.Polish, wer: 0.054 },
    { value: Language.Russian, wer: 0.056 },
    { value: Language.Dutch, wer: 0.067 },
    { value: Language.Indonesian, wer: 0.071 },
    { value: Language.Catalan, wer: 0.073 },
    { value: Language.French, wer: 0.083 },
    { value: Language.Turkish, wer: 0.084 },
    { value: Language.Swedish, wer: 0.085 },
    { value: Language.Ukrainian, wer: 0.086 },
];

export interface WhisperTask {
    status: WhisperTaskStatus
    configuration: WhisperTaskConfiguration
    lastUpdate: Date | string
}

export enum WhisperTaskStatus {
    NotReady = "not_ready",
    Uploading = "uploading",
    UploadingFailed = "uploading_failed",
    Pending = "pending",
    Processing = "processing",
    Completed = "completed",
    Failed = "failed",
    Unknown = "unknown",
}

export const whisperTaskStatusMessage: Record<WhisperTaskStatus, string> = {
    [WhisperTaskStatus.NotReady]: "Task is currently not ready to be processed, you must to send a valid file configuration before.",
    [WhisperTaskStatus.Uploading]: "Task is currently in uploading statement, waiting for receiving the complete file before perform transcrition.",
    [WhisperTaskStatus.UploadingFailed] : "Task uploading operation failed, Please check your file configuration and try again",

    [WhisperTaskStatus.Pending]: "Task is currently pending, please wait for it to be processed.",
    [WhisperTaskStatus.Processing]: "Task is currently being processed, please wait for it to be completed.",
    [WhisperTaskStatus.Completed]: "Task has been completed successfully.",
    [WhisperTaskStatus.Failed]: "Task has failed to be processed. Please check the error message for more information.",
    [WhisperTaskStatus.Unknown]: "Task status is unknown. Please check the error message for more information.",
}
export interface WhisperTaskConfiguration {
    model: ModelSize
    language: Language
    source: DocumentReference | string
    translation: {
        translate: boolean
        translateToLanguage?: Language
    }
}

export enum WhisperTaskErrorMessage {
    MissingTaskReferenceInformation = "Missing task reference information ! Please check your task reference configuration to perform this action.",
    TaskDocumentDoesNotExist = "This task does not exist or has been deleted !",
    TaskDocumentDataIsEmpty = "This task seems to be empty ! No data found.",
    TaskConfigurationIsEmpty = "This task configuration seems to be empty ! No configuration found.",
    TaskStatusUpdateFailed = "Failed to update the task status ! Please check the error message for more information.",
    TaskCannotBeQueued = "This task can't be queued, You can only queue pending tasks ! Choose another task to queue.",
    TaskOutputPushFailed = "Failed to push the task output ! Please check the error message for more information.",
    TaskReferenceInformationIsNotString = "Task reference information is not a string ! Please check your task reference configuration to perform this action.",
    TaskReferenceInformationIsEmpty = "Task reference information is empty ! Please check your task reference configuration to perform this action.",
}

export interface WhisperTaskConfigurationOutput {
    engineRequest: string
}

export type WhisperTaskOutput = string

export interface WhisperPreparedTaskInDb {
    success: boolean
}

export interface WhisperTaskErrorReport {
    error: string | Error;
}

export type UseMaterialAcceleration = boolean