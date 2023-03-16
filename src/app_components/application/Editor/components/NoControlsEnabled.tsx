import { memo } from 'react';
import { Sliders } from 'react-feather';

const iconProps = {
    size: 26,
    strokeWidth: 2,
};

function NoControlsEnabled() {
    return (
        <div className="bg-slate-100 text-slate-600 p-8 flex flex-col items-center gap-4">
            <Sliders {...iconProps} />
            <p className='text-center max-w-md'>
                Controls are disabled for all your projects. To enable controls you need to turn on <span className='font-medium text-indigo-600'>Editor controls</span> in your <span className='font-medium text-indigo-600'>Project settings</span>.
            </p>
        </div>
    );
}

export default memo(NoControlsEnabled, () => true);