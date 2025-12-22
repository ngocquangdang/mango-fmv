import {
  apiClienProject,
  apiClient,
  apiClientInteractiveLicense,
  apiClientVideoProgress,
} from "../../../lib/api/api-client";
import type { ApiResponse } from "../../../lib/api/api-client";
import { getLocalParam } from "../../../lib/api/storage";

// const mockProject = {
//   data: {
//     id: "proj_abc123",
//     chapterId: "6ba7b812-9dad-11d1-80b4-00c04fd430c9",
//     title: "Product Launch Interactive Video",
//     description: "Interactive product demonstration with branching storylines",
//     startSceneId: "clip_home",
//     scenes: {
//       clip_home:{
//         id: "clip_home",
//         name: "My Home",
//         videoUrl:
//           "https://www.shutterstock.com/shutterstock/videos/3815928771/preview/stock-footage-a-close-up-high-angle-shot-captures-a-document-displaying-lorem-ipsum-placeholder-text-resting.webm",
//         thumbnail: "https://picsum.photos/seed/picsum/200/300",
//         duration: 120.5,
//         hotspots: [
//           {
//             id: "880e8400-e29b-41d4-a716-446655440003",
//             sceneId: "clip_home",
//             type: "collection",
//             minCollectionItems: 2,
//             startTime: 3,
//             items: [
//               {
//                 title: "Secret Document",
//                 previousSceneId: "clip_home",
//                 description: "A hidden document found in the scene",
//                 targetSceneId: "scene_intro_001",
//                 iconUrl: "https://example.com/icons/document.png",
//                 x: 23,
//                 y: 43,
//                 r: 20,
//               },
//               {
//                 title: "Hidden Key",
//                 previousSceneId: "clip_home",
//                 description: "A key hidden under the table",
//                 targetSceneId: "scene_intro_002",
//                 iconUrl: "https://example.com/icons/key.png",
//                 x: 15,
//                 y: 20,
//                 r: 10,
//               },
//             ],
//           },
//           {
//             id: "880e8400-e29b-41d4-a716-446655440004",
//             sceneId: "clip_home",

//             startTime: 6,
//             minCollectionItems: 1,
//             items: [
//               {
//                 title: "Investigate Room",
//                 previousSceneId: "clip_home",
//                 description: "Look around the room for clues",
//                 targetSceneId: "clip_sympathy",
//                 iconUrl: "https://example.com/icons/investigate.png",
//                 x: 40,
//                 y: 30,
//                 r: 10,
//               },
//             ],
//           },
//         ],
//         branch: {
//           question: "What do you want to do?",
//           description: "Choose an option to continue",
//           startTime: 8,
//           defaultChoice: "clip_hold",
//           options: [
//             { id: "branch_a", text: "Hold Her", targetSceneId: "clip_hold" },
//             {
//               id: "branch_b",
//               text: "Jump with Her",
//               targetSceneId: "clip_jump",
//             },
//           ],
//           // countdown: 3,
//         },
//       },
//       clip_sweet_girl: {
//         id: "clip_sweet_girl",
//         name: "Introduction",
//         videoUrl:
//           "https://www.shutterstock.com/shutterstock/videos/1096287725/preview/stock-footage-lorem-ipsum-underwater-placeholder-clip.webm",
//         thumbnail:
//           "https://www.shutterstock.com/shutterstock/videos/1096287725/thumb/1.jpg?ip=x480",
//         duration: 120.5,
//       },
//       clip_hold: {
//         id: "clip_hold",
//         name: "Hold Her",
//         videoUrl:
//           "https://www.shutterstock.com/shutterstock/videos/3621426311/preview/stock-footage-sky-view-from-space-orbit-over-rotating-planet-earth-horizon-concept-d-animation-loop-background.mp4",
//         thumbnail:
//           "https://www.shutterstock.com/shutterstock/videos/3621426311/thumb/10.jpg?ip=x480",
//         duration: 90.0,
//         branch: {
//           question: "What do you want to do?",
//           description: "Choose an option to continue",
//           startTime: 4,

