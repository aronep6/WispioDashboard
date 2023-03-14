
import PageError from "../../../PagePoster/PageError";
import PageLoading from "../../../Loading/PageLoading";

import ProjectEditor from "./ProjectEditor";
import useEditor from "../../../../app_hooks/contexts_hooks/useEditor";

export default function index() {
    const {
        _page_isLoading,
        _page_error,
    } = useEditor();

    return (
        <div>
            {
                _page_error ? <PageError message={_page_error} /> :
                    _page_isLoading ? <PageLoading /> : <ProjectEditor />
            }
        </div>
    );
};