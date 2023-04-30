export enum SnackbarType {
    Info = 'info',
    Success = 'success',
    Warning = 'warning',
    Danger = 'danger',
};

export enum SnackbarLifeTime {
    Short = 3000,
    Medium = 6000,
    Long = 9000,
    Permanent = -1,
};

export interface SnackbarElement {
    type: SnackbarType,
    title: string,
    message: string,
    duration: number | SnackbarLifeTime,
};

export interface SnackbarServicesValues {
    addSnackbarElement: AddSnackbarElement,
};

export type AddSnackbarElement = (snackbarElement: SnackbarElement) => void;