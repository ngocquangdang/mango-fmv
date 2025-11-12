import React from "react";
import { useVideoPlayer } from "../hooks/useVideoPlayer";
import { VideoPlayerContext } from ".";
import type { Scene } from "../data/storyData";
import { PausedActionName } from "../types/chapter";
import { useUserContext } from "../features/user/context";

export interface VideoPlayerContextType {
  type: "intro" | "interactive";
  setType: (type: "intro" | "interactive") => void;
  currentSceneId: string | null;
  clips: Record<string, Scene>;
  play: () => void;
  pause: () => void;
  pauseType: string | null;
  setPauseType: React.Dispatch<React.SetStateAction<string | null>>;
  ready: boolean;
  onAutoplay: () => void;
  onSetCurrentSceneId: (sceneId: string) => void;
  onPlay: (sceneId?: string) => void;
  setCurrentStatus: React.Dispatch<
    React.SetStateAction<Record<string, any> | null>
  >;
  onPlayPlayer: (sceneId: string) => void;
  quitPlayer: () => void;
}

export const VideoPlayerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { api, ready } = useVideoPlayer();
  const { chapter: data, updateSceneStatus } = useUserContext();

  const [type, setType] = React.useState<"intro" | "interactive">("intro");
  const [pauseType, setPauseType] = React.useState<string | null>(null);
  console.log("🚀 ~ VideoPlayerProvider ~ pauseType:", pauseType)
  const [currentStatus, setCurrentStatus] = React.useState<Record<
    string,
    any
  > | null>(null);
  const [currentSceneId, setCurrentSceneId] = React.useState<string | null>(
    null
  );

  const [collectionItems, setCollectionItems] = React.useState<
    Record<string, any>[]
  >([]);

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

  const onSetCurrentSceneId = React.useCallback(
    (sceneId: string) => {
      if (!api) return;
      api.setCurrentSceneId?.(sceneId);
      setCurrentSceneId(sceneId);
    },
    [api]
  );

  const handleCollectionItems = React.useCallback(
    (hotspot: any, currentSceneId: string) => {
      if (!api) return;
      api.setCollectionItems?.({
        ...collectionItems,
        [hotspot.id]: {
          collectionIds: [
            ...(collectionItems[hotspot.id]?.collectionIds || []),
            currentSceneId,
          ],
          isCompleted:
            hotspot.minCollectionItems ===
            (collectionItems[hotspot.id]?.collectionIds?.length || 0) + 1,
        },
      });
    },
    [collectionItems, api]
  );

  const onPlay = React.useCallback(
    (sceneId?: string) => {
      if (currentStatus && api && currentStatus?.currentSceneId === sceneId) {
        onSetCurrentSceneId(currentStatus?.currentSceneId);
        setTimeout(() => {
          seekTo(currentStatus?.time);
        }, 50);
        console.log("seekTo");
      }
      if (pauseType === PausedActionName.DECISION_POINT_REACHED) return;
      play();
    },
    [currentStatus, onSetCurrentSceneId, seekTo, play, api, pauseType]
  );

  const handleStart = React.useCallback(
    (sceneId: string) => {
      console.log("🚀 ~ [START] [INPROGRESS]:", sceneId);
      updateSceneStatus(
        sceneId,
        Math.floor(data.scenes[sceneId]?.duration || 0),
        0,
        "INPROGRESS"
      );
      setCurrentSceneId(sceneId);
      if (pauseType === PausedActionName.DECISION_POINT_REACHED) return;
      setPauseType(null);
    },
    [updateSceneStatus, data.scenes, pauseType]
  );

  const handleStop = React.useCallback(
    (payload: Record<string, any>) => {
      console.log("🚀 ~ [STOP]", payload);
      setCurrentStatus(payload);
      const currentClip = data.scenes[payload.currentSceneId];

      if (payload.actionName === PausedActionName.USER_PAUSED_VIDEO) {
        updateSceneStatus(
          payload.currentSceneId,
          Math.floor(currentClip?.duration || 0),
          Math.floor(payload.time || 0),
          "INPROGRESS"
        );
        return;
      }
      if (payload.actionName === PausedActionName.DECISION_POINT_REACHED) {
        setPauseType(payload.actionName);
        updateSceneStatus(
          payload.currentSceneId,
          Math.floor(currentClip?.duration || 0),
          Math.floor(payload.time || 0),
          "INPROGRESS"
        );
      }

      if (
        payload.actionName === PausedActionName.HOTSPOT_NO_NEXT &&
        currentClip.previousSceneId
      ) {
        const previousClip = data.scenes[currentClip.previousSceneId];
        const hotspot = previousClip?.hotspots?.find((h: any) =>
          h.items.some(
            (item: any) => item.targetSceneId === payload.currentSceneId
          )
        );

        setCollectionItems((pre) => ({
          ...pre,
          [hotspot.id]: {
            collectionIds: [
              ...(pre[hotspot.id]?.collectionIds || []),
              payload.currentSceneId,
            ],
            isCompleted:
              hotspot.minCollectionItems ===
              collectionItems[hotspot.id]?.collectionIds.length + 1,
          },
        }));

        if (hotspot) {
          handleCollectionItems(hotspot, payload.currentSceneId);
        }

        console.log("🚀 ~ [PLAY BACK]");
        onSetCurrentSceneId(currentClip.previousSceneId);
        setTimeout(() => {
          seekTo(hotspot.startTime);
          play();
        }, 100);
      }
    },
    [
      data,
      onSetCurrentSceneId,
      seekTo,
      play,
      updateSceneStatus,
      handleCollectionItems,
      collectionItems,
    ]
  );

  const handleChoiceSelected = React.useCallback(
    (sceneId: string, nextSceneId: string) => {
      console.log("🚀 ~ [CHOICE SELECTED]", sceneId, nextSceneId);
      setCurrentSceneId(nextSceneId);
      setPauseType(null);
      setCurrentStatus(null);
    },
    []
  );

  const handleEnded = React.useCallback(
    (sceneId: string) => {
      console.log("🚀 ~ [ENDED]", sceneId);
      updateSceneStatus(
        sceneId,
        Math.floor(data.scenes[sceneId]?.duration || 0),
        Math.floor(data.scenes[sceneId]?.duration || 0),
        "COMPLETED"
      );
    },
    [updateSceneStatus, data.scenes]
  );

  const quitPlayer = React.useCallback(() => {
    setType("intro");
    pause();
  }, [pause]);

  const onPlayPlayer = React.useCallback(
    (sceneId: string) => {
      setType("interactive");
      onSetCurrentSceneId(sceneId);
      onPlay(sceneId);
      autoplay();
    },
    [onSetCurrentSceneId, onPlay, autoplay]
  );

  React.useEffect(() => {
    if (!data.id && !data.progress?.currentScene) return;
    setCurrentStatus({
      currentSceneId: data.progress?.currentScene?.sceneId,
      time: data.progress?.currentScene?.watchingSecond || 0,
    });
    setCurrentSceneId(data.progress?.currentScene?.sceneId || null);
    setPauseType(null);
  }, [data.id, data.progress?.currentScene]);

  const onInit = React.useCallback(() => {
    if (!api?.play || !data?.id) return;
    console.log("Init player");
    const params = new URLSearchParams(window.location.search);

    api.onInit?.({
      container: "#interactive-video",
      config: {
        chapter: data,
        video: {
          controls: params.get("controls") === "true",
          muted: false,
          autoplay: false,
        },
      },
    });
  }, [api, data?.id]);

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
    const offEnded = api.onEnded?.(handleEnded);
    const offChoice = api.onChoiceSelected?.(handleChoiceSelected);

    unsubRef.current.push(
      offStart ?? (() => {}),
      offStop ?? (() => {}),
      offEnded ?? (() => {}),
      offChoice ?? (() => {})
    );

    return () => {
      unsubRef.current.forEach((fn) => fn?.());
      unsubRef.current = [];
    };
  }, [api, handleStart, handleStop, handleChoiceSelected, handleEnded]);

  const value: VideoPlayerContextType = {
    type,
    setType,
    clips: data.scenes,
    currentSceneId,
    play,
    pause,
    pauseType,
    setPauseType,
    ready,
    onAutoplay: autoplay,
    onSetCurrentSceneId,
    onPlay,
    setCurrentStatus,
    onPlayPlayer,
    quitPlayer,
  };
  return (
    <VideoPlayerContext.Provider value={value}>
      {children}
    </VideoPlayerContext.Provider>
  );
};
