import { Fragment, ReactNode } from "react";
import { Card } from "../../../../../app_atomic/Card";
import ErrorDisplayer from "../../../../../app_atomic/Error";
import { TertiaryTitle } from "../../../../../app_atomic/Title";

const SettingsSectionGroup = ({
    title,
    children,
    isLoading = false,
    isError = false,
}: {
    title: string
    children: ReactNode
    isLoading: boolean,
    isError?: boolean,
}) => {
    return <section>
        <Card border={true} isLoading={isLoading}>
            <TertiaryTitle>
                {title}
            </TertiaryTitle>
            {
                isError ? 
                    <ErrorDisplayer error="Une erreur est survenue lors du chargement de cette section, veuillez réessayer." />
                    :
                    <Fragment>
                        { children }
                    </Fragment>
            }
        </Card>
    </section>
};

export default SettingsSectionGroup;