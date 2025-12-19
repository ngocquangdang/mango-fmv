import React, { useMemo } from "react";
import HookButton from "../components/ui/hook-button";
import HomeButton from "../components/ui/home-button";
import { useVideoPlayerContext } from "../../contexts";
import { useUserContext } from "../../features/user/context";
import { useRestartChapter } from "../../features/user/hooks";
import GameModal from "../components/ui/dialog";

const IMAGE_VERSION = "1";

export default function Home() {
  const { setType, setCollectionItems } = useVideoPlayerContext();
  const { chapter, refetch, refetchCollectedRewards } = useUserContext();
  const { mutateAsync: restartChapter } = useRestartChapter();
  const [dialogName, setDialogName] = React.useState<string | null>(null);
  const [activeShakeIndex, setActiveShakeIndex] = React.useState<number>(0);
  const [shakeOffset, setShakeOffset] = React.useState(0);
  const [paperOffset, setPaperOffset] = React.useState(0);

  const isPlaying = useMemo(() => {
    return (
      Object.values(chapter.scenes || {})?.some(
        (scene) => scene.status === "COMPLETED"
      ) || chapter.progress?.currentScene?.watchingSecond
    );
  }, [chapter.scenes, chapter.progress?.currentScene?.watchingSecond]);

  const handleClick = async (
    actionName: "story" | "journal" | "ranking" | "playAgain"
  ) => {
    if (actionName === "playAgain") {
      setDialogName("quitPlayer");
      return;
    }
    setType(actionName);
    refetchCollectedRewards();
  };

  const handleStart = () => {
    // const sceneId =
    //   chapter.progress?.currentScene?.sceneId || chapter.startSceneId;
    // onPlayPlayer(sceneId);
    setType("story");
    setCollectionItems({});
  };

  const onConfirm = async () => {
    try {
      // await restartChapter(chapter.id);
      await restartChapter();
      refetch();
    } catch (error) {
      console.error("Failed to restart chapter", error);
    }
    setDialogName(null);
  };

  React.useEffect(() => {
    const buttonCount = 3 + (+(isPlaying || 0) > 0 ? 1 : 0);
    if (!buttonCount) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveShakeIndex((previousIndex) => {
        const nextIndex = (previousIndex + 1) % buttonCount;
        return nextIndex;
      });
    }, 2000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isPlaying]);

  React.useEffect(() => {
    let animationFrameId: number;
    const startTime = performance.now();

    const animateShake = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const duration = 600;
      const progress = (elapsed % duration) / duration;
      const wave = Math.sin(progress * 2 * Math.PI);
      const amplitude = 2;

      setShakeOffset(wave * amplitude);
      animationFrameId = requestAnimationFrame(animateShake);
    };

    animationFrameId = requestAnimationFrame(animateShake);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  React.useEffect(() => {
    let animationFrameId: number;
    const startTime = performance.now();

    const animatePaper = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const duration = 2600;
      const progress = (elapsed % duration) / duration;
      const wave = Math.sin(progress * 2 * Math.PI);
      const amplitude = 3;

      setPaperOffset(wave * amplitude);
      animationFrameId = requestAnimationFrame(animatePaper);
    };

    animationFrameId = requestAnimationFrame(animatePaper);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <img
        src={`/images/LOGO_GCNMN.png?v=${IMAGE_VERSION}`}
        alt="home-bg"
        className="absolute top-8 left-[50%] translate-x-[-50%] w-[263px] h-[120px] lg:w-[340px] lg:h-[144px] object-cover"
      />
      <div className="flex flex-col h-full justify-center items-center gap-4 w-fit pl-2">
        <div
          style={{
            transform: `translateY(${activeShakeIndex === 0 ? shakeOffset : 0
              }px)`,
            transition: "transform 80ms linear",
          }}
        >
          <HomeButton
            icon={`/images/window-icon.png?v=${IMAGE_VERSION}`}
            label="Cốt truyện"
            onClick={() => handleClick("story")}
          />
        </div>
        <div
          style={{
            transform: `translateY(${activeShakeIndex === 1 ? shakeOffset : 0
              }px)`,
            transition: "transform 80ms linear",
          }}
        >
          <HomeButton
            icon={`/images/book-icon.png?v=${IMAGE_VERSION}`}
            label="Nhật ký"
            onClick={() => handleClick("journal")}
          />
        </div>
        <div
          style={{
            transform: `translateY(${activeShakeIndex === 2 ? shakeOffset : 0
              }px)`,
            transition: "transform 80ms linear",
          }}
        >
          <HomeButton
            icon={`/images/rank-icon.png?v=${IMAGE_VERSION}`}
            label="Xếp hạng"
            onClick={() => handleClick("ranking")}
          />
        </div>
        {+(isPlaying || 0) > 0 && (
          <div
            style={{
              transform: `translateY(${activeShakeIndex === 3 ? shakeOffset : 0
                }px)`,
              transition: "transform 80ms linear",
            }}
          >
            <HomeButton
              icon={`/images/reload-icon.png?v=${IMAGE_VERSION}`}
              label="Chơi lại"
              onClick={() => handleClick("playAgain")}
            />
          </div>
        )}
      </div>
      <div className="absolute -bottom-6 lg:-bottom-16 left-1/2 -translate-x-1/2 z-10">
        <div
          style={{
            transform: `translateY(${paperOffset * 0.9}px)`,
            transition: "transform 120ms linear",
          }}
        >
          <img
            src={`/images/home/charactor.png?v=${IMAGE_VERSION}`}
            alt="paper-HDQ"
            className="w-auto h-[200px] lg:h-[425px] object-contain block mx-auto"
          />
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 z-40 w-full h-[116px] lg:h-[260px]"
        style={{
          backgroundImage: `url('/images/home/bottom-bg-home.png?v=${IMAGE_VERSION}')`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="absolute bottom-0 right-10 w-[134px] h-[116px] lg:w-[161px] lg:h-[139px] z-50">
        <HookButton
          label={isPlaying ? "Tiếp tục" : "Bắt đầu"}
          onClick={handleStart}
        />
      </div>

      <GameModal
        isOpen={dialogName === "quitPlayer"}
        onClose={() => setDialogName(null)}
        title="Chơi lại"
        message="Bắt đầu một hành trình mới sẽ xoá tiến trình trò chơi của bạn. Bạn có chắc chắn muốn bắt đầu lại không?"
        onConfirm={onConfirm}
      />
    </div>
  );
}
