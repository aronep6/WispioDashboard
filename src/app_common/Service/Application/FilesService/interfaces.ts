export interface ApplicationFile {
    id: ApplicationFileId;
    name: string;
    bucket: string;
    path: string;
    size: number;
    type: ApplicationFileType;
    createdAt: string;
    updatedAt: string;
    fileStatus: ApplicationFileStatus;
    owner: ApplicationFileOwner;
    contentTypes: string[];
}

export interface ApplicationFileStatus {
    isAvailable: boolean;
    isDeleted: boolean;
    isBlocked: boolean;
    isArchived: boolean;
    isHidden: boolean;
    shared: boolean;
}

export type ApplicationFileId = string;

export interface ApplicationFileOwner {
    uid: string;
}

export type ApplicationFileType = "image" | "video" | "audio" | "document" | "archive" | "other";