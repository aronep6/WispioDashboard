export type IsLoadingType = boolean;
export type DataType = undefined;
export type ErrorType = null | string | Error;

export interface CustomHookReturn<T> {
    isLoading: IsLoadingType,
    data: DataType | T,
    error: ErrorType,
}

export interface CommonResponseDTO<T> {
    success: boolean,
    data: T,
    error: string | Error | null,
}

export interface ServiceFetchProps<T> {
    method: (payload?: any) => Promise<CommonResponseDTO<T>>,
    payload?: any | undefined,
    defaultLoadingStatus?: boolean
    doCheckBeforeFetch?: () => boolean
}