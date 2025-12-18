import type { UserProgress } from "./user";

/** Một lựa chọn cho 'branch' (phân nhánh) */
export interface BranchOption {
  id: string;
  text: string;
  targetSceneId: string; // ID của scene sẽ chuyển đến
}

export interface HotspotItem {
  description: string;
  id: string;
  iconUrl: string;
  previousSceneId: string;
  returnToSource: boolean;
  r: number;
  targetSceneId: string;
  title: string;
  x: number;
  y: number;
}
export interface Hotspot {
  createdAt: string;
  id: string;
  items: HotspotItem[];
  minCollectionItems: number;
  returnToSource: boolean;
  sceneId: string;
  startTime: number;
  type: string;
  updatedAt: string;
}
export interface Scene {
  id: string;
  name: string;
  filePathId: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  duration: number;
  order: number;
  status?: string;
  targetSceneId: string;
  hotspots?: Hotspot[];
  endingScene?: boolean;
  branch?: {
    countdown: number;
    defaultChoice: string;
    question: string;
    startTime: number;
    options: BranchOption[];
  };
}

/** Kiểu dữ liệu gốc cho toàn bộ dự án video tương tác */
export interface ChapterMetadata {
  id: string;
  title: string;
  description: string;
  projectId: string;
  startSceneId: string;
  scenes: Record<string, Scene>;
}

export interface ChapterMapped {
  id: string;
  projectId: string;
  title: string;
  description: string;
  startSceneId: string;
  progress?: UserProgress;
  hotspotScenes: string[];
  scenes: Record<string, Scene>;
}

export enum PausedActionName {
  HOTSPOT_NO_NEXT = "HOTSPOT_NO_NEXT",
  DECISION_POINT_REACHED = "DECISION_POINT_REACHED",
  VIDEO_ENDED = "VIDEO_ENDED",
  USER_PAUSED_VIDEO = "USER_PAUSED_VIDEO",
  END_REVIEW = "END_REVIEW",
}

export enum SceneType {
  HOTSPOT = "HOTSPOT",
  BRANCH = "BRANCH",
}

export interface Character {
  id: string;
  projectId: string;
  name: string;
  dateOfBirth: string;
  imageUrl: string;
  imagePath: string;
  createdAt: string;
  updatedAt: string;
  height: string;
  description: string;
  strength: string;
  info?: {
    brthDay: string;
    height: string;
    desc: string;
    strength: string;
  };
  imageSrc: string;
}
