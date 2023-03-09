export interface PageWrapperProps {
    pageTitle: string;
    children: React.ReactNode;
    isLoading?: boolean;
    error?: string | null | undefined | Error;
    extendedTitle?: string | undefined;
}