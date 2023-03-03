import { useState } from "react";
import _logo_ from '../../assets/blinks_logo_wide.webp';
import { useService } from "../../hooks";
import { InputAsSelector, Hint } from "../../atomic/Input";
import { useNavigate } from "react-router-dom";

import AuthWrapper from "./layout";
// Form validation schema
import { forgotPasswordValidationSchema, getErrors } from "./functions";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitPrimaryButton } from "../../atomic/Button";
import { CheckCircle } from "react-feather";

const inDev = !import.meta.env.PROD;

const ForgotPassword = () => {
    let navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [globalError, setGlobalError] = useState(null);
    const [success, setSuccess] = useState(false);

    const service = useService();

    // Handle form submission dans datas
    const { control, handleSubmit, formState: { isSubmitting, isValid } } = useForm({
        mode: "onChange",
        resolver: yupResolver(forgotPasswordValidationSchema)
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const { forgot_password_form_email } = data;

            const status = await service.resetPassword(forgot_password_form_email);

            inDev && console.log("Reset password status : ", status);

            setSuccess(true);
        } catch (error) {
            inDev && console.log("Une erreur est survenue lors de laa tentative de réinitialisation du mot de passe : ", error);
            const _err = getErrors(error);
            setGlobalError(_err);
        } finally {
            setIsLoading(false);
        }
    };

    return <AuthWrapper
        title="Mot de passe oublié"
        description="Entrez votre adresse email pour réinitialiser votre mot de passe"
        isLoading={isLoading}
        loadingMessage="Un instant ..."
        returnLink="/auth/signin"
        error={globalError}
        setError={setGlobalError}
    >
        <div className="flex-col items-center justify-center w-full">
            <form onSubmit={ handleSubmit(onSubmit) }
                className="flex flex-col items-center justify-center my-2 w-full inter">

                <Controller
                    control={control}
                    name="forgot_password_form_email"
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                    }) => (
                        <InputAsSelector
                            name="forgot_password_form_email"
                            label="Adresse email"
                            placeholder="Votre adresse email"
                            type="text"
                            value={value}
                            onChange={onChange}
                            error={error}
                            errorMessage={error?.message}
                        />
                    )}
                ></Controller>

                <div className="h-3 w-full block"></div>

                { !success ?<Hint>
                    Nous allons vous envoyer un email avec un lien pour réinitialiser votre mot de passe. 
                    Vérifiez votre boîte de réception. Si vous ne trouvez pas l'email, vérifiez votre dossier spam.
                </Hint> : <div className="flex items-center justify-center bg-green-100 rounded p-3">
                    <CheckCircle className="text-green-600 mr-3" size={28} />
                    <p className="text-xs text-green-700 mx-0.5">
                        Un email de réinitialisation de mot de passe vous a été envoyé. Vérifiez votre boîte de réception.
                    </p>
                </div> }

                <div className="w-full pt-8 flex flex-row items-center justify-end">
                    <SubmitPrimaryButton
                        disabled={ isSubmitting || !isValid || success }
                        add="w-full"
                    >
                        { isSubmitting ? "Un instant..." : "Réinitialiser mon mot de passe" }
                    </SubmitPrimaryButton>

                </div>
            </form>
        </div>
    </AuthWrapper>;
};

export default ForgotPassword;