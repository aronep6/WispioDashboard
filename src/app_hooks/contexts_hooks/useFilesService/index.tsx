import { useContext } from 'react';
import FilesServiceContext from '../../../app_contexts/FilesService';

const useFilesService = () => useContext(FilesServiceContext);

export default useFilesService;