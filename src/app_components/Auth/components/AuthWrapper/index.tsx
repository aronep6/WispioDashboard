import { Fragment, useEffect } from "react";
import type { AuthLayoutProps } from "./interfaces";

import _transparent_logo_ from '../../../../assets/wispio_logo_white_invisible_bkg.png';
import _block_logo_ from '../../../../assets/wispio_logo.webp';

import { Link } from 'react-router-dom';
import { PrimaryTitle } from '../../../../app_atomic/Title';
import useSnackbarService from "../../../../app_hooks/contexts_hooks/useSnackbarService";
import { ReturnButton } from '../../../../app_atomic/Button';
import { ChevronLeft } from 'react-feather';
import defaultIconSet from "../../../../app_common/interfaces/DefaultIconsSet";
import useWebTitle from "../../../../app_hooks/useWebTitle";
import { SnackbarElement, SnackbarType } from "../../../../app_contexts/SnackbarService/interfaces";
import "./style.css";
import INITIAL_GLOBAL_ERROR_STATE from "../../common/initial-global-error-state";

const DEFAULT_ERROR_TITLE = "Échec de l'authentification";

const AuthWrapper = ({
    title,
    returnLink = "/",
    description = null,
    children,
    isLoading = false,
    loadingMessage = "",
    extendedNode,
    error,
    setError
}: AuthLayoutProps) => {

    const snackbarService = useSnackbarService();

    useWebTitle(`${import.meta.env.VITE_APPLICATION_NAME} - ${title}`);

    useEffect(() => {
        if (!error.isError) return;

        const timeout = setTimeout(() => {
            setError(INITIAL_GLOBAL_ERROR_STATE);
        }, 6500);

        return () => clearTimeout(timeout);
    }, [error]);

    useEffect(() => {
        if (!error.isError) return;

        const snackbar_element: SnackbarElement = {
            type: SnackbarType.Warning,
            title: error.title ?? DEFAULT_ERROR_TITLE,
            message: error.message,
            duration: 6500,
        };

        snackbarService.addSnackbarElement(snackbar_element);

    }, [error]);

    return <Fragment>
        <div className='
            bg-white dark:bg-stone-900 duration-150 inter
            sm:bg-indigo-50 flex flex-col justify-center
            relative min-h-screen'>

            <section className="w-full auth-wrapper-ui-agent relative
                flex flex-col sm:rounded-lg
                max-w-md md:max-w-lg mx-auto
                overflow-hidden
                duration-150
                z-30 bg-white dark:bg-stone-900 modal-animation sm:shadow md:shadow-xl shadow-indigo-400/40"
            >
                {
                    isLoading && <Fragment>
                        <div className="flex z-50 inset-0 rounded-lg absolute flex-col text-indigo-700 inter text-lg font-medium items-center justify-center w-full backdrop-blur-lg duration-300">
                            {loadingMessage !== "" ? loadingMessage : null}
                        </div>
                        <div className="progress">
                            <div className="progress-bar"></div>
                        </div>
                    </Fragment>
                }

                <div className="flex flex-col gap-4 py-6 px-6 sm:px-8 relative overflow-hidden">
                    <div className="flex flex-col justify-center gap-2 relative select-none">
                        <Link to={returnLink} className="absolute md:hidden top-0 left-0">
                            <ReturnButton icon={<ChevronLeft {...defaultIconSet} />} />
                        </Link>

                        <div className="flex flex-row justify-center w-full select-none">
                            <img src={_block_logo_} alt="Wispio" className="h-8 max-w-max rounded-sm" />
                        </div>
                        <PrimaryTitle add="text-black text-center dark:text-white">
                            {title}
                        </PrimaryTitle>

                        {description && <p className="block inter text-gray-600 dark:text-gray-400 text-center max-w-[18em] mb-1 text-sm mx-auto leading-tight">
                            {description}
                        </p>}

                    </div>
                    <div>
                        {children}
                    </div>
                </div>

            </section>
        </div>
    </Fragment>
};

export default AuthWrapper;