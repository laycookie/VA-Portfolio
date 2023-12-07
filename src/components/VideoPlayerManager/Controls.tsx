"use client"

import {useContext, useEffect} from "react";
import {PlayerData} from "@/components/VideoPlayerManager/Player";
import styles from "@/components/ClipsPlayer.module.css";
import {VideoRefsCtx} from "@/components/VideoPlayerManager/ClientBody";

type Props = {
    color: string;
    bgColor: string;
}

export default function Controls({color, bgColor}: Props) {
    const {
        srcs,
        localVideoPlaying,
        localPlayerPlaying,
        setLocalVideoPlaying,
        videoDurations,
        videoCurrentTime,
        playerIndex
    } = useContext(PlayerData)
    const {
        isPlaying,
        setIsPlaying,
        playerPlaying,
        setVideoPlayingGlobal
    } = useContext(VideoRefsCtx);

    if (!setLocalVideoPlaying || !setVideoPlayingGlobal || !setIsPlaying) return <></>
    return (
        <div className="w-full flex flex-col justify-center space-y-16">
            {srcs.map((_, index) => (
                    <div key={"mediaControls" + index + " " + localPlayerPlaying}
                         className={`inline-block p-2 mx-auto rounded-xl
                             border-8 border-white
                             lg:scale-125 scale-100`}
                         style={{
                             background: bgColor,
                             color: color
                         }}
                    >
                        <div className="flex items-center space-x-2">
                            <PlayPauseButton color={color}
                                             isPlaying={
                                                 localVideoPlaying === index &&
                                                 playerPlaying === playerIndex &&
                                                 isPlaying
                                             }
                                             index={index}/>
                            <DisplayMediaTime color={color} mediaDuration={videoDurations[index] || 0}
                                              videoCurrentTime={videoCurrentTime[index] || 0} index={index}/>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}

function PlayPauseButton({isPlaying, color, index}: { isPlaying: boolean, color: string, index: number }) {
    const {localVideoPlaying, setLocalVideoPlaying, playerIndex} = useContext(PlayerData)
    const {setIsPlaying, playerPlaying, setVideoPlayingGlobal} = useContext(VideoRefsCtx);
    if (!setIsPlaying || !setLocalVideoPlaying || !setVideoPlayingGlobal) return
    return (
        <button onClick={() => {
            if (localVideoPlaying === index && playerPlaying === playerIndex) setIsPlaying(prev => !prev)
            else setIsPlaying(true)
            setVideoPlayingGlobal(index, playerIndex)
            setLocalVideoPlaying(index)

        }}>
            {isPlaying ?
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                     style={{fill: color}}>
                    <rect x="4" y="3" width="6" height="18" rx="2"/>
                    <rect x="14" y="3" width="6" height="18" rx="2"/>
                </svg> :
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                     style={{fill: color}}>
                    <path
                        d="M19.6432 12.848C20.2699 12.4563 20.2699 11.5437 19.6432 11.152L6.53 2.95625C5.86395 2.53997 5 3.01881 5 3.80425V20.1958C5 20.9812 5.86395 21.46 6.53 21.0438L19.6432 12.848Z"/>
                </svg>

            }
        </button>
    )
}

function DisplayMediaTime({videoCurrentTime, mediaDuration, color, index}: {
    videoCurrentTime: number,
    mediaDuration: number,
    color: string,
    index: number
}) {
    const secondsMultiplier = 15;
    const {
        setLocalVideoPlaying,
        playerIndex,
        setVideoCurrentTime,
        updateVideosData
    } = useContext(PlayerData)
    const {videoRefs, isPlaying, setIsPlaying} = useContext(VideoRefsCtx);

    useEffect(() => {
        if (!videoRefs?.current || isPlaying) return
        videoRefs.current[playerIndex][index].currentTime = videoCurrentTime;
    }, [videoCurrentTime]);

    return (
        <>
            <input
                type={"range"}
                className={styles.rangeInput}
                style={{background: color}}
                min={0}
                max={mediaDuration * secondsMultiplier}
                value={videoCurrentTime * secondsMultiplier}
                onChange={(e) => {
                    if (!videoRefs || !setIsPlaying || !setLocalVideoPlaying || !setVideoCurrentTime) return;
                    setIsPlaying(false);
                    setLocalVideoPlaying(index)
                    updateVideosData(index, setVideoCurrentTime, Number(e.target.value) / secondsMultiplier)
                }}
            />
            <p className="inline text-center"
            >{Math.floor(videoCurrentTime ?? 0)}/{Math.floor(mediaDuration)}</p>
        </>
    )
}