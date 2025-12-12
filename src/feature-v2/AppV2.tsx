import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import { UserProvider } from "../features/user/context/user-provider";
import { VideoPlayerProvider } from "../contexts/video-player-provider";
import GameModal from "./components/ui/dialog";
import Button from "./components/ui/button";
import HookButton from "./components/ui/hook-button";
import HomeButton from "./components/ui/home-button";
import Home from "./pages/home";
import ChapterFlow from "./pages/chapter-flow";
import ChapterPage from "./pages/chapter-flow/chapter";
import Journal from "./pages/journal";
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

function AppV2Inner() {
  const isLandscapeMobile = useIsLandscapeMobile();
  const backgroundImage = "/images/new-bg.png";

  if (!isLandscapeMobile) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center text-center px-6">
        <p className="text-lg font-semibold text-gray-800">
          Vui lòng xoay ngang màn hình để tiếp tục trải nghiệm.
        </p>
        <p className="text-sm text-gray-600">
          Player ưu tiên hiển thị ngang trên điện thoại.
        </p>
      </div>
    );
  }

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <ChapterPage /> 
      {/* <Journal />
      <DialogInfo
        isOpen={true}
        onClose={() => {}}
        data={{
          mainImage:
            "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
          itemImage:
            "https://images.unsplash.com/photo-1603351154351-5cf233081547",
          itemName: "airpods",
          title: "Khoảnh khắc của Phúc Nguyên",
          description:
            "Khi Phúc Nguyên đeo Airpods, anh lạc vào thế giới âm nhạc của mình. Một buổi chiều nắng đẹp, anh ngồi trên ghế công viên, nhắm mắt và để những giai điệu cuốn trôi lo âu. Mỗi lần nghe bài hát yêu thích, nụ cười của anh như ánh nắng.",
        }}
      /> */}
      {/* <Home /> */}
      {/* <Button label="Tiếp tục" size="small" onClick={() => {}} />
      <HookButton label="Tiếp tục" onClick={() => {}} />
      <HomeButton /> */}
      {/* <GameModal
        isOpen={true}
        onClose={() => {}}
        onConfirm={() => {}}
        title="Rời khỏi"
        message="Bạn chưa hoàn thành xong nhiệm vụ. Bạn có chắc chắn muốn thoát khỏi màn này?"
      /> */}
    </div>
  );
}

function AppV2() {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <VideoPlayerProvider>
          <AppV2Inner />
        </VideoPlayerProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default AppV2;
