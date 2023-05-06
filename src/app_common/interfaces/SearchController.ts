interface SearchResults<SearchItemType> {
    results: SearchItemType[],
    hasResults: boolean,
    resultsCount: number,
}

export interface SearchInputController<SearchItemType> extends SearchResults<SearchItemType> {
    query: string,
    setQuery: (query: string) => void,
    clearSearch: () => void,
    isSearching: boolean,
    isDisabled: boolean,
    queryIsEmpty: boolean,
}