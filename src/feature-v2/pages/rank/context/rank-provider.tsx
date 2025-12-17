import React from "react";
import type { VotePayload, VoteResponse, LeaderboardUser } from "../service/apis";
import { useLeaderboard } from "../hooks/useLeaderboard";
import { useVoteCharacter } from "../hooks/useVoteCharacter";
import { RankContext } from "./index";

export interface RankContextType {
  voteCharacter: (payload: VotePayload) => Promise<VoteResponse>;
  isVoting: boolean;
  voteError: Error | null;
  leaderboard: LeaderboardUser[] | undefined;
  isLeaderboardLoading: boolean;
  leaderboardError: Error | null;
  refetchLeaderboard: () => void;
}

export const RankProvider = ({ children }: { children: React.ReactNode }) => {
  // Query for leaderboard
  const {
    leaderboard,
    isLeaderboardLoading,
    leaderboardError,
    refetch: refetchLeaderboard,
  } = useLeaderboard();

  // Mutation for voting
  const {
    mutateAsync: voteCharacterMutation,
    isPending: isVoting,
    error: voteError,
  } = useVoteCharacter();

  const handleVoteCharacter = React.useCallback(
    async (payload: VotePayload): Promise<VoteResponse> => {
      return await voteCharacterMutation(payload);
    },
    [voteCharacterMutation]
  );

  const value: RankContextType = React.useMemo(
    () => ({
      voteCharacter: handleVoteCharacter,
      isVoting,
      voteError: voteError as Error | null,
      leaderboard,
      isLeaderboardLoading,
      leaderboardError: leaderboardError as Error | null,
      refetchLeaderboard: () => {
        refetchLeaderboard();
      },
    }),
    [
      handleVoteCharacter,
      isVoting,
      voteError,
      leaderboard,
      isLeaderboardLoading,
      leaderboardError,
      refetchLeaderboard,
    ]
  );

  return <RankContext.Provider value={value}>{children}</RankContext.Provider>;
};

