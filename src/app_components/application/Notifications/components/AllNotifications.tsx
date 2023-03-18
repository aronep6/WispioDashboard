import { useMemo } from "react";
import dateFromNow from "../../../../app_common/functions/date-from-now";
import firestoreTimestampToDate from "../../../../app_common/functions/firestore-timestamp-to-date";
import { LiveNotifications, NotificationTypeMap } from "../../../../app_common/Service/Application/NotificationsService/interfaces";
import useNotificationsService from "../../../../app_hooks/contexts_hooks/useNotificationsService";
// import { SecondaryButton } from "../../../../app_atomic/Button";

const AllNotifications = ({
    liveNotifications
}: {
    liveNotifications: LiveNotifications
}) => {
    const { markNotificationAsRead, markNotificationAsUnread } = useNotificationsService();

    return <div className="flex flex-col gap-1 flex-start">
        <div className="overflow-x-auto">
            <div className="align-middle inline-block min-w-full">
                <div className="overflow-hidden border border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Titre
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Message
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Quand
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Type
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Mark as read</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {liveNotifications.map((notification, notifIdx) => {
                                const wasRead = notification.read;

                                const atReadable = useMemo(() => {
                                    return dateFromNow(
                                        firestoreTimestampToDate(notification.at)
                                    )
                                }, [notification.at]);

                                const typeReadable = useMemo(() => {
                                    return NotificationTypeMap.get(notification.type);
                                }, [notification.type]);
                                
                                return <tr key={notifIdx} className={
                                        !wasRead ? 'bg-indigo-600 text-white duration-150' :
                                            notifIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50 text-gray-700'
                                    }>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">{ notification.title }</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm ">{ notification.message }</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm ">{ atReadable }</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm ">{ typeReadable }</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        {
                                            !wasRead ? <span 
                                                onClick={() => markNotificationAsRead(notification)}
                                                className="underline hover:scale-105 cursor-pointer"
                                            >
                                                Marquer comme lue
                                            </span>
                                            : <span 
                                                onClick={() => markNotificationAsUnread(notification)}
                                                className="underline hover:scale-105 cursor-pointer"
                                            >
                                                Marquer comme non lue
                                            </span>
                                        }
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div className="flex flex-row justify-end">
            <div className="max-w-max">
                {/* <SecondaryButton action={markAllAsRead}>
                    Marquer toutes les notifications comme lues
                </SecondaryButton> */}
            </div>
        </div>
    </div>
};

export default AllNotifications;