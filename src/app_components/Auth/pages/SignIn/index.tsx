import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef, useCallback, useMemo } from "react";

import { SubmitPrimaryButton } from "../../../../app_atomic/Button";
import AuthWrapper from "../../components/AuthWrapper";
import useAuth from "../../../../app_hooks/contexts_hooks/useAuth";
import useUserSession from "../../../../app_hooks/contexts_hooks/useUserSession";
import { InputBlock } from "../../../../app_atomic/Input";
// Form validation schema and deps
import getApplicationErrorMessage from '../../../../app_common/Errors/get-application-error';
import {
    _step_one_signInValidationSchema,
    _step_two_signInValidationSchema,
} from './sign-in-validation-schemas';
import { type SignInFormDataType } from './interfaces';
import { useForm, Controller, type FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AppRoutes } from "../../../../app_common/interfaces/AppRoutes";
import checkAfterUserLoginOnServices from "../../check-after-user-login-on-services";
import useSnackbarService from "../../../../app_hooks/contexts_hooks/useSnackbarService";
import { AuthFlowErrorPayload } from "../../components/AuthWrapper/interfaces";
import INITIAL_GLOBAL_ERROR_STATE from '../../common/initial-global-error-state';
// Identity providers
import IdentityProviderList from '../../components/IdentityProvider';


const inDev = !import.meta.env.PROD;

const INITIAL_SIGNIN_STEP: number = 0;

const SignIn = () => {
    let navigate = useNavigate();
    const auth = useAuth();
    const user = useUserSession();
    const snackbarService = useSnackbarService();

    const [isLoading, setIsLoading] = useState(true);
    const [globalError, setGlobalError] = useState<AuthFlowErrorPayload>(INITIAL_GLOBAL_ERROR_STATE);
    const [signInStep, setSignInStep] = useState(INITIAL_SIGNIN_STEP);

    const [emailEncodedSnapshot, setEncodedEmailSnapshot] = useState<string | null>(null);

    const signin_form_email_ref = useRef<HTMLInputElement>(null);
    const signin_form_password_ref = useRef<HTMLInputElement>(null);

    const isFirstSignInStep: boolean = useMemo(() => signInStep === 0, [signInStep]);

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
    const { control, handleSubmit, formState: { isSubmitting, isValid } } = useForm<SignInFormDataType | Pick<SignInFormDataType, 'signin_form_email'>>({
        resolver: yupResolver(isFirstSignInStep ? _step_one_signInValidationSchema : _step_two_signInValidationSchema),
    });

    const handleFormLogin = async (data: FieldValues) => {
        if (isFirstSignInStep) return setSignInStep(1);

        try {
            setIsLoading(true);

            const { signin_form_email, signin_form_password } = data as SignInFormDataType;
            await auth.loginWithEmail(signin_form_email, signin_form_password);

            setGlobalError(INITIAL_GLOBAL_ERROR_STATE);
        } catch (err: Error | unknown) {
            inDev && console.log("Une erreur est survenue lors de la connexion de l'utilisateur : ", err);
            setEmailSnapshot(data.signin_form_email);
            const _err = getApplicationErrorMessage(err);
            setGlobalError({
                isError: true,
                title: "Connexion impossible",
                message: _err
            });
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isFirstSignInStep) {
            if (signin_form_email_ref.current) {
                signin_form_email_ref.current.focus();
            }
        } else {
            if (signin_form_password_ref.current) {
                signin_form_password_ref.current.focus();
            }
        }
    }, [globalError, isFirstSignInStep]);

    return <AuthWrapper
        title={
            isFirstSignInStep
                ? `Se connecter à Dashboard`
                : 'Bon retour parmis nous !'
        }
        description={
            isFirstSignInStep
                ? "Entrez votre adresse e-mail pour vous connecter à votre compte"
                : "Entrez votre mot de passe pour vous connecter à votre compte"
        }
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
                        disabled={!isFirstSignInStep}
                        {
                        ...{ autoComplete: "email" }
                        }
                    />
                )}
            ></Controller>

            {!isFirstSignInStep && <Controller
                control={control}
                name="signin_form_password"
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                }) => (
                    <InputBlock
                        ref={signin_form_password_ref}
                        name="signin_form_password"
                        label="Mot de passe"
                        placeholder="Mot de passe"
                        type="password"
                        value={value}
                        onChange={onChange}
                        error={error}
                        errorMessage={error?.message}
                        disabled={isSubmitting}
                        {
                        ...{ autoComplete: "current-password" }
                        }
                    />
                )}
            ></Controller>}

            {!isFirstSignInStep && <Link
                to={!emailEncodedSnapshot ? AppRoutes.AuthForgotPassword : `${AppRoutes.AuthForgotPassword}?snapshot=${emailEncodedSnapshot}`}
                className="text-sm text-indigo-600 hover:text-indigo-700 text-right w-full block mb-2"
            >
                Mot de passe oublié ?
            </Link>}

            <div className="grid gap-2.5 mt-4">

                <SubmitPrimaryButton
                    useMargin={false}
                    add="w-full"
                    disabled={isSubmitting || !isValid}
                >
                    {isFirstSignInStep ? "Continuer" : "Se connecter"}
                </SubmitPrimaryButton>

                <p className="text-sm font-normal text-gray-600 text-center leading-5 my-2">
                    Vous n'avez pas de compte ? <Link to={AppRoutes.AuthSignUp} className="text-indigo-600 hover:text-indigo-700">Créer un compte</Link>
                </p>

            </div>

        </form>

        <div className="flex flex-row items-center justify-center mx-auto w-full py-3.5">
            <div className="h-px bg-slate-200 w-full mr-4"></div>
            <span className="text-center text-gray-500 text-sm inter font-medium">OU</span>
            <div className="h-px bg-slate-200 w-full ml-4"></div>
        </div>

        <IdentityProviderList />

    </AuthWrapper>
};

export default SignIn;