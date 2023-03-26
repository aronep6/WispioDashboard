import SingleSettingPageWrapper from "../SingleSettingPageWrapper";
import BillingDetails from "./components/BillingDetails";

const pageProps = {
    title: "Facturation & abonnement",
    description: "Gérez vos informations de facturation et votre abonnement.",
};

const BillingSettings = () => {
    return <SingleSettingPageWrapper {...pageProps}>
        <BillingDetails />
    </SingleSettingPageWrapper>
};

export default BillingSettings;
