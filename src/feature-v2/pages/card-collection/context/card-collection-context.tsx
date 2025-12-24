
import React from "react";
import type { CollectionStats, Card } from "../services/card-collection-service";

export interface CardCollectionContextType {
  // Data
  stats: CollectionStats | undefined;
  isLoading: boolean;
  error: Error | null;

  // Actions
  openBlindBag: (quantity: number) => Promise<Card[]>;
  buyTickets: (packageId: number) => Promise<void>;

  // Action States
  isOpening: boolean;
  isBuying: boolean;
}

export const CardCollectionContext = React.createContext<CardCollectionContextType | null>(null);
