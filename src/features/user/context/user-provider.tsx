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
import type { ChapterMapped } from "../../../types/chapter";
import { saveLocalParams } from "../../../lib/api/storage";
import type { CollectedRewardCharacter } from "../apis";
import { logInfo } from "../../../lib/utils/logger";

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

  const {
    chapterId: chapterIdFromUrl,
    projectId: projectIdFromUrl,
    isPreview,
    ticket: ticketFromUrl,
  } = React.useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const chapterIdFromUrl = params.get("chapterId");
    const projectIdFromUrl = params.get("projectId");
    const isPreviewParam = params.get("isPreview");
    const ticketParam = params.get("ticket");

    return {
      chapterId: chapterIdFromUrl || "",
      projectId: projectIdFromUrl || "",
      isPreview: isPreviewParam === "true",
      ticket: ticketParam || "",
    };
  }, []);

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
      projectId: projectIdFromUrl,
    }),
    [chapterId, projectIdFromUrl]
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
    if (!chapter || !progress || !videos || loading) return null;

    return mapChapter(chapter, progress?.scenes || {}, videos || {});
  }, [chapter, progress?.scenes, videos, loading]);

  // Memoize chapter values to prevent unnecessary effect triggers
  const chapterValues = React.useMemo(
    () => ({
      chapterId: chapter?.chapterId,
      id: chapter?.projectId,
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
      isChapterLoading &&
      isProgressLoading &&
      isVideosLoading &&
      isCollectedRewardsLoading
    );
  }, [
    isChapterLoading,
    isProgressLoading,
    isVideosLoading,
    isCollectedRewardsLoading,
  ]);

  const handleGetToken = React.useCallback((mgUserInfo: string) => {
    logInfo(
      "UserProvider - handleGetToken called",
      {
        mgUserInfo,
      },
      "UserProvider"
    );
    const mgUserInfoObject = JSON.parse(mgUserInfo || "{}");
    saveLocalParams({
      ticket: mgUserInfoObject?.ticket,
    });
    setLoading(true);
  }, []);

  React.useEffect(() => {
    if (!isPreview || !ticketFromUrl) {
      return;
    }

    logInfo(
      "UserProvider - isPreview is true, setting ticket from URL",
      {
        ticketFromUrl,
      },
      "UserProvider"
    );

    saveLocalParams({
      ticket: ticketFromUrl,
    });
    setLoading(true);
  }, [isPreview, ticketFromUrl]);

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
    if (!mgApi) {
      logInfo(
        "UserProvider - mgApi is not available",
        undefined,
        "UserProvider"
      );
      return;
    }

    logInfo(
      "UserProvider - mgApi initialized, setting up login callback",
      {
        hasLoginMethod: !!mgApi.login,
      },
      "UserProvider"
    );

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

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
