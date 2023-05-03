import PageWrapper from "../common/PageWrapper";
import { FilesServiceProvider } from "../../../app_contexts/FilesService";
import useFilesService from "../../../app_hooks/contexts_hooks/useFilesService";
import useServiceFetch from "../../../app_hooks/useServiceFetch";
import { ApplicationFile } from "../../../app_common/Service/Application/FilesService/interfaces";
import AllFiles from "./components/AllFiles";
import NoFiles from "./components/NoFiles";
import useSearchController from "../../../app_hooks/useSearchController";
import ControlledSearchBar from "../../../app_atomic/Searchbar";

const pageProps = {
    pageTitle: "Fichiers",
};

const Files = () => {
    const filesService = useFilesService();

    const { isLoading, data, error } = useServiceFetch<ApplicationFile[]>(
        { method: filesService.getAllFiles },
    );

    const searchController = useSearchController<ApplicationFile>({
        searchFn: filesService.searchFiles,
        debounceTime: 500,
        allowSearch: true,
        isDisabled: false,
    });

    return <PageWrapper 
        {...pageProps} 
        isLoading={isLoading} 
        error={error}
    >
        <ControlledSearchBar
            placeholder="Rechercher un fichier"
            searchController={searchController}
        />
        {
            JSON.stringify(searchController.results)
        }
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