import { apiClientVideoProgress } from "../../../../../lib/api/api-client";
import { getLocalParam } from "../../../../../lib/api/storage";

export interface VotePayload {
  characterId: string;
  projectId: string;
  points: number;
}

export interface VoteResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export const voteCharacter = async (
  payload: VotePayload
): Promise<VoteResponse> => {
  const response = await apiClientVideoProgress.post<VoteResponse>(
    "/voting/vote",
    payload,
    {
      "X-Ticket": getLocalParam("ticket") || "",
    }
  );
  return response;
};

export interface LeaderboardUser {
  characterAvatar: string;
  characterId: string;
  characterName: string;
  rank: number;
  totalPoints: number;
  totalVotes: number;
}

export interface LeaderboardResponse {
  success: boolean;
  data?: LeaderboardUser[];
  message?: string;
}

export interface LeaderboardParams {
  limit?: number;
  projectId?: string;
}

export const getLeaderboard = async (
  params?: LeaderboardParams
): Promise<LeaderboardResponse> => {
  const queryParams = new URLSearchParams();
  if (params?.limit) {
    queryParams.append("limit", params.limit.toString());
  }
  if (params?.projectId) {
    queryParams.append("projectId", params.projectId);
  }

  const url = `/voting/leaderboard${
    queryParams.toString() ? `?${queryParams.toString()}` : ""
  }`;
  const response = await apiClientVideoProgress.get<LeaderboardResponse>(url, {
    "X-Ticket": getLocalParam("ticket") || "",
  });
  return response;
};
