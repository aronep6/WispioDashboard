import { secondsToMilliseconds } from "date-fns";
import { useMemo } from "react";
import { PrimaryButton } from "../../../../../../app_atomic/Button";
import dateFromNow from "../../../../../../app_common/functions/date-from-now";
import readableStripePricing from "../../../../../../app_common/functions/readable-stripe-pricing";
import { stripeSubscriptionMap, type StripeSubscription } from "../../../../../../app_common/Service/Application/AccountSettingsService/interfaces";
import useAccountSettingsService from "../../../../../../app_hooks/contexts_hooks/useAccountSettingsService";
import useStrawberryFetch from "../../../../../../app_hooks/useStrawberryFetch";
import InformationTable, { type SingleInformationTableRowInterface } from "../../../../../common/components/InformationTable";
import SettingsSectionGroup from "../../../common/components/SettingsSectionGroup";

const BillingDetails = () => {
    const { _billing_getBillingInformations } = useAccountSettingsService();

    const { isLoading, data, error } = useStrawberryFetch<StripeSubscription>({
        method: _billing_getBillingInformations,
    });

    const billingStatus = useMemo(() => {
        if (!data) return "Aucun abonnement";
        return stripeSubscriptionMap.get(data.status);
    }, [data]);

    const price = useMemo(() => {
        if (!data) return "Aucun abonnement";
        return readableStripePricing(data.items.data[0].price.unit_amount);
    }, [data]);

    const readableTableDatas: SingleInformationTableRowInterface[] = useMemo(() => {
        if (!data) return [];
        return [
            {
                key: "Abonnement",
                value: "Wispio Premium"
            }, {
                key: "Statut de l'abonnement",
                value: billingStatus ? billingStatus : "Aucun abonnement",
            }, {
                key: "Prix de l'abonnement (par mois)",
                value: price ? price : "Aucun abonnement"
            }, {
                key: "Début de la période actuelle",
                value: dateFromNow(
                    new Date(secondsToMilliseconds(data.current_period_start))
                )
            }, {
                key: "Fin de la période actuelle",
                value: dateFromNow(
                    new Date(secondsToMilliseconds(data.current_period_end))
                )
            }, {
                key: "Identifiant de l'abonnement",
                value: data.id
            }, {
                key: "Identifiant de la dernière facture",
                value: data.latest_invoice,
            }, {
                key: "Abonné depuis",
                value: dateFromNow(
                    new Date(secondsToMilliseconds(data.start_date))
                )
            },
        ];
    }, [data]);

    return <SettingsSectionGroup title="Détails de mon abonnement actuel" 
        isLoading={isLoading} 
        isError={error ? true : false}
    >
        <InformationTable table={readableTableDatas} />
        <div className="flex flex-row items-center justify-end">
            <PrimaryButton useMargin={false} disabled={true}>
                Changer de plan
            </PrimaryButton>
        </div>
    </SettingsSectionGroup>
};

export default BillingDetails;