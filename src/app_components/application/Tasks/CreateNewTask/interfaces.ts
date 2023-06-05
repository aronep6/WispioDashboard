import { Language } from "../../../../app_common/interfaces/WispioTask";
import { ModelSize } from "../../../../app_common/interfaces/WispioTask";

export interface CreateNewTaskFormDataType {
    model_size: ModelSize
    target_translate_language: Language,
    use_material_acceleration: boolean,
}