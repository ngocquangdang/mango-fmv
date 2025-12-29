import { useState, useEffect } from "react";
import HookButton from "../../components/ui/hook-button";
// import PhotoFrame from "../../components/ui/photo-frame";
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

  // Tối ưu: Chỉ render component được hiển thị dựa trên màn hình
  const [shouldUseV2, setShouldUseV2] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768 && window.matchMedia("(orientation: portrait)").matches;
  });

  useEffect(() => {
    const checkViewport = () => {
      const isMobilePortrait =
        window.innerWidth < 768 &&
        window.matchMedia("(orientation: portrait)").matches;
      setShouldUseV2(isMobilePortrait);
    };

    // Lắng nghe thay đổi kích thước màn hình và orientation
    window.addEventListener("resize", checkViewport);
    window.addEventListener("orientationchange", checkViewport);

    return () => {
      window.removeEventListener("resize", checkViewport);
      window.removeEventListener("orientationchange", checkViewport);
    };
  }, []);

  const handlePlay = () => {
    const sceneId =
      progress?.currentScene?.sceneId || chapter.startSceneId;

    onPlayPlayer(sceneId);
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="w-full h-[74px] " >
        <div
          className="absolute top-0 left-0 p-4 z-10 cursor-pointer"
          onClick={() => setType("intro")}
        >
          <img
            src="/images/back-icon.png"
            alt="back-icon"
            className="w-9 h-9 lg:w-[43.2px] lg:h-[43.2px]"
          />
        </div>
        <Banner text='Cốt truyện' />
        <div className="absolute top-0 right-0 flex items-center gap-2 p-4">
          <div
            className="w-20 h-10 lg:w-[96px] lg:h-[48px] bg-cover bg-center bg-no-repeat flex items-center justify-center text-xs lg:text-sm"
            style={{ backgroundImage: `url(/images/score-banner.png)` }}
          >
            {(progress as any)?.points || 0}
          </div>
          <img
            src="/images/book-with-bg-icon.png"
            alt="book-icon"
            className="w-9 h-9 lg:w-[43.2px] lg:h-[43.2px] cursor-pointer"
            onClick={() => setType("journal")}
          />
          <img
            src="/images/ask-icon.png"
            alt="ask-icon"
            className="w-9 h-9 lg:w-[43.2px] lg:h-[43.2px] cursor-pointer"
          />
        </div>
      </div>
      <FlowChartContextProvider>
        {shouldUseV2 ? <ChapterFlowV2 /> : <ChapterFlow />}
      </FlowChartContextProvider>

      <div
        className=" absolute bottom-0 h-[130px] lg:h-[300px] w-full pb-4"
        style={{
          backgroundImage: `url(/images/bottom-bg.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute bottom-4 flex items-end justify-center w-[74%] lg:w-[86%] mt-auto">
          {/* <div className="flex items-center pl-0 lg:pl-6">
            {progress?.characters?.map((item: any) => (
              <PhotoFrame
                key={item.id}
                imageSrc={item.imageUrl}
                score={item.relationshipPoints}
                className={`w-10 h-10 lg:w-[68px] lg:h-[68px]`}
              />
            ))}
          </div> */}
          <div className='flex items-center gap-2'>
            <div className="flex items-center gap-2">
              <div
                className="relative w-[116px] h-[22px] lg:w-[282px] lg:h-[53.6px] bg-cover bg-center bg-no-repeat flex items-center justify-center"
                style={{ backgroundImage: `url(/images/bg-title.png)` }}
              >
                <span className=" uppercase text-[10px] lg:text-[24.4px] font-bold text-center">
                  tiến độ hiện tại
                </span>
              </div>
              <span className="text-3xl lg:text-[60.8px] font-bold text-[#F76933]">{progress?.milestone || 0}%</span>
            </div>

            <RewardProgress
              currentPoints={progress?.milestone || 0}
              maxPoints={100}
              onClaimReward={() => { }}
              className="pb-4 flex-shrink-0"
            />
          </div>

        </div>

        <div className="absolute bottom-0 right-8 w-[134px] h-[116px] lg:w-[160.8px] lg:h-[139.2px]">
          <HookButton label="Tiếp tục" onClick={handlePlay} />
        </div>
      </div>
    </div >
  );
}
