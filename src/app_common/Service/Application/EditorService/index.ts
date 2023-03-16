import { updateDoc } from "firebase/firestore";
import type { DocumentData, DocumentReference } from "firebase/firestore";
import Core from "../../Core";
import { UserAccessibleCollection } from "../../Core/interfaces";
import type { RealtimeOutput, EditingOutput } from "./interfaces";

const _fake_realtime_transcription_response_: RealtimeOutput[] = [
    {
        from: 0,
        to: 10,
        output: "Hello, my name is John Doe.",
    },
    {
        from: 10,
        to: 20,
        output: "I am a software engineer.",
    },
    {
        from: 20,
        to: 30,
        output: "And im working on a project called",
    },
    {
        from: 30,
        to: 40,
        output: "Whipser",
    },
    {
        from: 40,
        to: 50,
        output: "Whipser is a web application created with React",
    },
    {
        from: 50,
        to: 60,
        output: "Hello, my name is John Doe.",
    },
    {
        from: 60,
        to: 70,
        output: "I am a software engineer.",
    },
    {
        from: 70,
        to: 80,
        output: "And im working on a project called",
    },
    {
        from: 80,
        to: 90,
        output: "Whipser",
    },
    {
        from: 90,
        to: 100,
        output: "Whipser is a web application created with React",
    },
    {
        from: 100,
        to: 110,
        output: "Hello, my name is John Doe.",
    },
    {
        from: 110,
        to: 120,
        output: "I am a software engineer.",
    },
    {
        from: 120,
        to: 130,
        output: "And im working on a project called",
    },
    {
        from: 130,
        to: 140,
        output: "Whipser",
    },
    {
        from: 140,
        to: 150,
        output: "Whipser is a web application created with React",
    },
    {
        from: 150,
        to: 160,
        output: "Hello, my name is John Doe.",
    },
    {
        from: 160,
        to: 170,
        output: "I am a software engineer.",
    },
    {
        from: 170,
        to: 180,
        output: "And im working on a project called",
    },
    {
        from: 180,
        to: 190,
        output: "Whipser",
    },
    {
        from: 190,
        to: 200,
        output: "Whipser is a web application created with React",
    },
    {
        from: 200,
        to: 210,
        output: "Hello, my name is John Doe.",
    },
    {
        from: 210,
        to: 220,
        output: "I am a software engineer.",
    },
    {
        from: 220,
        to: 230,
        output: "And im working on a project called",
    },
    {
        from: 230,
        to: 240,
        output: "Whipser",
    },
    {
        from: 240,
        to: 250,
        output: "Whipser is a web application created with React",
    },
];

class EditorService extends Core {
    constructor() {
        super();
    }

    subscribeToRealtimeTranscription = (taskId: string | undefined): DocumentReference<DocumentData> => {
        if (!taskId) throw new Error("No project task id was provided, cannot subscribe to realtime transcription");
        return this.getDocumentReference(UserAccessibleCollection.Outputs, taskId);
    };

    updateOutput = async (taskId: string, newOutputContent: EditingOutput, allRealtimeOutputs: RealtimeOutput[]): Promise<void> => {
        
        const updatedRealtimeOutputs: RealtimeOutput[] = allRealtimeOutputs.map((realtimeOutput, index) => {
            if (index === newOutputContent.index) {
                return {
                    ...newOutputContent.output,
                };
            }
            return realtimeOutput;
        });
        
        const docRef = this.getDocumentReference(UserAccessibleCollection.Outputs, taskId);

        try {
            await updateDoc(docRef, {
                records: updatedRealtimeOutputs,
            });

            await this.updateLastUpdateTaskField(taskId);
        } catch (error: any) {
            console.log('Error updating document: ', error);
        }
    }
}

export default EditorService;