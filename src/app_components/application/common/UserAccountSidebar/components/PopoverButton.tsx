import { type FC } from 'react';
// import { ChevronUp } from 'react-feather';
import UserPicture from '../../../../../app_atomic/UserPicture';
import { UserPictureProps } from '../../../../../app_atomic/UserPicture/interfaces';

interface PopoverButtonProps extends UserPictureProps {
    isOpened: boolean;
}

const PopoverButton: FC<PopoverButtonProps> = ({ isOpened, photoURL, displayName }) => {
    return <div className="flex flex-row justify-start gap-3 w-full bg-inherit group py-3.5 px-3.5 inter items-center cursor-pointer">
        <div className="flex-shrink-0 h-9 w-9 rounded-full bg-slate-800">
            <UserPicture photoURL={photoURL} displayName={displayName} />
        </div>
        <div className='flex-col flex text-left'>
            <div className="text-white text-xs font-medium">{ displayName || 'Mon compte' }</div>
            <div className="text-slate-400 text-xs font-medium">Accéder aux paramètres</div>
        </div>
    </div>
};

export default PopoverButton;