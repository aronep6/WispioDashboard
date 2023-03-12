import { useState } from "react";
import { Pause, Play } from "react-feather"

const iconProps = { 
    size: 20,
    fill: "white",
};

const playingStyle = "flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 shadow-lg scale-105 duration-150 text-white";
const pausedStyle = "flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 duration-150 text-white";

const PlayPause = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    const onPlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    return <button className={isPlaying ? playingStyle : pausedStyle}
        onClick={onPlayPause} >
        {
            isPlaying ? <Pause {...iconProps} /> : <Play {...iconProps}/>
        }
    </button>
};

export default PlayPause;