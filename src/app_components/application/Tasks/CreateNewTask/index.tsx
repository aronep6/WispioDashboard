import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useState } from "react";
import { File, Plus } from "react-feather";
import { Controller, useForm, type FieldValues } from "react-hook-form";
import { Card } from "../../../../app_atomic/Card";
import { FileSelector, SelectForm } from "../../../../app_atomic/Input";
import { Modal, ModalHr, ModalSection } from "../../../../app_atomic/Modal"
import { Hint, PrimaryTitle } from "../../../../app_atomic/Title";
import { modelSizeListReadable, readableLanguageName } from "../../../../app_common/interfaces/WispioTask";
import { createNewTaskValidationSchema } from "./functions";
import { type CreateNewTaskFormDataType } from "./interfaces";
import { SubmitPrimaryButton } from "../../../../app_atomic/Button";

const CreateNewTask = () => {
    const [openMoreSettings, setOpenMoreSettings] = useState<boolean>(true);

    const toggleMoreSettings = useCallback(() => {
        return setOpenMoreSettings((prev) => !prev);
    }, []);

    // Handle form submission dans datas
    const { control, handleSubmit, formState: { isSubmitting, isValid } } = useForm({
        mode: "onChange",
        resolver: yupResolver(createNewTaskValidationSchema),
    });

    const onSubmit = (data: FieldValues) => {
        // const { 
        //    task_name, 
        //    task_description
        //} = data as CreateNewTaskFormDataType;
    };

    return <Modal>
        <Card modal={true}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='max-w-2xl flex flex-col gap-1 px-1'>

                <div className="flex flex-row gap-3 px-2 items-center">
                    <Plus className="w-6 h-6 text-indigo-600" />

                    <PrimaryTitle>
                        Nouvelle transcription
                    </PrimaryTitle>
                </div>

                <ModalHr />

                <div className="grid grid-cols-2 gap-6">

                    <FileSelector
                        icon={<File />}
                        title="Sélectionnez ou déposez votre fichier ici."
                    />

                    <ModalSection
                        title="Paramètres avancés"
                        show={openMoreSettings}
                        toggleShowFn={toggleMoreSettings}
                        toggleTitleShow={ openMoreSettings ? "Masquer" : "Afficher" }
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
                                    label="Modèle de l'IA pour la transcription"
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