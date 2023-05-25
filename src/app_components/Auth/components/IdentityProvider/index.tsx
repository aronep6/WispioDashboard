import applicationIdentityProviders from "../../common/identity-providers"
import SingleIdentityProviderOption from "./SingleIdentityProviderOption"

import useAuth from "../../../../app_hooks/contexts_hooks/useAuth";
import useSnackbarService from "../../../../app_hooks/contexts_hooks/useSnackbarService";

import { IdentityProvidersIdentifiers } from "../../../../app_common/Service/Authentication/interfaces";
import { SnackbarElement, SnackbarLifeTime, SnackbarType } from "../../../../app_contexts/SnackbarService/interfaces";
import getFirebaseError from "../../../../app_common/functions/get-firebase-error";

const IdentityProviderList = () => {
    const auth = useAuth();

    const snackbarService = useSnackbarService();

    const handleIdentityProviderLogin = async (providerId: IdentityProvidersIdentifiers) => {
        try {
            await auth.loginWithIdentityProvider(providerId);
        } catch (error: any) {        
            const errorMessage = getFirebaseError(error);

            const snackbarElement: SnackbarElement = {
                title: 'Erreur de connexion avec le fournisseur d\'identité',
                duration: SnackbarLifeTime.Medium,
                message: errorMessage,
                type: SnackbarType.Danger,
            };

            return snackbarService.addSnackbarElement(snackbarElement);
        }
    };

    return <div className="justify-center gap-2 w-full grid grid-cols-3">
        {
            applicationIdentityProviders.map((provider, index) => {
                return <SingleIdentityProviderOption key={index} { ...provider } handler={ handleIdentityProviderLogin } />
            })
        }
    </div>
};

export default IdentityProviderList;