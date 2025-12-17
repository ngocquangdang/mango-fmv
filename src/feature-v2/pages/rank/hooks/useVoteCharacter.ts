import { useMutation, useQueryClient } from "@tanstack/react-query";
import { voteCharacter } from "../service/apis";

export const useVoteCharacter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: voteCharacter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProgress"] });
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
    },
  });
};

