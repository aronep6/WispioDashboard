import type { Timestamp } from "firebase/firestore";
export interface NotificationInterface {
    title: string,
    message: string,
    at: Timestamp,
    type: NotificationType,
    link: string | null,
    read: boolean
}

export type LiveNotifications = NotificationInterface[];

export enum NotificationType {
    Info = "info",
    Success = "success",
    Warning = "warning",
    Error = "error",
}

export enum NotificationPermission {
    Granted = "granted",
    Denied = "denied",
    Default = "default",
}

export interface PushNotificationPayload {
    title: string;
    message: string;
    type?: NotificationType;
    link?: string;
}

export enum UserAccessibleNotificationsDocument {
    LiveNotifications = "live_notifications",
}

export interface LiveNotificationsResponseDTO {
    records: LiveNotifications
}

export const NotificationTypeMap = new Map<NotificationType, string>([
    [NotificationType.Info, "Information"],
    [NotificationType.Success, "Succès"],
    [NotificationType.Warning, "Avertissement"],
    [NotificationType.Error, "Erreur"],
]);