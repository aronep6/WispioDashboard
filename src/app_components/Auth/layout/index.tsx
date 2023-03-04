import { useEffect, Fragment } from "react";
import type { AuthLayoutProps } from "./interfaces";

import _logo_ from '../../../assets/blinks_logo.webp';

import { Link } from 'react-router-dom';
import { PrimaryTitle } from '../../../app_atomic/Title';
import { DangerPrimaryButton, ReturnButton } from '../../../app_atomic/Button';

import { AlertTriangle, ChevronLeft } from 'react-feather';
import defaultIconSet from "../../../app_common/interfaces/DefaultIconsSet";

import "./style.css";

const AuthWrapper = ({ 
    title, 
    returnLink = "/", 
    description = null, 
    children, 
    isLoading = false, 
    loadingMessage = "", 
    error, 
    setError 
}: AuthLayoutProps) => {

    useEffect(() => {
        document.title = `Wispio AI - ${title}`;
    }, [title]);

    return <Fragment>
        <div className='
            bg-white dark:bg-stone-900 duration-150
            sm:bg-gradient-to-b from-indigo-600 to-violet-700
            relative min-h-screen pt-6 sm:py-20'>

            <section className="w-full auth-wrapper-ui-agent relative flex flex-col max-w-md mx-auto px-6 py-6 rounded-lg z-30 bg-white dark:bg-stone-900 sm:shadow-2xl duration-150 modal-animation">
                <div className="auth-wrapper-ui">

                    <Link to={returnLink} className="absolute">
                        <ReturnButton icon={<ChevronLeft { ...defaultIconSet } />} />
                    </Link>

                    <div className="flex flex-col items-center justify-center w-full mb-2">
                        <img src={_logo_} alt="Wispio" className="h-9 max-w-max rounded" />
                    </div>

                    <PrimaryTitle add="text-center text-black dark:text-white">
                        { title }
                    </PrimaryTitle>

                    { description && <p className="inter font-medium text-gray-600 dark:text-gray-400 text-center max-w-[18em] mb-1.5 text-sm mx-auto leading-tight">
                        { description }
                    </p> }

                    { children }
                </div>

                {
                    isLoading && <div className="flex inset-0 rounded-lg absolute flex-col text-indigo-700 inter text-lg font-medium items-center justify-center w-full backdrop-blur-2xl duration-300">
                        <div className="animate-spin rounded-full mb-4 h-12 w-12 border-b-2 border-indigo-600 dark:border-gray-100"></div>
                        { loadingMessage !== "" ? loadingMessage : null }
                    </div>
                }

                {
                    error && <div className="flex inset-0 rounded-lg absolute border-red-600 flex-col text-red-700 inter text-lg font-medium items-center justify-center w-full backdrop-blur-2xl duration-300">
                        <AlertTriangle className="mb-4 animate-pulse" size={40} />
                        <div className="text-center max-w-xs leading-tight">
                            { error }
                        </div>

                        <DangerPrimaryButton add="mt-4" action={() => setError(null)}>
                            Réessayer
                        </DangerPrimaryButton>
                    </div>
                }

            </section>
        </div>
    </Fragment>
};

export default AuthWrapper;