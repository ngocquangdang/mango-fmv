import React from "react";
import Banner from "../../components/banner";
import LayoutEndChapter from "./layout";
import DialogConfirm from "../../components/ui/dialog/dialog-confirm";
import { useRestartChapter } from "../user/hooks";
import { useUserContext } from "../user/context";
import { useVideoPlayerContext } from "../../contexts";

export default function EndChapter() {
  const { setType } = useVideoPlayerContext();
  const { chapter, refetch } = useUserContext();
  const { mutateAsync: restartChapter } = useRestartChapter();
  const [dialogName, setDialogName] = React.useState<string | null>(null);
  const handleClick = async (
    actionName: "story" | "journal" | "ranking" | "playAgain"
  ) => {
    if (actionName === "playAgain") {
      setDialogName("quitPlayer");
      return;
    }
  };
  const onConfirm = async () => {
    try {
      await restartChapter(chapter.id);
      refetch();
    } catch (error) {
      console.error("Failed to restart chapter", error);
    }
    setDialogName(null);
    setType("story");
  };

  return (
    <div className="w-full h-full">
      <div className="flex justify-center">
        <Banner
          className="w-[260px]! h-[68px]! lg:w-[380px]! lg:h-[80px]!"
          text="Kết thúc chương"
        />
      </div>
      <LayoutEndChapter
        className="lg:w-[973px] lg:h-[564px] w-[60%] h-[64%] mx-auto"
        onPlayAgain={() => handleClick("playAgain")}
        chapter={<>chapter 1</>}
        description="lorem ipsum dolor sit amet consectetur adipisicing elit"
        progress="60%"
        gift={[{}, {}, {}, {}, {}, {}]}
      />
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
