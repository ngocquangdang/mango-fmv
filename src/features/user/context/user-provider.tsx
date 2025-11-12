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
import type { Chapter } from "../../../types/chapter";

export interface UserContextType {
  chapter: Chapter;
  loading: boolean;
  userId: string | null;
  refetch: () => void;
}

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { mgApi } = useMgSdk();
  const { mutate: updateStatus } = useUpdateStatus();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [userId, setUserId] = React.useState<string | null>(
    "519baee1-60e4-402f-9f3e-1fd31b0ef7ci"
  );

  const { data: chapter } = useChapter("6ba7b812-9dad-11d1-80b4-00c04fd430c9");
  const { data: progress, refetch } = useUserProgress({
    userId: userId || "",
    chapterId: chapter?.chapterId || "",
  });

  const { data: videos } = useVideos(
    Object.values(chapter?.scenes || {})?.map((scene: any) => scene.id) || []
  );

  const chapterMapped = React.useMemo(() => {
    if (!chapter) return null;
    return mapChapter(chapter, progress?.scenes || {});
  }, [chapter, progress]);

  React.useEffect(() => {
    if (chapter && !progress?.currentScene) {
      updateStatus(
        {
          chapterId: chapter.chapterId,
          projectId: chapter.id,
          sceneId: chapter.startSceneId,
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
  }, [chapter, updateStatus, refetch]);

  React.useEffect(() => {
    // if (videos && chapter) {
    //   setLoading(false);
    // }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [videos, chapter]);

  const onLogin = React.useCallback((mgUserInfo: MgUserInfo) => {
    console.log("🚀 ~ UserProvider ~ mgUserInfo:", mgUserInfo);
    const userId = crypto.randomUUID();
    setUserId(userId);
    setLoading(true);
  }, []);

  React.useEffect(() => {
    if (!mgApi) return;

    mgApi.login?.(onLogin);
  }, [mgApi, onLogin]);

  const value: UserContextType = {
    chapter: { ...chapterMapped, progress } as Chapter,
    loading,
    userId,
    refetch,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
