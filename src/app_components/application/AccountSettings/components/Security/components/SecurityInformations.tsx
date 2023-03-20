import { useMemo } from "react";
import dateFromNow from "../../../../../../app_common/functions/date-from-now";
import useUserSession from "../../../../../../app_hooks/contexts_hooks/useUserSession";
import InformationTable, { SingleInformationTableRowInterface } from "../../../../../common/InformationTable";
import SettingsSectionGroup from "../../../common/components/SettingsSectionGroup";

const SecurityInformations = () => {
    const user = useUserSession();

    const lastPasswordEditTimestamp = useMemo(() => {
        // @ts-ignore : The type of user?.reloadUserInfo.passwordUpdatedAt is string !
        return user?.reloadUserInfo?.passwordUpdatedAt as string ?? null;
    }, [user]);

    const readableTableDatas = useMemo(() => {
        return [
            {
                key: "Dernière connexion",
                value: user?.metadata?.lastSignInTime ? dateFromNow(
                    new Date(user?.metadata?.lastSignInTime)
                ) : "Non renseigné",
            }, {
                key: "Adresse IP de la dernière connexion",
                value: "Donnée indisponible pour le moment",
            }, {
                key: "Dernière modification du mot de passe",
                value: lastPasswordEditTimestamp ? dateFromNow(
                    new Date(lastPasswordEditTimestamp)
                ) : "Non renseigné",
            }
        ] as SingleInformationTableRowInterface[];
    }, [user, lastPasswordEditTimestamp]);

    return <SettingsSectionGroup title="Informations de sécurité" isLoading={!user}>
        <InformationTable table={readableTableDatas} />
    </SettingsSectionGroup>
};

export default SecurityInformations;