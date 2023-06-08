import * as Yup from 'yup';
import { CreateNewTaskErrors } from './create-new-task.errors.enum';
import { modelSizeListReadable, readableLanguageName } from '../../../../app_common/interfaces/WispioTask';

interface AbscractFileProperties {
    size: number;
    type: string;
}

const MAX_FILE_SIZE = 800 * 1024 * 1024; // ~800 MB

const SUPPORTED_FORMATS = [
    "audio/mpeg",
    "audio/wav",
    "audio/ogg",
    "audio/mp4",
    "audio/aac",
    "audio/flac",
    "audio/x-flac",
];  

const createNewTaskValidationSchema = Yup.object({
    file: Yup.mixed()
        .required("")
        .test("fileSize", CreateNewTaskErrors.FileSizeTooLarge, (value) => {
            const _file_ = value as AbscractFileProperties[];
            return value && _file_[0].size >= MAX_FILE_SIZE;
        })
        .test("fileType", CreateNewTaskErrors.FileTypeNotSupported, (value) => {
            const _file_ = value as AbscractFileProperties[];
            return value && SUPPORTED_FORMATS.includes(_file_[0].type);
        }),
    // TODO : Improve the typing of the file property
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