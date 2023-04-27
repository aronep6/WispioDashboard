import { SnackbarElement } from "../../../app_contexts/SnackbarService/interfaces"

export interface SnackbarElementProps {
    element: SnackbarElement;
    removeSnackbarElement: () => void;
    key: number;
}