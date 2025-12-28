
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../apis";

export const USER_INFO_KEY = ["user-info"];

export const useUserInfo = () => {
  return useQuery({
    queryKey: USER_INFO_KEY,
    queryFn: getUserInfo,
    // Add staleTime to prevent excessive refetching if needed, but for balance updates fresher is better
    // staleTime: 0,
  });
};
