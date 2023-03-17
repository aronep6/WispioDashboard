import { createContext } from "react";
import NotificationsService from "../../app_common/Service/Application/NotificationsService";

const NotificationsServiceContext = createContext({} as NotificationsService);

const NotificationsServiceProvider = ({ children }: { children: React.ReactNode }) => {
    return <NotificationsServiceContext.Provider value={
        new NotificationsService()
    }>
        { children }
    </NotificationsServiceContext.Provider>;
};

export { NotificationsServiceProvider };
export default NotificationsServiceContext;