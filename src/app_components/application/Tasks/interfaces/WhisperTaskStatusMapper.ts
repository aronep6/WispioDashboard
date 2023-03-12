import { WhisperTaskStatus } from "../../common/interfaces/WispioEngine";

const WhisperTaskStatusMapper = new Map<WhisperTaskStatus | string, string>([
    [WhisperTaskStatus.NotReady, "Non prêt"],
    [WhisperTaskStatus.Uploading, "Téléversement en cours"],
    [WhisperTaskStatus.UploadingFailed, "Échec du téléversement"],
    [WhisperTaskStatus.Pending, "En attente de traitement"],
    [WhisperTaskStatus.Processing, "Transcription en cours"],
    [WhisperTaskStatus.Completed, "Transcription terminée"],
    [WhisperTaskStatus.Failed, "Échec de la transcription"],
    [WhisperTaskStatus.Unknown, "État inconnu"],
]);

export default WhisperTaskStatusMapper;
