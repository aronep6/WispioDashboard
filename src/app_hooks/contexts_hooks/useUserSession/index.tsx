import { useContext } from 'react';
import AuthenticationSession from '../../../app_contexts/AuthenticationSession';

const useUserSession = () => useContext(AuthenticationSession).user;

export default useUserSession;