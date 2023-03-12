import { Backward, Forward } from "./ForwardBackward";
import PlayPause from "./PlayPause"

const PlayerControls = () => {
    return <div className="flex flex-row gap-6 items-center">
        <Backward />
        <PlayPause />
        <Forward />
    </div>
};

export default PlayerControls;