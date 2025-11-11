import type { UserProgress } from "../types/user";
import type { UpdateStatusPayload } from "../features/user/apis";

const STORAGE_KEY = "user-progress";

/**
 * Lấy user progress từ localStorage
 */
export const getUserProgressFromStorage = (
  chapterId: string
): UserProgress | null => {
  try {
    const key = `${STORAGE_KEY}-${chapterId}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error("Failed to get user progress from storage:", error);
    return null;
  }
};

/**
 * Lưu user progress vào localStorage
 */
export const saveUserProgressToStorage = (progress: UserProgress) => {
  try {
    const key = `${STORAGE_KEY}-${progress.chapterId}`;
    localStorage.setItem(key, JSON.stringify(progress));
  } catch (error) {
    console.error("Failed to save user progress to storage:", error);
  }
};

/**
 * Update video progress trong localStorage
 * Logic: Kiểm tra sceneId - nếu đã tồn tại thì update, nếu chưa thì thêm mới
 */
export const updateVideoProgressInStorage = (
  payload: UpdateStatusPayload
): void => {
  try {
    const key = `${STORAGE_KEY}-${payload.chapterId}`;
    const stored = localStorage.getItem(key);
    
    let progress: UserProgress;
    
    if (stored) {
      progress = JSON.parse(stored);
    } else {
      // Tạo mới nếu chưa tồn tại
      progress = {
        userId: "123",
        projectId: payload.projectId,
        chapterId: payload.chapterId,
        startSceneId: payload.sceneId, // Tạm thời dùng sceneId đầu tiên
        startAt: Date.now(),
        videos: [],
      };
    }

    // Kiểm tra sceneId đã tồn tại chưa
    const existingVideoIndex = progress.videos.findIndex(
      (video) => video.sceneId === payload.sceneId
    );

    const videoProgress = {
      sceneId: payload.sceneId,
      status: payload.status,
      watchingSecond: payload.watchingSecond,
      totalDuration: payload.totalDuration,
      completedAt: payload.status === "COMPLETED" ? new Date().toISOString() : null,
      updatedAt: new Date().toISOString(),
    };

    if (existingVideoIndex >= 0) {
      // Update nếu đã tồn tại
      progress.videos[existingVideoIndex] = videoProgress;
    } else {
      // Thêm mới nếu chưa tồn tại
      progress.videos.push(videoProgress);
    }

    // Lưu lại vào localStorage
    localStorage.setItem(key, JSON.stringify(progress));
    
    console.log("✅ Saved to localStorage:", progress);
  } catch (error) {
    console.error("Failed to update video progress in storage:", error);
  }
};

