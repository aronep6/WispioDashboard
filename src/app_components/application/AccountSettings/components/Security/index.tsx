import SingleSettingPageWrapper from "../SingleSettingPageWrapper";
import SecurityInformations from "./components/SecurityInformations";
import UpdatePassword from "./components/UpdatePassword";

const pageProps = {
    title: "Sécurité",
    description: "Gérez vos paramètres de sécurité de votre compte Wispio, mot de passe etc.",
};

const SecuritySettings = () => {
    return <SingleSettingPageWrapper {...pageProps}>
        <SecurityInformations />
        <UpdatePassword />
    </SingleSettingPageWrapper>
};

export default SecuritySettings;
