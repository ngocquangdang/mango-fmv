
import React from "react";
import { CardCollectionContext } from "./card-collection-context";
import { useCollectionData, useOpenBlindBag, usePurchaseTickets } from "../hooks/use-card-collection-query";
import type { Card } from "../services/card-collection-service";

export const CardCollectionProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: stats, isLoading, error } = useCollectionData();
  const { mutateAsync: openBlindBagMutation, isPending: isOpening } = useOpenBlindBag();
  const { mutateAsync: purchaseTicketsMutation, isPending: isBuying } = usePurchaseTickets();

  const handleOpenBlindBag = React.useCallback(async (quantity: number): Promise<Card[]> => {
    const result = await openBlindBagMutation(quantity);
    return result.receivedCards;
  }, [openBlindBagMutation]);

  const handleBuyTickets = React.useCallback(async (packageId: number): Promise<void> => {
    await purchaseTicketsMutation(packageId);
  }, [purchaseTicketsMutation]);

  const value = React.useMemo(() => ({
    stats,
    isLoading,
    error: error as Error | null,
    openBlindBag: handleOpenBlindBag,
    buyTickets: handleBuyTickets,
    isOpening,
    isBuying,
  }), [stats, isLoading, error, handleOpenBlindBag, handleBuyTickets, isOpening, isBuying]);

  return (
    <CardCollectionContext.Provider value={value}>
      {children}
    </CardCollectionContext.Provider>
  );
};
