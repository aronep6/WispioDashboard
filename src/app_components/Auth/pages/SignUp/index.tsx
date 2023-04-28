import { useEffect, useState, useRef } from "react";
import _logo_ from '../../assets/blinks_logo_wide.webp';

import useAuth from "../../../../app_hooks/contexts_hooks/useAuth";

import { InputBlock } from "../../../../app_atomic/Input";
import { Link, useNavigate } from "react-router-dom";

import AuthWrapper from "../../components/AuthWrapper";

// Form validation schema
import { signUpValidationSchemaFirstStep, getErrors } from "../../functions";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitPrimaryButton } from "../../../../app_atomic/Button";
import { Hint } from "../../../../app_atomic/Title";
import { SignUpFormDataType } from "./interfaces";
import { AuthFlowErrorPayload } from "../../components/AuthWrapper/interfaces";


const inDev = !import.meta.env.PROD;

const SignUp = () => {
    let navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [globalError, setGlobalError] = useState<AuthFlowErrorPayload>({
        isError: false,
        message: '',
    });

    const signup_form_first_name_ref = useRef<HTMLInputElement>(null);

    const auth = useAuth();

    // Handle form submission dans datas
    const { control, handleSubmit, formState: { isSubmitting, isValid } } = useForm({
        mode: "onChange",
        resolver: yupResolver(signUpValidationSchemaFirstStep)
    });

    const onSubmit = async (data: FieldValues) => {
        setIsLoading(true);
        try {
            const {
                signup_form_first_name,
                signup_form_last_name,
                signup_form_email,
                signup_form_password
            } = data as SignUpFormDataType;

            const user_credentials = await auth.signUpWithEmail(
                signup_form_first_name,
                signup_form_last_name,
                signup_form_email,
                signup_form_password
            );

            inDev && console.log("User created : ", user_credentials);
            const { user } = user_credentials;

            // Redirect to the registration page
            navigate(`/auth/checkup?id=${user.uid}&isImperative=true&fallback=default`);

        } catch (error: Error | unknown) {
            inDev && console.log("Une erreur est survenue lors de l'inscription : ", error);

            const _err = getErrors(error);

            inDev && console.log(_err);

            setGlobalError({
                isError: true,
                title: "Erreur lors de l'inscription",
                message: _err,
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (signup_form_first_name_ref.current) {
            signup_form_first_name_ref.current.focus();
        }
    }, [globalError]);

    return <AuthWrapper
        title="Bienvenue sur Wispio 😊"
        titleDescription="Découvrez la transcription automatique de vos audios, grâce à l'intelligence artificielle."
        description="Inscrivez-vous et profitez de fonctionnalités exclusives."
        isLoading={isLoading}
        loadingMessage="Création de votre compte..."
        returnLink="/auth/signin"
        error={globalError}
        setError={setGlobalError}
    >
        <div className="flex-col items-center justify-center w-full">
            <form onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-center justify-center my-2 w-full inter">

                <div className="grid grid-cols-2 gap-3 w-full">
                    <Controller
                        control={control}
                        name="signup_form_first_name"
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <InputBlock
                                ref={signup_form_first_name_ref}
                                name="signup_form_first_name"
                                label="Prénom"
                                placeholder="John"
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
                        name="signup_form_last_name"
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <InputBlock
                                name="signup_form_last_name"
                                label="Nom"
                                placeholder="Doe"
                                type="text"
                                value={value}
                                onChange={onChange}
                                error={error}
                                errorMessage={error?.message}
                            />
                        )}
                    ></Controller>
                </div>

                <Controller
                    control={control}
                    name="signup_form_email"
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                    }) => (
                        <InputBlock
                            name="signup_form_email"
                            label="Adresse email"
                            placeholder="Votre adresse email personnelle ✉️"
                            type="email"
                            value={value}
                            onChange={onChange}
                            error={error}
                            errorMessage={error?.message}
                        />
                    )}
                ></Controller>

                <Controller
                    control={control}
                    name="signup_form_password"
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                    }) => (
                        <InputBlock
                            name="signup_form_password"
                            label="Mot de passe"
                            type="password"
                            placeholder="Votre mot de passe le plus sûr 🔑"
                            value={value}
                            onChange={onChange}
                            error={error}
                            errorMessage={error?.message}
                        />
                    )}
                ></Controller>

                <Controller
                    control={control}
                    name="signup_form_password_confirmation"
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                    }) => (
                        <InputBlock
                            name="signup_form_password_confirmation"
                            label="Confirmation du mot de passe"
                            type="password"
                            placeholder="Juste pour être sûr 🔑"
                            value={value}
                            onChange={onChange}
                            error={error}
                            errorMessage={error?.message}
                        />
                    )}
                ></Controller>

                <div className="h-3 w-full block"></div>

                <Hint>
                    En vous inscrivant, vous acceptez les
                    <Link to="/legal/terms" className="text-indigo-600 font-bold"> Conditions Générales d'Utilisation </Link> ainsi que la
                    <Link to="/legal/privacy" className="text-indigo-600 font-bold"> Politique de Confidentialité </Link> de Wispio.
                </Hint>

                <div className="w-full pt-8 flex flex-row items-center justify-end">
                    <SubmitPrimaryButton
                        disabled={isSubmitting || !isValid}
                        add="w-full"
                    >
                        {isSubmitting ? "Un instant..." : "Créer mon compte"}
                    </SubmitPrimaryButton>

                </div>
            </form>
        </div>
    </AuthWrapper>;
};

export default SignUp;