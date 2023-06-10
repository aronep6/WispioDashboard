import type { ReactNode } from "react"

export interface ControlledFileSelectorProps {
    icon?: ReactNode,
    title: string,
    value: File | undefined
    onChange: (file: any) => void,
}