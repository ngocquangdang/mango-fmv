import { apiClientVideoProgress, apiClienProject } from "../../../../lib/api/api-client";
import type { ApiResponse } from "../../../../lib/api/api-client";
import { getLocalParam } from '../../../../lib/api/storage';

export interface CollectionCard {
  id: string;
  name: string;
  quantity: number;
  isOwned: boolean;
  imageUrl: string;
  imageBlurUrl?: string;
}

export interface CollectionGroup {
  tierCode: string;
  tierName: string;
  cards: CollectionCard[];
}

export interface CollectionStats {
  collected: number;
  total: number;
  percentage: number;
}

export interface CollectionResponse {
  stats: CollectionStats;
  groups: CollectionGroup[];
}

export interface CharacterAttributes {
  dob: string;
  height: string;
  strength: string;
  description: string;
}

export interface Character {
  id: string;
  name: string;
  avatar: string; // or imageUrl? checking strict type later
  attributes?: CharacterAttributes;
}

export class CollectionService {
  private static instance: CollectionService;

  private constructor() { }

  public static getInstance(): CollectionService {
    if (!CollectionService.instance) {
      CollectionService.instance = new CollectionService();
    }
    return CollectionService.instance;
  }

  public async getCollection(characterId?: string): Promise<ApiResponse<CollectionResponse>> {
    // Construct query string manually

    let url = "/gacha/collection";
    if (characterId) {
      url += `?characterId=${characterId}`;
    }

    return apiClientVideoProgress.get<ApiResponse<CollectionResponse>>(url, {
      "X-Ticket": getLocalParam("ticket") || "",
    });
  }

  public async getCharacters(projectId?: string): Promise<ApiResponse<Character[]>> {
    const finalProjectId = projectId || import.meta.env.VITE_PROJECT_ID;
    return apiClienProject.get<ApiResponse<Character[]>>(`/public/projects/${finalProjectId}/characters`);
  }
}

export const collectionService = CollectionService.getInstance();
