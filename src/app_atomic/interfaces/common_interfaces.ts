import type { FieldError } from "react-hook-form/dist/types";

export interface CommonInputProps<LabelType> {
    name: string,
    label?: LabelType,
    required?: boolean;
    disabled?: boolean;
    add?: string;
    error?: FieldError | boolean;
    errorMessage?: string;
}