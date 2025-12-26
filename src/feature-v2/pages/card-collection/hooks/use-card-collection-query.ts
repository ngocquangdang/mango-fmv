
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CardCollectionService } from "../services/card-collection-service";

export const COLLECTION_KEYS = {
  all: ["card-collection"] as const,
  stats: () => [...COLLECTION_KEYS.all, "stats"] as const,
};

export const useCollectionData = () => {
  return useQuery({
    queryKey: COLLECTION_KEYS.stats(),
    queryFn: CardCollectionService.getCollection,
  });
};

export const useBanners = () => {
  return useQuery({
    queryKey: [...COLLECTION_KEYS.all, "banners"],
    queryFn: CardCollectionService.getBanners,
  });
};

export const useOpenBlindBag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bannerId, quantity }: { bannerId: string; quantity: number }) => 
        CardCollectionService.drawCards(bannerId, quantity),
    onSuccess: () => {
        // Invalidate all collection data to refresh tickets (in banners) and collection stats
        queryClient.invalidateQueries({ queryKey: COLLECTION_KEYS.all });
    },
  });
};


export const usePurchaseTickets = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (packageId: number) => CardCollectionService.purchaseTickets(packageId),
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: COLLECTION_KEYS.stats() });
      },
    });
  };

export const useTicketPackages = () => {
    return useQuery({
        queryKey: [...COLLECTION_KEYS.all, "tickets"],
        queryFn: CardCollectionService.getTicketPackages,
    });
};

export const useUserInfo = () => {
    return useQuery({
        queryKey: [...COLLECTION_KEYS.all, "user-info"],
        queryFn: CardCollectionService.getUserInfo,
    });
};
