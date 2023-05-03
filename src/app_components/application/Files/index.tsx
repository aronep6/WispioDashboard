import PageWrapper from "../common/PageWrapper";
import { FilesServiceProvider } from "../../../app_contexts/FilesService";
import useFilesService from "../../../app_hooks/contexts_hooks/useFilesService";
import useServiceFetch from "../../../app_hooks/useServiceFetch";
import { ApplicationFile } from "../../../app_common/Service/Application/FilesService/interfaces";
import AllFiles from "./components/AllFiles";
import NoFiles from "./components/NoFiles";

const pageProps = {
    pageTitle: "Fichiers",
};

const Files = () => {
    const filesService = useFilesService();

    const { isLoading, data, error } = useServiceFetch<ApplicationFile[]>(
        { method: filesService.getAllFiles },
    );

    return <PageWrapper 
        {...pageProps} 
        isLoading={isLoading} 
        error={error}
    >
        {
            data ?
                <AllFiles files={data} />
                :
                <NoFiles />
        }
    </PageWrapper>;
};

export default function index() {
    return <FilesServiceProvider>
        <Files />
    </FilesServiceProvider>
};