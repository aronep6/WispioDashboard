import type { User } from 'firebase/auth';
import type Authentication from '../../app_common/Service/Authentication';

export interface AuthenticationProviderInterface {
    auth: Authentication,
    user: UserSessionInterface,
}

export type UserSessionInterface = User | undefined | null;