import SingleSettingPageWrapper from "../SingleSettingPageWrapper";

const pageProps = {
    title: "Vue d'ensemble",
    description: "Gérez les informations générales de votre compte.",
};

const GeneralSettings = () => {
    return <SingleSettingPageWrapper {...pageProps}>

    </SingleSettingPageWrapper>
};

export default GeneralSettings;
