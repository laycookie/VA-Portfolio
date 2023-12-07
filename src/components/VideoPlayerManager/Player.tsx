"use client"

import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";


type Props = {
    srcs: string[]
    children: ReactNode;
    playerIndex: number;
}

export const PlayerData = createContext({
    srcs: [] as string[],
    playerIndex: 0 as number,
    localVideoPlaying: 0 as number,
    setLocalVideoPlaying: null as Dispatch<SetStateAction<number>> | null,
    localPlayerPlaying: null as null | number,
    videoDurations: [] as number[],
    setVideoDurations: null as Dispatch<SetStateAction<number[]>> | null,
    videoCurrentTime: [] as number[],
    setVideoCurrentTime: null as Dispatch<SetStateAction<number[]>> | null,
    updateVideosData: <T,>(index: number, setData: Dispatch<SetStateAction<T[]>> | null, data: T) => {
        if (setData === null) return;
        setData((prev: T[]) => {
            const updatedData = [...prev];
            updatedData[index] = data;
            return updatedData;
        })
    }
})

function Player({srcs, children, playerIndex}: Props) {
    const [localVideoPlaying, setLocalVideoPlaying]
        = useState<number>(0);
    const [videoDurations, setVideoDurations]
        = useState<number[]>([]);
    const [videoCurrentTime, setVideoCurrentTime] = useState<number[]>([]);
    const {updateVideosData} = useContext(PlayerData)


    return (
        <>
            <PlayerData.Provider value={{
                srcs,
                playerIndex,
                localVideoPlaying,
                localPlayerPlaying: playerIndex,
                setLocalVideoPlaying,
                videoDurations,
                setVideoDurations,
                videoCurrentTime,
                setVideoCurrentTime,
                updateVideosData
            }}>
                {children}
            </PlayerData.Provider>
        </>
    );
}

export default Player;