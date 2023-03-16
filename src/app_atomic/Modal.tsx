import { Fragment } from "react";

interface ModalProps {
    children: JSX.Element | JSX.Element[];
    onClose?: () => void;
}

interface ModalHrProps {
    color?: string;
}

const Modal = ({ 
    children, 
    onClose = () => {},
}: ModalProps) => {
    return <Fragment>
        <div className="fixed inset-0 bg-slate-900 opacity-75 z-40"></div>
        <ModalContainer onClose={onClose}>
            { children }
        </ModalContainer>
    </Fragment>
};

const ModalContainer = ({ 
    children, 
    onClose,
}: ModalProps) => {
    return <div onClick={onClose}
        className="fixed h-screen modal-bg-animation w-screen backdrop-blur-sm inset-0 modal-bg-animation z-50 flex items-center justify-center">
        <section className="overflow-hidden m-2 duration-150 modal-animation" onClick={e => e.stopPropagation()}>
            { children }
        </section>
    </div>
};

const ModalHr = ({
    color
}: ModalHrProps) => {
    return <hr className={`-mx-20 my-2.5 ${color}`} /> 
};

export { Modal, ModalHr };