import { 
    APP_ERROR_CODE_PREFIX,
    APPLICATION_ERRORS_CODES,
} from "./application-errors-codes.enum";

const getApplicationErrorMessage = (error: any): string => {
    const e = error?.message?.toLowerCase() || '';

    if (e.includes(APP_ERROR_CODE_PREFIX)) {
        if (e.includes(APPLICATION_ERRORS_CODES.UNAVAILABLE_IDENTITY_PROVIDER))
            return `Le fournisseur d'identité demandé n'est pas disponible sur ${ import.meta.env.VITE_APPLICATION_NAME } !`
    }

    if (e === '') return 'Une erreur inconnue est survenue, veuillez réessayer ultérieurement.';
    if (e.includes('auth/popup-closed-by-user')) return 'Vous avez fermé la fenêtre de connexion, veuillez réessayer.';
    if (e.includes('auth/internal-error')) return 'Une erreur interne est survenue, veuillez réessayer';
    if (e.includes('auth/user-not-found')) return 'L\'utilisateur n\'existe pas dans nos fichiers';
    if (e.includes('auth/wrong-password')) return 'L\'email ou le mot de passe est incorrect, veuillez réessayer';
    if (e.includes('auth/user-disabled')) return 'Ce compte à été désactivé, veuillez contacter le support technique';
    if (e.includes('auth/invalid-email')) return 'L\'adresse email est invalide ou mal formatée';
    if (e.includes('auth/email-already-in-use')) return 'L\'adresse email est déjà utilisée par un autre compte';
    if (e.includes('auth/weak-password')) return 'Le mot de passe est jugé trop vulnérable, veuillez réessayer';
    if (e.includes('auth/requires-recent-login')) return 'Cette action requiert une authentification récente, veuillez vous reconnecter et réessayer';
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
    if (e.includes('auth/unauthorized-domain')) return 'Le domaine depuis lequel vous tentez de vous connecter n\'est pas autorisé';
    return 'Une erreur inconnue est survenue, veuillez réessayer ultérieurement.';
};

const computeApplicationErrorCode = () => {

};

export default getApplicationErrorMessage;