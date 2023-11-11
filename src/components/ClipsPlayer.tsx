"use client"

import {
    Dispatch,
    MutableRefObject,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useRef,
    useState
} from "react";
import {createContext} from "react";
import styles from "@/components/ClipsPlayer.module.css";

type Props = {
    children: ReactNode;
    mediaFiles: string[];
}

const secondsMultiplier = 10;

const CTX = createContext({
        srcs: [],
        playersRef: null,
        mediaDurationRef: null,
        mediaCurrentTimeRef: null
    } as {
        srcs: string[];
        playersRef: MutableRefObject<HTMLVideoElement[]> | null;
        mediaDurationRef: MutableRefObject<Dispatch<SetStateAction<number>>[]> | null;
        mediaCurrentTimeRef: MutableRefObject<Dispatch<SetStateAction<number>>[]> | null;
    }
)


export function ClipsPlayer({children, mediaFiles}: Props) {
    const srcs = mediaFiles;
    const playersRef
        = useRef<HTMLVideoElement[]>([]);
    const mediaDurationRef
        = useRef<Dispatch<SetStateAction<number>>[]>([]);
    const mediaCurrentTimeRef
        = useRef<Dispatch<SetStateAction<number>>[]>([]);

    return (
        <div className="flex flex-col space-y-12 md:flex-row md:space-y-0">
            <CTX.Provider value={{srcs, playersRef, mediaDurationRef, mediaCurrentTimeRef}}>
                {children}
            </CTX.Provider>
        </div>
    );
}

export function VideoPlayer() {
    const {
        srcs,
        playersRef,
        mediaDurationRef,
        mediaCurrentTimeRef
    } = useContext(CTX);

    // useEffect(() => {
    //     if (!playersRef) return;
    //     playersRef.current.forEach((player, index) => {
    //         const roundedDuration = Math.round(player.duration);
    //         if (Number.isNaN(roundedDuration)) return;
    //         if (mediaDurationRef?.current[index]) {
    //             mediaDurationRef.current[index](roundedDuration);
    //         }
    //     })
    // }, [playersRef]);

    useEffect(() => {
        function setPlayerDurationInRef(player: HTMLVideoElement, playerIndex: number) {
            const roundedDuration = Math.round(player.duration);
            if (mediaDurationRef?.current) {
                mediaDurationRef.current[playerIndex](roundedDuration);
            }

            player.removeEventListener("loadeddata", () => setPlayerDurationInRef(player, playerIndex))
        }

        if (!playersRef) return;
        playersRef.current.forEach((player, index) => {
            if (player.readyState >= 2) {
                setPlayerDurationInRef(player, index)
            } else {
                console.log("not ready")
                player.addEventListener("loadeddata", () => setPlayerDurationInRef(player, index))
            }
        })
    }, [playersRef]);

    return (
        <div className="w-full">
            <div className="w-full aspect-video bg-black rounded-lg">
                {srcs.map((src, index) =>
                    <video
                        onLoadedData={(e) => {
                            const roundedDuration = Math.round(e.currentTarget.duration);
                            if (mediaDurationRef?.current[index]) {
                                mediaDurationRef.current[index](roundedDuration);
                            }
                        }}
                        onLoad={() => {
                            console.log("test")
                        }}
                        onTimeUpdate={(e) => {
                            if (!mediaCurrentTimeRef?.current) return;
                            const currentTime = e.currentTarget.currentTime;
                            mediaCurrentTimeRef.current[index](currentTime);
                        }}
                        key={crypto.randomUUID()}
                        src={src}
                        ref={ref => {
                            if (!ref || !playersRef) return;
                            playersRef.current[index] = ref;
                        }}
                        className="aspect-video w-full bg-black hidden rounded-lg"
                    />
                )}
            </div>
        </div>
    );
}

