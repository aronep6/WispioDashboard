import { memo, useCallback } from 'react';
import { Edit2 } from 'react-feather';
import { type RealtimeOutput } from '../../../../../app_common/Service/Application/EditorService/interfaces';
import useEditor from '../../../../../app_hooks/contexts_hooks/useEditor';

const notHighlightedStyle = 'flex flex-row relative items-center justify-between py-3 px-5 border-b border-gray-300 group hover:bg-gray-200 text-slate-800 cursor-pointer duration-100';
const highlightedStyle = 'flex flex-row relative items-center justify-between py-3 px-5 border-b border-gray-300 group bg-indigo-600 text-white cursor-pointer duration-100';

const iconProps = {
    size: 18,
    className: 'currentColor',
};

const SingleFlow = ({ 
    singleOutput,
    isHighlighted = false,
}: { 
    singleOutput: RealtimeOutput,
    isHighlighted: boolean,
}) => {
    const { from, to, output } = singleOutput;
    const { playbackRemote } = useEditor();

    const handleSeekTo = useCallback(() => {
        playbackRemote.seek(from)
    }, [from, playbackRemote]);

    return <div onClick={handleSeekTo}
        title={`Lire à partir de ${from}s`}
        className={isHighlighted ? highlightedStyle : notHighlightedStyle}
    >
        <div className='flex flex-col'>
            <span className='text-xs'>From {from}s to {to}s ({to - from}s)</span>
            <p className='font-medium'>{output}</p>
        </div>
        <div className='flex flex-row relative group-hover:right-4 group group-hover:absolute gap-3 items-center group-hover:text-indigo-800 group-hover:shadow transition-colors duration-150 group-hover:bg-indigo-300 justify-center shrink-0 rounded-full group-hover:rounded-lg group-hover:px-3 h-9 w-9 group-hover:w-auto hover:brightness-150'>
            <Edit2 {...iconProps} />
            <div className='text-xs group-hover:block hidden'>
                <span className='text-xs'>Modifier</span>
            </div>
        </div>
    </div>
};

export default memo(SingleFlow, (prevProps, nextProps) => {
    return prevProps.singleOutput.output === nextProps.singleOutput.output && prevProps.isHighlighted === nextProps.isHighlighted;
});