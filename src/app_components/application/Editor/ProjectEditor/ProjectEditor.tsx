import type { RealtimeOutput } from '../../../../app_common/Service/Application/EditorService/interfaces';
import useEditor from "../../../../app_hooks/contexts_hooks/useEditor";

import { SecondaryTitle } from '../../../../app_atomic/Title';
import EditorVideoPlayer from '../components/VideoPlayer';

const SingleFlow = ({ singleOutput }: { singleOutput: RealtimeOutput }) => {
    const { from, to, output } = singleOutput;

    return <div className='flex flex-col py-3 px-5 border-b border-gray-300 group hover:bg-gray-200'>
        <span className='text-xs text-slate-600'>
            {from} to {to}
        </span>
        <p className='font-medium'>
            {output}
        </p>
    </div>
}

const Flow = () => {
    const { realtimeOutputs, playbackTimestamp } = useEditor();

    return <div className="grid grid-cols-1 gap-2.5 border border-slate-500 pt-3 pb-7 rounded">
        <SecondaryTitle add="px-5">
            Realtime Outputs
        </SecondaryTitle>
        Current playback timestamp : {
            playbackTimestamp
        }
        <div className='flex flex-col'>
            {
                realtimeOutputs.map((singleOutput, index) => <SingleFlow key={index} singleOutput={singleOutput} />)
            }
        </div>
    </div>
};

const ProjectEditor = () => {

    return (
        <section className="grid grid-cols-2 gap-4 min-h-full">
            <div className="col-span-1">
                <Flow />
            </div>
            <div className="col-span-1">
                <EditorVideoPlayer />
            </div>
        </section>
    );
};

export default ProjectEditor;