import { CheckoutSessionResponse, WispioPlan } from "../../../../../../app_common/Service/Application/BillingService/interfaces";
import useBillingService from "../../../../../../app_hooks/contexts_hooks/useBillingService";
import useStrawberryFetch from "../../../../../../app_hooks/useStrawberryFetch";
import SettingsSectionGroup from "../../../common/components/SettingsSectionGroup"

const SubscribeToWispio = () => {
    const service = useBillingService();

    const { isLoading, data, error } = useStrawberryFetch<CheckoutSessionResponse | undefined>({
        method: service.startCheckoutSession,
        // payload: WispioPlan.Premium,
    });

    return <SettingsSectionGroup title="S'abonner à Wispio Premium" isLoading={isLoading} isError={!!error}>
        <div>
            <p>Vous pouvez vous abonner à Wispio pour bénéficier de toutes les fonctionnalités de la plateforme.</p>
            {JSON.stringify(data)}
        </div>
    </SettingsSectionGroup>
};

export default SubscribeToWispio;