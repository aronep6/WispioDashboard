import { useContext } from 'react';
import EditorServiceContext from '../../../app_contexts/EditorService';

const useEditorService = () => useContext(EditorServiceContext);

export default useEditorService;