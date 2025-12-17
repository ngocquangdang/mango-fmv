import React from "react";
import { UserContext } from ".";
import {
  mapChapter,
  useChapter,
  useUpdateStatus,
  useUserProgress,
  useVideos,
  useCollectedRewards,
} from "../hooks";
import { useMgSdk } from "../../../hooks/useMgSdk";
import type { MgUserInfo } from "../../../types/user";
import type { ChapterMapped } from "../../../types/chapter";
import { getLocalParam, saveLocalParams } from "../../../lib/api/storage";
import type { CollectedRewardCharacter } from "../apis";
import DialogUserInfo from "../../../components/ui/dialog/dialog-user-info";

export interface UserContextType {
  chapter: ChapterMapped;
  loading: boolean;
  refetch: () => void;
  updateSceneStatus: (
    data: {
      sceneId: string;
      totalDuration: number;
      watchingSecond: number;
      status: string;
    },
    callback?: (params: any) => void
  ) => void;
  collectedRewards?: Record<string, CollectedRewardCharacter>;
  refetchCollectedRewards: () => void;
}

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { mgApi } = useMgSdk();
  const { mutate: updateStatus } = useUpdateStatus();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
  const [mgUserInfo, setMgUserInfo] = React.useState<MgUserInfo | null>(null);

  const { chapterId: chapterIdFromUrl, projectId: projectIdFromUrl } =
    React.useMemo(() => {
      const params = new URLSearchParams(window.location.search);
      const chapterIdFromUrl = params.get("chapterId");
      const projectIdFromUrl = params.get("projectId");

      return {
        chapterId: chapterIdFromUrl || "",
        projectId: projectIdFromUrl || "",
      };
    }, [window.location.search]);

  const { data: chapter, isLoading: isChapterLoading } = useChapter(
    projectIdFromUrl,
    chapterIdFromUrl
  );

  const prevChapterIdRef = React.useRef<string | undefined>(undefined);
  React.useEffect(() => {
    const currentChapterId = chapter?.id;
    if (currentChapterId !== prevChapterIdRef.current) {
      prevChapterIdRef.current = currentChapterId;
    }
  }, [chapter]);

  const chapterId = React.useMemo(
    () => chapter?.chapterId || "",
    [chapter?.chapterId]
  );

  const progressParams = React.useMemo(
    () => ({
      chapterId: chapterId,
    }),
    [chapterId]
  );

  const {
    data: progress,
    refetch,
    isLoading: isProgressLoading,
  } = useUserProgress(progressParams);

  const sceneIds = React.useMemo(
    () => Object.keys(chapter?.scenes || {}),
    [chapter]
  );

  const { data: videos, isLoading: isVideosLoading } = useVideos(sceneIds);

  const {
    data: collectedRewards,
    isLoading: isCollectedRewardsLoading,
    refetch: refetchCollectedRewards,
  } = useCollectedRewards(projectIdFromUrl);

  const chapterMapped = React.useMemo(() => {
    if (!chapter) return null;
    return mapChapter(chapter, progress?.scenes || {}, videos || {});
  }, [chapter, progress?.scenes, videos]);

  // Memoize chapter values to prevent unnecessary effect triggers
  const chapterValues = React.useMemo(
    () => ({
      chapterId: chapter?.chapterId,
      id: chapter?.id,
      startSceneId: chapter?.startSceneId,
      exists: !!chapter,
      sences: chapter?.scenes,
    }),
    [chapter]
  );

  React.useEffect(() => {
    if (chapterValues.exists && !progress?.currentScene) {
      updateStatus(
        {
          chapterId: chapterValues.chapterId || "",
          projectId: chapterValues.id || "",
          sceneId: chapterValues.startSceneId || "",
          watchingSecond: 0,
          totalDuration: Math.floor(
            chapterValues.sences[chapterValues.startSceneId]?.duration || 0
          ),
          status: "INPROGRESS",
        },
        {
          onSuccess: () => {
            refetch();
          },
        }
      );
    }
  }, [chapterValues, updateStatus, refetch, progress?.currentScene]);

  React.useEffect(() => {
    setLoading(
      isChapterLoading ||
        isProgressLoading ||
        isVideosLoading ||
        isCollectedRewardsLoading
    );
  }, [
    isChapterLoading,
    isProgressLoading,
    isVideosLoading,
    isCollectedRewardsLoading,
  ]);

  const handleGetToken = React.useCallback((mgUserInfo: MgUserInfo) => {
    console.log("[SERVER LOG] UserProvider - handleGetToken called", {
      timestamp: new Date().toISOString(),
      userId: mgUserInfo.userId,
      userName: mgUserInfo.userName,
      ticket: mgUserInfo.ticket,
      fullData: mgUserInfo,
    });
    console.log("🚀 ~ UserProvider ~ mgUserInfo:", mgUserInfo);
    setMgUserInfo(mgUserInfo);
    setIsDialogOpen(true);
    saveLocalParams({
      ticket: mgUserInfo.ticket || "50BA27D21B1830C2A9E1328624D0EC52",
    });
    setLoading(true);
  }, []);

  const handleCloseDialog = React.useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  const updateSceneStatus = React.useCallback(
    (
      data: {
        sceneId: string;
        totalDuration: number;
        watchingSecond: number;
        status: string;
      },
      callback?: (params: any) => void
    ) => {
      const { sceneId, totalDuration, watchingSecond, status } = data;
      updateStatus(
        {
          projectId: chapter?.id || "",
          chapterId: chapter?.chapterId || "",
          watchingSecond,
          totalDuration,
          sceneId,
          status,
        },
        {
          onSuccess: (data: any) => {
            refetch();
            refetchCollectedRewards();
            if (callback) callback(data.data);
          },
        }
      );
    },
    [updateStatus, refetch, refetchCollectedRewards, chapter]
  );

  React.useEffect(() => {
    if (!getLocalParam("ticket")) {
      saveLocalParams({
        ticket: "0E7B0A603841309CAF9E3B5D0366C812",
      });
    }
  }, []);
  React.useEffect(() => {
    if (!mgApi) {
      console.log("[SERVER LOG] UserProvider - mgApi is not available");
      return;
    }

    console.log("[SERVER LOG] UserProvider - mgApi initialized, setting up login callback", {
      timestamp: new Date().toISOString(),
      hasLoginMethod: !!mgApi.login,
    });

    mgApi.login?.(handleGetToken);
  }, [mgApi, handleGetToken]);

  // Memoize value object to prevent unnecessary re-renders
  const value: UserContextType = React.useMemo(
    () => ({
      chapter: chapterMapped
        ? ({ ...chapterMapped, progress } as ChapterMapped)
        : ({} as ChapterMapped),
      loading,
      refetch,
      updateSceneStatus,
      collectedRewards,
      refetchCollectedRewards,
    }),
    [
      chapterMapped,
      progress,
      loading,
      refetch,
      updateSceneStatus,
      collectedRewards,
      refetchCollectedRewards,
    ]
  );

  return (
    <>
      <UserContext.Provider value={value}>{children}</UserContext.Provider>
      <DialogUserInfo
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        mgUserInfo={mgUserInfo}
      />
    </>
  );
};
