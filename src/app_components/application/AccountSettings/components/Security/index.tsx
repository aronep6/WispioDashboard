import SingleSettingPageWrapper from "../SingleSettingPageWrapper";
import ActivityInformations from "./components/ActivityInformations";
import PasswordInformations from "./components/PasswordInformations";
import UpdatePassword from "./components/UpdatePassword";

const pageProps = {
    title: "Sécurité & confidentialité",
    description: "Gérez vos paramètres de sécurité de votre compte Wispio, mot de passe etc.",
};

const SecuritySettings = () => {
    return <SingleSettingPageWrapper {...pageProps}>
        <ActivityInformations />
        <PasswordInformations />
        <UpdatePassword />
    </SingleSettingPageWrapper>
};

export default SecuritySettings;
