import HookButton from "../../components/ui/hook-button";
import PhotoFrame from "../../components/ui/photo-frame";
import RewardProgress from "../../components/ui/progress";
import ChapterFlowV2 from "./chapter-flow-v2";
import { useVideoPlayerContext } from "../../../contexts";
import { useUserContext } from "../../../features/user/context";
import { FlowChartContextProvider } from "./context/flow-chart-provider";
import Banner from '../../components/banner';
import ChapterFlow from './chapter-flow';

export default function ChapterPage() {
  const { onPlayPlayer, setType } = useVideoPlayerContext();
  const { chapter, } = useUserContext();
  const { progress } = chapter;

  const handlePlay = () => {
    const sceneId =
      progress?.currentScene?.sceneId || chapter.startSceneId;
    onPlayPlayer(sceneId);
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      < div className="w-full h-[74px] " >
        <div
          className="absolute top-0 left-0 p-4 z-10 cursor-pointer"
          onClick={() => setType("intro")}
        >
          <img
            src="/images/back-icon.png"
            alt="back-icon"
            className="w-9 h-9"
          />
        </div>
        <Banner text='Cốt truyện' />
        <div className="absolute top-0 right-0 flex items-center gap-2 p-4">
          <div
            className="w-20 h-10 bg-cover bg-center bg-no-repeat flex items-center justify-center text-xs"
            style={{ backgroundImage: `url(/images/score-banner.png)` }}
          >
            {(progress as any)?.points || 0}
          </div>
          <img
            src="/images/book-with-bg-icon.png"
            alt="book-icon"
            className="w-9 h-9 cursor-pointer"
            onClick={() => setType("journal")}
          />
          <img
            src="/images/ask-icon.png"
            alt="ask-icon"
            className="w-9 h-9 cursor-pointer"
          />
        </div>
      </div >
      <FlowChartContextProvider>
        <ChapterFlowV2 />
        <ChapterFlow />
      </FlowChartContextProvider>

      <div
        className=" absolute bottom-0 h-[150px] w-full pb-4"
        style={{
          backgroundImage: `url(/images/bottom-bg.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute bottom-4 flex items-end justify-between w-[74%] mt-auto">
          <div className="flex items-center">
            {progress?.characters?.map((item: any) => (
              <PhotoFrame
                key={item.id}
                imageSrc={item.imageUrl}
                score={item.relationshipPoints}
                className={`w-10 h-10`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div
              className="relative w-[116px] h-[22px] bg-cover bg-center bg-no-repeat flex items-center justify-center"
              style={{ backgroundImage: `url(/images/bg-title.png)` }}
            >
              <span className=" uppercase text-[10px] font-bold text-center">
                tiến độ hiện tại
              </span>
            </div>
            <span className="text-3xl font-bold text-[#F76933]">{progress?.milestone || 0}%</span>
          </div>

          <RewardProgress
            currentPoints={progress?.milestone || 0}
            maxPoints={100}
            onClaimReward={() => { }}
            className="pb-4"
          />
        </div>

        <div className="absolute bottom-0 right-8 w-[134px] h-[116px]">
          <HookButton label="Tiếp tục" onClick={handlePlay} />
        </div>
      </div>
    </div >
  );
}
