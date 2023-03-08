import { TaskServiceProvider } from "../../../app_contexts/TaskService";
import useTaskService from "../../../app_hooks/contexts_hooks/useTaskService";
import useServiceFetch from "../../../app_hooks/useServiceFetch";
import PageWrapper from "../common/PageWrapper";
import NewTask from "./components/NewTask";

import type { TasksList } from "../../../app_common/Service/Application/TaskService";

const pageProps = {
    pageTitle: "Tasks",
};

const AllTasks = () => {
    return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <NewTask />
    </div>;
};

const Tasks = () => {
    const taskService = useTaskService();

    const { isLoading, data, error } = useServiceFetch<TasksList>(
        { method: taskService.getTasks },
    );

    return <PageWrapper {...pageProps} isLoading={isLoading}>
        <AllTasks />
        {
            JSON.stringify(data)
        }
    </PageWrapper>;
}

export default function index() {
    return <TaskServiceProvider>
        <Tasks />
    </TaskServiceProvider>
};