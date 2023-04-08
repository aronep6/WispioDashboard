import { PrimaryButton } from "../../../../../../app_atomic/Button";
import { Hint } from "../../../../../../app_atomic/Title";
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

    return <SettingsSectionGroup title="S'abonner à Wispio +" isLoading={isLoading} isError={!!error}>
        <div className="flex flex-col justify-center space-y-4 px-0.5 max-w-4xl">
            <p className="text-gray-500 text-sm">
                Il est temps de passer à la vitesse supérieure et de profiter de toutes les fonctionnalités de Wispio Premium.
                Vous pourrez ainsi créer des tâches sans limitations, télécharger toutes vos transcriptions et bien plus encore.
            </p>

            <Hint>
                L'abonnement à Wispio Premium est mensuel et se renouvelle automatiquement. Vous pouvez à tout moment annuler votre abonnement depuis votre compte.
            </Hint>

            <a href={data?.url} target="_blank">
                <PrimaryButton useMargin={false}>
                    S'abonner à Wispio +
                </PrimaryButton>
            </a>
        </div>
    </SettingsSectionGroup>
};

export default SubscribeToWispio;