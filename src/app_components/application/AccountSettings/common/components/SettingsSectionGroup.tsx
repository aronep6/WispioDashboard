import type { ReactNode } from "react";
import { Card } from "../../../../../app_atomic/Card";
import { TertiaryTitle } from "../../../../../app_atomic/Title";

const SettingsSectionGroup = ({
    title,
    children,
    isLoading = false,
}: {
    title: string
    children: ReactNode
    isLoading: boolean,
}) => {
    return <section>
        <Card border={true} isLoading={isLoading}>
            <TertiaryTitle>
                {title}
            </TertiaryTitle>
            <div className="flex flex-col gap-2.5">
                {children}
            </div>
        </Card>
    </section>
};

export default SettingsSectionGroup;