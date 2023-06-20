import Core from "../../Core";
import type { TasksList, NewTaskRequest } from "./interfaces";
import { UserAccessibleCollection } from "../../Core/interfaces";
class TaskService extends Core {
    constructor() {
        super();
    };

    getTasks = async () => {
        try {
            const tasks = await this.getMultipleDocuments(UserAccessibleCollection.Tasks) as TasksList;
            return {
                success: true,
                data: tasks,
                error: null,
            };
        } catch (error) {
            throw error;
        }
    }

    async registerNewTaskToProcess(newTask: NewTaskRequest): Promise<void> {
        console.log('newTask', newTask)
        // throw new Error("Error while ")
    }
}

export default TaskService;