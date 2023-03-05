import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true'); window.location.reload(); 
};

const getCookieConsent = () => {
    if (localStorage.getItem('cookieConsent') === 'true') { return true; } else { return false; }
};

const CookieConsent = () => {
    const [show, setShow] = useState<undefined | boolean>(undefined);

    useEffect(() => {
        if (show !== undefined) return;
        if (!getCookieConsent()) { 
            setShow(true);
        }
    }, []);

    return <Fragment>
        {show && <div className="fixed bottom-0 inter group text-sm left-0 right-0 bg-gradient-to-l from-gray-800 to-stone-900 z-50 duration-150">
            <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between duration-150">
                <div className="flex flex-col text-center mb-4 md:mb-0 md:text-left">
                    <h5 className="text-white font-medium px-1.5 duration-150 pb-1">Nous utilisons des cookies 🍪</h5>
                    <p className="text-xs text-gray-100 dark:text-gray-300 px-1.5 max-w-4xl">
                        En poursuivant votre navigation sur Wispio, vous acceptez l'utilisation de cookies et autres technologies similaires pour vous proposer des services adaptés à vos centres d'intérêts. Et aussi pour permettre des fonctions de base comme la navigation sur les pages
                        et l'accès aux zones sécurisées du site, ou encore la mesure d'audience et d'analyse de comportement sur l'application.
                    </p>
                </div>
                <div className="flex items-center grotesk h-full">
                    <Link to="/legal/privacy">
                        <button className="ml-4 flex hover:underline shrink-0 min-w-max font-medium text-gray-100 hover:text-gray-200 dark:text-gray-400 dark:hover:text-gray-300">
                            En savoir plus
                        </button>
                    </Link>
                    <button onClick={ handleAccept }
                        className="ml-6 h-full shadow-lg group-hover:scale-105 group-hover:bg-indigo-700 shrink-0 min-w-max duration-150 bg-indigo-600 text-white font-medium py-2.5 px-5 rounded-sm">
                        J'ai compris
                    </button>
                </div>
            </div>
        </div>}
    </Fragment>;
};

export default CookieConsent;