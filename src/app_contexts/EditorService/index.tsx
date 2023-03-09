import { createContext } from "react";
import EditorService from "../../app_common/Service/Application/EditorService";

const EditorServiceContext = createContext({} as EditorService);

const EditorServiceProvider = ({ children }: { children: React.ReactNode }) => {
    return <EditorServiceContext.Provider value={
        new EditorService()
    }>
        { children }
    </EditorServiceContext.Provider>;
};

export { EditorServiceProvider };
export default EditorServiceContext;