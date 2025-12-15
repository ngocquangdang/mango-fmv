import React from "react";
import { useVideoPlayer } from "../hooks/useVideoPlayer";
import { VideoPlayerContext } from ".";

import { PausedActionName, type Scene } from "../types/chapter";
import { useUserContext } from "../features/user/context";
import {
  getLocalParam,
  removeLocalParam,
  saveLocalParams,
} from "../lib/api/storage";
import { useToast } from "../components/ui/toast-v2/use-toast";

export interface VideoPlayerContextType {
  type:
    | "intro"
    | "interactive"
    | "story"
    | "journal"
    | "ranking"
    | "playAgain"
    | "endChapter";
  setType: (
    type:
      | "intro"
      | "interactive"
      | "story"
      | "journal"
      | "ranking"
      | "playAgain"
      | "endChapter"
  ) => void;
  currentSceneId: string | null;
  clips: Record<string, Scene>;
  play: () => void;
  pause: () => void;
  seekTo: (time: number, mode?: "absolute" | "relative") => void;
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
  onPlayPlayer: (sceneId: string, isReviewScene?: boolean) => void;
  quitPlayer: () => void;
  setReviewScene: (status: boolean) => void;
  isReviewScene: boolean;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  isPlayerLoading: boolean;
  setIsPlayerLoading: React.Dispatch<React.SetStateAction<boolean>>;
  openGiftSelection: () => void;
  closeGiftSelection: () => void;
  isGiftSelectionOpen: boolean;
  dialogInfoState: {
    isOpen: boolean;
    data: any;
  };
  openDialogInfo: (data: any) => void;
  closeDialogInfo: () => void;
}

