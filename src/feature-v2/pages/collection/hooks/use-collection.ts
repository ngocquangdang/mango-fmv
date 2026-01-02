import { useCollectionContext } from "../context/collection-context";

export const useCollection = () => {
  const context = useCollectionContext();
  if (!context) {
    throw new Error("useCollection must be used within a CollectionProvider");
  }
  return context;
};

import { useQuery } from '@tanstack/react-query';
import { collectionService } from "../service/collection.service";

export const useURSupplyStats = () => {
    return useQuery({
        queryKey: ["collection", "ur-supply-stats"],
        queryFn: collectionService.getURSupplyStats,
    });
};

export const useTicketTransactions = (limit = 8, offset = 0) => {
    return useQuery({
        queryKey: ["collection", "ticket-history", "INCREASING", limit, offset],
        queryFn: () => collectionService.getTicketHistory(limit, offset, 'INCREASING'),
    });
};

export const useSpendingHistory = (limit = 10, offset = 0) => {
    return useQuery({
        queryKey: ["collection", "ticket-history", "SPENDING", limit, offset],
        queryFn: () => collectionService.getTicketHistory(limit, offset, 'SPENDING'),
    });
};

export const useUserLeaderboard = (limit = 10, offset = 0) => {
    return useQuery({
        queryKey: ["collection", "user-leaderboard", limit, offset],
        queryFn: () => collectionService.getUserLeaderboard(limit, offset),
        select: (response) => {
            if (response?.data) {
                response.data.sort((a, b) => a.rank - b.rank);
                response.data = response.data.map((item) => {
                    let rankImg = null;
                    if (item.rank <= 5 && item.rank > 0) {
                        rankImg = `/images/rank/rank-${item.rank}.png`;
                    }
                    return {
                        ...item,
                        rankImg
                    };
                });
            }
            return response;
        },
    });
};
