import type { ApplicationFile } from "../../../../app_common/Service/Application/FilesService/interfaces";
import { File, MoreVertical } from "react-feather";

const SingleFile = ({ file }: { file: ApplicationFile }) => {

    const fileSize = file.size / 1024 / 1024;

    return <div
        className="bg-white border cursor-pointer rounded 
            hover:bg-gray-50 duration-150 p-3 shadow-sm group
            flex flex-col justify-between gap-2
            h-52 w-52 shrink-0"
    >
        <div className="flex h-full flex-col gap-2 justify-between relative">
            <div className="absolute flex items-center justify-center top-0 right-0 hover:bg-gray-200 h-7 w-7 rounded-full">
                <MoreVertical className="h-5 w-5" strokeWidth={1.5} fill="currentColor"></MoreVertical>
            </div>
            <div className="grow flex flex-col items-center justify-center">
                <File className="h-24 w-24 group-hover:scale-105 duration-150" strokeWidth={0.5}></File>
            </div>
            <div className="flex flex-col gap-0.5 duration-150">
                <div className="text-sm font-semibold text-gray-500 group-hover:text-gray-700">
                    {file.name}
                </div>
                <div className="text-xs text-gray-400 group-hover:text-gray-600">
                    {fileSize.toFixed(2)} MB
                </div>
            </div>
        </div>
    </div>
};

export default SingleFile;