export interface AuthLayoutProps {
    title: string;
    returnLink: string | null;
    titleDescription?: string;
    description?: string | null;
    children: React.ReactNode;
    isLoading?: boolean;
    loadingMessage?: string;
    error: string | null;
    setError: (error: any) => void;
}