import { Fragment } from "react";
import { createPortal } from "react-dom";
import { Hint, SecondaryTitle } from "./Title";
const modalRoot = document.getElementById('modal-root') as HTMLElement;

interface ModalProps {
    children: JSX.Element | JSX.Element[];
    onClose?: () => void;
}

interface ModalHrProps {
    color?: string;
}

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
        <section className="overflow-hidden m-2 duration-150 modal-animation" onClick={e => e.stopPropagation()}>
            {children}
        </section>
    </div>
};

const ModalHr = ({
    color
}: ModalHrProps) => {
    return <hr className={`-mx-20 my-2.5 ${color}`} />
};

const ModalSection = ({ title, children }: { title: string, children: React.ReactNode }) => {
    return <div className='flex flex-col px-2 gap-2'>
        <SecondaryTitle>{ title }</SecondaryTitle>
        <div className='flex flex-col gap-2'>
            {children}
        </div>
    </div>
};

export { Modal, ModalHr, ModalSection };