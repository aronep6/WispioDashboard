const getFirebaseError = (e: string): string => {
    if (e.includes('auth/requires-recent-login')) return 'La modification du mot de passe requiert une authentification récente. Reconnectez-vous et réessayez.';
    return 'Une erreur inconnue est survenue';
};

export default getFirebaseError;