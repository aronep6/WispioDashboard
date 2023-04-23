import { useMemo } from "react";
import PageWrapper from "../common/PageWrapper";
import useNotificationsService from "../../../app_hooks/contexts_hooks/useNotificationsService";
import NoNotifications from "./components/NoNotifications";
import AllNotifications from "./components/AllNotifications";
import useNotifications from "../../../app_hooks/contexts_hooks/useNotifications";

const Notifications = () => {
    const notificationService = useNotificationsService();
    const { unReadedNotificationsCount, liveNotifications } = useNotifications();

    const notificationAreAllowed = useMemo(() => {
        return notificationService.areAllowedByUser
    }, [notificationService]);

    const pageProps = useMemo(() => {
        return {
            pageTitle: unReadedNotificationsCount > 0 ? `Notifications : ${unReadedNotificationsCount} non lue(s)` : "Notifications"
        }
    }, [unReadedNotificationsCount])

    return <PageWrapper {...pageProps}>
        {liveNotifications.length === 0 ?
            <NoNotifications areAllowedByUser={notificationAreAllowed} />
            :
            <AllNotifications liveNotifications={liveNotifications} />
        }
    </PageWrapper>;
}

export default Notifications;