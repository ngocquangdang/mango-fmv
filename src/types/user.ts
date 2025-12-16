export interface UserInfo {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface MgUserInfo {
  userId: string;
  userName: string;
  ticket: string;
}

export interface UserProgress {
  chapterId: string;
  projectId: string;
  userId: string;
  currentScene: {
    sceneId: string;
    status: string;
    watchingSecond: number;
    totalDuration: number;
  };
  scenes: {
    sceneId: string;
    status: string;
    watchingSecond: number;
    totalDuration: number;
    completedAt: string | null;
    updatedAt: string;
  }[];
  characters: {
    id: string;
    imageUrl: string;
    points: number;
  }[];
  milestones: number;
  points: number;
}
