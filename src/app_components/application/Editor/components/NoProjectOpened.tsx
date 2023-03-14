import { Box } from 'react-feather';
import { Link } from 'react-router-dom';
import PageGenericPoster from '../../../PagePoster/PageGenericDisplay';

function NoProjectOpened() {
    return (
        <PageGenericPoster
            icon={{
                type: Box,
            }}
            title="Aucun projet ouvert"
            message={
                <span>
                    Vous n'avez ouvert aucun projet. Ouvrez un projet dans l'éditeur directement depuis votre liste des <Link to="/tasks" className="text-indigo-600 font-medium">tâches actives</Link>, pour commencer à éditer vos contenus.
                </span>
            }
        />
    );
}

export default NoProjectOpened;