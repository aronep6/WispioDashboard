import PageWrapper from "../common/PageWrapper";

const pageProps = {
    pageTitle: "Projects",
};

const Projects = () => {
    return <PageWrapper {...pageProps}>
        <div className="flex flex-col">
            This is the projects page content area (not the sidebar)
        </div>
    </PageWrapper>;
}

export default Projects;