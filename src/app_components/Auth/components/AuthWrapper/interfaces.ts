export interface AuthLayoutProps {
    title: string;
    returnLink?: string;
    titleDescription?: string;
    description?: string | null;
    children: React.ReactNode;
    isLoading?: boolean;
    extendedNode?: React.ReactNode;
    loadingMessage?: string;
    error: AuthFlowErrorPayload;
    setError: (error: any) => void;
}

export interface AuthFlowErrorPayload {
    isError: boolean,
    title?: string,
    message: string
}