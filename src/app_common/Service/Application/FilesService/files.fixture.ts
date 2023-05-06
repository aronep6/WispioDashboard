import { ApplicationFile } from "./interfaces";

const _file_1_: ApplicationFile = {
    id: "1",
    name: "video_test",
    bucket: "bucket_1",
    path: "path_1",
    size: 8956100,
    type: "image",
    createdAt: "2021-08-01T00:00:00.000Z",
    updatedAt: "2021-08-01T00:00:00.000Z",
    fileStatus: {
        isAvailable: true,
        isDeleted: false,
        isBlocked: false,
        isArchived: false,
        isHidden: false,
        shared: false,
    },
    owner: {
        uid: "1",
        displayName: "Ousmane Mbaye"
    },
    contentTypes: [
        "image/jpeg",
        "image/png",
    ],
};

const _file_2_: ApplicationFile = {
    id: "2",
    name: "video_pour_hagar",
    bucket: "bucket_1",
    path: "path_2",
    size: 1469300,
    type: "audio",
    createdAt: "2021-08-01T00:00:00.000Z",
    updatedAt: "2021-08-01T00:00:00.000Z",
    fileStatus: {
        isAvailable: true,
        isDeleted: false,
        isBlocked: false,
        isArchived: false,
        isHidden: false,
        shared: false,
    },
    owner: {
        uid: "1",
        displayName: "Ousmane Mbaye"
    },
    contentTypes: [
        "audio/mpeg",
        "audio/ogg",
    ],
};

export {
    _file_1_,
    _file_2_,
};
