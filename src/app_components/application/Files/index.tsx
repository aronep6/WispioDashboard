import PageWrapper from "../common/PageWrapper";

const pageProps = {
    pageTitle: "Files",
};

const Files = () => {
    return <PageWrapper {...pageProps}>
        <div className="flex flex-col">
            This is the files page content area (not the sidebar)
        </div>
    </PageWrapper>;
}

export default Files;