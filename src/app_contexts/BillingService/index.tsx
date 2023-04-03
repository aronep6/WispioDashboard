import { createContext } from "react";
import BillingService from "../../app_common/Service/Application/BillingService";

const BillingServiceContext = createContext({} as BillingService);

const BillingServiceProvider = ({ children }: { children: React.ReactNode }) => {
    return <BillingServiceContext.Provider value={
        new BillingService()
    }>
        {children}
    </BillingServiceContext.Provider>;
};

export { BillingServiceProvider };
export default BillingServiceContext;