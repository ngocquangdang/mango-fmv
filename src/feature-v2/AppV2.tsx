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

  const { loading: userLoading, updateSceneStatus } = useUserContext();
  const [orientationStatus, setOrientationStatus] = React.useState(!isLandscapeMobile);

  const {
    type, // Still used for internal player states like 'interactive' vs others? Or we map routes to types?
    quitPlayer,
    // setType removed - using routing instead
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
  // const location = useLocation(); - not used
  const [dialogName, setDialogName] = React.useState<string | null>(null);

  const loading = userLoading || isPlayerLoading;

  // Derive "type" from route for backward compatibility if needed, 
  // or relying on the fact that we are on a specific route.
  // Ideally, VideoPlayerContext should know about the route.

  // Handling Back Button for Interactive Mode
  // If we are in interactive mode, usually we are "playing".
  // The 'type' in VideoPlayerContext is 'interactive'.
  // We need to check if we are on a route that represents playback?
  // Actually, 'interactive' in the old code wasn't a separate page properly, 
  // it was a state that showed VideoPlayer ON TOP of everything (or switch case).
  // In the switch case, 'interactive' wasn't even a case! 
  // Wait, let's check the original code again.
  // The switch case had: story, journal, ranking, cardCollection, playAgain, intro.
  // It DID NOT have 'interactive'.
  // BUT VideoPlayer is always mounted.
  // When `type` === 'interactive', the switch probably returned null or didn't render anything overlapping?
  // Ah, the original code had:
  // switch (type) { ... }
  // VideoPlayer is mounted below.
  // If type was 'interactive', the switch returned undefined (render nothing from switch), 
  // so ONLY VideoPlayer was visible.

  // So in React Router, we can have a route for '/watch' or just ensure that when playing,
  // we navigate to a route that renders nothing in the Outlet (or just the Player).

  const handleBack = () => {
    if (type === "interactive") {
      if (isReviewScene) {
        pause();
        setReviewScene(false);
        navigate("/chapter"); // Mapping 'story' to /chapter
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
    navigate("/chapter"); // Go back to story
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
        /* The Outlet renders the current route's component */
        <Outlet />
      )}

      {/* VideoPlayer is always mounted */}
      <VideoPlayer />

      {/* Global Back Button for Interactive Mode - Only show if type is interactive */}
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
                <Route path="/chapter" element={<ChapterPage />} />
                <Route path="/journal" element={<Journal />} />
                <Route path="/rank" element={<Rank />} />
                <Route path="/card-collection" element={<CardCollection />} />
                <Route path="/collection/*" element={<CollectionPage />} />
                <Route path="/login-qr" element={<QrLoginPage />} />
                {/* 
                  When playing video (interactive), we want to show NOTHING in the outlet 
                  so the video player (which is in absolute/z-index) shows up or just sits there.
                  If the VideoPlayer is z-indexed below the content, we need a route that renders nothing.
                  If type === 'interactive' effectively meant "hide other pages", 
                  then an empty route or specific 'watch' route works.
                  
                  Let's assume type='interactive' hides the outlet content? 
                  No, LayoutWrapper renders <Outlet />.
                  If we are in 'interactive' mode, we might want to navigate to a blank route 
                  OR we rely on VideoPlayer z-index covering the Outlet.
                  BUT, to simulate the old switch(type) behavior where 'interactive' case didn't exist (so rendered nothing),
                  we should probably have a route for it.
                 */
                }
                <Route path="/watch" element={<div />} />
              </Route>
            </Routes>
          </VideoPlayerProvider>
        </UserProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default AppV2;

