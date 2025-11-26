export {};

declare global {
  interface Window {
    MgApi?: {
      login?: (cb: (mgUserInfo: MgUserInfo) => void) => void;
    };
    VideoPlayer?: {
      onInit?: (params?: unknown, done?: () => void) => void;
      onPlay?: (cb: (sceneId: string) => void) => () => void;
      onPause?: (cb: (data: Record<string, any>) => void) => () => void;
      onStopAt?: (cb: (sceneId: string, time: number) => void) => () => void;
      onEnded?: (cb: (sceneId: string) => void) => () => void;
      onChoiceSelected?: (cb: (sceneId: string, nextSceneId: string) => void) => () => void;
      play?: () => void;
      pause?: () => void;
      destroy?: () => void;
      seek?: (time: number, mode?: "absolute" | "relative") => void;
      setAutoplayEnabled?: (enabled: boolean) => void;
      setCurrentSceneId?: (sceneId: string) => void;
      setCollectionItems?: (collectionItems: Record<string, any>) => void;
      onCollectionSelected?: (cb: (collectionItemId: string) => void) => () => void;
      setReviewScene?: (status: boolean) => void;
    };
  }
}
