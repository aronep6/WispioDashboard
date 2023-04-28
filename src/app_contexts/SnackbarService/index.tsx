import React, { createContext, useCallback, useState } from "react";
import ShadowSnackbarWrapper from "../../app_components/application/Snackbar";
import { SnackbarElement, SnackbarServicesValues } from "./interfaces";

const SnackbarServiceContext = createContext({} as SnackbarServicesValues);

const DEFAULT_SNACKBAR_STATEMENT: SnackbarElement[] = [];

const SnackbarServiceProvider = ({ children }: { children: React.ReactNode }) => {
    const [snackbarElements, setSnackbarElements] = useState<SnackbarElement[]>(DEFAULT_SNACKBAR_STATEMENT);

    const removeSnackbarElement = useCallback((index: number) => {
        setSnackbarElements((prevSnackbarElements) => {
            const newSnackbarElements = [...prevSnackbarElements];
            newSnackbarElements.splice(index, 1);
            return newSnackbarElements;
        });
    }, []);

    const addSnackbarElement = useCallback((snackbarElement: SnackbarElement) => {
        setSnackbarElements((prevSnackbarElements) => {
            const newSnackbarElements = [...prevSnackbarElements];
            newSnackbarElements.push(snackbarElement);
            return newSnackbarElements;
        });
    }, []);

    return <SnackbarServiceContext.Provider value={{
        addSnackbarElement,
    } as SnackbarServicesValues}>
        <ShadowSnackbarWrapper snackbarElements={snackbarElements} removeSnackbarElement={removeSnackbarElement} />
        { children }
    </SnackbarServiceContext.Provider >;
};

export { SnackbarServiceProvider };
export default SnackbarServiceContext;