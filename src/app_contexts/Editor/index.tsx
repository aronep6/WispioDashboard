import { createContext, useCallback, useEffect, useState } from "react";
import type { ProjectId } from "../../app_components/application/common/interfaces/Editor";
import type { RealtimeOutput } from "../../app_common/Service/Application/EditorService/interfaces";
import useEditorService from "../../app_hooks/contexts_hooks/useEditorService";
import useServiceFetch from "../../app_hooks/useServiceFetch";
import { type MediaRemoteControl } from "vidstack";
import type { 
    IsLoadingType,
    ErrorType
} from "../../app_hooks/interfaces";

const EditorContext = createContext({
    // Editor core values
    realtimeOutputs: [] as RealtimeOutput[],
    updateRealtimeOutputs: (realtimeOutputs: RealtimeOutput[]) => { },
    // Playback
    playbackTimestamp: 0 as number,
    setPlaybackTimestamp: (playbackTimestamp: number) => { },
    // Playback remote
    playbackRemote: {} as MediaRemoteControl,
    setPlaybackRemote: (remote: MediaRemoteControl) => { },
    // Page loader
    _page_isLoading: false as IsLoadingType,
    _page_error: null as ErrorType,
});

const EditorProvider = ({ projectId, children }: { projectId: ProjectId, children: React.ReactNode }) => {    
    // States
    const [realtimeOutputs, setRealtimeOutputs] = useState<RealtimeOutput[]>([]);
    const [playbackTimestamp, setPlaybackTimestamp] = useState<number>(0);
    const [playbackRemote, setPlaybackRemote] = useState<MediaRemoteControl>({} as MediaRemoteControl);

    // Hooks
    const editorService = useEditorService();
    const { isLoading, data, error } = useServiceFetch<any>(
        {
            method: editorService.subscribeToRealtimeTranscription,
            payload: projectId,
        },
    );

    // Callbacks
    const updateRealtimeOutputs = useCallback((realtimeOutputs: RealtimeOutput[]) => {
        setRealtimeOutputs(realtimeOutputs);
    }, []);

    // Side effects
    useEffect(() => {
        if (data) {
            updateRealtimeOutputs(data);
        }
    }, [data, updateRealtimeOutputs]);

    // useEffect(() => {
    //     console.log("current time :", playbackTimestamp)
    // }, [playbackTimestamp])

    // Render
    return <EditorContext.Provider value={{
        realtimeOutputs,

        updateRealtimeOutputs,
        setPlaybackTimestamp,
        playbackTimestamp,
        playbackRemote,
        setPlaybackRemote,

        _page_isLoading: isLoading,
        _page_error: error,
    }}>
        { children }
    </EditorContext.Provider>;
};

export { EditorProvider };
export default EditorContext;