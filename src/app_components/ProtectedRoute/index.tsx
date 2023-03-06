import { Suspense, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useUserSession from "../../app_hooks/contexts_hooks/useUserSession";
import Loading from "../Loading";
import { AppRoutes } from "../../app_common/interfaces/AppRoutes";

const isProductionEnv: boolean = import.meta.env.PROD;

const ProtectedRoute = ({
    children,
    loadMessage,
    isAvailableInProduction = true,
}: {
    children: React.ReactNode,
    loadMessage?: string,
    isAvailableInProduction?: boolean,
}) => {
    let navigate = useNavigate();

    const user = useUserSession();

    const isAvailableRoute = useMemo(() => {
        if (!isAvailableInProduction && isProductionEnv) return false;
        return true;
    }, [isAvailableInProduction]);

    useEffect(() => {
        if (user === null) {
            navigate(AppRoutes.AuthSignIn);
        }
    }, [user]);

    return isAvailableRoute ? user === undefined ?
        <Loading /> :
        user !== null ?
            <Suspense fallback={
                <Loading message={loadMessage} />
            }>
                {children}
            </Suspense>
            : <Loading />
        : <Loading message="This route is not available now. Please try again later."
            showLoader={false} />
};

export default ProtectedRoute;