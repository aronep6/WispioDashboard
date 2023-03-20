import SingleSettingPageWrapper from "../SingleSettingPageWrapper";
import UserGeneralInfos from "./component/UserGeneralInfos";

const pageProps = {
    title: "Vue d'ensemble",
    description: "Gérez les informations générales de votre compte.",
};

const Overview = () => {
    return <SingleSettingPageWrapper {...pageProps}>
        <UserGeneralInfos />
    </SingleSettingPageWrapper>
};

export default Overview;
