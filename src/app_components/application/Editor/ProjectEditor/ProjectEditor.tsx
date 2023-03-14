import { memo } from "react";
import useEditor from "../../../../app_hooks/contexts_hooks/useEditor";
import Flow from "./components/Flow";
import VideoPlayerWrapper from '../components/VideoPlayerWrapper';
import { EditorProvider } from "../../../../app_contexts/Editor";
import { EditorServiceProvider } from "../../../../app_contexts/EditorService";
import type { ProjectId } from "../../common/interfaces/Editor";
import { useParams } from "react-router-dom";

const ProjectEditor = () => {
    const { realtimeOutputs } = useEditor();

    // We applied  absolute inset-0 to this section bescause the outlet 
    // from react-router-dom is making a div upper this section
    return <section className="grid max-h-full grid-cols-12 absolute inset-0 justify-start">
        <div className="col-span-5 max-h-full overflow-y-auto">
            <Flow realtimeOutputs={realtimeOutputs} />
        </div>
        <div className="col-span-7">
            <VideoPlayerWrapper />
        </div>
    </section>
};

function index() {
    const projectId: ProjectId = useParams<{ projectId: ProjectId }>().projectId;

    return <EditorServiceProvider>
        <EditorProvider projectId={projectId}>
            <ProjectEditor />
        </EditorProvider>
    </EditorServiceProvider>
};

export default memo(index, () => true);