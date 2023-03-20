import { Fragment } from "react";
import { Settings } from "react-feather";
import { Outlet } from "react-router-dom";
import PageWrapper from "../common/PageWrapper"
import PageGenericPoster from "../../PagePoster/PageGenericDisplay";
import AccountSettingsNavigation from "./components/Navigation";

const pageProps = {
    pageTitle: "Paramètres du compte",
    usePadding: false,
};

const isAvailablePage = true;

const AccountSettings = () => {
    return <Fragment>
        {
            !isAvailablePage ? <PageWrapper {...pageProps}>
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
            </PageWrapper>
                :
                <PageWrapper {...pageProps}>
                    <div className="flex flex-row h-full">
                        <AccountSettingsNavigation />
                        <div className="relative h-full w-full">
                            <Outlet />
                        </div>
                    </div>
                </PageWrapper>
        }
    </Fragment>

};

export default AccountSettings;