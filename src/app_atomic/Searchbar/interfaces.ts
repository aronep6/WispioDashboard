import type { SearchInputController } from "../../app_common/interfaces/SearchController";

export interface ControlledSearchBarProps {
    placeholder?: string,
    searchController: SearchInputController<any>,
}