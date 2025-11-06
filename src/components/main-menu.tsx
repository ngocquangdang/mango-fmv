import React from "react";
import { useVideoPlayerContext } from "../contexts";

export default function MainMenu() {
  const { setType, play } = useVideoPlayerContext();

  const handleContinue = React.useCallback(() => {
    setType("interactive");
    play();
  }, [setType, play]);

  const handleChapter = React.useCallback(() => {
    console.log("Chapter");
  }, []);

  const handleSetting = React.useCallback(() => {
    console.log("Setting");
  }, []);

  const handleExit = React.useCallback(() => {
    console.log("Exit");
  }, []);

  return (
    <div className="flex w-[450px] px-5 py-3 flex-col gap-2">
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
