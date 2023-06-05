import type { CommonInputProps } from '../interfaces/common_interfaces';

export interface SwitchProps extends CommonInputProps<string> {
    checked?: boolean;
    onChange?(checked: boolean): void;
    checkedBackgroundClass?: string;
    uncheckedBackgroundClass?: string;
}