// Các kiểu con cho phần config của interactions
// ------------------------------------------------

import type { Clip } from '../data/storyData';

/** Vị trí cho hotspot */
export interface Position {
  x: number;
  y: number;
}

/** Cấu hình cho interaction loại 'hotspot' */
export interface HotspotConfig {
  title: string;
  description: string;
  link: string;
  icon: string;
}

/** Một lựa chọn cho 'branch' (phân nhánh) */
export interface BranchOption {
  id: string;
  text: string;
  targetSceneId: string; // ID của scene sẽ chuyển đến
}

/** Cấu hình cho interaction loại 'branch' */
export interface BranchConfig {
  question: string;
  options: BranchOption[];
}

// Các kiểu Interaction (Sử dụng Discriminated Union)
// ------------------------------------------------

/** Thuộc tính cơ bản chung cho mọi interaction */
export interface InteractionBase {
  id: string;
  sceneId: string;
  startTime: number;
  endTime: number;
}

/** Interaction loại 'hotspot' */
export interface HotspotInteraction extends InteractionBase {
  type: "hotspot";
  position: Position;
  config: HotspotConfig;
}

/** Interaction loại 'trigger' (branch) */
export interface BranchInteraction extends InteractionBase {
  type: "trigger";
  triggerType: "branch";
  config: BranchConfig;
}

/** Kiểu liên minh (union type) cho tất cả các loại interaction */
export type Interaction = HotspotInteraction | BranchInteraction;

// Các kiểu chính (Scene và Project)
// ------------------------------------------------

/** Định nghĩa một Scene (cảnh) trong video */
export interface Scene {
  id: string;
  name: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  duration: number;
  order: number;
}

/** Kiểu dữ liệu gốc cho toàn bộ dự án video tương tác */
export interface ChapterMetadata {
  id: string;
  title: string;
  description: string;
  scenes: Scene[];
  interactions: Interaction[];
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  clips: Record<string, Clip>;
}
