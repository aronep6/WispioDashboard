import { createContext } from "react";
import TaskService from "../../app_common/Service/Application/TaskService";

const TaskServiceContext = createContext({} as TaskService);

const TaskServiceProvider = ({ children }: { children: React.ReactNode }) => {
    return <TaskServiceContext.Provider value={
        new TaskService()
    }>
        { children }
    </TaskServiceContext.Provider>;
};

export { TaskServiceProvider };
export default TaskServiceContext;