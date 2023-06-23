import Core from '../Core';
import { 
    CENTURION_BASE_URL
} from './centurion.config';

// TODO: Improve this class by not extending the Core class
class CenturionBackendService extends Core {
    baseUrl: string = CENTURION_BASE_URL;

    constructor() {
        super();
        this.baseUrl = CENTURION_BASE_URL;
    }

    async getFirebaseToken(): Promise<string | undefined> {
        try {
            return await this.auth.currentUser?.getIdToken();
        } catch (error) {
            throw error;
        }
    }
}

export default CenturionBackendService;