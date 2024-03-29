import { Fragment } from "react";
import { createPortal } from "react-dom";
import { SecondaryTitle } from "../Title";
import type { ModalProps, ModalHrProps, ModalSectionProps } from "./interfaces";
import InformationTable from "../../app_components/common/components/InformationTable";

const modalRoot = document.getElementById('modal-root') as HTMLElement;

const Modal = ({
    children,
    onClose = () => { },
}: ModalProps) => {
    return createPortal(
        <Fragment>
            <div className="fixed inset-0 bg-slate-900 opacity-75 z-40"></div>
            <ModalContainer onClose={onClose}>
                {children}
            </ModalContainer>
        </Fragment>
        , modalRoot);
};

const ModalContainer = ({
    children,
    onClose,
}: ModalProps) => {
    return <div onClick={onClose}
        className="fixed inter h-screen modal-bg-animation w-screen backdrop-blur-sm inset-0 modal-bg-animation z-50 flex items-center justify-center">
        <section className="overflow-hidden mx-2 py-4 duration-150 modal-animation" onClick={e => e.stopPropagation()}>
            {children}
        </section>
    </div>
};

const ModalHr = ({
    color
}: ModalHrProps) => {
    return <hr className={`-mx-20 my-2.5 ${color}`} />
};

const ModalSection = ({
    title,
    children,
    show = true,
    toggleShowFn = () => { },
    toggleTitleShow = null,
    sectionCurrentValues = null,
}: ModalSectionProps) => {
    return <div className='flex flex-col max-h-max gap-5 border p-5 rounded-lg bg-slate-50'>
        <div className="flex flex-row justify-between items-center gap-2">
            <SecondaryTitle>{title}</SecondaryTitle>
            {toggleTitleShow && <div
                className="max-w-max cursor-pointer py-1 hover:underline text-sm text-indigo-600"
                onClick={toggleShowFn}
            >
                {toggleTitleShow}
            </div>}
        </div>
        {
            show ? <div className='flex flex-col gap-2'>{children}</div>
            : 
            sectionCurrentValues && <InformationTable table={sectionCurrentValues} />
        }
    </div>
};

export { Modal, ModalHr, ModalSection };