import { PrimaryButton } from "../../../../../../app_atomic/Button";
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

    return <SettingsSectionGroup title="Mon abonnement" isLoading={isLoading} isError={!!error}>
        <div>
            <p>Abonnez vous à Wispio Premium pour profiter de toutes les fonctionnalités de Wispio.</p>

            <a href={data?.url} target="_blank">
                <PrimaryButton>
                    S'abonner à Wispio Premium
                </PrimaryButton>
            </a>
        </div>
    </SettingsSectionGroup>
};

export default SubscribeToWispio;