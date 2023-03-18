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
        subscribeRef: notificationsService.getLiveNotificationsDocumentReference()
    });

    // Callbacks
    const updateLiveNotifications = useCallback((liveNotifications: LiveNotifications) => {
        setLiveNotifications(liveNotifications);
    }, []);

    const sendNotificationToBrowser = useCallback((liveNotifications: LiveNotifications) => {
        if (liveNotifications.length === 0 || isLoading || error) return;
        liveNotifications.forEach(n => {
            const { title, message, link, type } = n;
            notificationsService.push(
                { title, message, link, type },
                () => notificationsService.markNotificationAsRead(n),
            );
        });
    }, [isLoading, error, notificationsService]);

    // Side effects (binding to states)
    useEffect(() => {
        if (data) {
            updateLiveNotifications(data.records);
        }
    }, [data, updateLiveNotifications]);

    useEffect(() => {
        // When a new notification is added by a service, we check if it's already in the live notifications
        // If it's not, we call the callback : sendNotificationToBrowser
        if (data) {
            const newLiveNotifications = data.records;
            const oldLiveNotifications = liveNotifications;
            const oldLiveNotificationsIds = oldLiveNotifications.map(n => n.id);

            const newNotifications = newLiveNotifications.filter(n => {
                return !oldLiveNotificationsIds.includes(n.id) && !n.read;
            });
            if (newNotifications.length > 0) {
                sendNotificationToBrowser(newNotifications);
            }
        }
    }, [data, liveNotifications, sendNotificationToBrowser]);

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