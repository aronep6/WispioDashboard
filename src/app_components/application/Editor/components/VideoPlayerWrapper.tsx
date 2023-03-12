import { memo } from "react"
import EditorVideoPlayer from '../components/VideoPlayer';
import NoControlsEnabled from "./NoControlsEnabled";
// import PlayerControls from "./PlayerControls";

const VideoPlayerWrapper = () => {
    return <div className="flex flex-col items-center gap-2 h-full">
        <EditorVideoPlayer />
        {
            /* <PlayerControls /> */
        }
        <NoControlsEnabled />
    </div>
}

export default memo(VideoPlayerWrapper, () => false)