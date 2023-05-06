import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

const dateFromNow = (inDate: Date | string): string => {
    const date = typeof inDate === 'string' ? new Date(inDate) : inDate;
    return formatDistanceToNow(date, {
        addSuffix: true,
        locale: fr,
    });
};

export default dateFromNow;