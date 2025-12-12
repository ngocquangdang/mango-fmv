import { useVideoPlayerContext } from "../../contexts";
import MediaPlayerControl from "../../components/media-player-control";
import { DetailDialogProvider } from "../../components/ui/dialog-v2/detail-dialog-context";

export default function VideoPlayer() {
  const { type, isReviewScene } = useVideoPlayerContext();

  return (
    <div className="relative">
      <DetailDialogProvider>
        <div
          id="interactive-video"
          className={`${type === "interactive" ? "block" : "hidden"} `}
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
