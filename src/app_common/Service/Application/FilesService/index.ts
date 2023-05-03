import Core from "../../Core";
import { ApplicationFile, ApplicationFileId } from "./interfaces";
import type { CommonResponseDTO } from "../../Core/interfaces";
import { _file_1_, _file_2_ } from "./files.fixture";

class FilesService extends Core {
    constructor() {
        super();
    }

    async getAllFiles(): Promise<CommonResponseDTO<ApplicationFile[]>> {
        try {
            // await this.sleep(3000);

            const files: ApplicationFile[] = [
                _file_1_,
                _file_2_,
            ];

            return {
                success: true,
                data: files,
                error: null,
            }
        } catch (error: any) {
            throw error;
        }
    }

    async getFileById(id: ApplicationFileId): Promise<CommonResponseDTO<ApplicationFile>> {
        try {
            // await this.sleep(2000);

            const file = _file_1_;

            return {
                success: true,
                data: file,
                error: null,
            }
        } catch (error: any) {
            throw error;
        }
    }
}

export default FilesService;