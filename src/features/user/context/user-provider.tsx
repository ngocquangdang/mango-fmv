import React from "react";
import { UserContext } from ".";
import {
  mapChapter,
  useChapter,
  useUpdateStatus,
  useUserProgress,
  useVideos,
} from "../hooks";
import { useMgSdk } from "../../../hooks/useMgSdk";
import type { MgUserInfo } from "../../../types/user";
import type { ChapterMapped } from "../../../types/chapter";
import { getLocalParam, saveLocalParams } from "../../../lib/api/storage";

export interface UserContextType {
  chapter: ChapterMapped;
  loading: boolean;
  userId: string | null;
  refetch: () => void;
  updateSceneStatus: (
    sceneId: string,
    totalDuration: number,
    watchingSecond: number,
    status: string
  ) => void;
}

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { mgApi } = useMgSdk();
  const { mutate: updateStatus } = useUpdateStatus();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [userId, setUserId] = React.useState<string | null>(null);

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

  const { data: chapter } = useChapter(projectIdFromUrl, chapterIdFromUrl);

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
      userId: userId || "",
      chapterId: chapterId,
    }),
    [userId, chapterId]
  );

  const { data: progress, refetch } = useUserProgress(progressParams);

  const sceneIds = React.useMemo(
    () =>
      Object.values(chapter?.scenes || {})?.map(
        (scene: any) => scene.filePathId
      ) || [],
    [chapter?.scenes]
  );

  const { data: videos } = useVideos(sceneIds);
  console.log("🚀 ~ UserProvider ~ videos:", videos);

  const chapterMapped = React.useMemo(() => {
    if (!chapter) return null;
    return mapChapter(chapter, progress?.scenes || {});
  }, [chapter, progress?.scenes]);

  // Only run once on mount to get userId from URL
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userIdFromUrl = params.get("userId");
    if (userIdFromUrl && !userId) {
      setUserId(userIdFromUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  // Memoize chapter values to prevent unnecessary effect triggers
  const chapterValues = React.useMemo(
    () => ({
      chapterId: chapter?.chapterId,
      id: chapter?.id,
      startSceneId: chapter?.startSceneId,
      exists: !!chapter,
    }),
    [chapter]
  );

  React.useEffect(() => {
    if (chapterValues.exists && !progress?.currentScene && userId) {
      updateStatus(
        {
          chapterId: chapterValues.chapterId || "",
          projectId: chapterValues.id || "",
          sceneId: chapterValues.startSceneId || "",
          watchingSecond: 0,
          totalDuration: 10,
          status: "INPROGRESS",
          userId: userId || "",
        },
        {
          onSuccess: () => {
            refetch();
          },
        }
      );
    }
  }, [chapterValues, updateStatus, refetch, progress?.currentScene, userId]);

  React.useEffect(() => {
    // if (videos && chapter) {
    //   setLoading(false);
    // }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [chapter]);

  const onLogin = React.useCallback((mgUserInfo: MgUserInfo) => {
    saveLocalParams({
      ticket: mgUserInfo.ticket || "50BA27D21B1830C2A9E1328624D0EC52",
    });
    const userId = crypto.randomUUID();
    setUserId(userId);
    setLoading(true);
  }, []);

  const updateSceneStatus = React.useCallback(
    (
      sceneId: string,
      totalDuration: number,
      watchingSecond: number,
      status: string
    ) => {
      updateStatus(
        {
          projectId: chapter?.id || "",
          chapterId: chapter?.chapterId || "",
          watchingSecond,
          totalDuration,
          sceneId,
          status,
          userId: userId || "",
        },
        {
          onSuccess: () => {
            refetch();
          },
        }
      );
    },
    [updateStatus, userId, refetch, chapter]
  );

  React.useEffect(() => {
    if (!getLocalParam("ticket")) {
      saveLocalParams({
        ticket: "50BA27D21B1830C2A9E1328624D0EC52",
      });
    }
  }, []);
  React.useEffect(() => {
    if (!mgApi) return;

    mgApi.login?.(onLogin);
  }, [mgApi, onLogin]);

  // Memoize value object to prevent unnecessary re-renders
  const value: UserContextType = React.useMemo(
    () => ({
      chapter: chapterMapped
        ? ({ ...chapterMapped, progress } as ChapterMapped)
        : ({} as ChapterMapped),
      loading,
      userId,
      refetch,
      updateSceneStatus,
    }),
    [chapterMapped, progress, loading, userId, refetch, updateSceneStatus]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
