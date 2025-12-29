import * as React from "react";
import { useVideoPlayer } from "../hooks/useVideoPlayer";
import { VideoPlayerContext } from ".";
import { useNavigate, useLocation } from "react-router-dom";

import { PausedActionName, type Scene } from "../types/chapter";
import { useUserContext } from "../features/user/context";
import { useSubmitHotspot, useCollectedHotspots } from "../features/user/hooks";
import {
  getLocalParam,
  removeLocalParam,
  saveLocalParams,
} from "../lib/api/storage";
import { useToast } from "../components/ui/toast-v2/use-toast";
import RewardCollection, {
  type RewardItem,
} from "../feature-v2/components/reward-collection";
import RelationshipPoint from "../feature-v2/components/relationship-point";
import { VoiceService } from "../feature-v2/services/voice-service";
import { getOrderedScenes } from "../feature-v2/utils/scene-ordering";

export type VideoPlayerType =
  | "intro"
  | "interactive"
  | "story"
  | "journal"
  | "ranking"
  | "playAgain"
  | "endChapter"
  | "cardCollection"
  | "collection";
export interface VideoPlayerContextType {
  type: VideoPlayerType;
  setType: (type: VideoPlayerType) => void;
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
    isLoading?: boolean;
  };
  openDialogInfo: (data: any) => void;
  closeDialogInfo: () => void;
  setCollectionItems: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  showRewardCollection: (
    items: RewardItem[],
    onClose?: () => void,
    title?: string,
    description?: string
  ) => void;
  showRelationshipPoint: (
    items: { imageUrl: string; points: number }[]
  ) => void;
  isEndingScene: boolean;
  setIsEndingScene: React.Dispatch<React.SetStateAction<boolean>>;
  isVipModalOpen: boolean;
  setIsVipModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  voiceType: "original" | "ai" | "mute";
  setVoiceType: React.Dispatch<React.SetStateAction<"original" | "ai" | "mute">>;
  // audioRecordings: any[];
  // setAudioRecordings: React.Dispatch<React.SetStateAction<any[]>>;
  // fetchAudioRecordings: () => Promise<void>;
  // currentSceneAudioUrl: string | null;
  setAiAudioList: (audioList: { sceneId: string; aiAudio: string }[]) => void;
  setUseAiAudio: (type: "ai" | "original" | "mute") => void;
}



const reverseRouteMap: Record<string, "intro" | "story" | "journal" | "ranking" | "collection" | "interactive"> = {
  "/": "intro",
  "/chapter": "story",
  "/journal": "journal",
  "/rank": "ranking",
  "/collection": "collection",
  "/watch": "interactive",
}; // Moved outside component to avoid recreation

