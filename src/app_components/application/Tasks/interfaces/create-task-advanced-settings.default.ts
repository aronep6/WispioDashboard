import type { CreateNewTaskFormDataType } from "../CreateNewTask/interfaces";
import {
  Language,
  ModelSize,
  UseMaterialAcceleration,
} from "../../../../app_common/interfaces/TaskProcessing";

const USE_MATERIAL_ACCELERATION: UseMaterialAcceleration = false;

const createNewTaskAdvancedSettingsDefaultConfig: Omit<
  CreateNewTaskFormDataType,
  "file"
> = {
  model_size: ModelSize.Base,
  target_translate_language: Language.English,
  use_material_acceleration: USE_MATERIAL_ACCELERATION,
};

export default createNewTaskAdvancedSettingsDefaultConfig;
