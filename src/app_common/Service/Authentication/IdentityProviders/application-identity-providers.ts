import { 
    ApplicationIdentityProviders,
    IdentityProvidersIdentifiers
} from "./interfaces";

import Google from "../../../../assets/identity_provider/Google.svg";
import Github from "../../../../assets/identity_provider/Github.svg";
import Twitter from "../../../../assets/identity_provider/Twitter.svg";
// import Apple from "../../../../assets/identity_provider/Apple.svg";
// import Microsoft from "../../../../assets/identity_provider/Microsoft.svg";

const applicationIdentityProviders: ApplicationIdentityProviders = [
    {
        providerName: 'Google',
        providerIcon: Google,
        providerId: IdentityProvidersIdentifiers.GOOGLE,
        isAvailableProvider: true,
    },
    {
        providerName: 'Twitter',
        providerIcon: Twitter,
        providerId: IdentityProvidersIdentifiers.TWITTER,
        isAvailableProvider: true,
    },
    {
        providerName: 'GitHub',
        providerIcon: Github,
        providerId: IdentityProvidersIdentifiers.GITHUB,
        isAvailableProvider: true,
    }
    // {
    //     providerName: 'Apple',
    //     providerIcon: Apple,
    //     providerId: IdentityProvidersIdentifiers.APPLE,
    //     isAvailableProvider: false,
    // },
    // {
    //     providerName: 'Microsoft',
    //     providerIcon: Microsoft,
    //     providerId: IdentityProvidersIdentifiers.MICROSOFT,
    //     isAvailableProvider: true,
    // },
];

export default applicationIdentityProviders;