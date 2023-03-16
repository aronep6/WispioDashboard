import useEditor from "../../../../app_hooks/contexts_hooks/useEditor";
import Flow from "./components/Flow";
import VideoPlayerWrapper from '../components/VideoPlayerWrapper';
import { EditorProvider } from "../../../../app_contexts/Editor";
import { EditorServiceProvider } from "../../../../app_contexts/EditorService";
import type { ProjectId } from "../../common/interfaces/Editor";
import { useParams } from "react-router-dom";
import EditOutputModal from "./components/EditOutputModal";

const ProjectEditor = () => {
    const { 
        realtimeOutputs, 
        currentEditingOutput, 
        currentHighlightedOutputIndex,
        setCurrentEditingOutput,
    } = useEditor();

    // I applied absolute inset-0 to this section because the outlet 
    // from react-router-dom is making a div on top of this section

    return <section className="grid max-h-full grid-cols-12 justify-start absolute inset-0">
        <div className="col-span-5 max-h-full overflow-y-auto">
            <Flow 
                realtimeOutputs={realtimeOutputs} 
                currentHighlightedOutputIndex={currentHighlightedOutputIndex}
            />
        </div>
        <div className="col-span-7">
            <VideoPlayerWrapper />
        </div>
        {
            currentEditingOutput && <EditOutputModal 
                currentEditingOutput={currentEditingOutput} 
                setCurrentEditingOutput={setCurrentEditingOutput}
            />
        }
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

export default index;