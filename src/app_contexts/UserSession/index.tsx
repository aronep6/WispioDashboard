import React, { createContext, useState } from "react";
import type { UserSessionInterface } from "./interfaces";

const UserSession = createContext({} as UserSessionInterface)

const user_1 = {
    id: 1,
    name: "John Doe",
    email: "",
    phone: "",
    address: "",
};

const user_2 = {
    id: 2,
    name: "Ousmane Mbaye",
    email: "",
    phone: "01 02 03 04 05",
    address: "9 Rue Charenton, 75012 Paris",
};

const DEFAULT_USER_STATEMENT = undefined;
// const DEFAULT_USER_STATEMENT = user;

const UserSessionProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState(DEFAULT_USER_STATEMENT);

    return <UserSession.Provider value={{
        user, 
    } as UserSessionInterface}>
        { children }
    </UserSession.Provider>;
};

export { UserSessionProvider };
export default UserSession;