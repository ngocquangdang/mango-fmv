import { createContext, useContext } from "react";
import type { VideoPlayerContextType } from "./video-player-provider";

export const VideoPlayerContext = createContext<
  VideoPlayerContextType | undefined
>(undefined);

export const useVideoPlayerContext = () => {
  const context = useContext(VideoPlayerContext);
  if (!context) {
    throw new Error("useVideoPlayer must be used within a VideoPlayerProvider");
  }
  return context;
};