//           options: [
//             {
//               id: "branch_a",
//               text: "Hold Her",
//               targetSceneId: "scene_intro_003",
//             },
//           ],
//         },
//       },
//       clip_jump: {
//         id: "clip_jump",
//         name: "Jump with Her",
//         videoUrl:
//           "https://www.shutterstock.com/shutterstock/videos/3646485485/preview/stock-footage-close-up-view-of-flickering-ocean-waves-in-slow-motion-seamless-loop-background-sunlights.mp4",
//         thumbnail:
//           "https://www.shutterstock.com/shutterstock/videos/3646485485/thumb/1.jpg?ip=x480",
//         duration: 90.0,
//         branch: {
//           question: "What do you want to do?",
//           description: "Choose an option to continue",
//           startTime: 2,
//           defaultChoice: "clip_hold",
//           options: [
//             {
//               id: "branch_a",
//               text: "Hold Her 1",
//               targetSceneId: "scene_intro_004",
//             },
//           ],
//           // countdown: 3,
//         },
//       },
//       clip_sympathy: {
//         id: "clip_sympathy",
//         name: "A Mutual Sympathy",
//         videoUrl:
//           "https://www.shutterstock.com/shutterstock/videos/3798898873/preview/stock-footage-seamless-loop-animation-of-an-old-spiral-clock-with-grunge-texture-symbolic-seamless-loop-of-aging.mp4",
//         thumbnail:
//           "https://www.shutterstock.com/shutterstock/videos/3798898873/thumb/1.jpg?ip=x480",
//         duration: 90.0,
//         previousSceneId: "clip_home",
//       },
//       scene_intro_001: {
//         id: "scene_intro_001",
//         name: "Intro 1",
//         videoUrl:
//           "https://www.shutterstock.com/shutterstock/videos/3441030099/preview/stock-footage-scene-of-beautiful-sea-waves-aerial-view-of-drone-beach-sand-and-sea-copy-space-area-summer.mp4",
//         thumbnail:
//           "https://www.shutterstock.com/shutterstock/videos/3441030099/thumb/1.jpg?ip=x480",
//         duration: 90.0,
//         previousSceneId: "clip_home",
//       },
//       scene_intro_002: {
//         id: "scene_intro_002",
//         name: "Intro 2",
//         videoUrl:
//           "https://www.shutterstock.com/shutterstock/videos/3483705751/preview/stock-footage--d-animation-of-a-vibrant-multicolored-lights-and-particles-leaving-visible-trails-glowing-neon.mp4",
//         thumbnail: "https://picsum.photos/seed/picsum/200/300",
//         duration: 90.0,
//         previousSceneId: "clip_home",
//       },
//       scene_intro_003: {
//         id: "scene_intro_003",
//         name: "Intro 3",
//         videoUrl:
//           "https://www.shutterstock.com/shutterstock/videos/3851198779/preview/stock-footage-futuristic-microchip-with-glowing-neon-circuits-frame-digital-technology-and-ai-in-a-high-tech.mp4",
//         thumbnail:
//           "https://www.shutterstock.com/shutterstock/videos/3851198779/thumb/1.jpg?ip=x480",
//         duration: 90.0,
//       },
//       scene_intro_004: {
//         id: "scene_intro_004",
//         name: "Intro 4",
//         videoUrl:
//           "https://www.shutterstock.com/shutterstock/videos/3851198779/preview/stock-footage-futuristic-microchip-with-glowing-neon-circuits-frame-digital-technology-and-ai-in-a-high-tech.mp4",
//         thumbnail:
//           "https://www.shutterstock.com/shutterstock/videos/3851198779/thumb/1.jpg?ip=x480",
//         duration: 90.0,
//       },
//     }
//   },
// };

export interface UpdateStatusPayload {
  projectId: string;
  sceneId: string;
  chapterId: string;
  watchingSecond: number;
  totalDuration: number;
  status: string;
  points?: number;
}

export interface SubmitHotspotPayload {
  sceneId: string;
  hotspotItemId: string;
}