export function VideoControls({bgColor, textColor}: { bgColor: string, textColor: string }) {
    const {
        srcs,
        playersRef
    } = useContext(CTX);

    const setPlayingValues = useRef<Dispatch<SetStateAction<boolean>>[]>([]);

    return (
        <>
            <div className="w-full flex flex-col justify-center space-y-16">
                {srcs.map((_, index) => (
                        <div key={crypto.randomUUID()}
                             className={`inline-block p-2 mx-auto rounded-xl
                             border-8 border-white scale-125 lg:scale-150`}
                             style={{
                                 background: bgColor,
                                 color: textColor
                             }}>
                            <div className="flex items-center space-x-2">
                                <PlayPauseButton playersRef={playersRef} buttonIndex={index}
                                                 setPlayingValues={setPlayingValues}
                                                 color={textColor}/>
                                <DisplayMediaTime index={index} setPlayingValues={setPlayingValues}
                                                  color={textColor}/>
                            </div>
                        </div>
                    )
                )}
            </div>
            <div/>
        </>
    );
}

function PlayPauseButton({buttonIndex, playersRef, setPlayingValues, color}:
                             {
                                 buttonIndex: number,
                                 playersRef: MutableRefObject<HTMLVideoElement[]> | null,
                                 setPlayingValues: MutableRefObject<Dispatch<SetStateAction<boolean>>[]>,
                                 color: string
                             }) {
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (!setPlayingValues) return;
        setPlayingValues.current[buttonIndex] = setIsPlaying;
    }, []);

    return (
        <button
            onClick={() => {
                if (!playersRef) return;
                // control displayed player
                playersRef.current.forEach((player, i) => {
                    if (i === buttonIndex)
                        player.classList.remove("hidden")
                    else player.classList.add("hidden")

                })
                // control all others playersRef
                setIsPlaying(prev => !prev)
                playersRef.current.forEach(async (player, i) => {
                    if (i === buttonIndex) {
                        if (player.paused) {
                            await player.play()
                            setIsPlaying(true);
                        } else {
                            player.pause()
                            setIsPlaying(false)
                        }
                    } else {
                        player.pause()
                        setPlayingValues.current[i](false)
                    }
                })
            }}
        >
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

function DisplayMediaTime({index, setPlayingValues, color}: {
    index: number,
    setPlayingValues: MutableRefObject<Dispatch<SetStateAction<boolean>>[]>,
    color: string
}) {
    const {
        playersRef,
        mediaCurrentTimeRef,
        mediaDurationRef
    } = useContext(CTX);

    const [mediaDuration, setMediaDuration]
        = useState<number>(0);
    const [mediaCurrentTime, setCurrentMediaTime]
        = useState<number>(0);

    useEffect(() => {
        if (mediaCurrentTimeRef?.current)
            mediaCurrentTimeRef.current[index] = setCurrentMediaTime;
        if (mediaDurationRef?.current)
            mediaDurationRef.current[index] = setMediaDuration;
    }, [setCurrentMediaTime, mediaCurrentTimeRef]);

    return (
        <>
            <input
                type={"range"}
                className={styles.rangeInput}
                style={{background: color}}
                min={0}
                max={mediaDuration * secondsMultiplier}
                value={mediaCurrentTime * secondsMultiplier}
                onChange={(e) => {
                    if (!playersRef) return;
                    // pause and video being set
                    playersRef.current.forEach((player, i) => {
                        if (i === index) {
                            player.classList.remove("hidden")
                        } else {
                            if (!player.classList.contains("hidden")) player.classList.add("hidden")
                            player.pause()
                            setPlayingValues.current[i](false)
                        }
                    })


                    //
                    setCurrentMediaTime(Number(e.target.value) / secondsMultiplier);
                    playersRef.current[index].currentTime = Number(e.target.value) / secondsMultiplier;
                }}
            />
            <p className="inline text-center"
            >{Math.round(mediaCurrentTime)}/{mediaDuration}</p>
        </>
    )
}