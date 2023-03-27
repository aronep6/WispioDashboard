import { AlertTriangle } from "react-feather";

const ErrorDisplayer = ({ message }: { message?: string }) => {
    return <div className="bg-red-50 border-red-300 text-red-700 px-5 py-3.5 m-0.5 max-w-max rounded-lg gap-2 relative flex flex-row" role="alert">
        <AlertTriangle className="w-6 h-6 mr-2 shrink-0" strokeWidth={1.5} />
        <span className="block sm:inline">
            { message ? message : "Une erreur est survenue, veuillez réessayer." }
        </span>
    </div>
};

export default ErrorDisplayer;