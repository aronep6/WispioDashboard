const getFirebaseError = (error: any): string => {
    const e = error?.message?.toLowerCase() || '';
    if (e.includes('auth/requires-recent-login')) return 'La modification du mot de passe requiert une authentification récente. Reconnectez-vous et réessayez.';
    return 'Une erreur inconnue est survenue, veuillez réessayer ultérieurement.';
};

export default getFirebaseError;