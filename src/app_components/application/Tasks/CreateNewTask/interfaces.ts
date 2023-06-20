import { Language, UseMaterialAcceleration } from "../../../../app_common/interfaces/TaskProcessing";
import { ModelSize } from "../../../../app_common/interfaces/TaskProcessing";

export interface CreateNewTaskFormDataType {
    file: File;
    model_size: ModelSize
    target_translate_language: Language,
    use_material_acceleration: UseMaterialAcceleration,
}