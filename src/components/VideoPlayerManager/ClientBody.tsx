"use client"

import React, {createContext, ReactNode, useEffect, useRef, useState} from 'react';
type Props = {
    children: ReactNode;
}

export const VideoRefsCtx
    = createContext({
    videoRefs: null as React.MutableRefObject<HTMLVideoElement[][]> | null,
    isPlaying: false as boolean,
    playerPlaying: 0 as number,
    setIsPlaying: null as React.Dispatch<React.SetStateAction<boolean>> | null,
    setVideoPlayingGlobal: null as ((videoPlaying: number, playerPlaying: number) => void) | null,
})


function ClientBody({children}: Props) {
    const videoRefs = useRef<HTMLVideoElement[][]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [videoPlaying, setVideoPlaying] = useState(0);
    const [playerPlaying, setPlayerPlaying] = useState(0);

    function setVideoPlayingGlobal(videoPlaying: number, playerPlaying: number) {
        setVideoPlaying(videoPlaying)
        setPlayerPlaying(playerPlaying)
    }

    useEffect(() => {
        if (!videoRefs) return
        for (const videosInPlayer of  videoRefs.current) {
            for (const video of  videosInPlayer) {
            video.pause()
            if (video !== videoRefs.current[playerPlaying][videoPlaying]) continue;
            if (isPlaying) video.play().then()
            else video.pause()
            }
        }
    }, [isPlaying, videoPlaying, playerPlaying]);

    return (
        <VideoRefsCtx.Provider value={{videoRefs, isPlaying, playerPlaying, setIsPlaying, setVideoPlayingGlobal}}>
        <div>{children}</div>
        </VideoRefsCtx.Provider>
    );
}

export default ClientBody;