import { useParams } from "react-router-dom";
import { createContext, useCallback, useEffect, useState } from "react";
import type { ProjectId } from "../../app_components/application/common/interfaces/Editor";
import type { RealtimeOutput } from "../../app_common/Service/Application/EditorService/interfaces";
import useEditorService from "../../app_hooks/contexts_hooks/useEditorService";
import useServiceFetch from "../../app_hooks/useServiceFetch";
import type { 
    IsLoadingType,
    ErrorType
} from "../../app_hooks/interfaces";

const EditorContext = createContext({
    realtimeOutputs: [] as RealtimeOutput[],
    updateRealtimeOutputs: (realtimeOutputs: RealtimeOutput[]) => { },
    _page_isLoading: false as IsLoadingType,
    _page_error: null as ErrorType,
});

const EditorProvider = ({ children }: { children: React.ReactNode }) => {
    // States
    const projectId: ProjectId = useParams<{ projectId: ProjectId }>().projectId;
    const [realtimeOutputs, setRealtimeOutputs] = useState<RealtimeOutput[]>([]);

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

    // Render
    return <EditorContext.Provider value={{
        realtimeOutputs,

        updateRealtimeOutputs,

        _page_isLoading: isLoading,
        _page_error: error,
    }}>
        { children }
    </EditorContext.Provider>;
};

export { EditorProvider };
export default EditorContext;