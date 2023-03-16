import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import type { ProjectId } from "../../app_components/application/common/interfaces/Editor";
import type { RealtimeOutput, EditingOutput } from "../../app_common/Service/Application/EditorService/interfaces";
import useEditorService from "../../app_hooks/contexts_hooks/useEditorService";
import useServiceSubscribe from "../../app_hooks/useServiceSubscribe";
import { type MediaRemoteControl } from "vidstack";
import type { 
    IsLoadingType,
    ErrorType
} from "../../app_hooks/interfaces";
import type RealtimeOutputResponseDTO from "../../app_common/Service/Application/EditorService/interfaces";

const EditorContext = createContext({
    // Editor core values
    realtimeOutputs: [] as RealtimeOutput[],
    updateRealtimeOutputs: (realtimeOutputs: RealtimeOutput[]) => {},
    // Playback timestamp control
    setPlaybackTimestamp: (playbackTimestamp: number) => {},
    // Playback remote
    playbackRemote: undefined as unknown as MediaRemoteControl,
    setPlaybackRemote: (remote: MediaRemoteControl) => {},
    // Playback current matched output
    currentHighlightedOutputIndex: -1 as number,
    // Editing output
    currentEditingOutput: null as EditingOutput | null,
    setCurrentEditingOutput: (currentEditingOutput: EditingOutput | null) => {},
    // Page loader
    _page_isLoading: false as IsLoadingType,
    _page_error: null as ErrorType,
});

const DEFAULT_CURRENT_EDITING_OUTPUT = null;

const EditorProvider = ({ projectId, children }: { projectId: ProjectId, children: React.ReactNode }) => {    
    // States
    const [realtimeOutputs, setRealtimeOutputs] = useState<RealtimeOutput[]>([]);
    const [playbackTimestamp, setPlaybackTimestamp] = useState<number>(0);
    const [playbackRemote, setPlaybackRemote] = useState<MediaRemoteControl>(undefined as unknown as MediaRemoteControl);
    const [currentEditingOutput, setCurrentEditingOutput] = useState<EditingOutput | null>(DEFAULT_CURRENT_EDITING_OUTPUT);

    // Hooks
    const editorService = useEditorService();
    const { isLoading, data, error } = useServiceSubscribe<RealtimeOutputResponseDTO>(
        {
            subscribeRef: editorService.subscribeToRealtimeTranscription(projectId)
        },
    );

    // Memoized values
    const currentHighlightedOutputIndex = useMemo(() => realtimeOutputs.findIndex((singleOutput) => {
        return singleOutput.from <= playbackTimestamp && singleOutput.to > playbackTimestamp;
    }), [playbackTimestamp, realtimeOutputs]);
    
    // Callbacks
    const updateRealtimeOutputs = useCallback((realtimeOutputs: RealtimeOutput[]) => {
        setRealtimeOutputs(realtimeOutputs);
    }, []);

    // Side effects
    useEffect(() => {
        if (data) {
            updateRealtimeOutputs(data.records);
        }
    }, [data, updateRealtimeOutputs]);

    useEffect(() => {
        // Pause the video when the user opens the output editor modal
        if (!playbackRemote) return;

        if (currentEditingOutput) {
            playbackRemote.pause();
        } else {
            playbackRemote.play();
        }
    }, [currentEditingOutput, playbackRemote]);

    // useEffect(() => {
    //     console.log("current time :", playbackTimestamp)
    // }, [playbackTimestamp])

    // Render
    return <EditorContext.Provider value={{
        realtimeOutputs,
        
        currentEditingOutput,
        setCurrentEditingOutput,

        updateRealtimeOutputs,
        setPlaybackTimestamp,
        currentHighlightedOutputIndex: useMemo(() => currentHighlightedOutputIndex, [currentHighlightedOutputIndex]),
        playbackRemote,
        setPlaybackRemote,

        _page_isLoading: isLoading,
        _page_error: error,
    }}>
        { children }
    </EditorContext.Provider>
};

export { EditorProvider };
export default EditorContext;