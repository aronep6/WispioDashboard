import { Grid } from "react-feather";
import PageGenericPoster from "../../PagePoster/PageGenericDisplay";
import PageWrapper from "../common/PageWrapper";
import { Link } from "react-router-dom";

const pageProps = {
    pageTitle: "Tableau de bord",
};

const Dashboard = () => {
    return <PageWrapper {...pageProps}>
        <PageGenericPoster
            icon={{
                type: Grid
            }}
            title="Bienvenue sur Wispio"
            message={
                <span>
                    Votre tableau de bord est encore vide pour le moment, vous pourrez y suivre l'avancement de vos tâches de transcription en temps réel. Vous pouvez commencer par créer une nouvelle transcription ou consulter vos <Link to="/tasks" className="text-indigo-600 font-medium">tâches actives</Link>.
                </span>
            }
        />
    </PageWrapper>;
}

export default Dashboard;