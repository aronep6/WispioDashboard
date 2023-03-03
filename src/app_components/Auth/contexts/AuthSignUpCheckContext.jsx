import { createContext } from 'react';
import { AuthSignUpCheck } from "../../../Firebase/_firebase";

const AuthSignUpCheckContext = createContext(null);

const AuthSignUpCheckContextProvider = ({ children }) => {
    return <AuthSignUpCheckContext.Provider value={ new AuthSignUpCheck() }>
        { children }
    </AuthSignUpCheckContext.Provider>
};

export { AuthSignUpCheckContext, AuthSignUpCheckContextProvider };