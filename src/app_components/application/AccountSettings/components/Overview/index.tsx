import SingleSettingPageWrapper from "../SingleSettingPageWrapper";
import LogOutAction from "./component/LogOutAction";
import UserGeneralInfos from "./component/UserGeneralInfos";

const pageProps = {
    title: "Vue d'ensemble",
    description: "Gérez les informations générales de votre compte.",
};

const Overview = () => {
    return <SingleSettingPageWrapper {...pageProps}>
        <UserGeneralInfos />
        <LogOutAction />
    </SingleSettingPageWrapper>
};

export default Overview;