export interface HotspotReward {
  rewardId: string;
  imageUrl: string;
}

export interface HotspotMoment {
  momentId: string;
  title: string;
  momentCategoryType: string;
  description: string;
  rewards: HotspotReward[];
}

export interface HotspotCharacter {
  id: string;
  imageUrl: string;
}

export interface SubmitHotspotResponse {
  character: HotspotCharacter;
  moment: HotspotMoment;
}

export interface MomentReward {
  collectedAt: string;
  createdAt: string;
  description: string;
  imagePath: string;
  imageUrl: string;
  momentId: string;
  name: string;
  relationshipPoint: number;
  rewardId: string;
  rewardImagePath: string;
  rewardImageUrl: string;
}

export interface MomentCategory {
  id: string;
  imagePath: string;
  imageUrl: string;
  momentRewards: MomentReward[];
  name: string;
  type: string;
}

export interface CollectedRewardCharacter {
  createdAt: string;
  dateOfBirth: string;
  description: string;
  height: string;
  id: string;
  imagePath: string;
  imageUrl: string;
  momentCategories: MomentCategory[];
  name: string;
  projectId: string;
  strength: string;
  updatedAt: string;
}

export interface CollectedRewardsResponse {
  characters: CollectedRewardCharacter[];
}

export interface CollectedHotspot {
  hotspotId: string;
  collectedHotspotItemIds: string[];
}

export interface CollectedHotspotsResponse {
  collectedHotspots: CollectedHotspot[];
}

export const getUserProgress = async (queryParams: Record<string, string>) => {
  const params = new URLSearchParams(queryParams);

  const response = await apiClientVideoProgress.get(
    `/interactive-scene?${params.toString()}`,
    {
      "X-Ticket": getLocalParam("ticket") || "",
    }
  );
  return response;
};

export const updateStatus = async (payload: UpdateStatusPayload) => {
  const response = await apiClientVideoProgress.post(
    `/interactive-scene`,
    payload,
    {
      "X-Ticket": getLocalParam("ticket") || "",
    }
  );
  return response;
};

export const getChapters = async () => {
  const response = await apiClient.get(`/chapters`);
  return response;
};

export const getChapter = async (projectId: string, chapterId: string) => {
  const response = await apiClienProject.get(
    `/projects/${projectId}/chapters/${chapterId}/data-publish`,
    {
      "X-Ticket": getLocalParam("ticket") || "",
    }
  );
  return response;
  // return mockProject;
};

export const getVideos = async (ids: string[]) => {
  const queryParams = new URLSearchParams({
    sceneIds: ids.join(","),
  });
  const response = await apiClientInteractiveLicense.get(
    `/video-interactions/tokens?${queryParams.toString()}`,
    {
      "X-Ticket": getLocalParam("ticket") || "",
    }
  );
  return response;
};

export const restartChapter = async (chapterId: string) => {
  const response = await apiClientVideoProgress.put(
    `/chapter/${chapterId}/restart`,
    {},
    {
      "X-Ticket": getLocalParam("ticket") || "",
    }
  );
  return response;
};

export const resetProgress = async () => {
  const response = await apiClientVideoProgress.post(
    `/demo/reset`,
    {},
    {
      "X-Ticket": getLocalParam("ticket") || "",
    }
  );
  return response;
};

export const submitHotspot = async (payload: SubmitHotspotPayload) => {
  const response = await apiClientVideoProgress.post(
    `/interactive-scene/hotspot`,
    payload,
    {
      "X-Ticket": getLocalParam("ticket") || "",
    }
  );
  return response as ApiResponse<SubmitHotspotResponse>;
};

export const getCharacters = async (
  projectId: string = "5bc6a77b-e4d6-4a04-a0c8-629da6b2a9d0"
) => {
  const response = await apiClienProject.get(
    `/public/projects/${projectId}/characters`,
    {
      accept: "*/*",
    }
  );
  return response;
};

