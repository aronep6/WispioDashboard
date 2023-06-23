import type { DocumentData, DocumentReference } from 'firebase/firestore';
import type { CommonResponseDTO } from '../app_common/Service/Core/interfaces';
import { CenturionAccessibleEndpoint } from '../app_common/Service/CenturionBackend/interfaces';

export type IsLoadingType = boolean;
export type DataType = undefined;
export type ErrorType = null | string | Error;

export interface CustomHookReturn<T> {
    isLoading: IsLoadingType,
    data: DataType | T,
    error: ErrorType,
}

export interface ServiceFetchProps<T> {
    method: (payload?: any) => Promise<CommonResponseDTO<T>>,
    payload?: any | undefined,
    defaultLoadingStatus?: boolean
    doCheckBeforeFetch?: () => boolean
}

export interface CenturionFetchProps {
    endpoint: CenturionAccessibleEndpoint,
    payload?: any | undefined,
    defaultLoadingStatus?: boolean
    doCheckBeforeFetch?: () => boolean
}

export interface StrawberryFetchProps<T> {
    method: (payload?: any) => Promise<T>,
    payload?: any | undefined,
    defaultLoadingStatus?: boolean
    doCheckBeforeFetch?: () => boolean
}

export interface ServiceSubscribeProps<T> {
    subscribeRef: DocumentReference<DocumentData>,
    doCheckBeforeFetch?: () => boolean
    pingOnSnapshot?: () => void
}