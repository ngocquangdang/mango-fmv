import React from "react";
import { UserContext } from ".";
import {
  mapChapter,
  useChapter,
  useUpdateStatus,
  useUserProgress,
} from "../hooks";
import { useMgSdk } from "../../../hooks/useMgSdk";
import type { MgUserInfo } from "../../../types/user";
import type { Chapter } from "../../../types/chapter";

export interface UserContextType {
  chapter: Chapter;
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

  const { data: chapter } = useChapter(undefined, undefined);

  // Only log when chapter actually changes (by ID, not just reference)
  const prevChapterIdRef = React.useRef<string | undefined>(undefined);
  React.useEffect(() => {
    const currentChapterId = chapter?.id;
    if (currentChapterId !== prevChapterIdRef.current) {
      prevChapterIdRef.current = currentChapterId;
    }
  }, [chapter]);

  // Memoize chapterId to prevent unnecessary refetches
  const chapterId = React.useMemo(
    () => chapter?.chapterId || "",
    [chapter?.chapterId]
  );

  // Memoize query params to prevent unnecessary refetches
  const progressParams = React.useMemo(
    () => ({
      userId: userId || "",
      chapterId: chapterId,
    }),
    [userId, chapterId]
  );

  const { data: progress, refetch } = useUserProgress(progressParams);

  // Memoize scene IDs array to prevent unnecessary refetches
  // const sceneIds = React.useMemo(
  //   () =>
  //     Object.values(chapter?.scenes || {})?.map(
  //       (scene: any) => scene.filePathId
  //     ) || [],
  //   [chapter?.scenes]
  // );

  // const { data: videos } = useVideos(sceneIds);

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
    console.log("🚀 ~ UserProvider ~ mgUserInfo:", mgUserInfo);
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
    if (!mgApi) return;

    mgApi.login?.(onLogin);
  }, [mgApi, onLogin]);

  // Memoize value object to prevent unnecessary re-renders
  const value: UserContextType = React.useMemo(
    () => ({
      chapter: chapterMapped
        ? ({ ...chapterMapped, progress } as Chapter)
        : ({} as Chapter),
      loading,
      userId,
      refetch,
      updateSceneStatus,
    }),
    [chapterMapped, progress, loading, userId, refetch, updateSceneStatus]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
