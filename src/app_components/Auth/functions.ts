import * as Yup from 'yup';

const getErrors = (_err: Error | unknown) => {
        const e = `${_err}`;
        if (e.includes('auth/popup-closed-by-user')) return 'Vous avez fermé la fenêtre de connexion, veuillez réessayer.';
        if (e.includes('auth/internal-error')) return 'Une erreur interne est survenue, veuillez réessayer';
        if (e.includes('auth/user-not-found')) return 'L\'utilisateur n\'existe pas dans nos fichiers';
        if (e.includes('auth/wrong-password')) return 'L\'email ou le mot de passe est incorrect, veuillez réessayer';
        if (e.includes('auth/user-disabled')) return 'Ce compte à été désactivé, veuillez contacter le support technique';
        if (e.includes('auth/invalid-email')) return 'L\'adresse email est invalide ou mal formatée';
        if (e.includes('auth/email-already-in-use')) return 'L\'adresse email est déjà utilisée par un autre compte';
        if (e.includes('auth/weak-password')) return 'Le mot de passe est jugé trop vulnérable, veuillez réessayer';
        if (e.includes('auth/requires-recent-login')) return 'Session expirée, veuillez vous reconnecter pour continuer';
        if (e.includes('auth/user-mismatch')) return 'L\'utilisateur ne correspond pas, veuillez vous reconnecter';
        if (e.includes('auth/provider-already-linked')) return 'Cet identifiant est déjà lié à un autre compte';
        if (e.includes('auth/credential-already-in-use')) return 'Cette identifiant est déjà utilisé';
        if (e.includes('auth/operation-not-allowed')) return 'L\'opération demandée n\'est pas autorisée';
        if (e.includes('auth/invalid-credential')) return 'Les informations d\'identification fournies sont incorrectes';
        if (e.includes('auth/invalid-verification-code')) return 'Le code de vérification est invalide ou a expiré';
        if (e.includes('auth/invalid-verification-id')) return 'L\'ID de vérification est invalide ou a expiré';
        if (e.includes('auth/expired-action-code')) return 'Le code d\'action à expiré';
        if (e.includes('auth/missing-email')) return 'L\'adresse email est nécessaire pour vous connecter';
        if (e.includes('auth/network-request-failed')) return 'On dirait que vous n\'êtes pas connecté à internet, vérifiez votre connexion et réessayez';
        return "Une erreur s'est produite, veuillez réessayer";
};

const signUpValidationSchemaFirstStep = Yup.object({
        signup_form_displayname: Yup.string()
                .required('Veuillez entrer votre nom et prénom')
                .min(3, 'Votre nom et prénom doit contenir au moins 3 caractères')
                .max(50, 'Votre nom et prénom doit contenir au plus 50 caractères'),
        signup_form_email: Yup.string().required("L'adresse email est requise pour pouvoir vous connecter")
                .email("L'adresse email doit être au format valide"),
        signup_form_password: Yup.string().required('Veuillez entrer un mot de passe')
                .min(6, 'Votre mot de passe doit contenir au moins 6 caractères')
                .max(50, 'Votre mot de passe doit contenir au plus 50 caractères')
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/, 'Votre mot de passe doit contenir au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial'),
});

const checkUpValidationSchema = Yup.object({
        signup_form_verification_code: Yup.string().required('Veuillez entrer le code de vérification reçu par email')
                .min(6, 'Le code de vérification doit contenir au moins 6 caractères')
                .max(6, 'Le code de vérification doit contenir au plus 6 caractères')
});

const signInValidationSchema = Yup.object({
        signin_form_email: Yup.string().required("L'adresse email est requise pour pouvoir vous connecter")
                .email("L'adresse email doit être au format valide"),
        signin_form_password: Yup.string().required("Le mot de passe est requis pour pouvoir vous connecter")
                .min(6, "Le mot de passe doit contenir au moins 6 caractères")
                .max(50, "Le mot de passe doit contenir au maximum 50 caractères"),
});

const forgotPasswordValidationSchema = Yup.object({
        forgot_password_form_email: Yup.string().required("L'adresse email est requise pour pouvoir vous connecter")
                .email("L'adresse email doit être au format valide"),
});

export { getErrors, signInValidationSchema, signUpValidationSchemaFirstStep, 
        checkUpValidationSchema, forgotPasswordValidationSchema };