import type { 
    LiveNotifications,
} from "../../app_common/Service/Application/NotificationsService/interfaces"

export interface NotificationsContextInterface {
    liveNotifications: LiveNotifications | []
    unReadedNotificationsCount: number
}