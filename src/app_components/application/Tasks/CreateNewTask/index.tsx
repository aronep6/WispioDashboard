import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useMemo, useState } from "react";
import { Plus } from "react-feather";
import { Controller, useForm, type FieldValues } from "react-hook-form";
import { Card } from "../../../../app_atomic/Card";
import { SelectForm } from "../../../../app_atomic/Input";
import { Modal, ModalHr, ModalSection } from "../../../../app_atomic/Modal"
import { Hint, PrimaryTitle } from "../../../../app_atomic/Title";
import { modelSizeListReadable, readableLanguageName } from "../../../../app_common/interfaces/WispioTask";
import createNewTaskValidationSchema from "./create-new-task.validation-schema";
import createNewTaskAdvancedSettingsDefaultConfig from "../interfaces/create-task-advanced-settings.default";
import { type CreateNewTaskFormDataType } from "./interfaces";
import { SubmitPrimaryButton } from "../../../../app_atomic/Button";
import Switch from "../../../../app_atomic/Switch";
import { ControlledFileSelector } from "../../../../app_atomic/FileSelector";
import { ALLOWED_EXTENSIONS } from "./common/supported-formats";
import { SingleInformationTableRowInterface } from "../../../common/components/InformationTable/interfaces";

const CreateNewTask = () => {
    const [openMoreSettings, setOpenMoreSettings] = useState<boolean>(false);
    
    const toggleMoreSettings = useCallback(() => {
        return setOpenMoreSettings((prev) => !prev);
    }, []);

    const { control, getValues, handleSubmit, formState: { isSubmitting, isValid } } = useForm({
        mode: "onChange",
        resolver: yupResolver(createNewTaskValidationSchema),
        defaultValues: createNewTaskAdvancedSettingsDefaultConfig,
    });
    
    const computedModalSectionCurrentValues: SingleInformationTableRowInterface[] = useMemo(() => {
        const data = getValues();

        const model = modelSizeListReadable.find((modelSize) => modelSize.value === data.model_size);
        const language = readableLanguageName.find((language) => language.value === data.target_translate_language);

        return [
            {
                key: "Taille du modèle",
                value: model?.label ?? "Non défini",
            },
            {
                key: "Langue de transcription",
                value: language?.label ?? "Non défini",
            },
            {
                key: "Accélération matérielle",
                value: data.use_material_acceleration ? "Activée" : "Désactivée",
            },
        ];
    }, [openMoreSettings]);

    const onSubmit = async (data: FieldValues) => {
        const {
            file,
            model_size,
            target_translate_language,
            use_material_acceleration,
        } = data as CreateNewTaskFormDataType;

        await new Promise((resolve) => setTimeout(resolve, 6000));

        console.log({
            file,
            model_size,
            target_translate_language,
            use_material_acceleration,
        });
    };

    return <Modal>
        <Card modal={true} isLoading={isSubmitting}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='max-w-xl flex flex-col gap-1 px-1'>

                <div className="flex flex-row gap-3 px-2 items-center">
                    <Plus className="w-6 h-6 text-indigo-600" />

                    <PrimaryTitle>
                        Nouvelle transcription
                    </PrimaryTitle>
                </div>

                <ModalHr />

                <div className="grid gap-4">

                    <Controller
                        control={control}
                        name="file"
                        render={({
                            field: { value, onChange },
                            fieldState: { error },
                        }) => (
                            <ControlledFileSelector
                                name="file"
                                onFileChange={onChange}
                                value={value}
                                allowedExtensions={ALLOWED_EXTENSIONS}
                                required={true}
                                error={error}
                                errorMessage={error?.message}
                            />
                        )}
                    ></Controller>

                    <ModalSection
                        title="Paramètres avancés"
                        show={openMoreSettings}
                        toggleShowFn={toggleMoreSettings}
                        toggleTitleShow={openMoreSettings ? "Masquer" : "Afficher"}
                        sectionCurrentValues={computedModalSectionCurrentValues}
                    >

                        <Controller
                            control={control}
                            name="model_size"
                            render={({
                                field: { onChange, value },
                                fieldState: { error },
                            }) => (
                                <SelectForm
                                    name="model_size"
                                    label="Taile du modèle IA pour la transcription"
                                    value={value}
                                    onChange={onChange}
                                    options={modelSizeListReadable}
                                    error={error}
                                    errorMessage={error?.message}
                                />
                            )}
                        ></Controller>

                        <Hint>
                            Plus le modèle est grand, plus la transcription sera précise, mais plus le temps de transcription sera long.
                        </Hint>

                        <Controller
                            control={control}
                            name="target_translate_language"
                            render={({
                                field: { onChange, value },
                                fieldState: { error },
                            }) => (
                                <SelectForm
                                    name="target_translate_language"
                                    label="Transcription en"
                                    value={value}
                                    onChange={onChange}
                                    options={readableLanguageName}
                                    error={error}
                                    errorMessage={error?.message}
                                />
                            )}
                        ></Controller>

                        <Hint>
                            Si vous souhaitez que la transcription soit traduite dans une langue, sélectionnez-la ici. Autrement le texte sera transcrit dans la langue detectée.
                        </Hint>

                        <Controller
                            control={control}
                            name="use_material_acceleration"
                            render={({
                                field: { onChange, value },
                                fieldState: { error },
                            }) => (
                                <Switch
                                    name="use_material_acceleration"
                                    checked={value}
                                    onChange={onChange}
                                    label="Utiliser l'accélération mat. (BETA)"
                                    error={error}
                                    checkedBackgroundClass="bg-indigo-600"
                                    errorMessage={error?.message}
                                ></Switch>
                            )}
                        ></Controller>

                        <Hint>
                            L'accélération matérielle permet d'accélérer la transcription sur nos instances. Cela peut provoquer des incohérences dans la transcription.
                        </Hint>

                    </ModalSection>

                </div>

                <ModalHr />

                <div className="flex flex-row gap-6 justify-end items-center">
                    <Hint>
                        Après avoir cliqué sur "Commencer la transcription", vous ne pourrez plus modifier les paramètres de traitement de votre fichier.
                    </Hint>
                    <SubmitPrimaryButton useMargin={false} disabled={isSubmitting || !isValid}>
                        Commencer la transcription
                    </SubmitPrimaryButton>
                </div>

            </form>
        </Card>
    </Modal>
};

export default CreateNewTask;