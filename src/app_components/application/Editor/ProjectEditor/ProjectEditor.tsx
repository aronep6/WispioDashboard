import 'vidstack/styles/defaults.css';
import { MediaOutlet, MediaPlayer } from '@vidstack/react';
import type { RealtimeOutput } from '../../../../app_common/Service/Application/EditorService/interfaces';
import useEditor from "../../../../app_hooks/contexts_hooks/useEditor";

import video from './src/cocadmin_video.mp4';
import { SecondaryTitle } from '../../../../app_atomic/Title';

const SingleFlow = ({ singleOutput }: { singleOutput: RealtimeOutput }) => {
    const { from, to, output } = singleOutput;

    return <tr className='odd:bg-stone-800 even:bg-stone-900'>
        <td className="text-slate-100 text-xs pl-8">{from}</td>
        <td className="text-slate-100 p-3 text-xs">{to}</td>
        <td className="text-slate-100 p-3">{output}</td>
    </tr>
}

const Flow = () => {
    const { realtimeOutputs } = useEditor();

    return <div className="grid grid-cols-1 gap-2.5 bg-stone-900 pt-3 pb-7 rounded">
        <SecondaryTitle add="text-slate-100 px-6">
            Wispio Realtime
        </SecondaryTitle>
        <table>
            <thead>
                <tr>
                    <th className="text-slate-100 pl-8"></th>
                    <th className="text-slate-100"></th>
                    <th className="text-slate-100"></th>
                </tr>
            </thead>
            <tbody>
                {realtimeOutputs.map((singleOutput, index) => <SingleFlow key={index} singleOutput={singleOutput} />)}
            </tbody>
        </table>
    </div>
};

const ProjectEditor = () => {

    return (
        <section className="grid grid-cols-2 gap-4 min-h-full">
            <div className="col-span-1">

                {true && <div className="">
                    <MediaPlayer
                        src={video}
                        controls
                        className='rounded overflow-hidden shadow-xl'
                    >
                        <MediaOutlet />
                    </MediaPlayer>
                </div>}

            </div>
            <div className="col-span-1">
                <Flow />
            </div>
        </section>
    );
};

export default ProjectEditor;