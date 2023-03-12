import { memo, useEffect, useRef } from "react";
import 'vidstack/styles/defaults.css';
import { MediaOutlet, MediaPlayer, useMediaRemote } from '@vidstack/react';
import video from '../../ProjectEditor/src/cocadmin_video.mp4';
import useEditor from "../../../../../app_hooks/contexts_hooks/useEditor";

import { type RefObject } from "react";
import { type MediaPlayerElement } from "vidstack";

export type EditorPlayerRefType = RefObject<MediaPlayerElement | undefined>

function EditorVideoPlayer() {
    const playerRef = useRef<MediaPlayerElement>(null);
    const remote = useMediaRemote(playerRef);
    const { setPlaybackTimestamp, setPlaybackRemote } = useEditor();

    // Pipe current time to current playback timestamp in editor context
    useEffect(() => {
        return playerRef?.current?.subscribe(({ currentTime }) => setPlaybackTimestamp(currentTime));
    }, []);

    // Pipe current remote to current playback remote in editor context
    useEffect(() => {
        setPlaybackRemote(remote);
    }, [remote]);

    return <MediaPlayer
        ref={playerRef}
        src={video}
        controls={playerRef ? true : false}
        className='overflow-hidden'
    >
        <MediaOutlet />
    </MediaPlayer>
}

export default memo(EditorVideoPlayer, () => false);