import useEditor from "../../../../app_hooks/contexts_hooks/useEditor";

const ProjectEditor = () => {
    const { realtimeOutputs } = useEditor();

    return (
        <section className="grid grid-cols-2 gap-4 bg-red-100">
            <div className="col-span-1 bg-red-300 p-4">
                Current realtime outputs : {
                    JSON.stringify(realtimeOutputs)
                }
            </div>
            <div className="col-span-1 bg-red-300 p-4">
                Current realtime outputs : {
                    JSON.stringify(realtimeOutputs)
                }
            </div>
        </section>
    );
};

export default ProjectEditor;