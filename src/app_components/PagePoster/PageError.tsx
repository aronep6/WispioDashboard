import { AlertTriangle } from "react-feather";
import PageGenericPoster from "./PageGenericDisplay";

const DEFAULT_ERROR_TITLE = "Une erreur est survenue";

function PageError({ title, message }: { title?: string, message?: any }) {
    return (
        <PageGenericPoster
            icon={{
                type: AlertTriangle,
                props: {
                    tailwindColor: "text-orange-600",
                },
            }}
            title={title ? title : DEFAULT_ERROR_TITLE}
            message={message}
        />
    );
};

export default PageError;