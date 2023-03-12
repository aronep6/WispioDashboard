import { useContext } from 'react';
import EditorContext from '../../../app_contexts/Editor';

const useEditor = () => useContext(EditorContext);

export default useEditor;