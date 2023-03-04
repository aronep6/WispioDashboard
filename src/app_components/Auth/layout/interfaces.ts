export interface AuthLayoutProps {
    title: string;
    returnLink?: string;
    description?: string | null;
    children: React.ReactNode;
    isLoading?: boolean;
    loadingMessage?: string;
    error?: any;
    setError: (error: any) => void;
}