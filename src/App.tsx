import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";

import { UserProvider } from "./features/user/context/user-provider";
import { useVideoPlayerContext } from "./contexts";
import { VideoPlayerProvider } from "./contexts/video-player-provider";
import SettingDialog from "./features/setting/setting-dialog";
import FlowChartDialog from "./features/flow-chart/flow-chart-dialog";
import VideoPlayer from "./features/video-player";

function App() {
  const { type, setType, pause, ready, onAutoplay, onPlay } =
    useVideoPlayerContext();

  const [isSetting, setIsSetting] = React.useState(false);
  const [isChapterOpen, setIsChapterOpen] = React.useState(false);

  const handleSetting = React.useCallback(() => {
    setIsSetting(true);
    pause();
  }, [pause]);

  const handleCloseSetting = React.useCallback(() => {
    setIsSetting(false);
  }, []);

  const handleOpenChapter = React.useCallback(() => {
    setIsChapterOpen(true);
  }, []);

  const handleCloseChapter = React.useCallback(() => {
    setIsChapterOpen(false);
  }, []);

  return (
    <div>
      {type === "intro" && (
        <div className="w-full h-screen flex items-center justify-center">
          <button
            onClick={() => {
              setType("interactive");
              onPlay();
              onAutoplay();
            }}
            className="text-white text-2xl font-bold cursor-pointer bg-blue-500 px-4 py-2 rounded-md"
          >
            Play
          </button>
        </div>
      )}
      {type === "interactive" && (
        <div className="relative">
          <div className="absolute top-0 left-0 p-4 bg-black/50 z-10">
            <button
              className="text-white text-2xl font-bold cursor-pointer"
              onClick={() => {
                pause();
              }}
            >
              Back
            </button>
          </div>
          {!ready && (
            <div className="mb-2 text-sm text-gray-500">Loading player...</div>
          )}

          <div className="absolute top-0 right-0 p-4 bg-black/50 z-10">
            <div
              className="text-white text-2xl font-bold"
              onClick={handleSetting}
            >
              Settings
            </div>
          </div>
          {isSetting && (
            <SettingDialog
              onClose={handleCloseSetting}
              onOpenChapter={handleOpenChapter}
            />
          )}
        </div>
      )}
      <VideoPlayer />
      <FlowChartDialog open={isChapterOpen} onClose={handleCloseChapter} />
    </div>
  );
}
function AppInner() {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <VideoPlayerProvider>
          <App />
        </VideoPlayerProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}
export default AppInner;
