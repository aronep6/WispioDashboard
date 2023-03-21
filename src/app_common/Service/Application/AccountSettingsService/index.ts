import Core from "../../Core";

class AccountSettingsService extends Core {
    constructor() {
        super();
    }

    // Security and privacy
    _security_updatePassword = async (
        password: string, 
        password_retype: string
    ) => {
        try {
            if (password !== password_retype) throw new Error('Password entries are different, please try again !');
            throw new Error('Password update is not implemented yet !');
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default AccountSettingsService;