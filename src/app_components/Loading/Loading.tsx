import _logo_ from "../../assets/wispio_logo.webp";
import LoadingSpinner from "../common/components/LoadingSpinner";

function Loading({ message, showLoader = true }: { message?: string, showLoader?: boolean }) {
    return (
        <div className="z-30 bg-gray-900 inter
            fixed inset-0 flex items-center justify-center min-h-screen min-w-screen">
            <div className="flex flex-col items-center justify-center w-full">
                <img src={_logo_} alt="Wispio AI Platform" className="w-12 h-12 rounded mb-4" />
                <h3 className="text-white text-lg font-medium mb-3 grotesk">
                    {message ? message : 'Wispio AI Platform'}
                </h3>
                {
                    showLoader && <LoadingSpinner />
                }
            </div>
        </div>
    );
}

export default Loading;