import PageGenericPoster from "../../../PagePoster/PageGenericDisplay";
import { Search } from "react-feather";

const NoSearchResult = () => {
    return <PageGenericPoster
        icon={{
            type: Search,
        }}
        title="Aucun résultat trouvé pour cette recherche"
        message={
            <span>
                Aucun résultat n'a été trouvé pour cette recherche, réessayer avec des termes de recherches différents.
            </span>
        }
    />
};

export default NoSearchResult;