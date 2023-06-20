import './index.css'
import { SnackbarElement as SnackbarElementType } from "../../../app_contexts/SnackbarService/interfaces";
import SnackbarElement from "./components/SnackbarElement";

const ShadowSnackbarWrapper = ({
    snackbarElements,
    removeSnackbarElement,
}: {
    snackbarElements: SnackbarElementType[];
    removeSnackbarElement: (index: number) => void;
}) => {
    return <div className="snackbarWrapper">
        {snackbarElements.map((snackbarElement, index) => {
            return <SnackbarElement 
                element={snackbarElement}
                removeSnackbarElement={() => removeSnackbarElement(index)} 
                key={index}
            />;
        })}
    </div>
};

export default ShadowSnackbarWrapper;