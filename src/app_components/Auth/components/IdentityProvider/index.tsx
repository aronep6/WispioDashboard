import applicationIdentityProviders from "../../../../app_common/Service/Authentication/IdentityProviders/application-identity-providers"
import SingleIdentityProviderOption from "./SingleIdentityProviderOption"

import useAuth from "../../../../app_hooks/contexts_hooks/useAuth";
import useSnackbarService from "../../../../app_hooks/contexts_hooks/useSnackbarService";

import { IdentityProvidersIdentifiers } from "../../../../app_common/Service/Authentication/IdentityProviders/interfaces";
import { SnackbarElement, SnackbarLifeTime, SnackbarType } from "../../../../app_contexts/SnackbarService/interfaces";
import getApplicationErrorMessage from "../../../../app_common/Errors/get-application-error";

const IdentityProviderList = () => {
    const auth = useAuth();

    const snackbarService = useSnackbarService();

    const handleIdentityProviderLogin = async (providerId: IdentityProvidersIdentifiers) => {
        try {
            await auth.loginWithIdentityProvider(providerId);
        } catch (error: any) {
            const errorMessage = getApplicationErrorMessage(error);

            const snackbarElement: SnackbarElement = {
                title: 'Erreur de connexion avec le fournisseur d\'identité',
                duration: SnackbarLifeTime.Medium,
                message: errorMessage,
                type: SnackbarType.Danger,
            };

            return snackbarService.addSnackbarElement(snackbarElement);
        }
    };

    return <div className="flex flex-row justify-center gap-1.5 w-full">
        {
            applicationIdentityProviders.map((provider, index) => {
                return <SingleIdentityProviderOption key={index} { ...provider } handler={ handleIdentityProviderLogin } />
            })
        }
    </div>
};

export default IdentityProviderList;