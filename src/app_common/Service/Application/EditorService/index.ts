import Core from "../../Core";
import type { RealtimeOutput } from "./interfaces";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const _fake_realtime_transcription_response_: RealtimeOutput[] = [
    {
        from: 0,
        to: 229,
        output: "Hello, my name is John Doe.",
    },
    {
        from: 230,
        to: 499,
        output: "I am a software engineer.",
    },
    {
        from: 500,
        to: 699,
        output: "And im working on a project called",
    },
    {
        from: 700,
        to: 899,
        output: "Whipser",
    },
    {
        from: 900,
        to: 1099,
        output: "Whipser is a web application created with React",
    },
];

class EditorService extends Core {
    constructor() {
        super();
    }

    subscribeToRealtimeTranscription = async (id: string) => {
        // throw new Error("subscribeToRealtimeTranscription is not implemented yet");

        await sleep(100);

        return {
            success: true,
            data: _fake_realtime_transcription_response_,
            error: null,
        };
    }
}

export default EditorService;