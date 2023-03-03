import { Fragment } from "react";

/*  Correspondance atomiques non-connues
    text-xl             : font-size: 1.25rem; => 20px
    font-semibold       : font-weight: 600;
    tracking-tighter    : letter-spacing: -0.05em;
    leading-6           : line-height: 1.5rem; => 24px
    p-2.5               : padding: 0.625rem; => 10px
*/

const Modal = ({ children }) => {
    return <Fragment>
        <div className="fixed inset-0 bg-slate-800 opacity-75 z-40"></div>
        <ModalContainer>
            { children }
        </ModalContainer>
    </Fragment>
};

const ModalContainer = ({ children }) => {
    return <div className="fixed h-screen w-screen inset-0 z-50 flex items-center justify-center -mt-7">
        <section className="overflow-hidden m-2 duration-150">
            { children }
        </section>
    </div>
};

const ModalHr = ({color}) => { return <hr className={`-mx-20 my-2.5 ${color}`} /> };

export { Modal, ModalHr };