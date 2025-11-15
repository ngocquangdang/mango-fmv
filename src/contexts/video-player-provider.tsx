import React from "react";
import { useVideoPlayer } from "../hooks/useVideoPlayer";
import { VideoPlayerContext } from ".";

import { PausedActionName, type Scene } from "../types/chapter";
import { useUserContext } from "../features/user/context";
import {
  clearLocalStorage,
  getLocalParam,
  saveLocalParams,
} from "../lib/api/storage";

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
  currentStatus: Record<string, any> | null;
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
  const [currentStatus, setCurrentStatus] = React.useState<Record<
    string,
    any
  > | null>(null);
  const [currentSceneId, setCurrentSceneId] = React.useState<string | null>(
    null
  );

  const [collectionItems, setCollectionItems] = React.useState<
    Record<string, any>
  >({});

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
            (collectionItems[hotspot.id]?.collectionIds?.length || 0) + 1 >=
            hotspot.minCollectionItems,
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
      setPauseType(null);
    },
    [updateSceneStatus, data.scenes]
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
      const previousSceneId = getLocalParam("previousSceneId");
      if (
        payload.actionName === PausedActionName.HOTSPOT_NO_NEXT &&
        previousSceneId
      ) {
        const previousClip = data.scenes[previousSceneId];
        const hotspot = previousClip?.hotspots?.find((h: any) =>
          h.items.some(
            (item: any) => item.targetSceneId === payload.currentSceneId
          )
        );

        if (hotspot && hotspot.id) {
          setCollectionItems((pre) => ({
            ...pre,
            [hotspot.id]: {
              collectionIds: [
                ...(pre[hotspot.id]?.collectionIds || []),
                payload.currentSceneId,
              ],
              isCompleted:
                collectionItems[hotspot.id]?.collectionIds.length + 1 >=
                hotspot.minCollectionItems,
            },
          }));
          handleCollectionItems(hotspot, payload.currentSceneId);
        }

        console.log("🚀 ~ [PLAY BACK]");
        onSetCurrentSceneId(previousSceneId);
        clearLocalStorage();
        setTimeout(() => {
          seekTo(hotspot?.startTime || 0);
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

  const handleCollectionSelected = React.useCallback(
    (collectionItemId: string) => {
      console.log("🚀 ~ [HOTSPOT COLLECTION]", collectionItemId);
      const [hotspotId] = collectionItemId.split("_item_");
      const items = {
        ...collectionItems,
        [hotspotId]: {
          collectionIds: [
            ...(collectionItems[hotspotId]?.collectionIds || []),
            collectionItemId,
          ],
          isCompleted:
            (collectionItems[hotspotId]?.collectionIds?.length || 0) + 1 >=
            (collectionItems[hotspotId]?.minCollectionItems || 0),
        },
      };
      setCollectionItems(items);
      api?.setCollectionItems?.(items);
    },
    [api, collectionItems]
  );

  const handleChoiceSelected = React.useCallback(
    (sceneId: string, nextSceneId: string) => {
      const isHotspot = data.hotspotScenes?.includes(nextSceneId);
      if (isHotspot) {
        saveLocalParams({ previousSceneId: sceneId });
      } else {
        clearLocalStorage();
        updateSceneStatus(
          sceneId,
          Math.floor(data.scenes[sceneId]?.duration || 0),
          Math.floor(data.scenes[sceneId]?.duration || 0),
          "COMPLETED"
        );
      }

      setCurrentSceneId(nextSceneId);
      setPauseType(null);
      setCurrentStatus(null);
    },
    [data.id, updateSceneStatus]
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
    if (pauseType === PausedActionName.DECISION_POINT_REACHED) return;
    setPauseType(null);
  }, [data.id, data.progress?.currentScene, pauseType]);

  const onInit = React.useCallback(() => {
    if (!api?.play || !data?.id) return;
    console.log("Init player");
    const params = new URLSearchParams(window.location.search);

    api.onInit?.({
      container: "#interactive-video",
      config: {
        chapter: data,
        ui: {
          fonts: {
            base: "",
          },
          choices: {
            // button:
            //   `group relative inline-flex items-center justify-center
            //  !rounded-none text-black border-4 border-black bg-sky-400 px-9 py-8 text-3xl font-bold uppercase
            //  tracking-widest shadow-[14px_14px_0_0_rgba(0,0,0,1)]
            //  transition-transform duration-150 ease-out
            //  hover:-translate-x-[6px] hover:-translate-y-[6px] hover:shadow-[20px_20px_0_0_rgba(0,0,0,1)]
            //  active:translate-x-[-2px] active:translate-y-[-2px] active:shadow-[8px_8px_0_0_rgba(0,0,0,1)]`,
          },
          ping: {
            enabled: false,
            showLabel: false,
            position: "top-right",
            interval: 3000, // Check every 3 seconds
          },
        },
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
    const offCollectionSelected = api.onCollectionSelected?.(
      handleCollectionSelected
    );

    unsubRef.current.push(
      offStart ?? (() => {}),
      offStop ?? (() => {}),
      offEnded ?? (() => {}),
      offChoice ?? (() => {}),
      offCollectionSelected ?? (() => {})
    );

    return () => {
      unsubRef.current.forEach((fn) => fn?.());
      unsubRef.current = [];
    };
  }, [
    api,
    handleStart,
    handleStop,
    handleChoiceSelected,
    handleEnded,
    handleCollectionSelected,
  ]);

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
    currentStatus,
    onPlayPlayer,
    quitPlayer,
  };
  return (
    <VideoPlayerContext.Provider value={value}>
      {children}
    </VideoPlayerContext.Provider>
  );
};
