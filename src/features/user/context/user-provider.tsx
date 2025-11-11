import React from "react";
import { UserContext } from ".";
import { useChapter, useUserProgress, useVideos } from "../hooks";
import { useMgSdk } from "../../../hooks/useMgSdk";
import type { MgUserInfo } from "../../../types/user";
import type { Chapter } from "../../../types/chapter";

export interface UserContextType {
  chapter: Chapter;
}

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { mgApi } = useMgSdk();

  const [userId, setUserId] = React.useState<string>("abc");

  const { data: progress } = useUserProgress({ userId });
  console.log("🚀 ~ UserProvider ~ progress:", progress)
  const { data: chapter } = useChapter("chapter_1", progress?.videos || {});
  const { data: videos } = useVideos(
    Object.values(chapter?.scenes || {})?.map((scene: any) => scene.id) || []
  );
  console.log("🚀 ~ UserProvider ~ videos:", videos);

  const onLogin = React.useCallback((mgUserInfo: MgUserInfo) => {
    setUserId(mgUserInfo.userId);
  }, []);

  React.useEffect(() => {
    if (!mgApi) return;

    mgApi.login?.(onLogin);
  }, [mgApi, onLogin]);

  const value: UserContextType = {
    chapter: { ...chapter, progress } as Chapter,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
