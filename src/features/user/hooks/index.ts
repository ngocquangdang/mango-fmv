import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getChapter,
  getChapters,
  getUserProgress,
  getVideos,
  updateStatus,
} from "../apis";
import type { UpdateStatusPayload } from "../apis";
import type { Chapter, Scene } from "../../../types/chapter";
import type { Scene as StoryScene } from "../../../data/storyData";

const mapHotspots = (hotspots: any): any[] => {
  return hotspots.map((hotspot: any) => ({
    ...hotspot,
    items: hotspot.items.map((item: any) => ({
      ...item,
      x: item.x/100,
      y: item.y/100,

    })),
  }))
};
const mapScene = (
  scene: Record<string, Scene> = {},
  videosProgress: Record<string, any>
): Record<string, StoryScene> => {
  const sceneIds = Object.keys(scene);
  const mappedScene = sceneIds.reduce((acc, sceneId) => {
    return {
      ...acc,
      [sceneId]: {
        ...scene[sceneId as keyof typeof scene],
        ...(videosProgress && videosProgress[sceneId]),
        hotspots: mapHotspots(scene[sceneId as keyof typeof scene].hotspots),
      },
    };
  }, {});
  return mappedScene;
};

export const mapChapter = (
  chapter: any,
  videosProgress: Record<string, any>
): Chapter => {
  return {
    ...chapter,
    scenes: mapScene(chapter.scenes as Record<string, Scene>, videosProgress),
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
    enabled: !!queryParams.userId && !!queryParams.chapterId,
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
    // enabled: !!chapterId,
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
      [video.id]: video,
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
  return {
    data: data ? mapVideos(data) : undefined,
    isLoading,
    error,
  };
};
