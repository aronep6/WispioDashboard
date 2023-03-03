import type { User } from 'firebase/auth';

export interface UserSessionInterface {
    user: User | undefined | null;
};