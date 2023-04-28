import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm, type FieldValues } from "react-hook-form";
import { SubmitPrimaryButton } from "../../../../../../app_atomic/Button";
import { InformativeCard } from "../../../../../../app_atomic/Card";
import { InputBlock } from "../../../../../../app_atomic/Input";
import useAccountSettingsService from "../../../../../../app_hooks/contexts_hooks/useAccountSettingsService";
import useSnackbarService from "../../../../../../app_hooks/contexts_hooks/useSnackbarService";
import SettingsSectionGroup from "../../../common/components/SettingsSectionGroup";
import { updatePasswordSchema } from "../functions/update-password-schema";
import { type UpdatePasswordFormDataType } from "./interfaces";
import { SnackbarElement, SnackbarType } from "../../../../../../app_contexts/SnackbarService/interfaces";

const UpdatePassword = () => {
    const isLoaded = true;
    const ac_service = useAccountSettingsService();

    const snackbar_service = useSnackbarService();

    // Handle form submission dans datas
    const { control, handleSubmit, reset, formState: { isSubmitting, isValid } } = useForm({
        mode: "onChange",
        resolver: yupResolver(updatePasswordSchema),
    });

    const handlePasswordEdit = async (data: FieldValues) => {
        const event_scope = "Mot de passe";

        const {
            password_update, 
            password_update_retype, 
        } = data as UpdatePasswordFormDataType;

        try {
            const success_message = await ac_service._security_updatePassword(password_update, password_update_retype)

            reset();

            const _success_event_: SnackbarElement = {
                type: SnackbarType.Success,
                title: event_scope,
                message: success_message,
                duration: 9000,
            };

            snackbar_service.addSnackbarElement(_success_event_);
        } catch (error: any) {
            const _error_event_ : SnackbarElement = {
                type: SnackbarType.Warning,
                title: event_scope,
                message: error.message,
                duration: 9000,
            };

            snackbar_service.addSnackbarElement(_error_event_);
        }
    };

    return <SettingsSectionGroup title="Modifier mon mot de passe" isLoading={!isLoaded}>
        <form onSubmit={handleSubmit(handlePasswordEdit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
            <div className="col-span-1">

                <Controller
                    control={control}
                    name="password_update"
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                    }) => (
                        <InputBlock
                            name="password_update"
                            label="Nouveau mot de passe"
                            placeholder="****************"
                            type="password"
                            value={value}
                            onChange={onChange}
                            error={error}
                            errorMessage={error?.message}
                        />
                    )}
                ></Controller>

                <Controller
                    control={control}
                    name="password_update_retype"
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                    }) => (
                        <InputBlock
                            name="password_update_retype"
                            label="Confirmez votre nouveau mot de passe"
                            placeholder="****************"
                            type="password"
                            value={value}
                            onChange={onChange}
                            error={error}
                            errorMessage={error?.message}
                        />
                    )}
                ></Controller>
            </div>

            <div className="col-span-1 mt-8 mb-1">
                <InformativeCard
                    title="Choisissez un mot de passe robuste"
                    description="Nous vous recommandons de choisir un mot de passe robuste, composé de chiffres, de lettres, de caractères spéciaux et d'une longueur minimale de 8 caractères."
                />
            </div>

            <div className="col-span-2 flex flex-row justify-end">
                <SubmitPrimaryButton disabled={!isValid || isSubmitting}>
                    Mettre à jour mon mot de passe
                </SubmitPrimaryButton>
            </div>
        </form>
    </SettingsSectionGroup>
};

export default UpdatePassword;