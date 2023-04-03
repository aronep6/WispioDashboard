import Core from "../../Core";
import { CallableFunctions } from "../../Core/interfaces";
import { WispioPlan, CheckoutSessionResponse } from "./interfaces";

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
};

export default BillingService;