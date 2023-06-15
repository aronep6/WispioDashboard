import type { CreateNewTaskFormDataType } from "../CreateNewTask/interfaces";
import { Language, ModelSize } from "../../../../app_common/interfaces/WispioTask";

const USE_MATERIAL_ACCELERATION = false;

const createNewTaskAdvancedSettingsDefaultConfig: Partial<CreateNewTaskFormDataType> = {
    model_size: ModelSize.Base,
    target_translate_language: Language.English,
    use_material_acceleration: USE_MATERIAL_ACCELERATION,
}

export default createNewTaskAdvancedSettingsDefaultConfig;