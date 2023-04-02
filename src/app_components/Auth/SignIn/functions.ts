import type AuthenticationInterface from "../../../app_common/Service/Authentication";
import { AppRoutes } from "../../../app_common/interfaces/AppRoutes";

const removeRedirectUrlFromQuery = async (): Promise<void> => {
    const url = new URL(window.location.href);
    url.searchParams.delete('redirectUrl');
    window.history.replaceState({}, document.title, url.toString());
};

const checkBeforeLoginRedirection = async (
    auth: AuthenticationInterface
): Promise<void> => {

    // -- Checking the current billing status of the user

    const billingIsActive = await auth.checkBillingStatus();

    if (!billingIsActive) {
        await removeRedirectUrlFromQuery();
        window.location.href = AppRoutes.BillingService;
        return;
    }

    // Do other checks here ...
    
    await auth.sleep(5000 * 5000 * 5000);

    // const checkForRegistrationRedirection = async (uid: string) => {
    //     try {
    //         const { claims } = await service.getCustomClaims();

    //         if (!claims) throw 'No custom claims found for this user';
    //         // Check if the user need to add professional email
    //         const params = new URLSearchParams(window.location.search);

    //         const flow = params.get('flow');

    //         if (flow === 'addProfessionnalEmail' && claims.userIsReadyToUse) {
    //             return navigate('/services/emails/create');
    //         }
    //         if (claims.userIsReadyToUse) return navigate('/app/dashboard');
    //         throw 'User is not ready to use';
    //     } catch (err) {
    //         inDev && console.log("Une erreur est survenue lors de la vérification de l'utilisateur connecté : ", err);
    //         // Redirect to the registration page
    //         navigate(`/auth/checkup?id=${uid}&isImperative=true&fallback=default&flow=default`);
    //         return;
    //     }
    // };
};

export default checkBeforeLoginRedirection;