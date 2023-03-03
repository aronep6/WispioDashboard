import { useContext } from 'react';
import UserSession from '../../../app_contexts/UserSession';

const useUserSession = () => useContext(UserSession).user;

export default useUserSession;