import * as Yup from 'yup';

const updatePasswordSchema = Yup.object({
    password_update: Yup.string().required('Veuillez entrer un mot de passe')
        .min(6, 'Votre mot de passe doit contenir au moins 6 caractères')
        .max(50, 'Votre mot de passe doit contenir au plus 50 caractères')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/, 'Votre mot de passe doit contenir au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial'),
    password_update_retype: Yup.string().required('Veuillez confirmer votre mot de passe')
        .oneOf([Yup.ref('password_update'), "string"], 'Les mots de passe ne correspondent pas')
});

export { updatePasswordSchema };