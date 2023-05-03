export interface SearchConfiguration<SearchItemType> {
    searchFn: (query: string) => Promise<SearchItemType[]>,
    allowSearch?: boolean,
    debounceTime?: number,
    sortMode?: SearchSortMode,
    onPressEnter?: () => void,
    isDisabled?: boolean,
}

export type SearchSortMode = 'ASC' | 'DESC' | 'NONE';