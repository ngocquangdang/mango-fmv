import React, { useMemo } from "react";

import Help from "../../components/icon/help";
import Close from "../../components/icon/close";
import ButtonLighter from "../../components/button-lighter";
import ButtonUI from "../../components/button-ui";
import DialogConfirm from "../../components/ui/dialog/dialog-confirm";

import { useVideoPlayerContext } from "../../contexts";
import { useUserContext } from "../user/context";
import { useRestartChapter } from "../user/hooks";

export default function Home() {
  const { setType, onPlayPlayer } = useVideoPlayerContext();
  const { chapter, refetch } = useUserContext();
  const { mutateAsync: restartChapter } = useRestartChapter();
  const [dialogName, setDialogName] = React.useState<string | null>(null);

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
  };

  const handleStart = () => {
    const sceneId =
      chapter.progress?.currentScene?.sceneId || chapter.startSceneId;
    onPlayPlayer(sceneId);
  };

  const onConfirm = async () => {
    try {
      await restartChapter();
      // await restartChapter(chapter.id);
      refetch();
    } catch (error) {
      console.error("Failed to restart chapter", error);
    }
    setDialogName(null);
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute top-4 right-4 flex gap-3 z-20">
        <Help />
        <Close />
      </div>
      <div className='flex flex-col justify-center items-center gap-4'>
        <div className="md:absolute bottom-8 md:left-1/2 md:-translate-x-1/2 z-20">
          <ButtonUI
            className="lg:min-h-[80px]! min-h-[60px]! w-full! min-w-[160px]! max-w-[180px]! lg:max-w-[243px] text-white cursor-pointer"
            onClick={handleStart}
          >
            {isPlaying ? "Tiếp tục" : "Bắt đầu"}
          </ButtonUI>
        </div>

        <div className=" md:absolute left-15 bottom-8 flex flex-col gap-6 z-20">
          <ButtonLighter
            className="min-h-[46px] lg:min-h-[66px] max-w-[180px] lg:max-w-[243px] text-white cursor-pointer"
            onClick={() => handleClick("story")}
          >
            Cốt truyện
          </ButtonLighter>
          <ButtonLighter
            className="min-h-[46px] lg:min-h-[66px] max-w-[180px] lg:max-w-[243px] text-white cursor-pointer"
            onClick={() => handleClick("journal")}
          >
            Nhật ký
          </ButtonLighter>
          <ButtonLighter
            className="min-h-[46px] lg:min-h-[66px] max-w-[180px] lg:max-w-[243px] text-white cursor-pointer"
            onClick={() => handleClick("ranking")}
          >
            Xếp hạng
          </ButtonLighter>
          {+(isPlaying || 0) > 0 && (
            <ButtonLighter
              className="min-h-[46px] lg:min-h-[66px] max-w-[180px] lg:max-w-[243px] text-white cursor-pointer"
              onClick={() => handleClick("playAgain")}
            >
              Chơi lại
            </ButtonLighter>
          )}
        </div>
      </div>

      <DialogConfirm
        isOpen={dialogName === "quitPlayer"}
        onClose={() => setDialogName(null)}
        title="Chơi lại"
        description="Bắt đầu một hành trình mới sẽ xoá tiến trình trò chơi của bạn. Bạn có chắc chắn muốn bắt đầu lại không?"
        onConfirm={onConfirm}
        onCancel={() => setDialogName(null)}
      />
    </div>
  );
}
