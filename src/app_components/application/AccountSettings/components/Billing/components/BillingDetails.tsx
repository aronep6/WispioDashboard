import { Fragment } from "react";
import { Card } from "../../../../../../app_atomic/Card";
import { Paragraph } from "../../../../../../app_atomic/Paragraph";
import { PrimaryTitle, TertiaryTitle } from "../../../../../../app_atomic/Title";
import { type StripeSubscription } from "../../../../../../app_common/Service/Application/AccountSettingsService/interfaces";
import useAccountSettingsService from "../../../../../../app_hooks/contexts_hooks/useAccountSettingsService";
import useStrawberryFetch from "../../../../../../app_hooks/useStrawberryFetch";
import SettingsSectionGroup from "../../../common/components/SettingsSectionGroup";

const BillingDetails = () => {
    const { _billing_getBillingInformations } = useAccountSettingsService();

    const { isLoading, data, error } = useStrawberryFetch<StripeSubscription>({
        method: _billing_getBillingInformations,
    });

    return <SettingsSectionGroup title="Détails de mon abonnement" 
        isLoading={isLoading} 
        isError={error ? true : false}
    >
        <Card>
            <TertiaryTitle>
                Plan Premium
            </TertiaryTitle>

            <Paragraph>
                <Fragment>
                    Identifiant de l'abonnement : { data?.id }
                    Renouvellement automatique : 
                </Fragment>
            </Paragraph>
        </Card>
    </SettingsSectionGroup>
};

export default BillingDetails;