export const VideoPlayerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { api, ready } = useVideoPlayer();
  const { chapter: data, updateSceneStatus, userInfo, audioRecordings } = useUserContext();
  console.log({ audioRecordings });
  const { mutate: submitHotspot } = useSubmitHotspot();
  const { showToast } = useToast();

  const [type, setType] = React.useState<
    | "intro"
    | "interactive"
    | "story"
    | "journal"
    | "ranking"
    | "playAgain"
    | "endChapter"
    | "collection"
    | "cardCollection"
  >("intro");

  const navigate = useNavigate();
  const location = useLocation();



  // Sync route changes to type state (optional, for backward compatibility)
  React.useEffect(() => {
    const path = location.pathname;
    // Simple matching
    let newType = "intro";
    if (path === "/chapter" || path === "/play") newType = "story"; // Handle legacy /play if needed
    else if (reverseRouteMap[path]) newType = reverseRouteMap[path];

    setType(newType as any);
  }, [location.pathname]);

  // Modified setType that navigates
  const handleSetType = React.useCallback((newType: VideoPlayerType) => {
    // const targetPath = routeMap[newType];
    // if (targetPath) {
    //   navigate(targetPath);
    // } else {
    // Fallback for internal types that might not have routes or are modals
    setType(newType);
    // }
  }, [navigate]);

  const [pauseType, setPauseType] = React.useState<string | null>(null);
  const [currentStatus, setCurrentStatus] = React.useState<Record<
    string,
    any
  > | null>(null);
  const [currentSceneId, setCurrentSceneId] = React.useState<string | null>(
    null
  );

  const dataRef = React.useRef(data);
  React.useEffect(() => {
    dataRef.current = data;
  }, [data]);

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
    isLoading?: boolean;
  }>({
    isOpen: false,
    data: null,
    isLoading: false,
  });

  const [isEndingScene, setIsEndingScene] = React.useState(false);
  const [isVipModalOpen, setIsVipModalOpen] = React.useState(false);
  const [voiceType, setVoiceType] = React.useState<"original" | "ai" | "mute">("original");
  // const [audioRecordings, setAudioRecordings] = React.useState<any[]>([]);

  // const [currentSceneAudioUrl, setCurrentSceneAudioUrl] = React.useState<string | null>(null);

  // // Fetch audio for current scene


  // const fetchAudioRecordings = React.useCallback(async () => {
  //   try {
  //     const response = await VoiceService.getAudioRecordings(20, 0);
  //     console.log(response);
  //     if (response.data) {
  //       // Assuming response.data is the list or contains the list.
  //       // Adjust if response structure is different (e.g. response.data.items)
  //       // User provided API returns list directly or valid envelope.
  //       // Let's assume response.data IS the array based on typical apiClient usage.
  //       setAudioRecordings(Array.isArray(response.data) ? response.data : []);
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch audio recordings:", error);
  //   }
  // }, []);

  // React.useEffect(() => {
  //   fetchAudioRecordings();
  // }, [fetchAudioRecordings]);

  React.useEffect(() => {
    const savedVoiceType = getLocalParam("voiceType") as "original" | "ai" | "mute";
    if (savedVoiceType) {
      setVoiceType(savedVoiceType);
    }
  }, []);

  const { data: collectedHotspotsData } = useCollectedHotspots(
    currentSceneId || ""
  );

  React.useEffect(() => {
    if (!data?.progress) return;
    setCurrentSceneId(data.progress?.currentScene?.sceneId);
  }, [data?.progress])

  React.useEffect(() => {
    const collectedHotspots = collectedHotspotsData?.data?.collectedHotspots;
    if (!collectedHotspots || !data.scenes || !currentSceneId) return;

    const transformedItems: Record<string, any> = {};
    const scene = data.scenes[currentSceneId];

    collectedHotspots.forEach((item: any) => {
      const hotspot = scene?.hotspots?.find((h: any) => h.id === item.hotspotId);
      const minCollectionItems =
        hotspot?.minCollectionItems || hotspot?.items?.length || 0;

      transformedItems[item.hotspotId] = {
        collectionIds: item.collectedHotspotItemIds.map(
          (itemId: string) => `${item.hotspotId}_item_${itemId}`
        ),
        minCollectionItems,
        isCompleted: item.collectedHotspotItemIds.length >= minCollectionItems,
      };
    });

    setCollectionItems(transformedItems);
    api?.setCollectionItems?.(transformedItems);
  }, [collectedHotspotsData, currentSceneId, data.scenes, api]);

  const [rewardCollectionState, setRewardCollectionState] = React.useState<{
    isOpen: boolean;
    items: RewardItem[];
    title?: string;
    description?: string;
  }>({
    isOpen: false,
    items: [],
  });
  const rewardCollectionOnCloseRef = React.useRef<(() => void) | null>(null);

  const [relationshipPointState, setRelationshipPointState] = React.useState<{
    items: { imageUrl: string; points: number }[];
    isVisible: boolean;
  }>({
    items: [],
    isVisible: false,
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
      play()
    },
    [api, play]
  );

  const showRewardCollection = React.useCallback(
    (
      items: RewardItem[],
      onClose?: () => void,
      title?: string,
      description?: string
    ) => {
      rewardCollectionOnCloseRef.current = onClose || null;
      setRewardCollectionState({
        isOpen: true,
        items: items || [],
        title,
        description,
      });
    },
    []
  );

  const showRelationshipPoint = React.useCallback(
    (items: { imageUrl: string; points: number }[]) => {
      setRelationshipPointState({
        items,
        isVisible: true,
      });
    },
    []
  );

  const handleRelationshipPointClose = React.useCallback(() => {
    setRelationshipPointState((prev) => ({
      ...prev,
      isVisible: false,
    }));
  }, []);

  const openGiftSelection = React.useCallback(() => {
    setIsGiftSelectionOpen(true);
  }, []);

  const closeGiftSelection = React.useCallback(() => {
    setIsGiftSelectionOpen(false);
  }, []);

  const setAiAudioList = React.useCallback((audioList: { sceneId: string; aiAudio: string }[]) => {
    if (!api) return;
    api.setAiAudioList?.(audioList);
  }, [api]);

  // Fetch all AI voices on mount moved below setAiAudioList declaration
  // React.useEffect(() => {
  //   const fetchAllAiVoices = async () => {
  //     try {
  //       const response = await VoiceService.getAllVoiceResults();
  //       console.log(response);
  //       if (response && Array.isArray(response.items)) {
  //         const mappedList = response.items.map(item => ({
  //           sceneId: item.scene_id,
  //           aiAudio: item.audio_url
  //         }));
  //
  //         if (mappedList.length > 0) {
  //           setAiAudioList(mappedList);
  //         }
  //       }
  //     } catch (error) {
  //       console.warn("Failed to fetch all AI voices:", error);
  //     }
  //   };
  //
  //   fetchAllAiVoices();
  // }, [setAiAudioList]);

  const setUseAiAudio = React.useCallback((type: "ai" | "original" | "mute") => {
    if (!api) return;
    saveLocalParams({ voiceType: type });
    api.setUseAiAudio?.(type);
  }, [api]);

  React.useEffect(() => {
    let isCancelled = false;

    const fetchSceneAudio = async () => {
      // Logic:
      // 1. Start from data.startSceneId
      // 2. Poll/Get result if scene has originalAudio + user audio
      // 3. Traverse to next scenes (targetSceneId, branch options)
      // 4. Update setAiAudioList

      if (!data?.startSceneId || !data.scenes || !audioRecordings || audioRecordings.length === 0) return;

      const record = audioRecordings[0] as any;
      const userAudioUrl = record?.cdnUrl;
      if (!userAudioUrl) return;

      const visited = new Set<string>();
      const results: { sceneId: string; aiAudio: string }[] = [];

      // Recursive traversal function
      const traverseAndFetch = async (sceneId: string, depth: number = 0) => {
        // Stop if cancelled or depth exceeded
        if (isCancelled || depth > 10 || visited.has(sceneId)) return;
        visited.add(sceneId);

        const scene = data.scenes[sceneId];
        if (!scene) return;

        // Fetch/Poll for current scene if valid candidates exist
        if (scene.originalAudio) {
          try {
            // Check before async call
            if (isCancelled) return;
            const aiAudio = await VoiceService.pollVoiceProcessing(sceneId, userAudioUrl, scene.originalAudio);

            // Check after async call
            if (isCancelled) return;

            if (aiAudio) {
              results.push({ sceneId, aiAudio });
              setAiAudioList([...results]);
            }
          } catch (e) {
            console.warn(`Failed to fetch/poll AI voice for scene ${sceneId}`, e);
          }
        }

        // Determine next scenes
        const nextSceneIds: string[] = [];

        // 1. Direct target
        if (scene.targetSceneId) {
          nextSceneIds.push(scene.targetSceneId);
        }

        // 2. Branch options
        if (scene.branch?.options) {
          scene.branch.options.forEach((opt: any) => {
            if (opt.targetSceneId) nextSceneIds.push(opt.targetSceneId);
          });
        }

        // Process next scenes sequentially
        for (const nid of nextSceneIds) {
          if (isCancelled) break;
          await traverseAndFetch(nid, depth + 1);
        }
      };

      await traverseAndFetch(data.startSceneId);
    };

    if (voiceType === "ai") {
      fetchSceneAudio();
    }

    return () => {
      isCancelled = true;
    };
  }, [data?.scenes, data?.startSceneId, audioRecordings, setAiAudioList, voiceType]);

  const triggerDisplayReward = React.useCallback(
    (data: any) => {

      if (data?.relationships?.length > 0) {
        showRelationshipPoint(data.relationships);
      }

      const handleShowMoments = (index: number) => {
        // Stop recursion if no more moments
        if (!data.moments || index >= data.moments.length) {
          showRewardCollection([]);
          closeGiftSelection();
          play();
          return;
        }

        pause();
        // Show current moment and schedule next one on close
        showRewardCollection(
          data.moments[index].rewards,
          () => {
            setTimeout(() => {
              handleShowMoments(index + 1);
            }, 200);
          },
          data.moments[index].title,
          data.moments[index].description
        );
      };

      if (data.moments && data.moments.length > 0) {
        handleShowMoments(0);
      }
    },
    [showRelationshipPoint, showRewardCollection, closeGiftSelection, pause, play]
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
          {
            sceneId,
            totalDuration: Math.floor(data.scenes[sceneId]?.duration || 0),
            watchingSecond: 0,
            status: "INPROGRESS",
          },
          (responseData: any) => triggerDisplayReward(responseData)
        );
      }
      const scene = data.scenes[sceneId];
      if (!scene) {
        console.warn("Scene not found:", sceneId);
        setCurrentSceneId(sceneId);
        setPauseType(null);
        return;
      }

      // Trigger voice polling for current and next 10 scenes
      const pollingTargets = getOrderedScenes(data.scenes, sceneId).slice(0, 10);

      const userAudioUrl = audioRecordings?.[0]?.cdnUrl;

      if (userAudioUrl) {
        pollingTargets.forEach(targetId => {
          const targetScene = data.scenes[targetId];
          if (targetScene?.originalAudio) {
            VoiceService.pollVoiceProcessing(targetId, userAudioUrl, targetScene.originalAudio)
              .then(res => {
                if (res) {
                  setAiAudioList([{ sceneId: targetId, aiAudio: res }]);
                }
              })
              .catch(() => {
                // Silent fail or low prio log
              });
          }
        });
      }

      setCurrentSceneId(sceneId);
      setPauseType(null);
    },
    [updateSceneStatus, data.scenes, isReviewScene, triggerDisplayReward, audioRecordings, setAiAudioList]
  );

  const handleStop = React.useCallback(
    (payload: Record<string, any>) => {
      console.log("🚀 ~ [STOP]", payload);
      setCurrentStatus(payload);
      const currentClip = data.scenes[payload.currentSceneId];

      if (payload.actionName === PausedActionName.USER_PAUSED_VIDEO) {
        if (!isReviewScene) {
          updateSceneStatus({
            sceneId: payload.currentSceneId,
            totalDuration: Math.floor(currentClip?.duration || 0),
            watchingSecond: Math.floor(payload.time || 0),
            status: "INPROGRESS",
          });
        }
        return;
      }
      if (payload.actionName === PausedActionName.DECISION_POINT_REACHED) {
        setPauseType(payload.actionName);
        if (!isReviewScene) {
          updateSceneStatus(
            {
              sceneId: payload.currentSceneId,
              totalDuration: Math.floor(currentClip?.duration || 0),
              watchingSecond: Math.floor(payload.time || 0),
              status: "INPROGRESS",
            },
            (responseData: any) => triggerDisplayReward(responseData)
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
      triggerDisplayReward,
    ]
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

  const handleCollectionSelected = React.useCallback(
    (collectionItemId: string) => {
      console.log("🚀 ~ [HOTSPOT COLLECTION ITEM]", collectionItemId);
      const [hotspotId, hotspotItemId] = collectionItemId.split("_item_");

      setDialogInfoState({
        isOpen: true,
        data: null,
        isLoading: true,
      });

      const scene = data.scenes[currentStatus?.currentSceneId || ""];
      const hotpot = scene.hotspots?.find((hotspot: any) => hotspot.id === hotspotId)
      const minCollectionItems = hotpot?.minCollectionItems || hotpot?.items?.length || 0;

      submitHotspot(
        {
          sceneId: currentStatus?.currentSceneId || "",
          hotspotItemId: hotspotItemId,
        },
        {
          onSuccess: (response) => {
            const result = response.data;
            openDialogInfo({
              hotspotId: hotspotId,
              title: result.moment?.title || "",
              description: result.moment?.description || "",
              mainImage: result.character?.imageUrl,
              itemImage: result.moment?.rewards?.[0]?.imageUrl,
            });
            setDialogInfoState((prev) => ({ ...prev, isLoading: false }));

            const items = {
              ...collectionItems,
              [hotspotId]: {
                collectionIds: [
                  ...(collectionItems[hotspotId]?.collectionIds || []),
                  collectionItemId,
                ],
                isCompleted:
                  (collectionItems[hotspotId]?.collectionIds?.length || 0) + 1 >=
                  minCollectionItems,
                minCollectionItems,
              },
            };
            console.log(items);
            setCollectionItems(items);
            showToast({
              description: `Bạn đã thu thập được vật phẩm ${items[hotspotId].collectionIds.length}/${minCollectionItems}`,
              position: "bottom-left",
            });
            api?.setCollectionItems?.(items);
          },
          onError: () => {
            showToast({ description: "Có lỗi xảy ra khi gửi dữ liệu" });
            setDialogInfoState({ isOpen: false, data: null, isLoading: false });
            // play();
          },
        }
      );
    },
    [
      api,
      collectionItems,
      openDialogInfo,
      submitHotspot,
      showToast,
      currentStatus?.currentSceneId,
      data.scenes
    ]
  );

  const handleChoiceSelected = React.useCallback(
    (sceneId: string, nextSceneId: string) => {
      const isHotspot = data.hotspotScenes?.includes(nextSceneId);
      if (isHotspot) {
        saveLocalParams({ previousSceneId: sceneId });
      } else {
        removeLocalParam("previousSceneId");
        if (!isReviewScene) {
          updateSceneStatus({
            sceneId,
            totalDuration: Math.floor(data.scenes[sceneId]?.duration || 0),
            watchingSecond: Math.floor(data.scenes[sceneId]?.duration || 0),
            status: "COMPLETED",
            points: data.scenes[sceneId]?.points || 0,
          });
          updateSceneStatus({
            sceneId: nextSceneId,
            totalDuration: Math.floor(data.scenes[nextSceneId]?.duration || 0),
            watchingSecond: 0,
            status: "INPROGRESS",
            points: 0,
          });
        }
      }
      const nextScene = data.scenes[nextSceneId];
      const isUserVip = userInfo?.isVip;
      if (nextScene.isVip && !isUserVip) {
        return setIsVipModalOpen(true);
      }
      onSetCurrentSceneId(nextSceneId);
      setPauseType(null);
      setCurrentStatus(null);
    },
    [updateSceneStatus, isReviewScene, data.hotspotScenes, onSetCurrentSceneId, userInfo?.vipinfo?.isvip, data.scenes]
  );

  const handleEnded = React.useCallback(
    (sceneId: string) => {
      console.log("🚀 ~ [ENDED]", sceneId);
      if (!isReviewScene) {
        updateSceneStatus(
          {
            sceneId,
            totalDuration: Math.floor(data.scenes[sceneId]?.duration || 0),
            watchingSecond: Math.floor(data.scenes[sceneId]?.duration || 0),
            status: "COMPLETED",
            points: data.scenes[sceneId]?.points || 0,
          },
          (params: any) => triggerDisplayReward(params)
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

      if ((scene as any)?.endingScene) {
        setIsEndingScene(true);
        pause();
        return;
      }

      if (!hasNext) {
        // setIsPlayerLoading(true);
        setIsReviewScene(false);
        // setTimeout(() => {
        //   setIsPlayerLoading(false);
        //   setType("intro");
        // }, 3000);
      } else {
        const nextSceneId = (scene as any).targetSceneId;
        if (nextSceneId) {
          const nextScene = data.scenes[nextSceneId];
          const isUserVip = userInfo?.isVip;
          if (nextScene?.isVip && !isUserVip) {
            return setIsVipModalOpen(true);
          }
          onSetCurrentSceneId(nextSceneId);
        }
      }
    },
    [
      updateSceneStatus,
      data.scenes,
      isReviewScene,
      triggerDisplayReward,
      pause,
      setIsEndingScene,
      onSetCurrentSceneId,
      userInfo?.vipinfo?.isvip,
    ]
  );

  const quitPlayer = React.useCallback(() => {
    setType("intro");
    navigate("/");
    pause();
  }, [pause, navigate]);

  const onPlayPlayer = React.useCallback(
    (sceneId: string, isReviewScene?: boolean) => {
      if (!data?.id || !data.scenes[sceneId]?.videoUrl) {
        showToast({ description: "Scene không tồn tại" });
        return;
      }
      setType("interactive");
      onSetCurrentSceneId(sceneId);
      setReviewScene(!!isReviewScene);
      onPlay(sceneId, isReviewScene);
      autoplay();
    },
    [onSetCurrentSceneId, onPlay, autoplay, navigate, data?.id, data.scenes, showToast]
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
    const currentData = dataRef.current;
    if (!api?.play || !currentData?.id) {
      console.warn("Init player skipped: Missing api or data.id", { api: !!api, dataId: currentData?.id });
      return;
    }
    console.log("Init player", { dataId: currentData.id });
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
        chapter: currentData,
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
              // Only define typography and connector styles here so
              // the player SDK can freely apply its own positional
              // classes for all 4 directions around the hotspot.
              className:
                "pr-10 text-white! text-sm font-semibold",
              isShowLabel: true,
            },
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
  }, [api, data.id]);

  React.useEffect(() => {
    const handleTouchMove = (e: any) => {
      // Nếu app của bạn không cần scroll trang web theo kiểu truyền thống
      if (e.scale !== 1) {
        e.preventDefault();
      } // Ngăn zoom nhầm
    };
    document.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    return () => document.removeEventListener('touchmove', handleTouchMove);
  }, []);

  // React.useEffect(() => {
  //   if (Object.values(collectionItems).some((item) => item.isCompleted)) {
  //     const completedItems = Object.values(collectionItems).filter(
  //       (item) => item.isCompleted
  //     ).length;
  //     const totalItems = Object.values(collectionItems).length;
  //     showToast({
  //       description: `Bạn đã thu thập được vật phẩm ${completedItems}/${totalItems}`,
  //       position: "bottom-left",
  //     });
  //   }
  // }, [showToast, collectionItems]);

  // One-time initialization when api is ready (only re-run when api/data change)
  React.useEffect(() => {
    console.log("VideoPlayerProvider: Effect check", { ready, api: !!api, initialized: initializedRef.current, dataId: data?.id });

    if (!ready || !api || initializedRef.current || !data?.id) return;
    console.log("VideoPlayerProvider: Calling onInit from Effect");
    onInit();
    initializedRef.current = true;

    return () => {
      // Cleanup if api instance changes or component unmounts
      api.destroy?.();
      initializedRef.current = false;
    };
  }, [ready, api, onInit, data.id]);

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
      offStart ?? (() => { }),
      offStop ?? (() => { }),
      offEnded ?? (() => { }),
      offChoice ?? (() => { }),
      offCollectionSelected ?? (() => { })
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
    setType: handleSetType,
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
    setCollectionItems,
    showRewardCollection,
    showRelationshipPoint,
    isEndingScene,
    setIsEndingScene,
    isVipModalOpen,
    setIsVipModalOpen,
    voiceType,
    setVoiceType,
    // audioRecordings,
    // setAudioRecordings,
    // fetchAudioRecordings,
    // currentSceneAudioUrl,
    setAiAudioList,
    setUseAiAudio,
  };
  return (
    <VideoPlayerContext.Provider value={value}>
      {children}
      {rewardCollectionState.isOpen && (
        <RewardCollection
          items={rewardCollectionState.items}
          title={rewardCollectionState.title}
          description={rewardCollectionState.description}
          onClose={() => {
            if (rewardCollectionOnCloseRef.current) {
              rewardCollectionOnCloseRef.current();
              rewardCollectionOnCloseRef.current = null;
            }
            setRewardCollectionState((prev) => ({
              ...prev,
              isOpen: false,
            }));
          }}
        />
      )}
      <RelationshipPoint
        items={relationshipPointState.items}
        isVisible={relationshipPointState.isVisible}
        onClose={handleRelationshipPointClose}
      />
    </VideoPlayerContext.Provider>
  );
};
