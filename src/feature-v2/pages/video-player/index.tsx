import { useVideoPlayerContext } from "../../../contexts";
import { DetailDialogProvider } from "../../../components/ui/dialog-v2/detail-dialog-context";

export default function VideoPlayer() {
  const { type } = useVideoPlayerContext();

  return (
    <div className="relative">
      <DetailDialogProvider>
        <div
          id="interactive-video"
          className={`${type === "interactive" ? "block" : "hidden"} `}
        ></div>
      </DetailDialogProvider>
    </div>
  );
}
