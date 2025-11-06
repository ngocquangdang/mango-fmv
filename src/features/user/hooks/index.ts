import {
  useMutation,
  useQuery,
  type UseQueryResult,
} from "@tanstack/react-query";
import { getUserInfo, updateStatus } from "../apis";
import type { UserInfo } from "../../../types/user";

export const useUserInfo = (
  id: string | null
): UseQueryResult<UserInfo, Error> => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserInfo(id),
    enabled: !!id,
  });
};

export const useUpdateStatus = () => {
  return useMutation({
    mutationFn: (payload: Record<string, any>) => updateStatus(payload),
  });
};
