const ErrorDisplayer = ({ error }: { error: string }) => {
    return <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline">{ error }</span>
    </div>
};

export default ErrorDisplayer;