import { useMemo } from "react";
import dateFromNow from "../../../../../../app_common/functions/date-from-now";
import useUserSession from "../../../../../../app_hooks/contexts_hooks/useUserSession";
import InformationTable from "../../../../../common/components/InformationTable";
import { SingleInformationTableRowInterface } from "../../../../../common/components/InformationTable/interfaces";
import SettingsSectionGroup from "../../../common/components/SettingsSectionGroup";

const PasswordInformations = () => {
    const user = useUserSession();

    const lastPasswordEditTimestamp = useMemo(() => {
        // @ts-ignore : The type of user?.reloadUserInfo.passwordUpdatedAt is string !
        return user?.reloadUserInfo?.passwordUpdatedAt as string ?? null;
    }, [user]);

    const readableTableDatas = useMemo(() => {
        return [
            {
                key: "Mot de passe",
                value: "****************",
            }, {
                key: "Dernière modification du mot de passe",
                value: lastPasswordEditTimestamp ? dateFromNow(
                    new Date(lastPasswordEditTimestamp)
                ) : "Non renseigné",
            }
        ] as SingleInformationTableRowInterface[];
    }, [user, lastPasswordEditTimestamp]);

    return <SettingsSectionGroup title="Mot de passe" isLoading={!user}>
        <InformationTable table={readableTableDatas} />
    </SettingsSectionGroup>
};

export default PasswordInformations;