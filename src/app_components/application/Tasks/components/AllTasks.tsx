import { useMemo } from "react";
import NewTask from "./NewTask";
import type { Task } from "../../../../app_common/Service/Application/TaskService/interfaces";
import WhisperTaskStatusMapper from "../interfaces/WhisperTaskStatusMapper";
import { Fragment } from "react";
import firestoreTimestampToDate from "../../../../app_common/functions/firestore-timestamp-to-date";
import dateFromNow from "../../../../app_common/functions/date-from-now";
import { Link } from "react-router-dom";

const SingleTask = ({ task }: { task: Task }) => {

    const taskLastUpdate = useMemo(() => {
        return dateFromNow(
            firestoreTimestampToDate(task.data.lastUpdate)
        );
    }, [task.data.lastUpdate]);

    return <div
        className="bg-white border 
            cursor-pointer
            shadow-lg shadow-slate-200/40 rounded-lg 
            hover:bg-gray-50 duration-150 p-4
            flex flex-col justify-between gap-2
            "
    >
        <div>
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
                    Dernière mise à jour : {taskLastUpdate || "Jamais"}
                </li>
                <li>
                    Statut : {
                        WhisperTaskStatusMapper.get(task.data.status) || "Inconnu"
                    }
                </li>
            </ul>
        </div>
        <Link
            to={`/editor/${ task.id }`}
            title={`Ouvrir la tâche '${ task.data.configuration.source }' dans l'éditeur de transcriptions en temps réel`}
        >
            <span className="text-indigo-600 hover:text-indigo-800 duration-150 hover:underline">
                Ouvrir dans l'éditeur de transcriptions
            </span>
        </Link>
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