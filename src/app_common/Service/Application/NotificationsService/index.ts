import Core from "../../Core";
import _logo_ from "../../../../assets/wispio_logo.webp";
import { type DocumentData, type DocumentReference } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
import { UserAccessibleCollection } from "../../Core/interfaces";
import {
    NotificationInterface,
    NotificationPermission,
    UserAccessibleNotificationsDocument,
    type PushNotificationPayload,
} from "./interfaces";

class NotificationsService extends Core {
    private notification_logo: any;
    public permission: NotificationPermission | undefined;
    public allowedToSendNotifications: boolean;
    constructor() {
        super();
        this.init();
        this.permission = undefined;
        this.allowedToSendNotifications = false;
        this.notification_logo = _logo_;
    }

    private async init() {
        if (this.isProductionEnv) {
            await this.requestPermission();
        }
    }

    private async requestPermission(): Promise<void> {
        try {
            if (!("Notification" in window)) throw new Error("This browser does not support desktop notification");

            const permission = await Notification.requestPermission();

            this.permission = permission as NotificationPermission;
            this.allowedToSendNotifications = permission === "granted";

            return;
        } catch (error) {
            this.logError(error);
        }
    }

    public async push(
        notificationPayload: PushNotificationPayload,
        onClick?: undefined | (() => void),
        onClose?: undefined | (() => void),
        onError?: undefined | (() => void),
        onShow?: undefined | (() => void),
    ): Promise<void> {
        const { title, message, link } = notificationPayload;

        const notification = new Notification(`${ this.application_name } - ${title}`, {
            body: message,
            icon: this.notification_logo,
        });

        notification.onclick = () => {
            if (link) {
                window.open(link);
            }
            if (onClick) return onClick();
            if (onClose) return onClose();
        }

        notification.onclose = () => {
            if (onClose) return onClose();
        }

        notification.onerror = () => {
            if (onError) return onError();
        }

        notification.onshow = () => {
            if (onShow) return onShow();
        }

        return;
    }

    public get areAllowedByUser() {
        return this.allowedToSendNotifications;
    }

    public getLiveNotificationsDocumentReference(): DocumentReference<DocumentData> {
        return this.getDocumentReference(
            UserAccessibleCollection.Notifications,
            UserAccessibleNotificationsDocument.LiveNotifications
        )
    }

    protected async toggleNotificationRead(
        notificationPayload: NotificationInterface,
        newStatement: boolean
    ): Promise<boolean> {
        try {

            const notifications = await this.getDocument(UserAccessibleCollection.Notifications, UserAccessibleNotificationsDocument.LiveNotifications);

            const newNotifications = notifications.records.map(
                (notification: NotificationInterface) => {
                    if (notification.id === notificationPayload.id) {
                        return {
                            ...notification,
                            read: newStatement,
                        };
                    }
                    return notification;
                }
            );

            const docRef = this.getLiveNotificationsDocumentReference();

            await updateDoc(docRef, {
                records: newNotifications,
            });

            return true;
        } catch (error) {
            this.logError(error);
            return false;
        }
    }

    public markNotificationAsRead = async (_notification: NotificationInterface): Promise<boolean> => {
        return await this.toggleNotificationRead(_notification, true);
    }

    public markNotificationAsUnread = async (_notification: NotificationInterface): Promise<boolean> => {
        return await this.toggleNotificationRead(_notification, false);
    }
}

export default NotificationsService;