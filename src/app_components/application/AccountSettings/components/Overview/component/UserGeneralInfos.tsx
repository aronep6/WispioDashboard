import { useMemo } from "react";
import { PrimaryButton } from "../../../../../../app_atomic/Button";
import dateFromNow from "../../../../../../app_common/functions/date-from-now";
import useUserSession from "../../../../../../app_hooks/contexts_hooks/useUserSession";
import InformationTable from "../../../../../common/components/InformationTable";
import { SingleInformationTableRowInterface } from "../../../../../common/components/InformationTable/interfaces";
import SettingsSectionGroup from "../../../common/components/SettingsSectionGroup";

const UserGeneralInfos = () => {
    const user = useUserSession();

    const readableTableDatas = useMemo(() => {
        return [
            {
                key: "Nom d'utilisateur",
                value: user?.displayName ? user?.displayName : "Non renseigné",
            }, {
                key: "Adresse e-mail",
                value: user?.email,
            }, {
                key: "Adresse e-mail vérifié ?",
                value: user?.emailVerified ? "✅ Vérifié" : "❌ Non vérifié",
            }, {
                key: "Identifiant utilisateur Wispio",
                value: user?.uid,
            }, {
                key: "Date de création du compte",
                value: user?.metadata?.creationTime ? dateFromNow(
                    new Date(user?.metadata?.creationTime)
                ) : "Non renseigné",
            }
        ] as SingleInformationTableRowInterface[];
    }, [user]);

    return <SettingsSectionGroup title="Informations générales" isLoading={!user}>
        <InformationTable table={readableTableDatas} />
        <div className="flex flex-row items-center justify-end">
            <PrimaryButton useMargin={false} disabled={true}>
                Modifier les informations générales
            </PrimaryButton>
        </div>
    </SettingsSectionGroup>
};

export default UserGeneralInfos;