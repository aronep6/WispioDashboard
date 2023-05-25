import * as Yup from 'yup';

const signUpValidationSchemaFirstStep = Yup.object({
        signup_form_first_name: Yup.string()
                .required('Veuillez entrer votre prénom')
                .min(3, 'Le champs doit contenir au moins 2 caractères')
                .max(50, 'Le champs doit contenir au plus 50 caractères'),
        signup_form_last_name: Yup.string()
                .required('Veuillez entrer votre nom')
                .min(3, 'Le champs doit contenir au moins 2 caractères')
                .max(50, 'Le champs  doit contenir au plus 50 caractères'),
        signup_form_email: Yup.string().required("L'adresse email est requise pour pouvoir vous connecter")
                .email("Le format de l'adresse email est invalide"),
        signup_form_password: Yup.string().required('Veuillez entrer un mot de passe')
                .min(6, 'Votre mot de passe doit contenir au moins 6 caractères')
                .max(50, 'Votre mot de passe doit contenir au plus 50 caractères')
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/, 'Votre mot de passe doit contenir au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial'),
        signup_form_password_confirmation: Yup.string().required('Veuillez confirmer votre mot de passe')
                .oneOf([Yup.ref('signup_form_password'), "string"], 'Les mots de passe ne correspondent pas')
});

const checkUpValidationSchema = Yup.object({
        signup_form_verification_code: Yup.string().required('Veuillez entrer le code de vérification reçu par email')
                .min(6, 'Le code de vérification doit contenir au moins 6 caractères')
                .max(6, 'Le code de vérification doit contenir au plus 6 caractères')
});

const forgotPasswordValidationSchema = Yup.object({
        forgot_password_form_email: Yup.string().required("L'adresse email est requise pour pouvoir vous connecter")
                .email("L'adresse email doit être au format valide"),
});

export { signUpValidationSchemaFirstStep, checkUpValidationSchema, forgotPasswordValidationSchema };