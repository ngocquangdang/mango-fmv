import Help from "../../components/icon/help";
import Close from "../../components/icon/close";
import ButtonLighter from "../../components/button-lighter";
import ButtonUI from "../../components/button-ui";
import { useVideoPlayerContext } from "../../contexts";
import { useUserContext } from "../user/context";

export default function Home() {
  const { setType, play } = useVideoPlayerContext();
  const { chapter } = useUserContext();

  const handleClick = (
    actionName: "story" | "journal" | "ranking" | "playAgain"
  ) => {
    setType(actionName);
  };

  const handleStart = () => {
    setType("interactive");
    play();
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute top-4 right-4 flex gap-3 z-20">
        <Help />
        <Close />
      </div>

      {/* Left Side - Navigation Items */}
      <div className="absolute left-15 bottom-8 flex flex-col gap-6 z-20">
        <ButtonLighter
          width={287}
          className="min-h-[86px] max-w-[287px] text-white cursor-pointer"
          onClick={() => handleClick("story")}
        >
          Cốt truyện
        </ButtonLighter>
        <ButtonLighter
          width={287}
          className="min-h-[86px] max-w-[287px] text-white cursor-pointer"
          onClick={() => handleClick("journal")}
        >
          Nhật ký
        </ButtonLighter>
        <ButtonLighter
          width={287}
          className="min-h-[86px] max-w-[287px] text-white cursor-pointer"
          onClick={() => handleClick("ranking")}
        >
          Xếp hạng
        </ButtonLighter>
        {chapter.progress?.currentScene?.sceneId && (
          <ButtonLighter
            width={287}
            className="min-h-[86px] max-w-[287px] text-white cursor-pointer"
            onClick={() => handleClick("playAgain")}
          >
            Chơi lại
          </ButtonLighter>
        )}
      </div>

      {/* Bottom Center - Start Button (as text) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <ButtonUI
          width={357}
          className="!min-h-[111px] max-w-[357px] text-white cursor-pointer"
          onClick={handleStart}
        >
          {chapter.progress?.currentScene?.sceneId ? "Tiếp tục" : "Bắt đầu"}
        </ButtonUI>
      </div>
    </div>
  );
}
