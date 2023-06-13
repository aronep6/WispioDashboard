import type { ReactNode } from "react"
import type { CommonInputProps } from "../interfaces/common_interfaces"
import type { AllowedExtensions } from "../../app_common/interfaces/File"

export interface ControlledFileSelectorProps extends CommonInputProps<string> {
    icon?: ReactNode,
    value: File | undefined,
    allowedExtensions: AllowedExtensions[],
    onFileChange: (file: any) => void,
}