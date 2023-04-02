import { useState, useRef, useEffect } from "react";
import _logo_ from '../../assets/blinks_logo_wide.webp';
import { InputBlock } from "../../../app_atomic/Input";
import { Hint } from "../../../app_atomic/Title";
import AuthWrapper from "../layout";
// Form validation schema
import { forgotPasswordValidationSchema, getErrors } from "../functions";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitPrimaryButton } from "../../../app_atomic/Button";
import { CheckCircle } from "react-feather";
import { ForgotPasswordFormDataType } from "./interfaces";
import useAuth from "../../../app_hooks/contexts_hooks/useAuth";

const inDev = !import.meta.env.PROD;

const getSnapshotFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const snapshot = params.get("snapshot");
    return snapshot;
};

const ForgotPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [globalError, setGlobalError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const forgot_password_form_email_ref = useRef<HTMLInputElement>(null);

    const auth = useAuth();

    // Handle form submission dans datas
    const { control, handleSubmit, formState: { isSubmitting, isValid } } = useForm({
        mode: "onChange",
        resolver: yupResolver(forgotPasswordValidationSchema),
        defaultValues: {
            forgot_password_form_email: getSnapshotFromUrl() || "",
        },
    });

    const onSubmit = async (data: FieldValues) => {
        setIsLoading(true);
        try {
            const { forgot_password_form_email } = data as ForgotPasswordFormDataType;

            const status = await auth.resetPassword(forgot_password_form_email);

            inDev && console.log("Reset password status : ", status);

            setSuccess(true);
        } catch (error: Error | unknown) {
            inDev && console.log("Une erreur est survenue lors de laa tentative de réinitialisation du mot de passe : ", error);

            const _err = getErrors(error);
            setGlobalError(_err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (forgot_password_form_email_ref.current) {
            forgot_password_form_email_ref.current.focus();
        }
    }, [globalError]);

    return <AuthWrapper
        title="Mot de passe oublié"
        titleDescription="Oui, on tous déjà au moins une fois oublié son mot de passe"
        description="Entrez votre adresse email pour réinitialiser votre mot de passe"
        isLoading={isLoading}
        loadingMessage="Un instant ..."
        returnLink="/auth/signin"
        error={globalError}
        setError={setGlobalError}
    >
        <div className="flex-col items-center justify-center w-full">
            <form onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-center justify-center my-2 w-full inter">

                <Controller
                    control={control}
                    name="forgot_password_form_email"
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                    }) => (
                        <InputBlock
                            ref={forgot_password_form_email_ref}
                            name="forgot_password_form_email"
                            label="Adresse email"
                            placeholder="Votre adresse email personnelle ✉️"
                            type="text"
                            value={value}
                            onChange={onChange}
                            error={error}
                            errorMessage={error?.message}
                        />
                    )}
                ></Controller>

                <div className="h-3 w-full block"></div>

                {!success ? <Hint>
                    Nous allons vous envoyer un email avec un lien pour réinitialiser votre mot de passe.
                    Vérifiez votre boîte de réception. Si vous ne trouvez pas l'email, vérifiez votre dossier spam.
                </Hint> : <div className="flex items-center justify-center bg-green-100 rounded p-3">
                    <CheckCircle className="text-green-600 mr-3" size={28} />
                    <p className="text-xs text-green-700 mx-0.5">
                        Un email de réinitialisation de mot de passe vous a été envoyé. Vérifiez votre boîte de réception.
                    </p>
                </div>}

                <div className="w-full pt-8 flex flex-row items-center justify-end">
                    <SubmitPrimaryButton
                        disabled={isSubmitting || !isValid || success}
                        add="w-full"
                    >
                        {isSubmitting ? "Un instant..." : "Réinitialiser mon mot de passe"}
                    </SubmitPrimaryButton>

                </div>
            </form>
        </div>
    </AuthWrapper>;
};

export default ForgotPassword;