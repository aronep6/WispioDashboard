import * as Yup from 'yup';
import { CreateNewTaskErrors } from './create-new-task.errors.enum';
import { modelSizeListReadable, readableLanguageName } from '../../../../app_common/interfaces/WispioTask';
import CreateNewTaskTestFns from './create-new-task-test-functions';
import { SUPPORTED_FORMATS } from './common/supported-formats';
import MAX_FILE_SIZE from './common/max-file-size';

const createNewTaskValidationSchema = Yup.object({
    file: Yup
        .mixed()
        .required("Veuillez sélectionner un fichier")
        .test(
            "is-valid-size",
            CreateNewTaskErrors.FileSizeTooLarge,
            (value) => CreateNewTaskTestFns.isValidSize(value as File, MAX_FILE_SIZE)
        )
        .test(
            "is-valid-type", 
            CreateNewTaskErrors.FileTypeNotSupported,
            (value) => CreateNewTaskTestFns.isValidType(value as File, SUPPORTED_FORMATS)
        ),
    model_size: Yup.string()
        .required(CreateNewTaskErrors.SelectModelSize)
        .oneOf(modelSizeListReadable.map((option) => option.value.toString()), CreateNewTaskErrors.SelectValidModelSize),

    target_translate_language: Yup.string()
        .required(CreateNewTaskErrors.SelectTargetLanguage)
        .oneOf(readableLanguageName.map((option) => option.value.toString()), CreateNewTaskErrors.SelectValidTargetLanguage),

    use_material_acceleration: Yup.boolean()
        .required(CreateNewTaskErrors.SelectMaterialAccelerationOption),
}); 

export default createNewTaskValidationSchema;