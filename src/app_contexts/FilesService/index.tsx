import { createContext } from "react";
import FilesService from "../../app_common/Service/Application/FilesService";

const FilesServiceContext = createContext({} as FilesService);

const FilesServiceProvider = ({ children }: { children: React.ReactNode }) => {
    return <FilesServiceContext.Provider value={
        new FilesService()
    }>
        { children }
    </FilesServiceContext.Provider>;
};

export { FilesServiceProvider };
export default FilesServiceContext;