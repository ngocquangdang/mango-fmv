
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

export const useOpenBlindBag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (quantity: number) => CardCollectionService.openBlindBag(quantity),
    onSuccess: () => {
        // Invalidate stats to refresh ticket count and collection progress
        queryClient.invalidateQueries({ queryKey: COLLECTION_KEYS.stats() });
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
