import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getLeaderboard,
  type LeaderboardParams,
  type LeaderboardUser,
} from "../service/apis";

export const useLeaderboard = (params?: LeaderboardParams) => {
  const leaderboardParams: LeaderboardParams = React.useMemo(() => {
    if (params) return params;

    return {
      limit: 10,
      projectId: import.meta.env.VITE_PROJECT_ID,
    };
  }, [params]);

  const { data, isLoading, error, ...rest } = useQuery({
    queryKey: ["leaderboard", leaderboardParams],
    queryFn: () => getLeaderboard(leaderboardParams),
    enabled: true,
  });

  const transformedData = React.useMemo(() => {
    if (!data?.data) return undefined;

    return data.data?.sort(
      (a: LeaderboardUser, b: LeaderboardUser) => a.rank - b.rank
    );
  }, [data]);

  return {
    leaderboard: transformedData,
    isLeaderboardLoading: isLoading,
    leaderboardError: error,
    ...rest,
  };
};
