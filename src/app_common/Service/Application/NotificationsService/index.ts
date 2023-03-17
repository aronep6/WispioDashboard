import Core from "../../Core";
import { NotificationType, NotificationPermission } from "./interfaces";

class NotificationsService extends Core {
    constructor() {
        super();
        this.init();
    }
    
    private init = () => {
        console.log("NotificationsService init");
    }
}

export default NotificationsService;