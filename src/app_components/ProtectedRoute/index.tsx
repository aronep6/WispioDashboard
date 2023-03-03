import { Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserSession from "../../app_hooks/contexts_hooks/useUserSession";
import Loading from "../Loading";
import { AppRoutes } from "../../app_common/interfaces/AppRoutes";

const ProtectedRoute = ({ 
    children, 
    loadMessage,
}: {
    children: React.ReactNode,
    loadMessage?: string,
}) => {
    let navigate = useNavigate();

    const user = useUserSession();

    useEffect(() => {
        if (user === null) {
            navigate(AppRoutes.AuthSignIn);
        }
    }, [user]);

    return user === undefined ? 
        <Loading /> : 
            user !== null ? 
                <Suspense fallback={
                    <Loading message={loadMessage}/>
                }>
                    { children }
                </Suspense>
            : <Loading />;
};

export default ProtectedRoute;