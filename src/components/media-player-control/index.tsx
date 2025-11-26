import SeekPre from "./seek-pre";
import SeekTo from "./seek-to";
import SupperSeekPre from "./supper-seek-pre";
import SupperSeekTo from "./supper-seek-to";
import Pause from "./pause";
import { useVideoPlayerContext } from "../../contexts";
import { PausedActionName } from "../../types/chapter";
import Start from "./start";

export default function MediaPlayerControl() {
  const { pause, seekTo, pauseType, play } = useVideoPlayerContext();

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
  };

  const handlePlayClick = () => {
    console.log("play");
    play();
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
      <SupperSeekPre onClick={handleSupperSeekPreClick} />
      <SeekPre onClick={handleSeekPreClick} />
      {pauseType === PausedActionName.USER_PAUSED_VIDEO ? (
        <Pause onClick={handlePauseClick} />
      ) : (
        <Start onClick={handlePlayClick} />
      )}
      <SeekTo onClick={handleSeekToClick} />
      <SupperSeekTo onClick={handleSupperSeekToClick} />
    </div>
  );
}
