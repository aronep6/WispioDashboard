import DashedBorder from "../../app_components/application/common/EmptyStates/DashedBorder";
import { ControlledFileSelectorProps } from "./interfaces";
import { useRef, Fragment, useCallback } from "react";
import { File } from "react-feather";

const ControlledFileSelector = ({
    icon = <File />,
    title = 'Select a file',
    value,
    onChange
}: ControlledFileSelectorProps) => {
    const controlledFileSelectorRef = useRef<HTMLInputElement>(null);

    const openFileSelector = useCallback(() => {
        if (controlledFileSelectorRef.current) {
            controlledFileSelectorRef.current.click()
        }
    }, [controlledFileSelectorRef]);

    return <Fragment>
        <input
            ref={controlledFileSelectorRef}
            type="file"
            className="hidden"
            onChange={onChange}
        ></input>

        <div onClick={openFileSelector}>
            <DashedBorder icon={icon} title={title} />
        </div>
    </Fragment>
};

export { ControlledFileSelector }