import { EditorServiceProvider } from "../../../app_contexts/EditorService";
import PageWrapper from "../common/PageWrapper";

const pageProps = {
    pageTitle: "Editor",
};

const Editor = () => {
    return <PageWrapper {...pageProps}>
        <div className="flex flex-col">
            This is the projects builder page content area (not the sidebar)
        </div>
    </PageWrapper>;
};

export default function index() {
    return <EditorServiceProvider>
        <Editor />
    </EditorServiceProvider>
};