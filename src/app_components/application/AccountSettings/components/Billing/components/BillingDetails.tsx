import useAccountSettingsService from "../../../../../../app_hooks/contexts_hooks/useAccountSettingsService";
import useStrawberryFetch from "../../../../../../app_hooks/useStrawberryFetch";
import SettingsSectionGroup from "../../../common/components/SettingsSectionGroup";

const BillingDetails = () => {
    const { _billing_getBillingInformations } = useAccountSettingsService();

    const { isLoading, data, error } = useStrawberryFetch({
        method: _billing_getBillingInformations,
    });

    return <SettingsSectionGroup title="Détails de mon abonnement" 
        isLoading={isLoading} 
        isError={error ? true : false}
    >
        <div>
            {
                JSON.stringify(data)
            }
        </div>
    </SettingsSectionGroup>
};

export default BillingDetails;