function PageLoading({ message }: { message?: string }) {
    return (
        <div className="z-50 bg-slate-100 inter
            absolute inset-0 flex items-center justify-center min-w-screen">
            <div className="flex flex-col items-center justify-center w-full pb-8">
                <h3 className="text-slate-900 text-base font-medium mb-3 grotesk">
                    {message ? message : 'Chargement des données...'}
                </h3>
                <div className="bg-gray-200 h-2 max-w-xs w-full rounded-full mb-8 relative overflow-hidden">
                    <div className="an_load_bar bg-gray-700"></div>
                </div>
            </div>
        </div>
    );
}

export default PageLoading;