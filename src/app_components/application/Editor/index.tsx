import { memo } from "react";
import { Outlet, useParams } from "react-router-dom";
import { EditorProvider } from "../../../app_contexts/Editor";
import { EditorServiceProvider } from "../../../app_contexts/EditorService";
import { type ProjectId } from "../common/interfaces/Editor";
import PageWrapper from "../common/PageWrapper";

const pageProps = {
    pageTitle: "Editor",
    usePadding: false,
};

const Editor = () => {
    return <PageWrapper {...pageProps}>
        <div className="flex flex-col h-full">
            <Outlet />
        </div>
    </PageWrapper>;
};

function index() {
    const projectId: ProjectId = useParams<{ projectId: ProjectId }>().projectId;

    return <EditorServiceProvider>
        <EditorProvider projectId={projectId}>
            <Editor />
        </EditorProvider>
    </EditorServiceProvider>
};

export default memo(index, () => false);