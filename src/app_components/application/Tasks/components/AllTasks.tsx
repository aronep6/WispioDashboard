import { useMemo } from "react";
import NewTask from "./NewTask";
import type { Task } from "../../../../app_common/Service/Application/TaskService";
import WhisperTaskStatusMapper from "../interfaces/WhisperTaskStatusMapper";
import { Fragment } from "react";
import firestoreTimestampToDate from "../../../../app_common/functions/firestore-timestamp-to-date";
import dateFromNow from "../../../../app_common/functions/date-from-now";

const SingleTask = ({ task }: { task: Task }) => {

    const taskLastUpdate = useMemo(() => {
        return dateFromNow(
            firestoreTimestampToDate(task.data.lastUpdate)
        );
    }, [task.data.lastUpdate]);

    return <div className="bg-white border 
    cursor-pointer
    shadow-lg shadow-slate-200/40 rounded-lg 
    hover:bg-gray-100 hover:border-blue-600 duration-150 p-4">
        <h1 className="text-lg font-bold text-slate-900">
            {
                task.data.configuration.source
            }
        </h1>
        <ul className="text-slate-600">
            <li>
                Langue : {
                    task.data.configuration.language
                }
            </li>
            {
                task.data.configuration.translation.translate && <li>
                    Traduction : {
                        task.data.configuration.translation.translateToLanguage
                    }
                </li>
            }
            <li>
                Dernière mise à jour : { taskLastUpdate || "Jamais" }
            </li>
            <li>
                Statut : {
                    WhisperTaskStatusMapper.get(task.data.status) || "Inconnu"
                }
            </li>
        </ul>
    </div>
};

const AllTasks = ({ tasks }: { tasks: Task[] }) => {    
    return <Fragment>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <NewTask />
            {
                tasks.map((task, index) => <SingleTask key={index} task={task} />)
            }
        </div>
    </Fragment>
};

export default AllTasks;