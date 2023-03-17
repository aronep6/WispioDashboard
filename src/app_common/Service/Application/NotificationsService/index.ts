import Core from "../../Core";
import _logo_ from "../../../../assets/wispio_logo.webp";
import type { DocumentData, DocumentReference } from "firebase/firestore";
import { UserAccessibleCollection } from "../../Core/interfaces";
import {
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
        onClosed?: undefined | (() => void),
        onError?: undefined | (() => void),
    ): Promise<void> => {
        const { title, message, type, link } = _notification;

        const notification = new Notification(`Wispio - ${title}`, {
            body: message,
            icon: this.notification_logo,
        });

        notification.onclick = () => {
            if (link) window.open(link);
        }

        notification.onclose = () => {
            if (onClosed) return onClosed();
        }

        notification.onerror = () => {
            if (onError) return onError();
        }

        return;
    }

    public areAllowedByUser = (): boolean => {
        return this.allowedToSendNotifications;
    }

    public subscribeToRealtimeNotifications = (): DocumentReference<DocumentData> => {
        return this.getDocumentReference(
            UserAccessibleCollection.Notifications,
            UserAccessibleNotificationsDocument.LiveNotifications
        )
    }
}

export default NotificationsService;