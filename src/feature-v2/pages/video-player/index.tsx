import MediaPlayerControl from '../../../components/media-player-control';
import { DetailDialogProvider } from '../../../components/ui/dialog-v2/detail-dialog-context';
import { useVideoPlayerContext } from '../../../contexts';

export default function VideoPlayer() {
  const { type, isReviewScene } = useVideoPlayerContext();

  return (
    <div className="relative h-full w-full">
      <DetailDialogProvider>
        <div
          id="interactive-video"
          className={`${
            type === "interactive" ? "absolute inset-0 block" : "hidden"
          }`}
          aria-label="Interactive video"
        ></div>
      </DetailDialogProvider>
      {isReviewScene && (
        <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 mx-auto w-[72%] max-w-3xl">
          <MediaPlayerControl />
        </div>
      )}
    </div>
  );
}
