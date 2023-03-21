import { useContext } from 'react';
import AccountSettingsContext from '../../../app_contexts/AccountSettings';

const useAccountSettings = () => useContext(AccountSettingsContext);

export default useAccountSettings;