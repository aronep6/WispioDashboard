import type { Timestamp } from "@firebase/firestore-types";
import type { UseMaterialAcceleration } from "../../../interfaces/TaskProcessing";

export interface TaskConfiguration {
    language: string,
    model: string,
    source: string,
    translation: {
        translate: boolean,
        translateToLanguage: string,
    }
}

export interface Task {
    id: string,
    data: {
        configuration: TaskConfiguration,
        lastUpdate: Timestamp,
        status: string,
    }
}

export interface NewTaskRequest {
    file: File
    configuration: Omit<TaskConfiguration, 'language' | 'source'>
    useMaterialAcceleration: UseMaterialAcceleration,
}

export type TasksList = Task[];