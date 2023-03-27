import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

const dateFromNow = (date: Date): string => {
    return formatDistanceToNow(date, {
        addSuffix: true,
        locale: fr,
    });
};

export default dateFromNow;