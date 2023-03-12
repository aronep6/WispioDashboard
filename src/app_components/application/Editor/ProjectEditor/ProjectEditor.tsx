import useEditor from "../../../../app_hooks/contexts_hooks/useEditor";
import Flow from "./components/Flow";
import VideoPlayerWrapper from '../components/VideoPlayerWrapper';

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

export default ProjectEditor;