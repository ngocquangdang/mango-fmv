import SeekPre from "./seek-pre";
import SeekTo from "./seek-to";
import SupperSeekPre from "./supper-seek-pre";
import SupperSeekTo from "./supper-seek-to";
import Pause from "./pause";
import { useVideoPlayerContext } from "../../contexts";

export default function MediaPlayerControl() {
  const {currentStatus} = useVideoPlayerContext();
  console.log("🚀 ~ MediaPlayerControl ~ currentStatus:", currentStatus)

  const handleSupperSeekPreClick = () => {
    console.log("supper seek pre");
  };

  const handleSeekPreClick = () => {
    console.log("seek pre");
  };
  
  const handlePauseClick = () => {
    console.log("pause");
  };

  const handleSeekToClick = () => {
    console.log("seek to");
  };

  const handleSupperSeekToClick = () => {
    console.log("supper seek to");
  };

  if (!currentStatus) return null;
  return (
    <div className="flex items-center justify-center gap-10">
      <SupperSeekPre onClick={handleSupperSeekPreClick} />
      <SeekPre onClick={handleSeekPreClick} />
      <Pause onClick={handlePauseClick} />
      <SeekTo onClick={handleSeekToClick} />
      <SupperSeekTo onClick={handleSupperSeekToClick} />
    </div>
  );
}
