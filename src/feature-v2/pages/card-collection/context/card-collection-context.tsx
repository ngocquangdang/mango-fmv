
import React from "react";
import type { CollectionStats, Card, Banner, UserState, TicketPackage } from "../services/card-collection-service";

export interface CardCollectionContextType {
  // Data
  stats: CollectionStats | undefined;
  banners: Banner[];
  userState: UserState | undefined;
  ticketPackages: TicketPackage[];
  isLoading: boolean;
  error: Error | null;

  // Actions
  openBlindBag: (bannerId: string, quantity: number) => Promise<Card[]>;
  buyTickets: (packageId: number) => Promise<void>;

  // Action States
  isOpening: boolean;
  isBuying: boolean;
}

export const CardCollectionContext = React.createContext<CardCollectionContextType | null>(null);