export const VideoPlayerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { api, ready } = useVideoPlayer();
  const { chapter: data, updateSceneStatus } = useUserContext();
  const { showToast } = useToast();

  const [type, setType] = React.useState<
    | "intro"
    | "interactive"
    | "story"
    | "journal"
    | "ranking"
    | "playAgain"
    | "endChapter"
  >("intro");
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
  const [isReviewScene, setIsReviewScene] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isPlayerLoading, setIsPlayerLoading] = React.useState(false);
  const [isGiftSelectionOpen, setIsGiftSelectionOpen] = React.useState(false);
  const [dialogInfoState, setDialogInfoState] = React.useState<{
    isOpen: boolean;
    data: any;
  }>({
    isOpen: false,
    data: null,
  });

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
    (time: number, mode?: "absolute" | "relative") => {
      if (!api) return;
      api.seek?.(time, mode);
    },
    [api]
  );

  const autoplay = React.useCallback(() => {
    if (!api) return;
    api.setAutoplayEnabled?.(true);
  }, [api]);

  const setReviewScene = React.useCallback(
    (status: boolean) => {
      if (!api) return;
      api.setReviewScene?.(status);
      setIsReviewScene(status);
      setIsPlaying(status);
    },
    [api, setIsReviewScene]
  );

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
    (sceneId?: string, isReviewScene?: boolean) => {
      if (currentStatus && api && currentStatus?.currentSceneId === sceneId) {
        onSetCurrentSceneId(currentStatus?.currentSceneId);
        setTimeout(() => {
          seekTo(isReviewScene ? 0 : currentStatus?.time);
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
      if (!isReviewScene) {
        updateSceneStatus(
          sceneId,
          Math.floor(data.scenes[sceneId]?.duration || 0),
          0,
          "INPROGRESS"
        );
      }
      setCurrentSceneId(sceneId);
      setPauseType(null);
    },
    [updateSceneStatus, data.scenes, isReviewScene]
  );

  const handleStop = React.useCallback(
    (payload: Record<string, any>) => {
      console.log("🚀 ~ [STOP]", payload);
      setCurrentStatus(payload);
      const currentClip = data.scenes[payload.currentSceneId];

      if (payload.actionName === PausedActionName.USER_PAUSED_VIDEO) {
        if (!isReviewScene) {
          updateSceneStatus(
            payload.currentSceneId,
            Math.floor(currentClip?.duration || 0),
            Math.floor(payload.time || 0),
            "INPROGRESS"
          );
        }
        return;
      }
      if (payload.actionName === PausedActionName.DECISION_POINT_REACHED) {
        setPauseType(payload.actionName);
        if (!isReviewScene) {
          updateSceneStatus(
            payload.currentSceneId,
            Math.floor(currentClip?.duration || 0),
            Math.floor(payload.time || 0),
            "INPROGRESS"
          );
        }
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
        if (hotspot && !hotspot.returnToSource) return;
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
        removeLocalParam("previousSceneId");
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
      isReviewScene,
    ]
  );

  const handleCollectionSelected = React.useCallback(
    (collectionItemId: string) => {
      console.log("🚀 ~ [HOTSPOT COLLECTION ITEM]", collectionItemId);
      const [hotspotId] = collectionItemId.split("_item_");
      openDialogInfo({
        hotspotId: hotspotId,
        title: "Thông báo",
        description: "Bạn đã chọn câu hỏi này",
      });
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
      // if (items[hotspotId].isCompleted) {
      //   play();
      // }
    },
    [api, collectionItems]
  );

  const openDialogInfo = React.useCallback((data: any) => {
    setDialogInfoState({ isOpen: true, data });
  }, []);

  const closeDialogInfo = React.useCallback(() => {
    setDialogInfoState((prev) => ({ ...prev, isOpen: false }));
    const hotspotId = dialogInfoState?.data?.hotspotId;
    if (hotspotId && collectionItems[hotspotId]?.isCompleted) {
      play();
    }
  }, [collectionItems, play, dialogInfoState?.data?.hotspotId]);

  const handleChoiceSelected = React.useCallback(
    (sceneId: string, nextSceneId: string) => {
      const isHotspot = data.hotspotScenes?.includes(nextSceneId);
      if (isHotspot) {
        saveLocalParams({ previousSceneId: sceneId });
      } else {
        removeLocalParam("previousSceneId");
        if (!isReviewScene) {
          updateSceneStatus(
            sceneId,
            Math.floor(data.scenes[sceneId]?.duration || 0),
            Math.floor(data.scenes[sceneId]?.duration || 0),
            "COMPLETED"
          );
        }
      }

      setCurrentSceneId(nextSceneId);
      setPauseType(null);
      setCurrentStatus(null);
    },
    [data.id, updateSceneStatus, isReviewScene]
  );

  const handleEnded = React.useCallback(
    (sceneId: string) => {
      console.log("🚀 ~ [ENDED]", sceneId);
      if (!isReviewScene) {
        updateSceneStatus(
          sceneId,
          Math.floor(data.scenes[sceneId]?.duration || 0),
          Math.floor(data.scenes[sceneId]?.duration || 0),
          "COMPLETED"
        );
      }

      const scene = data.scenes[sceneId];
      if (!scene) return;

      const hasNext =
        scene.branch?.options?.some((o: any) => o.targetSceneId) ||
        scene.hotspots?.some((h: any) =>
          h.items?.some((i: any) => i.targetSceneId)
        ) ||
        (scene as any).targetSceneId;

      if (!hasNext) {
        setIsPlayerLoading(true);
        setIsReviewScene(false);
        setTimeout(() => {
          setIsPlayerLoading(false);

          setType("intro");
        }, 3000);
      }
    },
    [updateSceneStatus, data.scenes, isReviewScene]
  );

  const quitPlayer = React.useCallback(() => {
    setType("intro");
    pause();
  }, [pause]);

  const onPlayPlayer = React.useCallback(
    (sceneId: string, isReviewScene?: boolean) => {
      if (!data?.id || !data.scenes[sceneId]?.videoUrl) {
        showToast({ description: "Player chưa sẵn sàng" });
        return;
      }
      setType("interactive");
      onSetCurrentSceneId(sceneId);
      onPlay(sceneId, isReviewScene);
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

    // function ChoiceButtonWrapper({
    //   choice,
    //   onClick,
    //   onKeyDown,
    // }: {
    //   choice: any;
    //   onClick: () => void;
    //   onKeyDown: () => void;
    // }) {
    //   return (
    //     <ButtonLighter onClick={onClick} onKeyDown={onKeyDown}>
    //       {choice.text}
    //     </ButtonLighter>
    //   );
    // }

    api.onInit?.({
      container: "#interactive-video",
      config: {
        chapter: data,
        ui: {
          fonts: {
            base: "",
          },
          choices: {
            // buttonComponent: ChoiceButtonWrapper,
            button:
              "bg-[url(/images/paper-button.png)] bg-repeat-round min-w-[150px] px-6 py-2 text-white text-sm font-semibold",
            buttonContainer: "flex flex-row !justify-evenly",
          },
          hotspots: {
            label: {
              className: "hotspot-label-connector pr-10 text-white! text-sm font-semibold top-0 right-0 !bottom-auto !left-auto -mt-2 -mr-2",
              isShowLabel: true,
            }
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

  React.useEffect(() => {
    if (Object.values(collectionItems).some((item) => item.isCompleted)) {
      showToast({
        description: "Bạn đã thu thập được vật phẩm X/Y",
        position: "bottom-left",
      });
    }
  }, [showToast, collectionItems]);

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

  const openGiftSelection = React.useCallback(() => {
    setIsGiftSelectionOpen(true);
  }, []);

  const closeGiftSelection = React.useCallback(() => {
    setIsGiftSelectionOpen(false);
  }, []);

  const value: VideoPlayerContextType = {
    type,
    setType,
    clips: data.scenes,
    currentSceneId,
    play,
    pause,
    seekTo,
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
    setReviewScene,
    isReviewScene,
    isPlaying,
    setIsPlaying,
    isPlayerLoading,
    setIsPlayerLoading,
    openGiftSelection,
    closeGiftSelection,
    isGiftSelectionOpen,
    dialogInfoState,
    openDialogInfo,
    closeDialogInfo,
  };
  return (
    <VideoPlayerContext.Provider value={value}>
      {children}
    </VideoPlayerContext.Provider>
  );
};
