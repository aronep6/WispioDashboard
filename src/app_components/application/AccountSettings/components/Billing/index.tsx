import useAccountSettingsService from "../../../../../app_hooks/contexts_hooks/useAccountSettingsService";
import useStrawberryFetch from "../../../../../app_hooks/useStrawberryFetch";
import SingleSettingPageWrapper from "../SingleSettingPageWrapper";

const pageProps = {
    title: "Facturation & abonnement",
    description: "Gérez vos informations de facturation et votre abonnement.",
};

const api_configuration = {

};

const BillingSettings = () => {
    const { _billing_getBillingInformations } = useAccountSettingsService();

    const { isLoading, data, error } = useStrawberryFetch({
        method: _billing_getBillingInformations,
    });

    return <SingleSettingPageWrapper {...pageProps}>
        {
            JSON.stringify("isLoading: " + isLoading + " data: " + data + " error: " + error)
        }
    </SingleSettingPageWrapper>
};

export default BillingSettings;
