import { useMemo } from "react";
import dateFromNow from "../../../../../../app_common/functions/date-from-now";
import useUserSession from "../../../../../../app_hooks/contexts_hooks/useUserSession";
import InformationTable, { SingleInformationTableRowInterface } from "../../../../../common/InformationTable";
import SettingsSectionGroup from "../../../common/components/SettingsSectionGroup";

const ActivityInformations = () => {
    const user = useUserSession();

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
                key: "Localisation de la dernière connexion",
                value: "Donnée indisponible pour le moment",
            }
        ] as SingleInformationTableRowInterface[];
    }, [user]);

    return <SettingsSectionGroup title="Activité de connexion" isLoading={!user}>
        <InformationTable table={readableTableDatas} />
    </SettingsSectionGroup>
};

export default ActivityInformations;