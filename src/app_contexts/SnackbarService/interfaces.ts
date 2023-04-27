export enum SnackbarType {
    Success = 'success',
    Warning = 'warning',
    Danger = 'danger',
}

export interface SnackbarElement {
    type: SnackbarType,
    title: string,
    message: string,
    duration: number,
}

export interface SnackbarServicesValues {
    addSnackbarElement: (snackbarElement: SnackbarElement) => void;
};