import { Edit } from 'react-feather';
import { Controller, useForm, type FieldValues } from 'react-hook-form';
import { SecondaryButton, SubmitPrimaryButton } from '../../../../../app_atomic/Button';
import { Card } from '../../../../../app_atomic/Card';
import { InputBlock, InputBlockArea } from '../../../../../app_atomic/Input';
import { Modal, ModalHr } from '../../../../../app_atomic/Modal';
import { Paragraph } from '../../../../../app_atomic/Paragraph';
import { PrimaryTitle } from '../../../../../app_atomic/Title';
import { EditingOutput } from '../../../../../app_contexts/Editor/interfaces';

import { yupResolver } from '@hookform/resolvers/yup';
import { editOutputSchema } from './functions';
import { EditingOutputFormDataType } from './interfaces';
import useEditorService from '../../../../../app_hooks/contexts_hooks/useEditorService';
import { ProjectId } from '../../../common/interfaces/Editor';
import { useParams } from 'react-router-dom';
import useEditor from '../../../../../app_hooks/contexts_hooks/useEditor';

const EditOutputModal = ({
    currentEditingOutput,
    setCurrentEditingOutput,
}: {
    currentEditingOutput: EditingOutput,
    setCurrentEditingOutput: (editingOutput: EditingOutput | null) => void,
}) => {
    const editorService = useEditorService();
    const { realtimeOutputs } = useEditor();

    const projectId: ProjectId = useParams<{ projectId: ProjectId }>().projectId as string;
    const { from, to, output } = currentEditingOutput.output;

    // Handle form submission dans datas
    const { control, handleSubmit, formState: { isSubmitting, isValid } } = useForm({
        resolver: yupResolver(editOutputSchema),
        defaultValues: {
            from_timestamp: from,
            to_timestamp: to,
            output_transcription: output,
        }
    });

    const onClose = () => setCurrentEditingOutput(null);

    const handleOutputEdit = async (data: FieldValues) => {
        const { 
            from_timestamp, 
            to_timestamp, 
            output_transcription
        } = data as EditingOutputFormDataType;

        const newOutputContent: EditingOutput = {
            index: currentEditingOutput.index,
            output: {
                from: from_timestamp,
                to: to_timestamp,
                output: output_transcription,
            }
        };

        try {
            await editorService.updateOutput(projectId, newOutputContent, realtimeOutputs);
            onClose();
        } catch (error) {
            console.error(error);
        }
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
                                    label="From (s)"
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
                                    label="To (s)"
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
                    <SubmitPrimaryButton disabled={!isValid || isSubmitting}>
                        Enregistrer les modifications
                    </SubmitPrimaryButton>
                    <SecondaryButton action={onClose}>
                        Annuler les modifications
                    </SecondaryButton>
                </div>

            </form>
        </Card>
    </Modal>
};

export default EditOutputModal;