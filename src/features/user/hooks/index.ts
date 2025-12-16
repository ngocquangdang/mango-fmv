import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getChapter,
  getChapters,
  getUserProgress,
  getVideos,
  updateStatus,
  restartChapter,
  getCharacters,
  getCollectedRewards,
} from "../apis";
import type { UpdateStatusPayload } from "../apis";
import type { ChapterMapped, Character, Scene } from "../../../types/chapter";

const mapHotspots = (hotspots: any): any[] => {
  return hotspots.map((hotspot: any) => ({
    ...hotspot,
    items: hotspot.items.map((item: any, index: number) => ({
      ...item,
      id: hotspot.id + "_item_" + index,
      type: hotspot.type,
      x: item.x / 100,
      y: item.y / 100,
    })),
  }));
};
const mapScene = (
  scenes: Record<string, Scene> = {},
  videosProgress: Record<string, any>,
  videos: Record<string, any>
): { mappedScene: Record<string, Scene>; hotspotScenes: string[] } => {
  const sceneIds = Object.keys(scenes);
  const hotspotScenes: string[] = [];
  const mappedScene = sceneIds.reduce((acc, sceneId) => {
    const scene: Scene = scenes[sceneId as keyof typeof scene];
    if (scene.hotspots && scene.hotspots.length > 0) {
      const ids = scene.hotspots
        ?.map((hp) => hp.items.map((item) => item.targetSceneId))
        .flat();
      hotspotScenes.push(...ids);
    }

    return {
      ...acc,
      [sceneId]: {
        ...scenes[sceneId as keyof typeof scene],
        ...(videosProgress && videosProgress[sceneId]),
        ...(videos && videos[sceneId]),
        hotspots: mapHotspots(
          scenes[sceneId as keyof typeof scene]?.hotspots || []
        ),
      },
    };
  }, {});
  return {
    mappedScene,
    hotspotScenes,
  };
};

export const mapChapter = (
  chapter: any,
  videosProgress: Record<string, any>,
  videos: Record<string, any>
): ChapterMapped => {
  const { mappedScene, hotspotScenes } = mapScene(
    chapter.scenes as Record<string, Scene>,
    videosProgress,
    videos
  );
  return {
    ...chapter,
    scenes: mappedScene,
    hotspotScenes,
  };
};

const mapVideoProgress = (videosProgress: any[]): Record<string, any> => {
  return videosProgress.reduce((acc, videoProgress) => {
    acc = {
      ...acc,
      [videoProgress.sceneId]: videoProgress,
    };
    return acc;
  }, {});
};
export const useUserProgress = (queryParams: Record<string, string>) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["user-progress", queryParams],
    queryFn: () => getUserProgress(queryParams),
    enabled: !!queryParams.chapterId,
  });
  return {
    data: { ...data?.data, scenes: mapVideoProgress(data?.data?.scenes || []) },
    isLoading,
    error,
    refetch,
  };
};

export const useUpdateStatus = () => {
  return useMutation({
    mutationFn: (payload: UpdateStatusPayload) => updateStatus(payload),
  });
};

export const useChapters = () => {
  return useQuery({
    queryKey: ["chapters"],
    queryFn: () => getChapters(),
  });
};

export const useChapter = (
  projectId = "546d7eec-d52b-49f9-957e-cf3c7e67e6b5",
  chapterId = "39982da1-4af7-40c2-8e28-241a7041f7a9"
) => {
  const { data, ...rest } = useQuery({
    queryKey: ["chapter", projectId, chapterId],
    queryFn: () => getChapter(projectId, chapterId),
    enabled: !!chapterId,
  });

  // Memoize the transformed data to prevent creating new objects on every render
  const transformedData = React.useMemo(() => {
    if (!data?.data) return undefined;
    return {
      ...data.data,
      chapterId: data.data.id,
    };
  }, [data?.data]);

  return {
    data: transformedData,
    ...rest,
  };
};

const mapVideos = (videos: any[]): Record<string, any> => {
  return videos.reduce((acc, video) => {
    acc = {
      ...acc,
      [video.sceneId]: video,
    };
    return acc;
  }, {});
};

export const useVideos = (ids: string[]) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["videos", ids],
    queryFn: () => getVideos(ids),
    enabled: !!ids.length,
  });
  const transformedData = React.useMemo(() => {
    if (!data) return undefined;
    return mapVideos(data?.data || []);
  }, [data]);
  return {
    data: transformedData,
    isLoading,
    error,
  };
};

export const useRestartChapter = () => {
  return useMutation({
    mutationFn: (chapterId: string) => restartChapter(chapterId),
  });
};

export const useCharacters = (projectId?: string) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["characters", projectId],
    queryFn: () => getCharacters(projectId),
    enabled: true,
  });
  const transformedData = React.useMemo(() => {
    if (!data?.data) return undefined;
    return data?.data.map((character: Character) => ({
      ...character,
      info: {
        brthDay: character.dateOfBirth || "",
        height: character.height || "",
        desc: character.description || "",
        strength: character.strength || "",
      },
    }));
  }, [data?.data]);
  return {
    data: transformedData,
    isLoading,
    error,
    refetch,
  };
};

export const useCollectedRewards = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["collected-rewards"],
    queryFn: () => getCollectedRewards(),
    enabled: true,
  });
  const transformedData = React.useMemo(() => {
    if (!data?.data) return undefined;
    return data?.data?.characters?.reduce((acc: any, character: any) => {
      acc[character.id] = character;
      return acc;
    }, {});
  }, [data?.data]);
  return {
    data: transformedData,
    isLoading,
    error,
    refetch,
  };
};
