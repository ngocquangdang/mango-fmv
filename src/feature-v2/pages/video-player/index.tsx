import MediaPlayerControl from "../../../components/media-player-control";
import { DetailDialogProvider } from "../../../components/ui/dialog-v2/detail-dialog-context";
import { useVideoPlayerContext } from "../../../contexts";

export default function VideoPlayer() {
  const { type, isReviewScene } = useVideoPlayerContext();

  return (
    <div className="relative h-full w-full">
      <DetailDialogProvider>
        <div
          id="interactive-video"
          className={` ${type === "interactive" ? "block" : "hidden"}`}
          aria-label="Interactive video"
        ></div>
      </DetailDialogProvider>
      {isReviewScene && (
        <div className="fixed bottom-10 left-0 right-0 w-[70%] mx-auto z-10">
          <MediaPlayerControl />
        </div>
      )}
    </div>
  );
}
