import { Edit } from 'react-feather';
import { Controller, useForm } from 'react-hook-form';
import { PrimaryButton, SecondaryButton } from '../../../../../app_atomic/Button';
import { Card } from '../../../../../app_atomic/Card';
import { InputBlock, InputBlockArea } from '../../../../../app_atomic/Input';
import { Modal, ModalHr } from '../../../../../app_atomic/Modal';
import { Paragraph } from '../../../../../app_atomic/Paragraph';
import { PrimaryTitle } from '../../../../../app_atomic/Title';
import { EditingOutput } from '../../../../../app_contexts/Editor/interfaces';

const EditOutputModal = ({
    currentEditingOutput,
    setCurrentEditingOutput,
}: {
    currentEditingOutput: EditingOutput,
    setCurrentEditingOutput: (editingOutput: EditingOutput | null) => void,
}) => {
    const { from, to, output } = currentEditingOutput.output;

    // Handle form submission dans datas
    const { control, handleSubmit, formState: { isSubmitting, isValid } } = useForm({
        // resolver: yupResolver(signInValidationSchema)
        defaultValues: {
            from_timestamp: from,
            to_timestamp: to,
            output_transcription: output,
        }
    });

    const onClose = () => setCurrentEditingOutput(null);

    const handleOutputEdit = async (data: any) => {
        // try {
        //     setIsLoading(true);
        //     const _user_ = await auth.loginWithEmail(data.signin_form_email, data.signin_form_password);            
        //     setGlobalError(null);
        //     console.log("Need to check for registration redirection (Aborted) : Not implemented yet :( ")
        //     // checkForRegistrationRedirection(_user_.user.uid);
        //     // Check if the user 
        // } catch (err: Error | unknown) {
        //     inDev && console.log("Une erreur est survenue lors de la connexion de l'utilisateur : ", err);
        //     const _err = getErrors(err);
        //     setGlobalError(_err);
        // } finally {
        //     setIsLoading(false);
        // }
    };

    return <Modal onClose={onClose}>
        <Card modal={true}>
            <form
                onSubmit={handleSubmit(handleOutputEdit)}
                className='max-w-lg flex flex-col gap-2 px-1'>

                <div className="flex flex-row gap-3 px-2 items-center">
                    <Edit className="w-6 h-6 text-indigo-600" />

                    <PrimaryTitle>
                        Modifier une transcription
                    </PrimaryTitle>
                </div>

                <ModalHr />

                <div className="grid grid-cols-2 gap-2">
                    <div className="col-span-2 hidden">
                        <Paragraph>
                            Change the output 'Hello World'
                        </Paragraph>
                    </div>

                    <div className="col-span-1">
                        <Controller
                            control={control}
                            name="from_timestamp"
                            render={({
                                field: { onChange, value },
                                fieldState: { error },
                            }) => (
                                <InputBlock
                                    name="from_timestamp"
                                    label="From (ms)"
                                    placeholder="3500"
                                    type="number"
                                    value={value}
                                    onChange={onChange}
                                    error={error}
                                    errorMessage={error?.message}
                                />
                            )}
                        ></Controller>
                    </div>

                    <div className="col-span-1">
                        <Controller
                            control={control}
                            name="to_timestamp"
                            render={({
                                field: { onChange, value },
                                fieldState: { error },
                            }) => (
                                <InputBlock
                                    name="to_timestamp"
                                    label="To (ms)"
                                    placeholder="3500"
                                    type="number"
                                    value={value}
                                    onChange={onChange}
                                    error={error}
                                    errorMessage={error?.message}
                                />
                            )}
                        ></Controller>
                    </div>

                    <div className="col-span-2">

                        <Controller
                            control={control}
                            name="output_transcription"
                            render={({
                                field: { onChange, value },
                                fieldState: { error },
                            }) => (
                                <InputBlockArea
                                    name="output_transcription"
                                    label="Transcription"
                                    placeholder="Hello World, my name is John Doe"
                                    value={value}
                                    onChange={onChange}
                                    error={error}
                                    errorMessage={error?.message}
                                />
                            )}
                        ></Controller>

                    </div>
                </div>

                <ModalHr />

                <div className="grid grid-cols-2 gap-2 items-center">
                    <PrimaryButton>
                        Enregistrer les modifications
                    </PrimaryButton>
                    <SecondaryButton action={onClose}>
                        Annuler les modifications
                    </SecondaryButton>
                </div>

            </form>
        </Card>
    </Modal>
};

export default EditOutputModal;