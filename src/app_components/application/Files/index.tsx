import { Link } from "react-router-dom";
import { Folder } from "react-feather";
import PageGenericPoster from "../../PagePoster/PageGenericDisplay";
import PageWrapper from "../common/PageWrapper";

const pageProps = {
    pageTitle: "Files",
};

const Files = () => {
    return <PageWrapper {...pageProps}>
        <PageGenericPoster
            icon={{
                type: Folder,
            }}
            title="Aucun fichier importé"
            message={
                <span>
                    Vous n'avez importé aucun fichier pour le moment. Importez un fichier dans Wispio directement en créant une nouvelle tâche depuis votre liste <Link to="/tasks" className="text-indigo-600 font-medium">tâches actives</Link>.
                </span>
            }
        />
    </PageWrapper>;
}

export default Files;