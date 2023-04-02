import { DangerSecondaryButton } from "../../../../../../app_atomic/Button";
import useAuth from "../../../../../../app_hooks/contexts_hooks/useAuth";
import SettingsSectionGroup from "../../../common/components/SettingsSectionGroup";

const APP_NAME = import.meta.env.VITE_APPLICATION_NAME;

const LogOutAction = () => {
    const auth = useAuth();

    return <SettingsSectionGroup title="" isLoading={!auth}>
        <div className="flex flex-row items-center justify-start">
            <DangerSecondaryButton
                action={auth.signOut}
            >
                Se déconnecter de {APP_NAME}
            </DangerSecondaryButton>
        </div>
    </SettingsSectionGroup>
};

export default LogOutAction;