import Core from "../../Core";

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
        lastUpdate: string,
        status: string,
    }
}

export type TasksList = Task[];

class TaskService extends Core {
    constructor() {
        super();
    };

    getTasks = async () => {
        await this.sleep(3000);
        
        return {
            success: true,
            data: user_tasks_response as TasksList,
            error: null,
        };
    }
}

export default TaskService;