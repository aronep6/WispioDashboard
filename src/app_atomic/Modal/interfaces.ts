import type { SingleInformationTableRowInterface } from "../../app_components/common/components/InformationTable/interfaces";

export interface ModalProps {
    children: JSX.Element | JSX.Element[];
    onClose?: () => void;
}

export interface ModalSectionProps {
    title: string,
    children: React.ReactNode,
    show?: boolean,
    toggleShowFn?: () => void;
    toggleTitleShow?: string | null
    sectionCurrentValues?: SingleInformationTableRowInterface[] | null;
}

export interface ModalHrProps {
    color?: string;
}
