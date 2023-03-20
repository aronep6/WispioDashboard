import { Settings } from "react-feather"
import PageGenericPoster from "../../../../PagePoster/PageGenericDisplay"

const NoAccountSettingsOpened = () => {
    return <PageGenericPoster
        icon={{
            type: Settings
        }}
        title="Sélectionnez un paramètre"
        message="Ouvrez une section de paramètres pour modifier vos préférences."
    />
}

export default NoAccountSettingsOpened;