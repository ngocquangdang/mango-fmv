import React from "react";
import { useVideoPlayerContext } from "../contexts";

type Props = {
  onOpenChapter?: () => void;
  onClose?: () => void;
};

export default function SettingMenu({ onOpenChapter, onClose }: Props) {
  const { setType, play, pauseType, onDestroy } = useVideoPlayerContext();

  const handlePlayAgain = React.useCallback(() => {
    // TODO: Implement play again
  }, [setType, play]);

  const handleContinue = React.useCallback(() => {
    onClose?.();
    if (pauseType === "DECISION_POINT_REACHED") return;
    play();
  }, [play, onClose, pauseType]);

  const handleChapter = React.useCallback(() => {
    onOpenChapter?.();
  }, [onOpenChapter]);

  const handleSetting = React.useCallback(() => {
    console.log("Setting");
  }, []);

  const handleExit = () => {
    onDestroy();
    setType("intro");
    onClose?.();
  };

  return (
    <div className="flex px-5 py-3 flex-col gap-2">
      <button className="w-full" onClick={handlePlayAgain}>
        Chơi lại
      </button>
      <button className="w-full" onClick={handleContinue}>
        Tiếp tục
      </button>
      <button className="w-full" onClick={handleChapter}>
        Chapter
      </button>
      <button className="w-full" onClick={handleSetting}>
        Cài đặt
      </button>
      <button className="w-full" onClick={handleExit}>
        Thoát
      </button>
    </div>
  );
}
