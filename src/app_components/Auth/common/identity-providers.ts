import type { IdentityProviderOptionProps } from "../components/IdentityProvider/SingleIdentityProviderOption/interfaces";
import { IdentityProvidersIdentifiers } from "../../../app_common/Service/Authentication/interfaces";
import Google from "../../../assets/identity_provider/Google.svg";
import Github from "../../../assets/identity_provider/Github.svg";
import Microsoft from "../../../assets/identity_provider/Microsoft.svg";

const applicationIdentityProviders: IdentityProviderOptionProps[] = [
    {
        providerName: 'Google',
        providerIcon: Google,
        providerId: IdentityProvidersIdentifiers.GOOGLE,
    }, {
        providerName: 'Microsoft',
        providerIcon: Microsoft,
        providerId: IdentityProvidersIdentifiers.MICROSOFT,
    }, {
        providerName: 'GitHub',
        providerIcon: Github,
        providerId: IdentityProvidersIdentifiers.GITHUB,
    }
];

export default applicationIdentityProviders;