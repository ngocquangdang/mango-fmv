import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import { UserProvider } from "../features/user/context/user-provider";
import { VideoPlayerProvider } from "../contexts/video-player-provider";
import { useVideoPlayerContext } from "../contexts";
import { useUserContext } from "../features/user/context";

import { BrowserRouter, Routes, Route, Outlet, useNavigate } from "react-router-dom";
import VideoPlayer from "../features/video-player";
import GameModal from "./components/ui/dialog";
import Home from "./pages/home";
import ChapterPage from "./pages/chapter-flow/chapter";
import Journal from "./pages/journal";
import LoadingBar from "./components/loading";
import Rank from "./pages/rank";
import GiftSelection from "./components/gift-selection";
import DialogInfo from "./components/ui/dialog-info";
import CardCollection from "./pages/card-collection";
import CollectionPage from "./pages/collection";
import QrLoginPage from "./pages/qr-login";
import { VoiceService } from "./services/voice-service";
import BlockingUsageModal from "./components/ui/blocking-usage-modal";

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

// Layout Component to keep persistent VideoPlayer and Modals
function LayoutWrapper() {
  const isLandscapeMobile = useIsLandscapeMobile();
  const backgroundImage = "/images/new-bg.png";

  // Read from environment variable, default to 100
  const dailyLimit = parseInt(import.meta.env.VITE_DAILY_VOICE_LIMIT || "100", 10);

  const { loading: userLoading, updateSceneStatus } = useUserContext();
  const [orientationStatus, setOrientationStatus] = React.useState(!isLandscapeMobile);
  const [isUsageLimitExceeded, setIsUsageLimitExceeded] = React.useState(false);

  React.useEffect(() => {
    const checkDailyUsage = async () => {
      try {
        const response = await VoiceService.getDailyUsage();
        if (response.data && response.data.count > dailyLimit) {
          setIsUsageLimitExceeded(true);
        }
      } catch (error) {
        console.error("Failed to check daily usage:", error);
      }
    };

    checkDailyUsage();
  }, [dailyLimit]);

  const {
    type,
    setType,
    quitPlayer,
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
    isVipModalOpen,
    setIsVipModalOpen,
  } = useVideoPlayerContext();

  const navigate = useNavigate();
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
    navigate("/"); // Mapping 'intro' to /
  };

  const onCancel = () => {
    setDialogName(null);
    onPlay();
  };

  const onConfirm = () => {
    const sceneId = currentStatus?.currentSceneId || "";
    const scene = clips?.[sceneId];

    quitPlayer(); // This resets type to intro in context, we might need to change that
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
    navigate("/"); // Go back to story (effectively home with story type if we really wanted, but user flow seems to be chapter page)
    // Actually, simply setType('story') should show the ChapterPage because of the conditional render in AppV2
    setType("story");
  };

  React.useEffect(() => {
    if (type === "interactive") {
      if (orientationStatus) {
        pause();
      }
    }
  }, [orientationStatus, type, pause]);

  // Sync orientation check
  React.useEffect(() => {
    setOrientationStatus(!isLandscapeMobile);
  }, [isLandscapeMobile]);

  return (
    <div
      className="w-full h-screen bg-cover bg-center app-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {loading ? (
        <div className="flex flex-col gap-2 items-center pb-8 justify-end h-full bg-black/50">
          <LoadingBar />
        </div>
      ) : (
        <>
          {type === "story" ? <ChapterPage /> : <Outlet />}
        </>
      )}

      {/* VideoPlayer is always mounted */}
      <VideoPlayer />

      {/* Global Back Button for Interactive Mode - Only show if type is interactive */}
      {type === "interactive" && (
        <div
          className="fixed top-0 left-0 p-4 z-[1000] cursor-pointer"
          onClick={handleBack}
        >
          <img
            src="/images/back-icon.png"
            alt="back-icon"
            className="w-9 h-9"
          />
        </div>
      )}

      {/* Orientation Dialog */}
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

      {/* SVIP Dialog */}
      <GameModal
        isOpen={isVipModalOpen}
        onClose={() => {
          setIsVipModalOpen(false);
          onPlay();
        }}
        onConfirm={() => {
          setIsVipModalOpen(false);
          window.open("https://club.glb.mangoplus.vn/intelmgtv/pay_vn/index.html?product_level=6", "_blank");
          onPlay();
        }}
        title="Đăng ký thành viên SVIP"
        message="Để trải nghiệm toàn bộ nội dung và cơ hội nhận quà độc quyền từ chương trình SVIP"
      />

      {/* Dialog Info */}
      <DialogInfo
        isOpen={dialogInfoState.isOpen}
        onClose={closeDialogInfo}
        isLoading={dialogInfoState.isLoading}
        data={dialogInfoState.data}
      />

      {/* Daily Usage Blocking Modal */}
      <BlockingUsageModal isOpen={isUsageLimitExceeded} limit={dailyLimit} />
    </div>
  );
}

function AppV2() {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UserProvider>
          <VideoPlayerProvider>
            <Routes>
              <Route element={<LayoutWrapper />}>
                <Route path="/" element={<Home />} />
                <Route path="/journal" element={<Journal />} />
                <Route path="/rank" element={<Rank />} />
                <Route path="/card-collection" element={<CardCollection />} />
                <Route path="/collection/*" element={<CollectionPage />} />
                <Route path="/login-qr" element={<QrLoginPage />} />
              </Route>
            </Routes>
          </VideoPlayerProvider>
        </UserProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default AppV2;


