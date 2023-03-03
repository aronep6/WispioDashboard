import { useState, useEffect, useContext } from "react";
import { CheckCircle } from "react-feather";
import { PrimaryTitle, SecondaryTitle } from '../../atomic/Title';
import { AuthSignUpCheckContext, AuthSignUpCheckContextProvider } from "./contexts/AuthSignUpCheckContext";
import { InputAsSelector, Hint } from "../../atomic/Input";
import { useNavigate, Link } from "react-router-dom";
import { useUserSession } from "../../hooks";
// Auth wrapper 
import AuthWrapper from "./layout";
// Form validation schema
import { checkUpValidationSchema } from "./functions";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitPrimaryButton, SecondaryButton } from "../../atomic/Button";
import CookieConsent from "../Cookies/CookieConsent";

const SEND_CODE_FEATURE_IS_ACTIVE = true;

const SuccessfulRegistration = (email = "null") => {
    const handleConnect = async () => {
        window.location.href = `/auth/signin?code=0&flow=dashWelcome&fillemail=${ email }&fallback=default`;
    };

    return <div className="flex flex-col items-center justify-center">
        <CheckCircle size={50} className="text-green-500 dark:text-green-400 hidden mb-4" />
        <SecondaryTitle add="text-center text-slate-600 mb-3">
            Votre adresse email a été vérifiée avec succès. Vous pouvez maintenant vous connecter à votre compte Seendy.
        </SecondaryTitle>
        <div className="w-full flex flex-row justify-center">
            <SecondaryButton 
                action={() => handleConnect()}
                add="min-w-max">
                Se connecter
            </SecondaryButton>
        </div>
    </div>
};

const CountdonwnBeforeResend = ({ onResend }) => {
    const default_countdown = 45;

    const [countdown, setCountdown] = useState(default_countdown);
    const [ableToResend, setAbleToResend] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown(countdown - 1);
        }, 1000);

        if (countdown <= 0) { clearInterval(interval); setAbleToResend(true) }

        return () => clearInterval(interval);
    }, [countdown]);

    const handleResend = () => {
        if (ableToResend) {
            onResend();
            setCountdown(default_countdown);
            setAbleToResend(false);
        }
    };

    return <div className="flex flex-col items-center justify-center">
        <Hint>
            Si vous ne l'avez pas reçu, vous pouvez en demander un nouveau dans
            <span className="font-bold"> {countdown} </span>
            seconde{countdown > 1 && "s"}. 

            {ableToResend ?
                <span className="text-indigo-600 font-bold cursor-pointer underline" onClick={handleResend}>Renvoyer un nouveau code</span> :
                <span className="text-indigo-600 opacity-50 cursor-not-allowed"> Renvoyer un nouveau code </span>
            }
        </Hint>
    </div>
};

const CheckUp = () => {
    let navigate = useNavigate();

    const checkup = useContext(AuthSignUpCheckContext);

    // Temporary state (globalError)
    const [globalError, setGlobalError] = useState(null);

    const [readyForCheck, setReadyForCheck] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const user = useUserSession();

    // Show loading while userSession is not ready
    useEffect(() => {
        if (user) return setIsLoading(false);
        setIsLoading(true);
    }, [user]);

    useEffect(() => {
        if (!user) return;
        if (isSubmitting) return;
        
        try {
            // if (user.emailVerified) return setIsSuccess(true);
            // Get the URL parameter
            const params = new URLSearchParams(window.location.search);
    
            // Get query parameter by name
            const identifier = params.get("id");
            const isImperative = params.get("isImperative");
    
            if (isImperative === "true" && identifier.length > 10) {
                setReadyForCheck(true);
            } else {
                return navigate("/auth/signin?code=0&fallback=default");
            }
        } catch (error) {
            setGlobalError(`${ error }`);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading]);

    const getVerificationCode = async () => {
        if (!SEND_CODE_FEATURE_IS_ACTIVE) return;
        try {
            await checkup.getVerificationCode();
        } catch (error) {
            setGlobalError(`${ error }`)
        }
    };

    useEffect(() => { // Send confirmation code on page load
        if (!readyForCheck) return;

        const run = async () => {
            await getVerificationCode();
        };

        run();
    }, [readyForCheck]);

    // Force user to logout to update the session for the next login
    useEffect(() => {
        if (!user || !isSuccess) return;
        
        const run = async () => { 
            await checkup.logout(); 
        };
        run();
    }, [isSuccess]);

    // Handle form submission dans datas
    const { control, handleSubmit, setError, formState: { isSubmitting, isValid } } = useForm({
        mode: "onChange",
        resolver: yupResolver(checkUpValidationSchema),
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const { signup_form_verification_code } = data;
            const server_response = await checkup.checkVerificationCode(signup_form_verification_code);

            if (!server_response.success) {
                const message = server_response.error;
                setError("signup_form_verification_code", { type: "manual", message });
                setGlobalError(`${ message }`);
            } else {
                setIsSuccess(true);
            }
        } catch (error) {
            setGlobalError(`${ error }`);
        } finally {
            setIsLoading(false);
        }
    };

    return isSuccess ? <AuthWrapper
        title="Votre compte est prêt !"
        // description="Votre compte à été activé avec succès. Vous pouvez maintenant vous connecter à votre compte Seendy."
        isLoading={false}
    >
        <SuccessfulRegistration email={ user && user.email } />
    </AuthWrapper> 
        :
    <AuthWrapper
        title="Vérification de votre compte"
        description="Dernière étape avant de pouvoir accéder à votre espace personnel"
        isLoading={isLoading}
        loadingMessage="Vérification des informations..."
        returnLink="/?code=0&flow=checkuserstatement&fallback=default"
        error={globalError}
        setError={setGlobalError}
    >
        <div className="flex-col items-center justify-center w-full">
            <form onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-center justify-center mb-2 w-full grotesk">

                <Controller
                    control={control}
                    name="signup_form_verification_code"
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                    }) => (
                        <InputAsSelector
                            name="signup_form_verification_code"
                            label="Code de vérification"
                            type="text"
                            add="tracking-wide inter"
                            placeholder="ex: 123456"
                            value={value}
                            onChange={onChange}
                            error={error}
                            errorMessage={error?.message}
                        />
                    )}
                ></Controller>

                <div className="h-2 w-full block"></div>

                { user && <Hint>
                    Pour nous assurer que vous êtes bien le propriétaire de ce compte, nous vous avons envoyé à l'instant un code de vérification à l'adresse email suivante :
                    <span className="font-bold"> {user.email} </span>
                </Hint> }

                <div className="h-2 w-full block"></div>

                <CountdonwnBeforeResend onResend={() => getVerificationCode()} />

                <div className="w-full pt-8 flex flex-row items-center">

                    <SubmitPrimaryButton
                        add="w-full"
                        disabled={isSubmitting || !isValid || !readyForCheck}
                    >
                        Vérifier mon compte
                    </SubmitPrimaryButton>

                </div>
            </form>
        </div>
        <CookieConsent />
    </AuthWrapper>
};

const CheckUpWithContext = () => {
    return <AuthSignUpCheckContextProvider>
        <CheckUp />
    </AuthSignUpCheckContextProvider>
}

export default CheckUpWithContext;