import SingleSettingPageWrapper from "../SingleSettingPageWrapper";
import UpdateProfilePicture from "./components/UpdateProfilePicture";

const pageProps = {
    title: "Mon profil",
    description: "Gérez vos informations personnelles, photo de profil, etc..."
};

const MyProfileSettings = () => {
    return <SingleSettingPageWrapper {...pageProps}>
        <UpdateProfilePicture />
    </SingleSettingPageWrapper>
};

export default MyProfileSettings;
