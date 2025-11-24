import { useVideoPlayerContext } from "../../contexts";
import MediaPlayerControl from "../../components/media-player-control";

export default function VideoPlayer() {
  const { type } = useVideoPlayerContext();
  return (
    <div className="relative">
      <div
        id="interactive-video"
        className={`${type === "interactive" ? "block" : "hidden"}`}
      ></div>
      {type === "interactive" && (
        <div className="fixed bottom-10 left-0 right-0 w-[70%] mx-auto z-10">
          <MediaPlayerControl />
        </div>
      )}
    </div>
  );
}
