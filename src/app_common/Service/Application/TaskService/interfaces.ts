import type { Timestamp } from "@firebase/firestore-types";

export interface Task {
    id: string,
    data: {
        configuration: {
            language: string,
            model: string,
            source: string,
            translation: {
                translate: boolean,
                translateToLanguage: string,
            }
        },
        lastUpdate: Timestamp,
        status: string,
    }
}

export type TasksList = Task[];