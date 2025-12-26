import React from "react";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";
import type { ApiResponse } from "../../../../lib/api/api-client";
import type { CollectionStats, Card, Banner, UserState, TicketPackage } from "../services/card-collection-service";

export interface UserInfo {
  userId: string;
  isVip: boolean;
  ticketBalance: number;
}

export interface CardCollectionContextType {
  // Data
  stats: CollectionStats | undefined;
  banners: Banner[];
  userState: UserState | undefined;
  ticketPackages: TicketPackage[];
  userInfo: UserInfo | undefined;
  isLoading: boolean;
  error: Error | null;

  // Actions
  openBlindBag: UseMutateAsyncFunction<ApiResponse<{ results: Card[], bonusRewards: Card[], state: UserState }>, Error, { bannerId: string, quantity: number }, unknown>;
  buyTickets: UseMutateAsyncFunction<number, Error, number, unknown>;

  // Action States
  isOpening: boolean;
  isBuying: boolean;
}

export const CardCollectionContext = React.createContext<CardCollectionContextType | null>(null);
