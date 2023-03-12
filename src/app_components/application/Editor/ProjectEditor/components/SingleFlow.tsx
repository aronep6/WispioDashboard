import { memo, useCallback } from 'react';
import { type RealtimeOutput } from '../../../../../app_common/Service/Application/EditorService/interfaces';
import useEditor from '../../../../../app_hooks/contexts_hooks/useEditor';

const notHighlightedStyle = 'flex flex-col py-3 px-5 border-b border-gray-300 group hover:bg-gray-200 text-slate-800 cursor-pointer duration-100';
const highlightedStyle = 'flex flex-col py-3 px-5 border-b border-gray-300 group bg-indigo-600 text-white cursor-pointer duration-100';

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
        className={isHighlighted ? highlightedStyle : notHighlightedStyle}
    >
        <span className='text-xs'>From {from}s to {to}s</span>
        <p className='font-medium'>{output}</p>
    </div>
};

export default memo(SingleFlow, (prevProps, nextProps) => {
    return prevProps.singleOutput.output === nextProps.singleOutput.output && prevProps.isHighlighted === nextProps.isHighlighted;
});