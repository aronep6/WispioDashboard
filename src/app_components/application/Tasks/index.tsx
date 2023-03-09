import { TaskServiceProvider } from "../../../app_contexts/TaskService";
import useTaskService from "../../../app_hooks/contexts_hooks/useTaskService";
import useServiceFetch from "../../../app_hooks/useServiceFetch";
import PageWrapper from "../common/PageWrapper";
import AllTasks from "./components/AllTasks";

import type { TasksList } from "../../../app_common/Service/Application/TaskService";
import { useMemo } from "react";

const pageProps = {
    pageTitle: "Tasks",
};

const Tasks = () => {
    const taskService = useTaskService();

    const { isLoading, data, error } = useServiceFetch<TasksList>(
        { method: taskService.getTasks },
    );

    const extendedTitle = useMemo(() => {
        if (isLoading) {
            return "Chargement...";
        } else if (error) {
            return "Erreur";
        } else if (data) {
            return `${data.length} tâche${data.length > 1 ? "s" : ""}`;
        }
    }, [isLoading, error, data]);

    return <PageWrapper 
        {...pageProps} 
        isLoading={isLoading} 
        error={error}
        extendedTitle={extendedTitle}
    >
        <AllTasks tasks={data || []} />
    </PageWrapper>;
}

export default function index() {
    return <TaskServiceProvider>
        <Tasks />
    </TaskServiceProvider>
};