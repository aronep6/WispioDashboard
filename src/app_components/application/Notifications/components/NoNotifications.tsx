import { Fragment } from 'react';
import { Bell } from "react-feather";
import PageGenericPoster from "../../../PagePoster/PageGenericDisplay";
import { InformativeCard } from "../../../../app_atomic/Card";

const NoNotifications = ({
    areAllowedByUser
}: {
    areAllowedByUser: boolean
}) => {

    return (
        <PageGenericPoster
            icon={{
                type: Bell,
            }}
            title="Aucune notification pour le moment"
            message={
                <Fragment>
                    <span>
                        Vous n'avez pas encore reçu de notification pour le moment.
                        {
                            !areAllowedByUser && "Pour recevoir des notifications directement sur votre ordinateur, veuillez autoriser les notifications."
                        }
                    </span>

                    <br /><br />

                    {
                        !areAllowedByUser && <InformativeCard
                            title="Pourquoi autoriser les notifications ?"
                            description="Les notifications vous permettent de rester informé de l'avancement de vos tâches. Vous recevrez une notification dès lors qu'une de vos tâches aura été mise à jour. Exemple : La transcription de votre vidéo ou votre audio est terminée."
                        />
                    }
                </Fragment>
            }
        />
    )
};

export default NoNotifications;