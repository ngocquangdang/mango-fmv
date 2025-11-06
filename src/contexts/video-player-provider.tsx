import React from "react";
import { useVideoPlayer } from "../hooks/useVideoPlayer";
import { VideoPlayerContext } from ".";
import { storyData } from "../data/storyData";

export interface VideoPlayerContextType {
  type: "intro" | "interactive";
  setType: (type: "intro" | "interactive") => void;
  play: () => void;
  pause: () => void;
  pauseType: string | null;
  setPauseType: React.Dispatch<React.SetStateAction<string | null>>;
  ready: boolean;
  onAutoplay: () => void;
  onSetCurrentClipId: (clipId: string) => void;
  onDestroy: () => void;
  onPlay: () => void;
}

export const VideoPlayerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { api, ready } = useVideoPlayer();
  const data = React.useMemo(() => storyData(), []);

  const [type, setType] = React.useState<"intro" | "interactive">("intro");
  const [pauseType, setPauseType] = React.useState<string | null>(null);
  const [currentStatus, setCurrentStatus] = React.useState<Record<
    string,
    any
  > | null>(null);

  // Ensure we only initialize the VideoPlayer SDK once per api instance
  const initializedRef = React.useRef(false);
  const unsubRef = React.useRef<Array<() => void>>([]);

  const handleStart = React.useCallback((clipId: string) => {
    setPauseType(null);
  }, []);

  const handleStop = React.useCallback(
    (data: Record<string, any>) => {
      setCurrentStatus(data);
      if (data.actionName === "USER_PAUSED_VIDEO" && !pauseType) return;
      setPauseType(data.actionName);
    },
    [pauseType]
  );

  const handleChoiceSelected = React.useCallback(
    (clipId: string, nextClipId: string) => {
      setPauseType(null);
      setCurrentStatus(null);
    },
    []
  );

  const handleStopAt = React.useCallback((clipId: string, time: number) => {
    console.log("onStopAt", clipId, time);
  }, []);

  const play = React.useCallback(() => {
    if (!api) return;
    api.play?.();
  }, [api]);

  const pause = React.useCallback(() => {
    if (!api) return;
    api.pause?.();
  }, [api]);

  const seekTo = React.useCallback(
    (time: number) => {
      if (!api) return;
      api.seek?.(time);
    },
    [api]
  );

  const autoplay = React.useCallback(() => {
    if (!api) return;
    api.setAutoplayEnabled?.(true);
  }, [api]);

  const onSetCurrentClipId = React.useCallback(
    (clipId: string) => {
      if (!api) return;
      api.setCurrentClipId?.(clipId);
    },
    [api]
  );
  const onPlay = React.useCallback(() => {
    if (currentStatus && api) {
      onSetCurrentClipId(currentStatus?.currentClipId);
      setTimeout(() => {
        seekTo(currentStatus?.time);
      }, 100);
    } else {
      onSetCurrentClipId("clip_sweet_girl");
    }
    play();
  }, [currentStatus, onSetCurrentClipId, seekTo, play, api]);

  const onInit = React.useCallback(() => {
    if (!api?.play) return;
    console.log("Re-init player");
    api.onInit?.({
      container: "#interactive-video",
      config: {
        chapter: data,
        video: {
          controls: true,
          muted: false,
          autoplay: false,
        },
      },
    });
  }, [api, data]);

  const onDestroy = React.useCallback(() => {
    if (!api) return;
    initializedRef.current = false;
    unsubRef.current.forEach((fn) => fn?.());
    unsubRef.current = [];
    api.destroy?.();
    onInit();
    onPlay();
  }, [api, initializedRef, unsubRef, onInit, onPlay]);

  // One-time initialization when api is ready (only re-run when api/data change)
  React.useEffect(() => {
    if (!ready || !api || initializedRef.current) return;

    const offStart = api.onPlay?.(handleStart);
    const offStop = api.onPause?.(handleStop);
    const offChoice = api.onChoiceSelected?.(handleChoiceSelected);
    const offStopAt = api.onStopAt?.(handleStopAt);

    unsubRef.current.push(
      offStart ?? (() => {}),
      offStop ?? (() => {}),
      offChoice ?? (() => {}),
      offStopAt ?? (() => {})
    );

    onInit();

    initializedRef.current = true;

    return () => {
      // Cleanup if api instance changes or component unmounts
      unsubRef.current.forEach((fn) => fn?.());
      unsubRef.current = [];
      api.destroy?.();
      initializedRef.current = false;
    };
  }, [ready, api, data]);

  // // Watch currentStatus changes and handle playback state
  // React.useEffect(() => {
  //   if (
  //     !api ||
  //     !initializedRef.current ||
  //     pauseType === "DECISION_POINT_REACHED"
  //   )
  //     return;

  //   // Handle currentStatus changes (e.g., resume from pause)
  //   if (currentStatus) {
  //     console.log("Current status changed:", currentStatus);
  //     onSetCurrentClipId(currentStatus.currentClipId);
  //     seekTo(currentStatus.time);
  //     play()
  //   }
  // }, [currentStatus, api, onSetCurrentClipId, seekTo, pauseType, play]);

  const value: VideoPlayerContextType = {
    type,
    setType,
    play,
    pause,
    pauseType,
    setPauseType,
    ready,
    onAutoplay: autoplay,
    onSetCurrentClipId,
    onDestroy,
    onPlay,
  };
  return (
    <VideoPlayerContext.Provider value={value}>
      {children}
    </VideoPlayerContext.Provider>
  );
};
