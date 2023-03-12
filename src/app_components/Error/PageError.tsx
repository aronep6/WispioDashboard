import { AlertTriangle } from "react-feather";

function PageError({ message }: { message?: any }) {
    return (
        <div className="z-50 bg-slate-100 inter
            absolute inset-0 flex items-center justify-center min-w-screen">
            <div className="flex flex-col items-center justify-center w-full pb-8 gap-3">
                <AlertTriangle className="w-16 h-16 text-orange-600 select-none" strokeWidth={1} />
                <h1 className="text-xl font-bold text-slate-900 select-none">
                    Une erreur est survenue
                </h1>
                <p className="text-slate-600 text-center">
                    {
                        message
                    }
                </p>
            </div>
        </div>
    );
}

export default PageError;