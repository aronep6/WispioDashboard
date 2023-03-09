import PageWrapper from "../common/PageWrapper";

const pageProps = {
    pageTitle: "Projects Builder",
};

const ProjectsBuilder = () => {
    return <PageWrapper {...pageProps}>
        <div className="flex flex-col">
            This is the projects builder page content area (not the sidebar)
        </div>
    </PageWrapper>;
}

export default ProjectsBuilder;