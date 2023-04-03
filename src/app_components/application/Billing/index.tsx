import { BillingServiceProvider } from "../../../app_contexts/BillingService";

const Billing = () => {
    return <div>
        Billing page
    </div>
};

export default function index() {
    return <BillingServiceProvider>
        <Billing />
    </BillingServiceProvider>
};
