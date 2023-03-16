import { useState, useEffect } from 'react';
import { onSnapshot } from 'firebase/firestore';
import type {
    IsLoadingType, 
    DataType,
    ErrorType,
    CustomHookReturn,
    ServiceSubscribeProps,
} from '../interfaces';

function useServiceSubscribe<MethodResponseDTO>({
    subscribeRef,
    doCheckBeforeFetch = () => true,
    pingOnSnapshot = undefined,
}: ServiceSubscribeProps<MethodResponseDTO>): CustomHookReturn<MethodResponseDTO> {    
    const [isLoading, setIsLoading] = useState<IsLoadingType>(true);
    const [data, setData] = useState<DataType | MethodResponseDTO>(undefined);
    const [error, setError] = useState<ErrorType>(null);

    useEffect(() => {
        if (!doCheckBeforeFetch()) {
            setError("Check before fetch failed");
            return;
        }

        const unsubscribe = onSnapshot(
            subscribeRef,
            (snapshot) => {
                const data = snapshot.data() as MethodResponseDTO;
                setData(data);
                if (pingOnSnapshot) {
                    pingOnSnapshot();
                }
                setIsLoading(false);
            },
            (error: any) => {
                setError(error);
                setIsLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    return { isLoading, data, error }
};

export default useServiceSubscribe;