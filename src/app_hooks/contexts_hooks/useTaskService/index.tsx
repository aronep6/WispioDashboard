import { useContext } from 'react';
import TaskServiceContext from '../../../app_contexts/TaskService';

const useTaskService = () => useContext(TaskServiceContext);

export default useTaskService;