import { Fragment } from "react";

/*  Correspondance atomiques non-connues
    text-xl             : font-size: 1.25rem; => 20px
    font-semibold       : font-weight: 600;
    tracking-tighter    : letter-spacing: -0.05em;
    leading-6           : line-height: 1.5rem; => 24px
    p-2.5               : padding: 0.625rem; => 10px
*/

const Modal = ({ children, onClose = () => {} }) => {
    return <Fragment>
        <div className="fixed inset-0 bg-slate-800 opacity-75 z-40"></div>
        <ModalContainer onClose={onClose}>
            { children }
        </ModalContainer>
    </Fragment>
};

const ModalContainer = ({ children, onClose }) => {
    return <div onClick={onClose}
        className="fixed h-screen modal-bg-animation w-screen backdrop-blur-sm inset-0 z-50 flex items-center justify-center -mt-7">
        <section className="overflow-hidden m-2 duration-150 modal-animation" onClick={e => e.stopPropagation()}>
            { children }
        </section>
    </div>
};

const ModalHr = ({color}) => { return <hr className={`-mx-20 my-2.5 ${color}`} /> };

export { Modal, ModalHr };