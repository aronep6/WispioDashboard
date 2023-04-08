import Core from "../../Core";
import { CallableFunctions, UserAccessibleClaims } from "../../Core/interfaces";
import { CheckoutSessionResponse } from "./interfaces";

class BillingService extends Core {
    constructor() {
        super();
    }

    public startCheckoutSession = async (): Promise<CheckoutSessionResponse | undefined> => {
        // selectedPlan: WispioPlan | null
        try {
            return await this.fetchStrawberryAPI<CheckoutSessionResponse>(CallableFunctions.CreateSubscribeCheckoutSession, {});
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public hasActiveSubscription = async (): Promise<boolean> => {
        const claim = await this.getUserClaim(UserAccessibleClaims.BillingIsActive);
        if (claim === "true") return true;
        return false;
    }
};

export default BillingService;