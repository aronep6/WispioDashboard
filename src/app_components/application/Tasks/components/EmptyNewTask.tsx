import { Plus } from 'react-feather';
import { Link } from 'react-router-dom';

import DashedBorder from '../../common/EmptyStates/DashedBorder';

function EmptyNewTask() {
    return <Link to='/tasks/new' className='flex w-full h-full'>
        <DashedBorder
            title="Commencer une nouvelle transcription"
            icon={
                <Plus className="h-12 w-12 text-gray-400" />
            }
        />
    </Link>
};

export default EmptyNewTask;