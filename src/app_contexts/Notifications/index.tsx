import { createContext, useState, useCallback, useEffect, useMemo } from "react";
import type { NotificationsContextInterface } from "./interfaces";
import useServiceSubscribe from "../../app_hooks/useServiceSubscribe";
import useNotificationsService from "../../app_hooks/contexts_hooks/useNotificationsService";
import type { 
    LiveNotifications,
    LiveNotificationsResponseDTO,
} from "../../app_common/Service/Application/NotificationsService/interfaces";

const NotificationsContext = createContext({} as NotificationsContextInterface);

const NotificationsProvider = ({ children }: { children: React.ReactNode }) => {
    const [liveNotifications, setLiveNotifications] = useState<LiveNotifications>([]);

    const notificationsService = useNotificationsService();

    const { isLoading, data, error } = useServiceSubscribe<LiveNotificationsResponseDTO>({
        subscribeRef: notificationsService.subscribeToRealtimeNotifications()
    });

    // Callbacks
    const updateLiveNotifications = useCallback((liveNotifications: LiveNotifications) => {
        setLiveNotifications(liveNotifications);
    }, []);

    // Side effects (binding to states)
    useEffect(() => {
        if (data) {
            updateLiveNotifications(data.records);
        }
    }, [data, updateLiveNotifications]);

    const unReadedNotificationsCount = useMemo(() => {
        return liveNotifications.filter(n => !n.read).length;
    }, [liveNotifications]);

    return <NotificationsContext.Provider value={{
        liveNotifications,
        unReadedNotificationsCount, 
    } as NotificationsContextInterface}>
        {children}
    </NotificationsContext.Provider>
};

export { NotificationsProvider };
export default NotificationsContext;