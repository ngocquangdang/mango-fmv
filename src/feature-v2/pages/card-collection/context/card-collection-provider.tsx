
import React from "react";
import { CardCollectionContext } from "./card-collection-context";
import { useCollectionData, useOpenBlindBag, usePurchaseTickets, useBanners, useTicketPackages, useUserInfo } from "../hooks/use-card-collection-query";

export const CardCollectionProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: stats, isLoading, error } = useCollectionData();
  const { data: bannersResponse } = useBanners();
  const { data: ticketPackagesResponse } = useTicketPackages();
  const { data: userInfoResponse } = useUserInfo();

  const banners = React.useMemo(() => bannersResponse?.data?.banners || [], [bannersResponse]);
  const userState = React.useMemo(() => bannersResponse?.data?.userState, [bannersResponse]);
  const ticketPackages = React.useMemo(() => ticketPackagesResponse?.data || [], [ticketPackagesResponse]);
  const userInfo = React.useMemo(() => userInfoResponse?.data, [userInfoResponse]);

  const { mutateAsync: openBlindBagMutation, isPending: isOpening } = useOpenBlindBag();
  const { mutateAsync: purchaseTicketsMutation, isPending: isBuying } = usePurchaseTickets();

  const value = React.useMemo(() => ({
    stats,
    banners,
    userState,
    ticketPackages,
    userInfo,
    isLoading,
    error: error as Error | null,
    openBlindBag: openBlindBagMutation,
    buyTickets: purchaseTicketsMutation,
    isOpening,
    isBuying,
  }), [stats, banners, userState, ticketPackages, userInfo, isLoading, error, openBlindBagMutation, purchaseTicketsMutation, isOpening, isBuying]);

  return (
    <CardCollectionContext.Provider value={value}>
      {children}
    </CardCollectionContext.Provider>
  );
};
