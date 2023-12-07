import {ReactNode} from "react";
import ClientBody from "@/components/VideoPlayerManager/ClientBody";
import Player from "./Player"
import Video from "./Video";
import Controls from "./Controls";

type Props = {
    children: ReactNode;
}

function VideoPlayerManager({children}: Props) {
    return (
        <ClientBody>
            {children}
        </ClientBody>
    );
}


VideoPlayerManager.Player = Player;
VideoPlayerManager.Video = Video;
VideoPlayerManager.Controls = Controls;
export default VideoPlayerManager;