import type { IdentityProviderHandlerProps, IdentityProviderOptionProps } from "./interfaces";

const SingleIdentityProviderOption = ({ 
    providerName,
    providerIcon,
    providerId,
    handler,
}: IdentityProviderOptionProps & IdentityProviderHandlerProps) => {
    return <div 
        onClick={() => handler(providerId)}
        className="border border-gray-150 rounded-lg p-2 flex items-center justify-center hover:bg-gray-100 cursor-pointer"
        title={`Se connecter avec ${ providerName }.`}
    >
        <div>
            { 
                providerIcon({ className: 'w-6 h-6' })
            }
        </div>
    </div>;
};

export default SingleIdentityProviderOption;