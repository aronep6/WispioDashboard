import { useEffect, useState } from "react";
import { BillingServiceProvider } from "../../../../../app_contexts/BillingService";
import SingleSettingPageWrapper from "../SingleSettingPageWrapper";
import BillingDetails from "./components/BillingDetails";
import SubscribeToWispio from "./components/SubscribeToWispio";
import useBillingService from "../../../../../app_hooks/contexts_hooks/useBillingService";

const pageProps = {
    title: "Facturation & abonnement",
    description: "Gérez vos informations de facturation et votre abonnement.",
};

const BillingSettings = () => {
    const service = useBillingService();
    const [hasActiveSubscription, setHasActiveSubscription] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        const check = async () => {
            const activeSubscriptionResult = await service.hasActiveSubscription();
            setHasActiveSubscription(activeSubscriptionResult);
        };

        check();
    }, []);

    return <SingleSettingPageWrapper {...pageProps}>
        {
            hasActiveSubscription === undefined ?
                null :
                hasActiveSubscription ?
                    <BillingDetails /> :
                    <SubscribeToWispio />
        }
    </SingleSettingPageWrapper>
};

export default function index() {
    return <BillingServiceProvider>
        <BillingSettings />
    </BillingServiceProvider>
};