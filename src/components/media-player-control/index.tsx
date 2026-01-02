
import SeekPre from "./seek-pre";
import SeekTo from "./seek-to";
import SupperSeekPre from "./supper-seek-pre";
import SupperSeekTo from "./supper-seek-to";
import Pause from "./pause";
import { useVideoPlayerContext } from "../../contexts";

import Start from "./start";

export default function MediaPlayerControl() {
  const { pause, seekTo, play, isPlaying, setIsPlaying } = useVideoPlayerContext();

  const handleSupperSeekPreClick = () => {
    console.log("supper seek pre");
    seekTo?.(-10, "relative");
  };

  const handleSeekPreClick = () => {
    console.log("seek pre");
    seekTo?.(-5, "relative");
  };

  const handlePauseClick = () => {
    console.log("pause");
    pause();
    setIsPlaying(false);
  };

  const handlePlayClick = () => {
    console.log("play");
    play();
    setIsPlaying(true);
  };

  const handleSeekToClick = () => {
    console.log("seek to");
    seekTo?.(5, "relative");
  };

  const handleSupperSeekToClick = () => {
    console.log("supper seek to");
    seekTo?.(10, "relative");
  };

  return (
    <div className="flex items-center justify-center gap-10">
      <SupperSeekPre
        onClick={handleSupperSeekPreClick}
        className="w-[32px] h-[32px] lg:w-[64px] lg:h-[64px]"
      />
      <SeekPre
        onClick={handleSeekPreClick}
        className="w-[32px] h-[32px] lg:w-[64px] lg:h-[64px]"
      />
      {isPlaying ? (
        <Pause
          onClick={handlePauseClick}
          className="w-[46px] h-[46px] lg:w-[84px] lg:h-[84px]"
        />
      ) : (
        <Start
          onClick={handlePlayClick}
          className="w-[46px] h-[46px] lg:w-[84px] lg:h-[84px]"
        />
      )}
      <SeekTo
        onClick={handleSeekToClick}
        className="w-[32px] h-[32px] lg:w-[64px] lg:h-[64px]"
      />
      <SupperSeekTo
        onClick={handleSupperSeekToClick}
        className="w-[32px] h-[32px] lg:w-[64px] lg:h-[64px]"
      />
    </div>
  );
}
