import { useContext } from 'react';
import NotificationsServiceContext from '../../../app_contexts/NotificationsService';

const useNotificationsService = () => useContext(NotificationsServiceContext);

export default useNotificationsService;