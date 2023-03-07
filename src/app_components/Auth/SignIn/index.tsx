import { SecondaryButton, SubmitPrimaryButton } from "../../../app_atomic/Button";
import { useEffect, useState, useRef } from "react";

import AuthWrapper from "../layout";
import { Link, useNavigate } from 'react-router-dom';

import useUserSession from "../../../app_hooks/contexts_hooks/useUserSession";
import useAuth from "../../../app_hooks/contexts_hooks/useAuth";

import { InputBlock } from "../../../app_atomic/Input";

// Form validation schema and deps
import { getErrors, signInValidationSchema } from '../functions';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const inDev = !import.meta.env.PROD;

const SignIn = () => {
    const auth = useAuth();
    const user = useUserSession();

    const [isLoading, setIsLoading] = useState(false);
    const [globalError, setGlobalError] = useState<string | null>(null);

    const signin_form_email_ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Checking URL params
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        if (code) {
            if (code === 'claims_disrupt') {
                setGlobalError("Vous devez vous connecter avant de consulter cette page");
            }
        }
    }, []);

    // const checkForRegistrationRedirection = async (uid: string) => {
    //     try {
    //         const { claims } = await service.getCustomClaims();

    //         if (!claims) throw 'No custom claims found for this user';
    //         // Check if the user need to add professional email
    //         const params = new URLSearchParams(window.location.search);

    //         const flow = params.get('flow');
            
    //         if (flow === 'addProfessionnalEmail' && claims.userIsReadyToUse) {
    //             return navigate('/services/emails/create');
    //         }
    //         if (claims.userIsReadyToUse) return navigate('/app/dashboard');
    //         throw 'User is not ready to use';
    //     } catch (err) {
    //         inDev && console.log("Une erreur est survenue lors de la vérification de l'utilisateur connecté : ", err);
    //         // Redirect to the registration page
    //         navigate(`/auth/checkup?id=${uid}&isImperative=true&fallback=default&flow=default`);
    //         return;
    //     }
    // };

    useEffect(() => {
        if (user === null || user === undefined) return;
        // Checking if user is already connected
        console.log("Need to check for registration redirection (Aborted) : Not implemented yet :( ")
        // checkForRegistrationRedirection(user.uid);
    }, [user]);

    // Handle form submission dans datas
    const { control, handleSubmit, formState: { isSubmitting, isValid } } = useForm({
        resolver: yupResolver(signInValidationSchema)
    });

    const handleFormLogin = async (data: any) => {
        try {
            setIsLoading(true);
            const _user_ = await auth.loginWithEmail(data.signin_form_email, data.signin_form_password);            
            setGlobalError(null);
            console.log("Need to check for registration redirection (Aborted) : Not implemented yet :( ")
            // checkForRegistrationRedirection(_user_.user.uid);
            // Check if the user 
        } catch (err: Error | unknown) {
            inDev && console.log("Une erreur est survenue lors de la connexion de l'utilisateur : ", err);
            const _err = getErrors(err);
            setGlobalError(_err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (signin_form_email_ref.current) {
            signin_form_email_ref.current.focus();
        }
    }, []);

    return <AuthWrapper 
        title="Se connecter à Wispio"
        titleDescription="Connectez-vous à votre compte pour commencer à utiliser les outils Wispio."
        description="L'authentification est nécessaire pour accéder à votre compte Wispio."
        isLoading={ isLoading }
        returnLink="/"
        error={ globalError }
        setError={ setGlobalError }
    >
        <form onSubmit={handleSubmit(handleFormLogin)} className="inter mt-2">

            <Controller
                control={control}
                name="signin_form_email"
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                }) => (
                    <InputBlock
                        ref={signin_form_email_ref}
                        name="signin_form_email"
                        label="Adresse e-mail"
                        placeholder="Adresse e-mail"
                        type="text"
                        value={value}
                        onChange={onChange}
                        error={error}
                        errorMessage={error?.message}
                    />
                )}
            ></Controller>

            <Controller
                control={control}
                name="signin_form_password"
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                }) => (
                    <InputBlock
                        name="signin_form_password"
                        label="Mot de passe"
                        placeholder="Mot de passe"
                        type="password"
                        value={value}
                        onChange={onChange}
                        error={error}
                        errorMessage={error?.message}
                    />
                )}
            ></Controller>

            <Link to="/auth/forgot-password" className="text-sm text-indigo-600 text-right w-full block mb-2">
                Mot de passe oublié ?
            </Link>

            <div className="grid gap-2.5 mt-4">

                <div className="flex justify-center">
                    <SubmitPrimaryButton add="w-full max-w-xs">
                        Se connecter
                    </SubmitPrimaryButton>
                </div>

                <p className="text-sm font-normal text-gray-600 text-center leading-5 my-0.5">
                    Vous n'avez pas de compte ? <Link to="/auth/signup" className="text-indigo-500 hover:text-indigo-600">Créer un compte</Link>
                </p>

            </div>

        </form>

        <div className="flex flex-row items-center justify-center mx-auto w-full py-3.5">
            <div className="h-px bg-slate-200 w-full mr-4"></div>
            <span className="text-center text-gray-500 text-sm inter font-medium">OU</span>
            <div className="h-px bg-slate-200 w-full ml-4"></div>
        </div>

        { /* === Connexion avec Google ou Twitter === */}

        <div className="justify-center flex w-full">
            <SecondaryButton add="max-w-xs w-full flex flex-row items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" className="fill-indigo-600 h-5 mr-4 text-white">
                    <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                </svg>
                Se connecter avec Google
            </SecondaryButton>
        </div>

        { false && <div className="justify-center flex w-full">
            <SecondaryButton add="max-w-xs w-full flex flex-row items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 248 204" className="fill-indigo-600 h-5 mr-4 text-white">
                    <path d="m222 51.3.1 6.5c0 66.8-50.8 143.7-143.7 143.7A143 143 0 0 1 1 178.8a101.4 101.4 0 0 0 74.7-21 50.6 50.6 0 0 1-47.1-35 50.3 50.3 0 0 0 22.8-.8 50.5 50.5 0 0 1-40.5-49.5v-.7c7 4 14.8 6.1 22.9 6.3A50.6 50.6 0 0 1 18 10.7a143.3 143.3 0 0 0 104.1 52.8 50.5 50.5 0 0 1 86-46c11.4-2.3 22.2-6.5 32.1-12.3A50.7 50.7 0 0 1 218.1 33c10-1.2 19.8-3.9 29-8-6.7 10.2-15.3 19-25.2 26.2z" />
                </svg>
                Se connecter avec Twitter
            </SecondaryButton>
        </div> }

    </AuthWrapper>
};

export default SignIn;

/*

                    <div className="flex flex-row items-center justify-center w-full py-2">
                        <div className="h-px bg-slate-200 w-full mx-4"></div>
                        <span className="text-center text-gray-500 text-sm inter font-medium">OU</span>
                        <div className="h-px bg-slate-200 w-full mx-4"></div>
                    </div>
*/