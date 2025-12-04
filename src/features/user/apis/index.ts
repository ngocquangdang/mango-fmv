import {
  apiClienProject,
  apiClient,
  apiClientInteractiveLicense,
  apiClientVideoProgress,
} from "../../../lib/api/api-client";
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

export const getCharacters = async (projectId: string = "5bc6a77b-e4d6-4a04-a0c8-629da6b2a9d0") => {
  const response = await apiClienProject.get(
    `/public/projects/${projectId}/characters`,
    {
      accept: "*/*",
    }
  );
  return response;
};
