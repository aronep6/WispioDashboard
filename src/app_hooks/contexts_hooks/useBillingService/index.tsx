import { useContext } from "react";
import BillingServiceContext from "../../../app_contexts/BillingService";

const useBillingService = () => useContext(BillingServiceContext);

export default useBillingService;