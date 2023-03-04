import React, { createContext, useState } from "react";
import Authentication from "../../app_common/Service/Authentication";

import type { 
    UserSessionInterface,
    AuthenticationProviderInterface,
} from "./interfaces";

const AuthenticationSession = createContext({} as AuthenticationProviderInterface);

const DEFAULT_USER_STATEMENT = undefined;

const AuthenticationSessionProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState(DEFAULT_USER_STATEMENT as UserSessionInterface);

    return <AuthenticationSession.Provider value={{
        auth: new Authentication(),
        user,
    } as AuthenticationProviderInterface}>
        { children }
    </AuthenticationSession.Provider>;
};

export { AuthenticationSessionProvider };
export default AuthenticationSession;