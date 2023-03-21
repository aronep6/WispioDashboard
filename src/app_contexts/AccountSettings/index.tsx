import { createContext, useState, useCallback, type ReactNode, useEffect } from 'react';
import {
    type AccountSettingsContextInterface,
    type EventNotificationInterface,
} from './interfaces';

const AccountSettingsContext = createContext({} as AccountSettingsContextInterface);

const DEFAULT_EVENT_NOTIFICATION = null;

const AccountSettingsProvider = ({ children }: { children: ReactNode }) => {
    const [eventNotification, setEventNotifications] = useState<EventNotificationInterface | null>(DEFAULT_EVENT_NOTIFICATION);

    const pushEventNotification = useCallback((newEventNotification: EventNotificationInterface) => {
        setEventNotifications(newEventNotification);
    }, []);

    useEffect(() => {
        if (!eventNotification) return;
        const { title, message, type } = eventNotification;
        window.alert(`${ title }: ${ message } (${ type })`);
    }, [eventNotification]);

    return <AccountSettingsContext.Provider value={{
        eventNotification,
        pushEventNotification
    }}>
        {children}
    </AccountSettingsContext.Provider>
};

export { AccountSettingsProvider };
export default AccountSettingsContext;