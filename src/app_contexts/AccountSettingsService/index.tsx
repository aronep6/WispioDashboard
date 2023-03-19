import { createContext } from "react";
import AccountSettingsService from "../../app_common/Service/Application/AccountSettingsService";

const AccountSettingsServiceContext = createContext({} as AccountSettingsService);

const AccountSettingsServiceProvider = ({ children }: { children: React.ReactNode }) => {
    return <AccountSettingsServiceContext.Provider value={
        new AccountSettingsService()
    }>
        { children }
    </AccountSettingsServiceContext.Provider>;
};

export { AccountSettingsServiceProvider };
export default AccountSettingsServiceContext;