export const getCollectedRewards = async (projectId?: string) => {
  const params = new URLSearchParams();
  if (projectId) {
    params.append("projectId", projectId);
  }

  const response = await apiClientVideoProgress.get(
    `/diary/collected-rewards?${params.toString()}`,
    {
      "X-Ticket": getLocalParam("ticket") || "",
    }
  );

  return response;
  // return mockCollectedRewards;
};

export const getCollectedHotspots = async (sceneId: string) => {
  const response = await apiClientVideoProgress.get(
    `/interactive-scene/hotspot-collected?sceneId=${sceneId}`,
    {
      "X-Ticket": getLocalParam("ticket") || "",
    }
  );

  return response as ApiResponse<CollectedHotspotsResponse>;
};

// const mockCollectedRewards = {
//   data: {
//     characters: [
//       {
//         createdAt: "2023-11-01T08:05:00.000Z",
//         dateOfBirth: "2002-03-16",
//         description:
//           "Visual sang san khau voi phong cach cuon hut.",
//         height: "175cm",
//         id: "22222222-2222-2222-2222-222222222222",
//         imagePath: "characters/cuong-bach.jpg",
//         imageUrl: "https://example.com/images/cuong-bach-signed.jpg",
//         momentCategories: [
//           {
//             id: "e57bbbbb-5082-657e-ca16-0d8b4e761654",
//             imagePath: "categories/khoanh-khac.png",
//             imageUrl: "https://example.com/categories/khoanh-khac-signed.png",
//             momentRewards: [
//               {
//                 collectedAt: "2025-12-14T15:56:06.236Z",
//                 createdAt: "2023-12-12T08:00:00.000Z",
//                 description:
//                   "Chi\u1ebfc micro may m\u1eafn m\u00e0 \u0110\u00f4ng Quang \u0111\u00e3 \u0111\u00e1nh r\u01a1i.",
//                 imagePath: "moments/golden-mic.jpg",
//                 imageUrl: "https://example.com/moments/golden-mic-signed.jpg",
//                 momentId: "1a5b3c4d-4e6f-7a8b-9c2d-1e2f3a4b3c6d",
//                 name: "Micro V\u00e0ng C\u1ee7a \u0110\u00f4ng Quang",
//                 relationshipPoint: 0,
//                 rewardId: "1a5b3c4d-5e6f-8a8b-9c0d-1e1f3a4b3c5d",
//                 rewardImagePath: "rewards/golden-mic-item.png",
//                 rewardImageUrl:
//                   "https://example.com/rewards/golden-mic-item.png",
//               },
//               {
//                 collectedAt: "2025-12-14T15:56:06.236Z",
//                 createdAt: "2023-12-12T08:00:00.000Z",
//                 description:
//                   "Chi\u1ebfc micro may m\u1eafn m\u00e0 \u0110\u00f4ng Quang \u0111\u00e3 \u0111\u00e1nh r\u01a1i.",
//                 imagePath: "moments/golden-mic.jpg",
//                 imageUrl: "https://example.com/moments/golden-mic-signed.jpg",
//                 momentId: "1a5b3c4d-4e6f-7a8b-9c2d-1e2f3a4b3c6d",
//                 name: "Micro V\u00e0ng C\u1ee7a \u0110\u00f4ng Quang",
//                 relationshipPoint: 0,
//                 rewardId: "1a5b3c4d-5e6f-8a8b-9c0d-1e2f3a4b3c5d",
//                 rewardImagePath: "rewards/golden-mic-item.png",
//                 rewardImageUrl:
//                   "https://example.com/rewards/golden-mic-item.png",
//               },
//             ],
//             name: "Kho\u1ea3nh kh\u1eafc",
//             type: "MAX_RELATIONSHIP_POINT_REWARD",
//           },
//         ],
//         name: "C\u01b0\u1eddng B\u1ea1ch",
//         projectId: "project-uuid-001",
//         strength: "Visual",
//         updatedAt: "2023-11-01T08:05:00.000Z",
//       },
//     ],
//   },
//   status: "success",
//   statusCode: 200,
// };
