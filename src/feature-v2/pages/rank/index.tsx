import { useVideoPlayerContext } from "../../../contexts";
import { RankProvider } from "./context/rank-provider";
import RankLayout from "./rank-layout";

function RankContent() {
  const { setType } = useVideoPlayerContext();

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div
        className="absolute top-4 left-4 z-50 cursor-pointer w-9 h-9"
        onClick={() => setType("intro")}
      >
        <img src="/images/back-icon.png" alt="back-icon" className="w-9 h-9" />
      </div>
      <RankLayout />
    </div>
  );
}

export default function Rank() {
  return (
    <RankProvider>
      <RankContent />
    </RankProvider>
  );
}
