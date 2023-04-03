import { BillingServiceProvider } from "../../../../../app_contexts/BillingService";
import SingleSettingPageWrapper from "../SingleSettingPageWrapper";
import BillingDetails from "./components/BillingDetails";
import SubscribeToWispio from "./components/SubscribeToWispio";

const pageProps = {
    title: "Facturation & abonnement",
    description: "Gérez vos informations de facturation et votre abonnement.",
};

const BillingSettings = () => {
    return <SingleSettingPageWrapper {...pageProps}>
        <BillingDetails />
        <SubscribeToWispio />
    </SingleSettingPageWrapper>
};

export default function index() {
    return <BillingServiceProvider>
        <BillingSettings />
    </BillingServiceProvider>
};