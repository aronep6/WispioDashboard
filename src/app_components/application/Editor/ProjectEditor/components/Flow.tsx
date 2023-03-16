import { memo } from "react";
import { Database } from "react-feather";
import { SecondaryTitle } from "../../../../../app_atomic/Title";
import { type RealtimeOutput } from "../../../../../app_common/Service/Application/EditorService/interfaces";
import SingleFlow from "./SingleFlow";

const iconProps = {
    size: 17,
    strokeWidth: 2,
};

const Flow = ({ 
    realtimeOutputs, 
    currentHighlightedOutputIndex
}: { 
    realtimeOutputs: RealtimeOutput[],
    currentHighlightedOutputIndex: number
}) => {
    return <div className="flex flex-col gap-2.5 border-y border-r border-slate-300 h-full overflow-y-auto relative pb-7">
        <div className='flex flex-row justify-between items-center px-5 shadow-md bg-slate-100 py-3 sticky top-0'>
            <SecondaryTitle>
                Realtime Outputs
            </SecondaryTitle>
            <div className='flex flex-col gap-2'>
                <span className='text-xs text-slate-600 flex flex-row items-center gap-3'>
                    <Database {...iconProps} /> {realtimeOutputs.length} outputs
                </span>
            </div>
        </div>
        <div className='flex flex-col'>
            {
                realtimeOutputs.map((singleOutput, index) => <SingleFlow 
                    key={index} 
                    editingIndex={index}
                    singleOutput={singleOutput}
                    isHighlighted={index === currentHighlightedOutputIndex}
                />)
            }
        </div>
    </div>
};

export default memo(Flow, (prevProps, nextProps) => {
    return prevProps.realtimeOutputs === nextProps.realtimeOutputs && prevProps.currentHighlightedOutputIndex === nextProps.currentHighlightedOutputIndex;
});