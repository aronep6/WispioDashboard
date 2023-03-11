import { useEffect, useRef } from "react";
import 'vidstack/styles/defaults.css';
import { MediaOutlet, MediaPlayer, useMediaStore } from '@vidstack/react';
import video from '../../ProjectEditor/src/cocadmin_video.mp4';
import useEditor from "../../../../../app_hooks/contexts_hooks/useEditor";
import { type MediaPlayerElement } from 'vidstack';

function EditorVideoPlayer() {
    const playerRef = useRef<MediaPlayerElement>(null);
    const { playbackTimestamp } = useEditor();

    const { currentTime } = useMediaStore(playerRef);

    // // Side effect for subscribing to the current video timestamp
    // useEffect(() => {
    //     // Or, subscribe for updates.
    //     return playerRef?.subscribe(({ currentTime }) => {
    //       // ...
    //     });
    // })

    useEffect(() => {
        console.log("Current currentTime", currentTime)
    }, [currentTime]);

    return <div className="">
        <MediaPlayer
            ref={playerRef}
            src={video}
            controls
            className='rounded overflow-hidden shadow-xl'
        >
            <MediaOutlet />
        </MediaPlayer>
    </div>
}

export default EditorVideoPlayer;