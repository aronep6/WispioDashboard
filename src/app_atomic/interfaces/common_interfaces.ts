import type { FieldError } from "react-hook-form/dist/types";

export interface ErrorFieldProps {
    error?: FieldError | boolean;
    errorMessage?: string;
}

export interface CommonInputProps<LabelType> extends ErrorFieldProps {
    name: string,
    label?: LabelType,
    required?: boolean;
    disabled?: boolean;
    add?: string;
}