import { Settings } from "react-feather";
import PageWrapper from "../common/PageWrapper"
import PageGenericPoster from "../../PagePoster/PageGenericDisplay";

const pageProps = {
    pageTitle: "Paramètres du compte",
};

const AccountSettings = () => {
    return <PageWrapper {...pageProps}>
        <PageGenericPoster
            icon={{
                type: Settings
            }}
            title="Indisponible pour le moment"
            message={
                <span>
                    Nous travaillons actuellement sur cette fonctionnalité. Vous pourrez bientôt modifier vos paramètres de compte Wispio, comme votre mot de passe, votre adresse e-mail, vos informations de paiement, etc.
                </span>
            }
        />
    </PageWrapper>;
};

export default AccountSettings;