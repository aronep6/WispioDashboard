import { yupResolver } from "@hookform/resolvers/yup";
import { Plus } from "react-feather";
import { Controller, useForm, type FieldValues } from "react-hook-form";
import { Card } from "../../../../app_atomic/Card";
import { SelectForm } from "../../../../app_atomic/Input";
import { Modal, ModalHr, ModalSection } from "../../../../app_atomic/Modal"
import { Hint, PrimaryTitle } from "../../../../app_atomic/Title";
import { modelSizeListReadable, readableLanguageName } from "../../../../app_common/interfaces/WispioTask";
import { createNewTaskValidationSchema } from "./functions";
import { type CreateNewTaskFormDataType } from "./interfaces";

const CreateNewTask = () => {

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
                className='max-w-2xl flex flex-col gap-2 px-1'>

                <div className="flex flex-row gap-3 px-2 items-center">
                    <Plus className="w-6 h-6 text-indigo-600" />

                    <PrimaryTitle>
                        Nouvelle transcription
                    </PrimaryTitle>
                </div>

                <ModalHr />

                <ModalSection 
                    title="Paramètres avancés"
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
                        Le modèle de l'IA est la taille des paramètres de l'IA. Plus le modèle est grand, plus la transcription sera précise, mais plus le temps de transcription sera long.
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
                        Si vous souhaitez que la transcription soit traduite en une autre langue, sélectionnez-la ici. Autrement le texte sera transcrit dans la langue detectée par l'IA.
                    </Hint>

                </ModalSection>

                <ModalHr />


            </form>
        </Card>
    </Modal>
};

export default CreateNewTask;