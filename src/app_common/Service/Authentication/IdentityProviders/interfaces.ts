import type { SVGProps } from 'react';

export enum IdentityProvidersIdentifiers {
    GOOGLE = 'google',
    GITHUB = 'github',
    MICROSOFT = 'microsoft',
    APPLE = 'apple',
    TWITTER = 'twitter',
};

export interface IdentityProvider {
    providerName: string;
    providerId: IdentityProvidersIdentifiers;
    isAvailableProvider: boolean;
}

export type IdentityProviderProps = IdentityProvider & {
    providerIcon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
};

export interface IdentityProviderHandlerProps {
    handler: (providerId: IdentityProvidersIdentifiers) => Promise<void>;
};

export type ApplicationIdentityProviders = IdentityProviderProps[];
