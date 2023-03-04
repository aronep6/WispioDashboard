import { useContext } from 'react';
import AuthenticationSession from '../../../app_contexts/AuthenticationSession';

const useAuth = () => useContext(AuthenticationSession).auth;

export default useAuth;