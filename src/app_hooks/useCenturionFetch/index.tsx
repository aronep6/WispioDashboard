import { useState, useEffect, useCallback } from 'react';
import type {
    IsLoadingType, 
    DataType,
    ErrorType,
    CustomHookReturn,
    CenturionFetchProps,
} from '../interfaces';
import CenturionBackendService from '../../app_common/Service/CenturionBackend';

function useCenturionFetch<MethodResponseDTO>({
    endpoint,
    payload = undefined,
    defaultLoadingStatus = true,
    doCheckBeforeFetch = () => true,
}: CenturionFetchProps): CustomHookReturn<MethodResponseDTO> {    
    const [isLoading, setIsLoading] = useState<IsLoadingType>(defaultLoadingStatus);
    const [data, setData] = useState<DataType | MethodResponseDTO>(undefined);
    const [error, setError] = useState<ErrorType>(null);

    const centurion = new CenturionBackendService();

    const fetch: () => Promise<void> = useCallback(async () => {
        setIsLoading(true);
        try {
            if (!doCheckBeforeFetch()) throw new Error("Check before fetch failed");

            // const token = await centurion.getFirebaseToken();

            // console.log("useCenturionFetch : token", token);

            // const { 
            //     success, 
            //     data, 
            //     error,
            // } = await method(payload && payload);
            
            // if (!success || error) {
            //     throw error;
            // }

            // setData(data);
        } catch (error: any) {
            const _err = 
                error?.message ?
                    error.message :
                    "Une erreur inconnue s'est produite, vérifiez votre connexion internet et réessayez.";
            setError(_err);
        } finally {
            setIsLoading(false);
        }
    }, [endpoint, payload, doCheckBeforeFetch]);

    useEffect(() => {
        fetch();
    }, []);

    return { isLoading, data, error }
};

export default useCenturionFetch;