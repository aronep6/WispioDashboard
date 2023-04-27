import { useContext } from 'react';
import SnackbarServiceContext from '../../../app_contexts/SnackbarService';

const useSnackbarService = () => useContext(SnackbarServiceContext);

export default useSnackbarService;