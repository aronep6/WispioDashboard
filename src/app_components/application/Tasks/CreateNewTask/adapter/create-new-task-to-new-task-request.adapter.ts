import { NewTaskRequest } from "../../../../../app_common/Service/Application/TaskService/interfaces";
import { CreateNewTaskFormDataType } from "../interfaces";

const createNewTaskToNewTaskRequestAdapter = (
    createNewTaskFormValues: CreateNewTaskFormDataType
): NewTaskRequest => {
    const { 
        file, 
        model_size,
        target_translate_language,
        use_material_acceleration
    } = createNewTaskFormValues;

    const newTaskRequest: NewTaskRequest = {
        file: file,
        configuration: {
            model: model_size,
            translation: {
                translate: true,
                translateToLanguage: target_translate_language
            }
        },
        useMaterialAcceleration: use_material_acceleration
    };
    
    return newTaskRequest
};

export default createNewTaskToNewTaskRequestAdapter;