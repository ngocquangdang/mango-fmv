import HookButton from "../../components/ui/hook-button";
import PhotoFrame from "../../components/ui/photo-frame";
import RewardProgress from "../../components/ui/progress";
import ChapterFlow from "./chapter-flow";
import { useVideoPlayerContext } from "../../../contexts";
import { useUserContext } from "../../../features/user/context";
import { FlowChartContextProvider } from "./context/flow-chart-provider";
import Banner from '../../components/banner';

export default function ChapterPage() {
  const { onPlayPlayer, setType } = useVideoPlayerContext();
  const { chapter,  } = useUserContext();
  const { progress } = chapter;

  const handlePlay = () => {
    const sceneId =
      progress?.currentScene?.sceneId || chapter.startSceneId;
    onPlayPlayer(sceneId);
  };

  return (
    <div className="w-full h-screen">
      <div className="w-full h-[100px] ">
        <div
          className="fixed top-0 left-0 p-4 z-10 cursor-pointer"
          onClick={() => setType("intro")}
        >
          <img
            src="/images/back-icon.png"
            alt="back-icon"
            className="w-9 h-9"
          />
        </div>
        <Banner text='Cốt truyện' />
        <div className="fixed top-0 right-0 flex items-center gap-2 p-4">
          <div
            className="w-20 h-10 bg-cover bg-center bg-no-repeat flex items-center justify-center text-xs"
            style={{ backgroundImage: `url(/images/score-banner.png)` }}
          >
            {progress?.points || 0}
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
      </div>
      <FlowChartContextProvider>
        <ChapterFlow />
      </FlowChartContextProvider>

      <div
        className=" fixed bottom-0 h-[150px] w-full pb-4"
        style={{
          backgroundImage: `url(/images/bottom-bg.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="fixed bottom-4 flex items-end justify-between w-[74%] mt-auto">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((item) => (
              <PhotoFrame
                key={item}
                imageSrc={`https://picsum.photos/id/${item}/200/120`}
                score={item}
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
            currentPoints={60}
            maxPoints={100}
            onClaimReward={() => {}}
            className="pb-4"
          />
        </div>

        <div className="fixed bottom-0 right-12 w-[134px] h-[116px]">
          <HookButton label="Tiếp tục" onClick={handlePlay} />
        </div>
      </div>
    </div>
  );
}
