import { useState } from "react";
import _logo_ from '../../assets/blinks_logo_wide.webp';
import { useService } from "../../hooks";
import { InputAsSelector, Hint } from "../../atomic/Input";
import { Link, useNavigate } from "react-router-dom";

import AuthWrapper from "./layout";
// Form validation schema
import { signUpValidationSchemaFirstStep, getErrors } from "./functions";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitPrimaryButton } from "../../atomic/Button";

const inDev = !import.meta.env.PROD;

const SignUp = () => {
    let navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [globalError, setGlobalError] = useState(null);

    const service = useService();

    // Handle form submission dans datas
    const { control, handleSubmit, formState: { isSubmitting, errors, isValid } } = useForm({
        mode: "onChange",
        resolver: yupResolver(signUpValidationSchemaFirstStep)
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const { signup_form_displayname, signup_form_email, signup_form_password } = data;

            const user = await service.signUpWithEmail(signup_form_displayname, signup_form_email, signup_form_password);

            inDev && console.log("User created : ", user);
            const { uid } = user;

            // Redirect to the registration page
            navigate(`/auth/checkup?id=${uid}&isImperative=true&fallback=default`);

        } catch (error) {
            inDev && console.log("Une erreur est survenue lors de l'inscription : ", error);
            
            const _err = getErrors(error);

            inDev && console.log(_err);

            setGlobalError(_err);
        } finally {
            setIsLoading(false);
        }
    };

    return <AuthWrapper
        title="Bienvenue sur Seendy"
        description="Inscrivez-vous et profitez de nos fonctionnalités gratuitement"
        isLoading={isLoading}
        loadingMessage="Création de votre compte..."
        returnLink="/auth/signin"
        error={globalError}
        setError={setGlobalError}
    >
        <div className="flex-col items-center justify-center w-full">
            <form onSubmit={ handleSubmit(onSubmit) }
                className="flex flex-col items-center justify-center my-2 w-full inter">

                <Controller
                    control={control}
                    name="signup_form_displayname"
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                    }) => (
                        <InputAsSelector
                            name="signup_form_displayname"
                            label="Nom et prénom"
                            placeholder="John Doe"
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
                    name="signup_form_email"
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                    }) => (
                        <InputAsSelector
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
                        <InputAsSelector
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

                <div className="h-3 w-full block"></div>

                <Hint>
                    En vous inscrivant, vous acceptez les
                    <Link to="/legal/terms" className="text-indigo-600 font-bold"> Conditions Générales d'Utilisation </Link> ainsi que la
                    <Link to="/legal/privacy" className="text-indigo-600 font-bold"> Politique de Confidentialité </Link> des services de l'application Seendy.
                </Hint>

                <div className="w-full pt-8 flex flex-row items-center justify-end">
                    <SubmitPrimaryButton
                        disabled={ isSubmitting || !isValid }
                        add="w-full"
                    >
                        { isSubmitting ? "Un instant..." : "Créer mon compte" }
                    </SubmitPrimaryButton>

                </div>
            </form>
        </div>
    </AuthWrapper>;
};

export default SignUp;