import { Bell } from "react-feather";
import PageGenericPoster from "../../PagePoster/PageGenericDisplay";
import PageWrapper from "../common/PageWrapper";
import { Fragment } from "react";
import { PrimaryButton } from "../../../app_atomic/Button";

const pageProps = {
    pageTitle: "Notifications",
};

const Files = () => {
    return <PageWrapper {...pageProps}>
        <PageGenericPoster
            icon={{
                type: Bell,
            }}
            title="Aucune notification pour le moment"
            message={
                <Fragment>
                    <span>
                        Vous n'avez aucune notification pour le moment. Vous recevrez une notification dès lors que le status d'une tâche sera modifié par Wispio.
                    </span>
                    <br /><br />
                    <PrimaryButton>
                        Send a test notification
                    </PrimaryButton>
                </Fragment>
            }
        />
    </PageWrapper>;
}

export default Files;