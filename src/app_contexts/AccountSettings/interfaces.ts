export enum EventNotificationType {
    Success = 'success',
    Error = 'error',
    Info = 'info',
}

export interface EventNotificationInterface {
    type: EventNotificationType;
    title: string;
    message: string;
    timeout?: number;
    timestamp?: number;
}

export interface AccountSettingsContextInterface {
    eventNotification: EventNotificationInterface | null;
    pushEventNotification: (n: EventNotificationInterface) => void;
}