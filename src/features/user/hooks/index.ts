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

const mapScene = (
  scene: Scene[] = [],

  videosProgress: Record<string, any>
): Record<string, StoryScene> => {
  return scene.reduce((acc, scene) => {
    acc = {
      ...acc,
      [scene.id]: {
        title: scene.name,
        ...scene,
        ...(videosProgress && videosProgress[scene.id]),
      },
    };

    return acc;
  }, {});
};

export const mapChapter = (
  chapter: any,
  videosProgress: Record<string, any>
): Chapter => {
  return {
    ...chapter,
    scenes: mapScene(chapter.scenes as Scene[], videosProgress),
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

export const useChapter = (id: string) => {
  return useQuery({
    queryKey: ["chapter", id],
    queryFn: () => getChapter(id),
    enabled: !!id,
  });
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
