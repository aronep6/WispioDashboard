import Core from "../../Core";
import {
    ApplicationFile,
    ApplicationFileId,
} from "./interfaces";
import {
    _file_1_,
    _file_2_,
} from "./files.fixture";

class FilesService extends Core {
    constructor() {
        super();
    }

    async getAllFiles(): Promise<ApplicationFile[]> {
        try {
            await this.sleep(3000);

            return [
                _file_1_,
                _file_2_,
            ];
        } catch (error: any) {
            throw error;
        }
    }

    async getFileById(id: ApplicationFileId): Promise<ApplicationFile> {
        try {
            await this.sleep(2000);
            return _file_1_;
        } catch (error: any) {
            throw error;
        }
    }
}

export default FilesService;