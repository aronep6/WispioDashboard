import { useState, useEffect, useMemo, useCallback, useTransition } from 'react';
import type { SearchConfiguration } from './interfaces';
import type { SearchInputController } from "../../app_common/interfaces/SearchController";

function useSearchController<SearchItem>({
    debounceTime = 500,
    onPressEnter = () => {},
    searchFn, 
    isDisabled = false,
}: SearchConfiguration<SearchItem>): SearchInputController<SearchItem> {

    const [isSearching, startTransition] = useTransition();

    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<SearchItem[]>([]);

    const computeSearching = useCallback(async () => {
        const results = await searchFn(query);
        return setResults(results);
    }, [query, searchFn]);

    const clearSearch = useCallback(() => {
        setQuery('');
    }, []);
    
    useEffect(() => {
        if (query.length === 0) return setResults([]);

        startTransition(() => {
            computeSearching()
        })
    }, [query, startTransition]);

    const resultsCount = useMemo(() => results.length, [results]);

    const hasResults = useMemo(() => resultsCount > 0, [resultsCount]);

    const controller = useMemo<SearchInputController<SearchItem>>(() => ({
        query, setQuery,

        isSearching, clearSearch,

        results, resultsCount, hasResults,

        isDisabled,
    }), [
        query,

        results, resultsCount, hasResults,

        isSearching,
    ]);

    // For debugging purposes only :)
    // useEffect(() => {
    //     console.log('controller updated', controller);
    // }, [controller]);

    return controller;
};

export default useSearchController;