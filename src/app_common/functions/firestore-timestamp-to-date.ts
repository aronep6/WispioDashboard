import type { Timestamp } from '@firebase/firestore-types'; 

const firestoreTimestampToDate = (
    timestamp: Timestamp
): Date => {
    return new Date(timestamp.seconds * 1000);
};

export default firestoreTimestampToDate;