import React from "react";
import { UserContext } from ".";
import { useUserInfo } from "../hooks";
import { useMgSdk } from "../../../hooks/useMgSdk";
import type { MgUserInfo, UserInfo } from "../../../types/user";

export interface UserContextType {
  userInfo: UserInfo;
}

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { mgApi } = useMgSdk();

  const [userId, setUserId] = React.useState<string | null>(null);

  const { data: userInfo } = useUserInfo(userId);

  const onLogin = React.useCallback((mgUserInfo: MgUserInfo) => {
    setUserId(mgUserInfo.userId);
  }, []);

  React.useEffect(() => {
    if (!mgApi) return;

    mgApi.login?.(onLogin);
  }, [mgApi, onLogin]);

  const value: UserContextType = { userInfo: userInfo as UserInfo };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
