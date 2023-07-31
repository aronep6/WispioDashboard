import { CenturionAccessibleEndpoint } from "../../../../../app_common/Service/CenturionBackend/interfaces";
import useCenturionFetch from "../../../../../app_hooks/useCenturionFetch";
import SingleSettingPageWrapper from "../SingleSettingPageWrapper";
// import UpdateProfilePicture from "./components/UpdateProfilePicture";

const pageProps = {
    title: "Mon profil",
    description: "Gérez vos informations personnelles, photo de profil, etc..."
};

const MyProfileSettings = () => {
    const { data, error, isLoading } = useCenturionFetch({
        endpoint: CenturionAccessibleEndpoint.GetTasks,
        payload: undefined,
        defaultLoadingStatus: true,
    });

    return <SingleSettingPageWrapper {...pageProps}>
        {/* <UpdateProfilePicture /> */}
    </SingleSettingPageWrapper>
};

export default MyProfileSettings;
