import { Fragment } from 'react';
import { Folder } from "react-feather";
import PageGenericPoster from "../../../PagePoster/PageGenericDisplay";

const NoFiles = () => {
    return (
        <PageGenericPoster
            icon={{
                type: Folder,
            }}
            title="Aucune fichier importé"
            message={
                <Fragment>
                    <span>
                        Vous n'avez importé aucun fichier pour le moment. 
                        Importez un fichier dans Wispio directement en créant une nouvelle tâche depuis votre liste tâches actives.
                    </span>
                </Fragment>
            }
        />
    )
};

export default NoFiles;