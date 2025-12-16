import React, { useMemo } from "react";
import HookButton from "../components/ui/hook-button";
import HomeButton from "../components/ui/home-button";
import { useVideoPlayerContext } from "../../contexts";
import { useUserContext } from "../../features/user/context";
import { useRestartChapter } from "../../features/user/hooks";
import GameModal from "../components/ui/dialog";

export default function Home() {
  const { setType, openGiftSelection, setCollectionItems } = useVideoPlayerContext();
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
    // const sceneId =
    //   chapter.progress?.currentScene?.sceneId || chapter.startSceneId;
    // onPlayPlayer(sceneId);
    setType("story");
    setCollectionItems({})
  };

  const onConfirm = async () => {
    try {
      await restartChapter(chapter.id);
      refetch();
    } catch (error) {
      console.error("Failed to restart chapter", error);
    }
    setDialogName(null);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <img
        src="/images/LOGO_GCNMN.png"
        alt="home-bg"
        className="absolute top-8 left-[50%] translate-x-[-50%] w-[263px] h-[120px] object-cover"
      />
      <div className="flex flex-col h-full justify-center items-center gap-4 w-fit pl-2">
        <HomeButton
          icon="/images/window-icon.png"
          label="Cốt truyện"
          onClick={() => handleClick("story")}
        />
        <HomeButton
          icon="/images/book-icon.png"
          label="Nhật ký"
          onClick={() => handleClick("journal")}
        />
        <HomeButton
          icon="/images/rank-icon.png"
          label="Xếp hạng"
          onClick={() => handleClick("ranking")}
        />
        {+(isPlaying || 0) > 0 && (
          <HomeButton
            icon="/images/reload-icon.png"
            label="Chơi lại"
            onClick={() => handleClick("playAgain")}
          />
        )}
        <button onClick={openGiftSelection}>Open Gift Selection</button>
      </div>
      <div className="fixed bottom-0 right-12 w-[134px] h-[116px]">
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
