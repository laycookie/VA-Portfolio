"use client"

import {useContext, useEffect} from "react";
import {PlayerData} from "./Player"
import {VideoRefsCtx} from "@/components/VideoPlayerManager/ClientBody";

type Props = {}

function Video({}: Props) {
    const {
        srcs,
        localVideoPlaying,
        localPlayerPlaying,
        playerIndex,
        setVideoDurations,
        setVideoCurrentTime,
        updateVideosData
    } = useContext(PlayerData)
    const {videoRefs, isPlaying, setIsPlaying} = useContext(VideoRefsCtx);

    useEffect(() => {
        for (const i in srcs) {
            if (!videoRefs?.current || !setVideoDurations) return;
            let videoDuration = videoRefs.current[playerIndex][i].duration;
            updateVideosData(Number(i), setVideoDurations, videoDuration);
            // in cases video duration is a NaN check until the metaData has loaded
            const checks = setInterval(() => {
                videoDuration = videoRefs.current[playerIndex][i].duration;
                if (!Number.isNaN(videoDuration)) {
                    updateVideosData(Number(i), setVideoDurations, videoDuration)
                    clearInterval(checks)
                }
            }, 50)
        }
    }, []);

    return (
        <>
            {srcs.map((src, index) =>
                <video
                    className={"aspect-video w-full bg-black rounded-lg"}
                    style={{display: localVideoPlaying === index ? "block" : "none"}}
                    key={"mediaPlayer" + index + " " + localPlayerPlaying}
                    ref={ref => {
                        if (!ref || videoRefs === null) return
                        if (!videoRefs.current[playerIndex]) videoRefs.current[playerIndex] = [];
                        videoRefs.current[playerIndex][index] = ref;
                    }}
                    src={src}
                    onTimeUpdate={(e) => {
                        if (isPlaying) updateVideosData<number>(index, setVideoCurrentTime, e.currentTarget.currentTime);
                    }}
                    onEnded={() => {
                        if (setIsPlaying) setIsPlaying(false)
                    }}
                />
            )}

        </>
    );
}

export default Video;