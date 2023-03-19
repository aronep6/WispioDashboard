import { useContext } from 'react';
import AccountSettingsServiceContext from '../../../app_contexts/AccountSettingsService';

const useAccountSettingsService = () => useContext(AccountSettingsServiceContext);

export default useAccountSettingsService;