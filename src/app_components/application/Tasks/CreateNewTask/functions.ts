import * as Yup from 'yup';
// import { dateOptionsList } from '../../working_pool';

const createNewTaskValidationSchema = Yup.object({
    options_menu_tempo_title: Yup.string()
        .required('Veuillez entrer un titre pour votre tempo')
        .min(3, 'Le titre du tempo doit contenir au moins 3 caractères')
        .max(50, 'Le titre du tempo doit contenir au plus 50 caractères'),

    options_menu_tempo_expiration_time: Yup.string()
        .required('Veuillez choisir une date d\'expiration pour votre tempo')
        // .oneOf(dateOptionsList.map((option) => option._in.toString()), 'Veuillez choisir une date d\'expiration valide parmi les options proposées')
}); 

export { createNewTaskValidationSchema };