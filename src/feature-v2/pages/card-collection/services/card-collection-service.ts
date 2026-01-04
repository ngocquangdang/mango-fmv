

import { getTicketPackages as getTicketPackagesAPI, createTicketOrder } from "../../../../lib/api/ticket-api";
import type { TicketPackage as TicketPackageAPI } from "../../../../types/ticket.types";
import { apiClientVideoProgress } from "../../../../lib/api/api-client";
import type { ApiResponse } from "../../../../lib/api/api-client";
import { getLocalParam } from '../../../../lib/api/storage';

export interface Card {
  id?: string;
  cardId?: string; // API response
  name: string;
  image?: string;
  imageUrl?: string; // API response
  rarity?: "R" | "R+" | "SR" | "SSR";
  tier?: "R" | "R+" | "SR" | "SSR"; // API response
  isOwned?: boolean;
  isNew?: boolean; // API response
  quantity?: number;
}

export interface CollectionStats {
  tickets: number;
  totalCards: number;
  collectedCards: number;
  cards: Card[];
}

export interface BlindBagResponse {
  receivedCards: Card[];
  remainingTickets: number;
}

export interface Banner {
  id: string;
  name: string;
  type: string;
  imageUrl: string;
  priority: number;
  createdAt: string;
  updatedAt: string;
  description?: string;
}

export interface UserState {
  ticketCount: number;
  pityCount: number;
  collectedCount?: number;
  totalCount?: number;
}

export interface BannersResponse {
  banners: Banner[];
  userState: UserState;
}

// Mock Data
const MOCK_CARDS: Card[] = Array.from({ length: 40 }).map((_, i) => ({
  id: `card-${i + 1}`,
  name: `Card Generated ${i + 1}`,
  image: "/images/home/charactor.png",
  rarity: "R",
  isOwned: i < 10, // Mock owning first 10
}));

let mockTickets = 100;

export interface TicketPackage {
  id: string;
  name: string;
  quantity: number;
  price: number;
  totalPrice: number;
  description: string;
  status: string;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export const CardCollectionService = {
  // ... existing methods
  getCollection: async (): Promise<CollectionStats> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Use apiClient to simulate usage or verify it's reachable
    // console.log("API Client ready:", !!apiClient);

    return {
      tickets: mockTickets,
      totalCards: 40,
      collectedCards: MOCK_CARDS.filter(c => c.isOwned).length,
      cards: MOCK_CARDS,
    };
  },

  getBanners: async (): Promise<ApiResponse<BannersResponse>> => {
    return apiClientVideoProgress.get<ApiResponse<BannersResponse>>("/gacha/banners", {
      "X-Ticket": getLocalParam("ticket") || "",
    });
  },

  openBlindBag: async (quantity: number): Promise<BlindBagResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (mockTickets < quantity) {
      throw new Error("Not enough tickets");
    }

    mockTickets -= quantity;

    // Randomly select cards
    const receivedCards = Array.from({ length: quantity }).map(() => {
      const randomIndex = Math.floor(Math.random() * MOCK_CARDS.length);
      return MOCK_CARDS[randomIndex];
    });

    return {
      receivedCards,
      remainingTickets: mockTickets,
    };
  },

  purchaseTickets: async (packageId: number): Promise<number> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    // Mock packages: all give 10 tickets
    const amount = 10;
    console.log(`Purchased package ${packageId}`);
    mockTickets += amount;
    return mockTickets;
  },

  drawCards: async (bannerId: string, amount: number): Promise<ApiResponse<{ results: Card[], bonusRewards: Card[], state: UserState }>> => {
    console.log("Drawing cards for banner", bannerId, "amount", amount);
    return apiClientVideoProgress.post("/gacha/draw", {
      bannerId,
      amount
    }, {
      "X-Ticket": getLocalParam("ticket") || "",
    });
  },

  getTicketPackages: async (): Promise<ApiResponse<TicketPackage[]>> => {
    // Use the new ticket API from localhost:3001
    const packages = await getTicketPackagesAPI();

    // Transform API response to match existing TicketPackage interface
    const transformedPackages: TicketPackage[] = packages.map((pkg: TicketPackageAPI) => ({
      id: pkg.id,
      name: pkg.name,
      quantity: pkg.quantity,
      price: pkg.price,
      totalPrice: pkg.price, // Backend price is already the final package price
      description: `${pkg.quantity} tickets package`,
      status: pkg.status,
      currency: pkg.currency,
      createdAt: pkg.createdAt || new Date().toISOString(),
      updatedAt: pkg.updatedAt || new Date().toISOString(),
    }));

    return {
      data: transformedPackages,
      success: true,
    };
  },

  // New method to create ticket order and get payment URL
  createTicketOrder: async (ticketId: string, quantity: number = 1) => {
    return await createTicketOrder(ticketId, quantity);
  },

  // Fetch user info including ticket balance
  getUserInfo: async (): Promise<ApiResponse<{ userId: string; isVip: boolean; ticketBalance: number }>> => {
    return apiClientVideoProgress.get<ApiResponse<{ userId: string; isVip: boolean; ticketBalance: number }>>("/user-info", {
      "X-Ticket": getLocalParam("ticket") || "",
    });
  },

  mergeCards: async (cardIds: string[]): Promise<ApiResponse<{ resultCard: Card; bonusRewards?: Card[] }>> => {
    return apiClientVideoProgress.post<ApiResponse<{ resultCard: Card; bonusRewards?: Card[] }>>("/gacha/merge", {
      cardIds
    }, {
      "X-Ticket": getLocalParam("ticket") || "",
    });
  },

  getTicketPrice: async (type: string): Promise<ApiResponse<{ price: number }>> => {
    return apiClientVideoProgress.get<ApiResponse<{ price: number }>>(`/gacha/ticket-price?type=${type}`, {
      "X-Ticket": getLocalParam("ticket") || "",
    });
  }
};
