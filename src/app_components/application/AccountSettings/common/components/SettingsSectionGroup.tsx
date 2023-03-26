import type { ReactNode } from "react";
import { Card } from "../../../../../app_atomic/Card";
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

            { !isLoading && !isError ? <div className="flex flex-col gap-2.5">
                {children}
            </div> : <></> }
        </Card>
    </section>
};

export default SettingsSectionGroup;