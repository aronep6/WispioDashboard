import { useContext } from 'react';
import NotificationsContext from '../../../app_contexts/Notifications';

const useNotifications = () => useContext(NotificationsContext)

export default useNotifications;