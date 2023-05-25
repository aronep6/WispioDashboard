import type { SVGProps } from 'react';
import type { IdentityProvidersIdentifiers } from '../../../../../app_common/Service/Authentication/interfaces';

export interface IdentityProviderOptionProps {
    providerName: string;
    providerIcon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
    providerId: IdentityProvidersIdentifiers;
};

export interface IdentityProviderHandlerProps {
    handler: (providerId: IdentityProvidersIdentifiers) => Promise<void>;
};