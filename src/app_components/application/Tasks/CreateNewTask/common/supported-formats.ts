import type { AllowedExtensions } from "../../../../../app_common/interfaces/File";

const SUPPORTED_FORMATS: string[] = [
    "audio/mpeg",
    "audio/wav",
    "audio/ogg",
    "audio/mp4",
    "audio/mp3",
    "audio/aac",
    "audio/flac",
    "audio/x-flac",
    "audio/x-wav",
    "audio/x-m4a",
];

const ALLOWED_EXTENSIONS: AllowedExtensions[] = [
    ".mp3",
    ".wav",
    ".ogg",
    ".mp4",
    ".aac",
    ".flac",
    ".m4a",
];

export {
    SUPPORTED_FORMATS,
    ALLOWED_EXTENSIONS,
};