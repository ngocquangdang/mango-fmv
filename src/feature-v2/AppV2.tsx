import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import { UserProvider } from "../features/user/context/user-provider";
import { VideoPlayerProvider } from "../contexts/video-player-provider";
import { useVideoPlayerContext } from "../contexts";
import { useUserContext } from "../features/user/context";

import VideoPlayer from "../features/video-player";
import GameModal from "./components/ui/dialog";
import Home from "./pages/home";
import ChapterPage from "./pages/chapter-flow/chapter";
import Journal from "./pages/journal";
import LoadingBar from "./components/loading";
import Rank from "./pages/rank";
import GiftSelection from "./components/gift-selection";
import DialogInfo from "./components/ui/dialog-info";

const useIsLandscapeMobile = () => {
  const [isLandscape, setIsLandscape] = React.useState(true);

  React.useEffect(() => {
    const updateOrientation = () => {
      if (typeof window === "undefined") return;
      const isMobile = window.innerWidth < 768;
      const mql = window.matchMedia("(orientation: landscape)");
      setIsLandscape(isMobile ? mql.matches : true);
    };

    updateOrientation();

    const mql = window.matchMedia("(orientation: landscape)");
    mql.addEventListener("change", updateOrientation);
    window.addEventListener("resize", updateOrientation);

    return () => {
      mql.removeEventListener("change", updateOrientation);
      window.removeEventListener("resize", updateOrientation);
    };
  }, []);

  return isLandscape;
};

function AppV2Content() {
  const isLandscapeMobile = useIsLandscapeMobile();
  const backgroundImage = "/images/new-bg.png";

  const { loading: userLoading, updateSceneStatus } = useUserContext();
  const [orientationStatus, setOrientationStatus] =
    React.useState(!isLandscapeMobile);

  const {
    type,
    quitPlayer,
    setType,
    setReviewScene,
    pause,
    onPlay,
    currentStatus,
    isReviewScene,
    isPlayerLoading,
    isGiftSelectionOpen,
    dialogInfoState,
    closeDialogInfo,
    clips,
    isEndingScene,
    setIsEndingScene,
  } = useVideoPlayerContext();

  const [dialogName, setDialogName] = React.useState<string | null>(null);

  const loading = userLoading || isPlayerLoading;

  const handleBack = () => {
    if (type === "interactive") {
      if (isReviewScene) {
        pause();
        setReviewScene(false);
        setType("story");
        return;
      } else {
        setDialogName("quitPlayer");
        pause();
        return;
      }
    }
    setType("intro");
  };

  const onCancel = () => {
    setDialogName(null);
    onPlay();
  };

  const onConfirm = () => {
    const sceneId = currentStatus?.currentSceneId || "";
    const scene = clips?.[sceneId];

    quitPlayer();
    updateSceneStatus({
      sceneId: currentStatus?.currentSceneId || "",
      totalDuration: Math.floor(
        scene?.duration ||
          currentStatus?.totalDuration ||
          currentStatus?.time ||
          0
      ),
      watchingSecond: Math.floor(
        currentStatus?.watchingSecond || currentStatus?.time || 0
      ),
      status: "INPROGRESS",
    });
    setDialogName(null);
    setReviewScene(false);
    setType("story");
  };

  React.useEffect(() => {
    if (type === "interactive") {
      if (orientationStatus) {
        pause();
      }
    }
  }, [orientationStatus, type, pause]);

  return (
    <div
      className="w-full h-screen bg-cover bg-center app-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {loading ? (
        <div className="flex flex-col gap-2 items-center pb-8 justify-end h-screen bg-black/50">
          <LoadingBar />
        </div>
      ) : (
        <>
          {(() => {
            switch (type) {
              case "story":
                return <ChapterPage />;
              case "journal":
                return <Journal />;
              case "ranking":
                return <Rank />;
              case "playAgain":
              case "intro":
                return <Home />;
              // case "endChapter":
              //   return <EndChapter />;
            }
          })()}
        </>
      )}

      {/* VideoPlayer is always mounted */}
      <VideoPlayer />

      {/* Global Back Button for Interactive Mode */}
      {type === "interactive" && (
        <div
          className="fixed top-0 left-0 p-4 z-50 cursor-pointer"
          onClick={handleBack}
        >
          <img
            src="/images/back-icon.png"
            alt="back-icon"
            className="w-9 h-9"
          />
        </div>
      )}

      {/* Orientation Dialog - Hiển thị khi mobile dọc */}
      <GameModal
        isOpen={orientationStatus}
        onConfirm={() => {
          if (type === "interactive") {
            onPlay();
          }
          setOrientationStatus(false);
        }}
        message="Vui lòng xoay ngang màn hình để tiếp tục trải nghiệm. Player ưu tiên hiển thị ngang trên điện thoại."
      />

      {/* Confirmation Dialog */}
      <GameModal
        isOpen={dialogName === "quitPlayer"}
        onClose={onCancel}
        onConfirm={onConfirm}
        title="Rời khỏi"
        message="Bạn chưa hoàn thành xong nhiệm vụ. Bạn có chắc chắn muốn thoát khỏi màn này?"
      />

      {/* Ending Scene Dialog */}
      <GameModal
        isOpen={isEndingScene}
        onClose={() => {
          setIsEndingScene(false);
        }}
        onConfirm={() => {
          setIsEndingScene(false);
          quitPlayer();
        }}
        title="Kết thúc chương"
        message="Bạn đã hoàn thành chương này. Quay lại màn hình chính nhé."
      />

      {isGiftSelectionOpen && <GiftSelection />}

      {/* Dialog Info */}
      <DialogInfo
        isOpen={dialogInfoState.isOpen}
        onClose={closeDialogInfo}
        data={dialogInfoState.data}
      />
    </div>
  );
}

function AppV2() {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <VideoPlayerProvider>
          <AppV2Content />
        </VideoPlayerProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default AppV2;
