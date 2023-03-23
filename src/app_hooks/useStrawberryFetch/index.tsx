import { useState, useEffect, useCallback } from 'react';
import type {
    IsLoadingType, 
    DataType,
    ErrorType,
    CustomHookReturn,
    StrawberryFetchProps,
} from '../interfaces';

function useStrawberryFetch<MethodResponseDTO>({
    method,
    payload = undefined,
    defaultLoadingStatus = true,
    doCheckBeforeFetch = () => true,
}: StrawberryFetchProps<MethodResponseDTO>): CustomHookReturn<MethodResponseDTO> {    
    const [isLoading, setIsLoading] = useState<IsLoadingType>(defaultLoadingStatus);
    const [data, setData] = useState<DataType | MethodResponseDTO>(undefined);
    const [error, setError] = useState<ErrorType>(null);

    const fetch: () => Promise<void> = useCallback(async () => {
        setIsLoading(true);
        try {
            if (!doCheckBeforeFetch()) throw new Error("Check before fetch failed");

            const { 
                success, 
                data, 
                error,
            } = await method(payload && payload);
            
            if (!success || error) {
                throw error;
            }

            setData(data);
        } catch (error: any) {
            const _err = 
                error?.message ?
                    error.message :
                    "Une erreur inconnue s'est produite, vérifiez votre connexion internet et réessayez.";
            setError(_err);
        } finally {
            setIsLoading(false);
        }
    }, [method, payload, doCheckBeforeFetch]);

    useEffect(() => {
        fetch();
    }, []);

    return { isLoading, data, error }
};

export default useStrawberryFetch;