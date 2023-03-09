import { Outlet } from "react-router-dom";
import { EditorProvider } from "../../../app_contexts/Editor";
import { EditorServiceProvider } from "../../../app_contexts/EditorService";
import PageWrapper from "../common/PageWrapper";

const pageProps = {
    pageTitle: "Editor",
};

const Editor = () => {
    return <PageWrapper {...pageProps}>
        <div className="flex flex-col">
            <Outlet />
        </div>
    </PageWrapper>;
};

export default function index() {
    return <EditorServiceProvider>
        <EditorProvider>
            <Editor />
        </EditorProvider>
    </EditorServiceProvider>
};