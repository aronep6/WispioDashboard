import * as Yup from 'yup';
import { modelSizeListReadable, readableLanguageName } from '../../../../app_common/interfaces/WispioTask';

const createNewTaskValidationSchema = Yup.object({
    model_size: Yup.string()
        .required('Veuillez choisir une taille de modèle')
        .oneOf(modelSizeListReadable.map((option) => option.value.toString()), 'Veuillez choisir une taille de modèle valide parmi les options proposées'),

    target_translate_language: Yup.string()
        .required('Veuillez choisir une langue de traduction cible')
        .oneOf(readableLanguageName.map((option) => option.value.toString()), 'Veuillez choisir une langue de traduction cible valide parmi les options proposées'),

    use_material_acceleration: Yup.boolean()
        .required('Veuillez choisir une option pour l\'accélération matérielle'),
}); 

export { createNewTaskValidationSchema };