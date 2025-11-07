import React from "react";
import { useVideoPlayer } from "../hooks/useVideoPlayer";
import { VideoPlayerContext } from ".";
import { storyData } from "../data/storyData";
import { PausedActionName } from "../types/chapter";

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
  const [previousClipId, setPreviousClipId] = React.useState<string | null>(
    null
  );

  // Ensure we only initialize the VideoPlayer SDK once per api instance
  const initializedRef = React.useRef(false);
  const unsubRef = React.useRef<Array<() => void>>([]);

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
      }, 50);
    }
    if (pauseType === PausedActionName.DECISION_POINT_REACHED) return;
    play();
  }, [currentStatus, onSetCurrentClipId, seekTo, play, api, pauseType]);

  const handleStart = React.useCallback((clipId: string) => {
    console.log("🚀 ~ VideoPlayerProvider ~ handleStart clipId:", clipId);
    setPauseType(null);
  }, []);

  const handleStop = React.useCallback(
    (payload: Record<string, any>) => {
      console.log("🚀 ~ VideoPlayerProvider ~ payload:", payload);
      setCurrentStatus(payload);

      if (payload.actionName === PausedActionName.DECISION_POINT_REACHED)
        setPauseType(payload.actionName);
      if (
        payload.actionName === PausedActionName.HOTSPOT_NO_NEXT &&
        previousClipId &&
        payload.triggerType === "hotspot"
      ) {
        const hotspot = data.clips[previousClipId].hotspots?.find(
          (hotspot: any) => hotspot.nextClipId === payload.currentClipId
        );

        onSetCurrentClipId(previousClipId);
        setTimeout(() => {
          seekTo(hotspot.start);
          play();
        }, 100);
        setPreviousClipId(null);
      }
    },
    [data, onSetCurrentClipId, seekTo, play, previousClipId]
  );

  const handleChoiceSelected = React.useCallback(
    (clipId: string, nextClipId: string) => {
      console.log(
        "🚀 ~ VideoPlayerProvider ~ handleChoiceSelected clipId:",
        clipId
      );
      setPreviousClipId(clipId);
      setPauseType(null);
      setCurrentStatus(null);
    },
    []
  );

  const onInit = React.useCallback(() => {
    if (!api?.play) return;
    console.log("Init player");
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

  // One-time initialization when api is ready (only re-run when api/data change)
  React.useEffect(() => {
    if (!ready || !api || initializedRef.current) return;
    onInit();
    initializedRef.current = true;

    return () => {
      // Cleanup if api instance changes or component unmounts
      api.destroy?.();
      initializedRef.current = false;
    };
  }, [ready, api, onInit]);

  React.useEffect(() => {
    if (!api) return;
    const offStart = api.onPlay?.(handleStart);
    const offStop = api.onPause?.(handleStop);
    const offChoice = api.onChoiceSelected?.(handleChoiceSelected);

    unsubRef.current.push(
      offStart ?? (() => {}),
      offStop ?? (() => {}),
      offChoice ?? (() => {})
    );

    return () => {
      unsubRef.current.forEach((fn) => fn?.());
      unsubRef.current = [];
    };
  }, [api, handleStart, handleStop, handleChoiceSelected]);

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
    onPlay,
  };
  return (
    <VideoPlayerContext.Provider value={value}>
      {children}
    </VideoPlayerContext.Provider>
  );
};
