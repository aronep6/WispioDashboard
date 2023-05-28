import { APPLICATION_ERRORS_CODES } from "../../../Errors/application-errors-codes.enum";

import type { 
    ApplicationIdentityProviders, 
    IdentityProvidersIdentifiers
} from "./interfaces";

const checkIdentityProviderAvailability = (
    providerIdToCheck: IdentityProvidersIdentifiers,
    applicationIdentityProviders: ApplicationIdentityProviders,
): void => {
    const foundIdentityProvider = applicationIdentityProviders.find(
        provider => provider.isAvailableProvider && provider.providerId === providerIdToCheck
    );

    if (!foundIdentityProvider) throw APPLICATION_ERRORS_CODES.UNAVAILABLE_IDENTITY_PROVIDER; 
};

export default checkIdentityProviderAvailability;
