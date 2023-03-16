import * as Yup from 'yup';

const editOutputSchema = Yup.object({
    from_timestamp: Yup.number()
        .required('Veuillez entrer une valeur')
        .min(0, 'La valeur doit être supérieure ou égale à 0'),
    to_timestamp: Yup.number()
        .required('Veuillez entrer une valeur')
        .min(0, 'La valeur doit être supérieure ou égale à 0'),
    output_transcription: Yup.string()
        .required('Veuillez entrer une transcription valide pour cette sortie')
        .min(1, 'La transcription doit contenir au moins 1 caractère')
        .max(550, 'La transcription doit contenir au plus 550 caractères'),
});

export { editOutputSchema };