import PixelFlow from "../pixel-flow/pixel-flow";
import { PixelProgress } from "../../components/pixel-progress";
import Banner from "../../components/banner";
import Box from "../../components/box";
import { FlowChartContextProvider } from "../flow-chart/context/flow-chart-provider";
import { useVideoPlayerContext } from "../../contexts";
import { useUserContext } from "../user/context";

export default function Project() {
  const { onPlayPlayer } = useVideoPlayerContext();
  const { chapter } = useUserContext();

  const handlePlay = () => {
    const sceneId =
      chapter.progress?.currentScene?.sceneId || chapter.startSceneId;
    onPlayPlayer(sceneId);
  };

  const items = [
    {
      id: "1",
      iconUrl: `https://picsum.photos/seed/picsum/200/100`,
      points: 5,
    },
    {
      id: "2",
      iconUrl: `https://picsum.photos/seed/picsum/200/100`,
      points: 10,
    },
    {
      id: "3",
      iconUrl: `https://picsum.photos/seed/picsum/200/100`,
      points: 15,
    },
  ];
  return (
    <FlowChartContextProvider>
      <div className="w-full h-full relative">
        <div className="flex items-center justify-center">
          <Banner className="" text="Cốt Truyện" />
        </div>
        <div className="mt-4 flex flex-row gap-10 justify-center">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center justify-center"
            >
              <div className="relative ">
                <Box src={item.iconUrl} width={72} height={72} className="" />
                <img
                  src={"./assets/heart.png"}
                  alt={item.id}
                  className="absolute w-11 h-11 -right-[30%] bottom-0"
                />
              </div>
              <div className="text-2xl text-gray-500 mt-2">+ {item.points}</div>
            </div>
          ))}
        </div>
        <div className="mt-2 w-full h-[70%]">
          <PixelFlow />
        </div>

        <div className="fixed bottom-0 left-0 right-0 w-[64%] mx-auto z-10">
          <PixelProgress progress={60} onClickBtn={handlePlay} />
        </div>
      </div>
    </FlowChartContextProvider>
  );
}
