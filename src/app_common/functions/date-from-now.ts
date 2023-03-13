import { formatDistanceToNow } from 'date-fns';

const dateFromNow = (date: Date): string => {
    return formatDistanceToNow(date, { addSuffix: true });
};

export default dateFromNow;