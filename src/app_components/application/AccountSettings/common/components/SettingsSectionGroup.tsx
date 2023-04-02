import { Fragment, ReactNode } from "react";
import { Card } from "../../../../../app_atomic/Card";
import ErrorDisplayer from "../../../../../app_atomic/Error";
import { TertiaryTitle } from "../../../../../app_atomic/Title";

const SettingsSectionGroup = ({
    title = "",
    children,
    isLoading = false,
    isError = false,
    errorMessage = "Une erreur est survenue lors du chargement de cette section, veuillez réessayer.",
}: {
    title: string
    children: ReactNode
    isLoading: boolean,
    isError?: boolean,
    errorMessage?: string,
}) => {
    return <section>
        <Card border={true} isLoading={isLoading}>
            {title !== "" ? <TertiaryTitle>
                {title}
            </TertiaryTitle> : <></>}
            {
                isError ?
                    <ErrorDisplayer message={errorMessage} />
                    :
                    !isLoading ? <Fragment>
                        {children}
                    </Fragment> : <></>
            }
        </Card>
    </section>
};

export default SettingsSectionGroup;