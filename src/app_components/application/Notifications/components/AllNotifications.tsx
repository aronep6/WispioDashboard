import { useMemo } from "react";
import dateFromNow from "../../../../app_common/functions/date-from-now";
import firestoreTimestampToDate from "../../../../app_common/functions/firestore-timestamp-to-date";
import { LiveNotifications, NotificationTypeMap } from "../../../../app_common/Service/Application/NotificationsService/interfaces";

// title: string,
// message: string,
// at: Timestamp,
// type?: NotificationType,
// link: string | null,
// read: boolean

const AllNotifications = ({
    liveNotifications
}: {
    liveNotifications: LiveNotifications
}) => {
    return <div className="flex flex-col">
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
                                const wasRead = useMemo(() => {
                                    return notification.read;
                                }, [notification.read]);

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
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">{notification.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm ">{notification.message}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm ">{ atReadable }</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm ">{ typeReadable }</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <span className="underline hover:scale-105 cursor-pointer">
                                            Mark as read
                                        </span>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
};

export default AllNotifications;