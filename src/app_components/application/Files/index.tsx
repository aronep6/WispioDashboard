import { useEffect, useMemo, useRef } from "react";
import PageWrapper from "../common/PageWrapper";
import { FilesServiceProvider } from "../../../app_contexts/FilesService";
import useFilesService from "../../../app_hooks/contexts_hooks/useFilesService";
import useServiceFetch from "../../../app_hooks/useServiceFetch";
import { ApplicationFile } from "../../../app_common/Service/Application/FilesService/interfaces";
import NoFiles from "./components/NoFiles";
import useSearchController from "../../../app_hooks/useSearchController";
import ControlledSearchBar from "../../../app_atomic/Searchbar";
import NoSearchResult from "../common/EmptyStates/NoSearchResult";
import GroupedFiles from "./components/GroupedFiles";

const pageProps = {
    pageTitle: "Fichiers",
};

const Files = () => {
    const filesService = useFilesService();

    const searchBarRef = useRef<HTMLInputElement>(null);

    const { isLoading, data, error } = useServiceFetch<ApplicationFile[]>(
        { method: filesService.getAllFiles },
    );

    const searchController = useSearchController<ApplicationFile>({
        searchFn: filesService.searchFiles,
        debounceTime: 500,
        isDisabled: false,
    });

    const { queryIsEmpty, results, resultsCount, hasResults, query } = searchController;

    const computedExtendedTitle = useMemo(() => {
        if (data) {
            if (queryIsEmpty) return `Tout mes fichiers : ${ data.length } fichier(s)`;
            if (hasResults) return `${ resultsCount } résultat(s) pour '${ query }'`;
            return 'Aucun résultat pour cette recherche'
        }
        return 'Chargement ...';
    }, [queryIsEmpty, data, resultsCount, hasResults, query])

    useEffect(() => {
        if (searchBarRef.current) {
            searchBarRef.current.focus();
        }
    }, [data]);

    return <PageWrapper 
        {...pageProps}
        isLoading={isLoading} 
        error={error}
        extendedTitle={computedExtendedTitle}
        extendedNode={
            <ControlledSearchBar
                ref={searchBarRef}
                placeholder="Rechercher un fichier"
                controller={searchController}
            />
        }
    >
        {
            data ?
                queryIsEmpty ?
                    <GroupedFiles files={data} />
                :
                    hasResults ?
                        <GroupedFiles files={results} />
                    :
                        <NoSearchResult />
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


// If !datas : 
//  - loading
// else
// - Show all files
//   If search :
    // If results :
//        - Show search results
    // Else (no results)
//        - Show no result dialog


// Si fichiers :
// Nb nb fichiers
// Si résultats: 
// Result count : 
// Else no result