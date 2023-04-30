import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef, useCallback } from "react";

import { SecondaryButton, SubmitPrimaryButton } from "../../../../app_atomic/Button";
import AuthWrapper from "../../components/AuthWrapper";
import useAuth from "../../../../app_hooks/contexts_hooks/useAuth";
import useUserSession from "../../../../app_hooks/contexts_hooks/useUserSession";
import { InputBlock } from "../../../../app_atomic/Input";
// Form validation schema and deps
import { getErrors, signInValidationSchema } from '../../functions';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AppRoutes } from "../../../../app_common/interfaces/AppRoutes";
import checkAfterUserLoginOnServices from "../../check-after-user-login-on-services";
import useSnackbarService from "../../../../app_hooks/contexts_hooks/useSnackbarService";
import { AuthFlowErrorPayload } from "../../components/AuthWrapper/interfaces";
import INITIAL_GLOBAL_ERROR_STATE from '../../common/initial-global-error-state';


const inDev = !import.meta.env.PROD;

const SignIn = () => {
    let navigate = useNavigate();
    const auth = useAuth();
    const user = useUserSession();
    const snackbarService = useSnackbarService();

    const [isLoading, setIsLoading] = useState(true);
    const [globalError, setGlobalError] = useState<AuthFlowErrorPayload>(INITIAL_GLOBAL_ERROR_STATE);

    const [emailEncodedSnapshot, setEncodedEmailSnapshot] = useState<string | null>(null);

    const signin_form_email_ref = useRef<HTMLInputElement>(null);

    const setEmailSnapshot = useCallback((email: string) => {
        const encodedEmail = encodeURIComponent(email);
        setEncodedEmailSnapshot(encodedEmail);
    }, []);

    useEffect(() => {
        // Checking URL params
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        if (code) {
            if (code === 'claims-disrupt') {
                setGlobalError({
                    isError: true,
                    message: "Vous devez vous connecter avant de pouvoir accéder à Dashboard",
                });
            }
        }
    }, []);

    useEffect(() => {
        if (user === undefined) return;
        if (user === null) return setIsLoading(false);

        const check = async () => {
            await checkAfterUserLoginOnServices(auth, navigate, snackbarService);
            // Check if the url contains a redirectionUrl param
            const params = new URLSearchParams(window.location.search);
            const redirectionUrl = params.get('redirectUrl');

            if (redirectionUrl) {
                const decodedUrl = decodeURIComponent(redirectionUrl);
                navigate(decodedUrl);
                return;
            } else {
                navigate(AppRoutes.Dashboard);
                return;
            }
        };

        check();
    }, [user]);

    // Handle form submission dans datas
    const { control, handleSubmit, formState: { isSubmitting } } = useForm({
        resolver: yupResolver(signInValidationSchema)
    });

    const handleFormLogin = async (data: any) => {
        try {
            setIsLoading(true);
            await auth.loginWithEmail(data.signin_form_email, data.signin_form_password);
            setGlobalError(INITIAL_GLOBAL_ERROR_STATE);
        } catch (err: Error | unknown) {
            inDev && console.log("Une erreur est survenue lors de la connexion de l'utilisateur : ", err);
            setEmailSnapshot(data.signin_form_email);
            const _err = getErrors(err);
            setGlobalError({
                isError: true,
                title: "Connexion impossible",
                message: _err
            });
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (signin_form_email_ref.current) {
            signin_form_email_ref.current.focus();
        }
    }, [globalError]); // We scope on global error for automatically put the focus if the error is updated

    return <AuthWrapper
        title="Se connecter à Dashboard"
        titleDescription={`Connectez-vous à votre compte pour commencer à utiliser ${import.meta.env.VITE_APPLICATION_NAME}.`}
        description="L'authentification est nécessaire pour accéder à votre compte Wispio."
        isLoading={isLoading}
        returnLink="/"
        error={globalError}
        setError={setGlobalError}
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

            <Link
                to={emailEncodedSnapshot ? `/auth/forgot-password?snapshot=${emailEncodedSnapshot}` : '/auth/forgot-password'}
                className="text-sm text-indigo-600 text-right w-full block mb-2"
            >
                Mot de passe oublié ?
            </Link>

            <div className="grid gap-2.5 mt-4">

                <div className="flex justify-center">
                    <SubmitPrimaryButton add="w-full max-w-xs" disabled={isSubmitting}>
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

        {false && <div className="justify-center flex w-full">
            <SecondaryButton add="max-w-xs w-full flex flex-row items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 248 204" className="fill-indigo-600 h-5 mr-4 text-white">
                    <path d="m222 51.3.1 6.5c0 66.8-50.8 143.7-143.7 143.7A143 143 0 0 1 1 178.8a101.4 101.4 0 0 0 74.7-21 50.6 50.6 0 0 1-47.1-35 50.3 50.3 0 0 0 22.8-.8 50.5 50.5 0 0 1-40.5-49.5v-.7c7 4 14.8 6.1 22.9 6.3A50.6 50.6 0 0 1 18 10.7a143.3 143.3 0 0 0 104.1 52.8 50.5 50.5 0 0 1 86-46c11.4-2.3 22.2-6.5 32.1-12.3A50.7 50.7 0 0 1 218.1 33c10-1.2 19.8-3.9 29-8-6.7 10.2-15.3 19-25.2 26.2z" />
                </svg>
                Se connecter avec Twitter
            </SecondaryButton>
        </div>}

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