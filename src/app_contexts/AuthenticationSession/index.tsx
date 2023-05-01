import { getAuth } from "firebase/auth";
import React, { createContext, useEffect, useMemo, useState } from "react";
import Authentication from "../../app_common/Service/Authentication";
import type {
    UserSessionInterface,
    AuthenticationProviderInterface,
} from "./interfaces";

const auth = getAuth();

const AuthenticationSession = createContext({} as AuthenticationProviderInterface);

const DEFAULT_USER_STATEMENT = undefined;

const AuthenticationSessionProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserSessionInterface>(DEFAULT_USER_STATEMENT);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUser(user);
                // Allow cookie consent automatically (Authorization is stored in local storage)
                const cookieConsent = localStorage.getItem("cookieConsent");
                if (cookieConsent !== "true") {
                    localStorage.setItem("cookieConsent", "true");
                }
            } else {
                setUser(null);
            }
        });
        return () => {
            unsubscribe();
        }
    }, []);

    return <AuthenticationSession.Provider value={{
        auth: useMemo(() => new Authentication(), []),
        user: useMemo(() => user, [user]),
    } as AuthenticationProviderInterface}>
        {children}
    </AuthenticationSession.Provider>;
};

export { AuthenticationSessionProvider };
export default AuthenticationSession;