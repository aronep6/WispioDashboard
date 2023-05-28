import { 
    IdentityProviderProps,
    IdentityProviderHandlerProps, 
} from "../../../../../app_common/Service/Authentication/IdentityProviders/interfaces";

const SingleIdentityProviderOption = ({ 
    providerName,
    providerIcon,
    providerId,
    isAvailableProvider,
    handler,
}: IdentityProviderProps & IdentityProviderHandlerProps) => {
    return isAvailableProvider ? <div 
        onClick={() => handler(providerId)}
        className="border border-gray-150 rounded-lg p-2 flex items-center flex-grow justify-center hover:bg-gray-100 cursor-pointer"
        title={`Se connecter avec ${ providerName }.`}
    >
        <div>
            { 
                providerIcon({ className: 'w-6 h-6' })
            }
        </div>
    </div> : null;
};

export default SingleIdentityProviderOption;