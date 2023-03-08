import { Plus } from 'react-feather';

import DashedBorder from '../../common/EmptyStates/DashedBorder';

function NewTask() {
    return <DashedBorder
        title="Démarrez une nouvelle tâche"
        icon={
            <Plus className="h-12 w-12 text-gray-400" />
        }
    />
};

export default NewTask;