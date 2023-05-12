import { Fragment, type FC, useMemo } from 'react';
import { type UserPictureProps } from './interfaces';

const UserPicture: FC<UserPictureProps> = ({ photoURL, displayName = 'Ousmane Mbaye' }) => {

    const computedGenericDisplay: string | null = useMemo(() => {
        if (!displayName) return null;
        const reducedName = displayName.split(' ').reduce((accumulator: string, currentValue: string) => accumulator + currentValue[0], '').trim();        
        return reducedName.length > 0 ? reducedName : null;
    }, [displayName]);

    return <Fragment>
        {
            photoURL !== null
                ? <img className="h-full w-full rounded-full object-cover" src={photoURL} alt={displayName || 'User picture'} />
                : <div className="h-full w-full rounded-full bg-slate-800 flex items-center justify-center">
                    <span className="text-white text-sm font-medium">{ computedGenericDisplay }</span>
                </div>
        }
    </Fragment>;
};

export default UserPicture;