// import _logo_ from "../../assets/blinks_logo.webp";

function Loading({ message }: { message?: string }) {
    return (
        <div className="
            z-50 bg-gray-900 inter
            fixed inset-0 flex items-center justify-center min-h-screen min-w-screen">
            <div className="flex flex-col items-center justify-center w-full">
                <span className="text-white text-2xl font-bold mb-5 grotesk">Wispio AI Platform</span>
                { !!message && <h3 className="text-white text-lg font-medium mb-3 grotesk">{ message }</h3> }
                <div className="bg-gray-700 h-2.5 max-w-xs w-full rounded-full mb-8 relative overflow-hidden">
                    <div className="an_load_bar"></div>
                </div>
            </div>
        </div>
    );
}

export default Loading;