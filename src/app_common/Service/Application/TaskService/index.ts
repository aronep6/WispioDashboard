import Core from "../../Core";
import type { Timestamp } from "@firebase/firestore-types";
import { UserAccessibleCollection } from "../../Core/interfaces";

const user_tasks_response = [
    {
        id: "OLESLFOVKJA1KZ8I5H7ASK",
        data: {
            configuration: {
                language: "French",
                model: "tiny",
                source: "audio_file.mp3",
                translation: {
                    translate: true,
                    translateToLanguage: "English",
                }
            },
            lastUpdate: "2023-02-15T01:13:02.000+01:00",
            status: "failed",
        },
    },
    {
        id: "TK5VB3PMLJ1KZ8I5H7ASK",
        data: {
            configuration: {
                language: "English",
                model: "medium",
                source: "recorded_audio.mp3",
                translation: {
                    translate: true,
                    translateToLanguage: "French",
                }
            },
            lastUpdate: "2023-02-17T01:13:02.000+01:00",
            status: "completed",
        },
    },
    {
        id: "TK5VB3FUKJNZREI6F7ASK",
        data: {
            configuration: {
                language: "English",
                model: "medium",
                source: "my_text.wav",
                translation: {
                    translate: false,
                    translateToLanguage: null,
                }
            },
            lastUpdate: "2023-02-17T01:13:02.000+01:00",
            status: "completed",
        },
    },
];

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

class TaskService extends Core {
    constructor() {
        super();
    };

    getTasks = async () => {
        try {
            // await this.sleep(3000);
            // const tasks = user_tasks_response as TasksList;

            const tasks = await this.getMultipleDocuments(UserAccessibleCollection.Tasks) as TasksList;
            
            return {
                success: true,
                data: tasks,
                error: null,
            };
        } catch (error) {
            throw error;
        }
    }
}

export default TaskService;