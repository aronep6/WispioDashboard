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
        // this.init();
        this.permission = undefined;
        this.allowedToSendNotifications = false;
        this.notification_logo = _logo_;
    }

    private init = async () => {
        await this.requestPermission();
    }

    private requestPermission = async (): Promise<void> => {
        try {
            if (!("Notification" in window)) throw new Error("This browser does not support desktop notification");

            Notification.requestPermission()
                .then((result) => {
                    this.permission = result as NotificationPermission;
                    this.allowedToSendNotifications = result === "granted";
                    return;
                })
                .catch((error) => { throw new Error(error); });
        } catch (error) {
            this.logError(error);
        }
    }

    public push = async (
        _notification: PushNotificationPayload,
        onClick?: undefined | (() => void),
        onClose?: undefined | (() => void),
        onError?: undefined | (() => void),
        onShow?: undefined | (() => void),
    ): Promise<void> => {
        const { title, message, type, link } = _notification;

        const notification = new Notification(`Wispio - ${title}`, {
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

    public areAllowedByUser = (): boolean => {
        return this.allowedToSendNotifications;
    }

    public getLiveNotificationsDocumentReference = (): DocumentReference<DocumentData> => {
        return this.getDocumentReference(
            UserAccessibleCollection.Notifications,
            UserAccessibleNotificationsDocument.LiveNotifications
        )
    }

    protected toogleNotificationAsRead = async (_notification: NotificationInterface, newStatement: boolean): Promise<boolean> => {
        try {

            const notifications = await this.getDocument(UserAccessibleCollection.Notifications, UserAccessibleNotificationsDocument.LiveNotifications);

            const newNotifications = notifications.records.map((notification: NotificationInterface) => {
                if (notification.id === _notification.id) {
                    return {
                        ...notification,
                        read: newStatement,
                    };
                }
                return notification;
            });

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
        return this.toogleNotificationAsRead(_notification, true);
    }

    public markNotificationAsUnread = async (_notification: NotificationInterface): Promise<boolean> => {
        return this.toogleNotificationAsRead(_notification, false);
    }
}

export default NotificationsService;