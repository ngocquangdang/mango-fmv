import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";

import { UserProvider } from "./features/user/context/user-provider";
import { useVideoPlayerContext } from "./contexts";
import { VideoPlayerProvider } from "./contexts/video-player-provider";

import VideoPlayer from "./features/video-player";
import { useUserContext } from "./features/user/context";
import HomeScreen from "./features/home";
import Project from "./features/project";
import BackIcon from "./components/icon/back-icon";
import Note from "./features/note";
import Loading from "./components/loading";
import EndChapter from "./features/end-chapter/end-chapter";
import DialogConfirm from "./components/ui/dialog/dialog-confirm";
import { useToast } from "./components/ui/toast/use-toast";

function App() {
  const { loading, updateSceneStatus } = useUserContext();
  const {
    type,
    quitPlayer,
    setType,
    setReviewScene,
    pause,
    onPlay,
    currentStatus,
  } = useVideoPlayerContext();
  const [dialogName, setDialogName] = React.useState<string | null>(null);
  const { showToast } = useToast();
  const backgroundImage = "/images/bg.png";

  const handleBack = () => {
    if (type === "interactive") {
      setDialogName("quitPlayer");
      pause();
      return;
    }
    setType("intro");
  };

  const onCancel = () => {
    setDialogName(null);
    onPlay();
  };

  const onConfirm = () => {
    quitPlayer();
    updateSceneStatus(
      currentStatus?.currentSceneId || "",
      Math.floor(currentStatus?.totalDuration || 0),
      Math.floor(currentStatus?.watchingSecond || 0),
      "INPROGRESS"
    );
    setDialogName(null);
    setReviewScene(false);
    showToast({
      description: "Bạn đã mở khóa cảnh mới.",
      duration: 10000,
      position: "top-right",
    });
  };
  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {loading ? (
        <div className="flex flex-col gap-2">
          <p>loading...</p>
          <Loading />
        </div>
      ) : (
        (() => {
          switch (type) {
            case "story":
              return <Project />;
            case "journal":
              return <Note />;
            case "ranking":
            case "playAgain":
            case "intro":
              return <HomeScreen />;
            case "endChapter":
              return <EndChapter />;
          }
        })()
      )}
      {type !== "intro" && (
        <div className="absolute top-5 left-5 p-4 z-10 cursor-pointer">
          <BackIcon onClick={handleBack} className="max-w-[42px]" />
        </div>
      )}
      <VideoPlayer />

      <DialogConfirm
        isOpen={dialogName === "quitPlayer"}
        onClose={() => setDialogName(null)}
        title="Rời khỏi"
        description="Bạn chưa hoàn thành xong nhiệm vụ. Bạn có chắc chắn muốn thoát khỏi màn này?"
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
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
