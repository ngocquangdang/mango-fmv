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
          className={`fixed inset-0 w-full h-full bg-black transition-opacity duration-300 ${type === "interactive"
            ? "z-[999] opacity-100 pointer-events-auto"
            : "z-[-1] opacity-0 pointer-events-none"
            }`}
        ></div>
      </DetailDialogProvider>
      {isReviewScene && (
        <div className="fixed bottom-1 left-0 right-0 w-[70%] mx-auto z-[999]">
          <MediaPlayerControl />
        </div>
      )}
    </div>
  );
}
