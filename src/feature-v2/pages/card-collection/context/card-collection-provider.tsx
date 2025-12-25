
import React from "react";
import { CardCollectionContext } from "./card-collection-context";
import { useCollectionData, useOpenBlindBag, usePurchaseTickets, useBanners, useTicketPackages } from "../hooks/use-card-collection-query";
import type { Card } from "../services/card-collection-service";

export const CardCollectionProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: stats, isLoading, error } = useCollectionData();
  const { data: bannersResponse } = useBanners();
  const { data: ticketPackagesResponse } = useTicketPackages();

  const banners = React.useMemo(() => bannersResponse?.data?.banners || [], [bannersResponse]);
  const userState = React.useMemo(() => bannersResponse?.data?.userState, [bannersResponse]);
  const ticketPackages = React.useMemo(() => ticketPackagesResponse?.data || [], [ticketPackagesResponse]);

  const { mutateAsync: openBlindBagMutation, isPending: isOpening } = useOpenBlindBag();
  const { mutateAsync: purchaseTicketsMutation, isPending: isBuying } = usePurchaseTickets();

  const handleOpenBlindBag = React.useCallback(async (bannerId: string, quantity: number): Promise<Card[]> => {
    const result = await openBlindBagMutation({ bannerId, amount: quantity });
    return result.data?.cards || [];
  }, [openBlindBagMutation]);

  const handleBuyTickets = React.useCallback(async (packageId: number): Promise<void> => {
    await purchaseTicketsMutation(packageId);
  }, [purchaseTicketsMutation]);

  const value = React.useMemo(() => ({
    stats,
    banners,
    userState,
    ticketPackages,
    isLoading,
    error: error as Error | null,
    openBlindBag: handleOpenBlindBag,
    buyTickets: handleBuyTickets,
    isOpening,
    isBuying,
  }), [stats, banners, userState, ticketPackages, isLoading, error, handleOpenBlindBag, handleBuyTickets, isOpening, isBuying]);

  return (
    <CardCollectionContext.Provider value={value}>
      {children}
    </CardCollectionContext.Provider>
  );
};
