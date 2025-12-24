


export interface Card {
  id: string;
  name: string;
  image: string;
  rarity: "R" | "R+" | "SR" | "SSR";
  isOwned: boolean;
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

// Mock Data
const MOCK_CARDS: Card[] = Array.from({ length: 40 }).map((_, i) => ({
  id: `card-${i + 1}`,
  name: `Card Generated ${i + 1}`,
  image: "/images/home/charactor.png",
  rarity: "R",
  isOwned: i < 10, // Mock owning first 10
}));

let mockTickets = 100;

export const CardCollectionService = {
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
  }
};
