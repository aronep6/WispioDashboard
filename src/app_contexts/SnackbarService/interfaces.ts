export enum SnackbarType {
    Info = 'info',
    Success = 'success',
    Warning = 'warning',
    Danger = 'danger',
};

export enum SnackbarLifeTime {
    VeryShort = 2000,
    Short = 3500,
    Medium = 6500,
    Long = 9500,
    VeryLong = 16500,
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