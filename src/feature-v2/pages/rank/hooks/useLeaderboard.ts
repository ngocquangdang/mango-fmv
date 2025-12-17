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

    // Get chapterId from URL params if not provided
    const urlParams = new URLSearchParams(window.location.search);
    const chapterId = urlParams.get("chapterId");
    return {
      limit: 10,
      chapterId: chapterId || undefined,
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
