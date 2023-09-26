import DashedBorder from "../../app_components/application/common/EmptyStates/DashedBorder";
import { ControlledFileSelectorProps } from "./interfaces";
import { useRef, Fragment, useCallback, useMemo } from "react";
import { File } from "react-feather";

const ControlledFileSelector = ({
    icon = <File />,
    value,
    label = "Sélectionnez votre fichier ici.",
    onFileChange,
    error,
    allowedExtensions = [],
    errorMessage = "",
}: ControlledFileSelectorProps) => {
    const controlledFileSelectorRef = useRef<HTMLInputElement>(null);

    const openFileSelector = useCallback(() => {
        if (controlledFileSelectorRef.current) {
            controlledFileSelectorRef.current.click()
        }
    }, [controlledFileSelectorRef]);

    const allowedExtensionsString = useMemo(() => allowedExtensions.join(", "), [allowedExtensions]);

    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onFileChange(file);
        }
    }, [onFileChange]);

    const fileName = useMemo(() => {
        if (value) {
            return value.name;
        }
        return null;
    }, [value]);

    return <Fragment>
        <input
            ref={controlledFileSelectorRef}
            type="file"
            className="hidden"
            accept={allowedExtensionsString}
            onChange={handleFileChange}
        ></input>

        <div onClick={openFileSelector}>
            <DashedBorder
                title={fileName || label}
                description={allowedExtensionsString.length > 0 ? `Formats supportés : ${allowedExtensionsString}` : null}
                {...{ icon, error, errorMessage }}
            ></DashedBorder>
        </div>
    </Fragment>
};

export { ControlledFileSelector }