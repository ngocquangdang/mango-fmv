import React from "react";
import Button from "./button";
import GameModal from "./dialog";
import { useUserContext } from "../../../features/user/context";
import { useRankContext } from "../../pages/rank/context";
import "./vote-input.css";

type DialogVoteProps = {
  isOpen: boolean;
  onClose: () => void;
  data: {
    id?: string;
    avatar: string;
    name: string;
    score: number | string;
  };
  onVote?: () => void;
};

const DialogVote = ({
  isOpen = true,
  onClose,
  data = {
    id: "",
    avatar: "",
    name: "",
    score: 0,
  },
  onVote,
}: DialogVoteProps) => {
  const { chapter } = useUserContext();
  const { voteCharacter, isVoting } = useRankContext();
  const availablePoints = chapter?.progress?.points || 0;
  
  // Lấy chapterId từ URL params hoặc từ chapter
  const chapterId = React.useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("chapterId") || "";
  }, []);

  const [voteValue, setVoteValue] = React.useState<string>("100");
  const [isNotEnoughOpen, setIsNotEnoughOpen] = React.useState<boolean>(false);
  const [isSuccessOpen, setIsSuccessOpen] = React.useState<boolean>(false);

  const handleChangeVote = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value === "") {
      setVoteValue("");
      return;
    }

    if (!/^\d+$/.test(value)) {
      return;
    }

    setVoteValue(value);
  };

  const handleCloseNotEnough = () => {
    setIsNotEnoughOpen(false);
  };

  const handleCloseSuccess = () => {
    setIsSuccessOpen(false);
  };

  const handleConfirmSuccess = () => {
    setIsSuccessOpen(false);
    onVote?.();
    onClose();
  };

  const handleVoteClick = async () => {
    if (!isOpen) return;

    const amount = Number(voteValue);

    if (!amount || amount <= 0) {
      setIsNotEnoughOpen(true);
      return;
    }

    if (amount > availablePoints) {
      setIsNotEnoughOpen(true);
      return;
    }

    // Gọi API vote
    if (!data.id || !chapterId) {
      setIsNotEnoughOpen(true);
      return;
    }

    try {
      await voteCharacter({
        characterId: data.id,
        chapterId: chapterId,
        points: amount,
      });
      setIsSuccessOpen(true);
    } catch (error) {
      console.error("Vote error:", error);
      setIsNotEnoughOpen(true);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="game-modal-overlay">
        <div className="game-modal-box  w-[654px]! h-[300px]!">
          <button className="absolute top-0 -right-6 w-12 h-12" onClick={onClose}>
            <img
              src="/images/close-icon.png"
              alt="close"
              className="w-full h-full object-cover"
            />
          </button>

          {/* Title */}
          <div className="game-title-area">
            <div className="game-title-bg"></div>
            <h2 className="game-title-text">Bình chọn</h2>
            <img
              src="/images/elements/start-bold-element.png"
              alt="modal"
              className="w-[18px] h-[18px] object-cover absolute top-2 right-0"
            />
            <img
              src="/images/elements/start-bold-element.png"
              alt="modal"
              className="w-[28px] h-[28px] object-cover absolute top-0 left-0"
            />
            <img
              src="/images/elements/start-bold-element.png"
              alt="modal"
              className="w-[28px] h-[28px] object-cover absolute top-2 right-4"
            />
          </div>

          <div className="flex items-center justify-between w-full px-10 relative">
            <div
              className="relative z-20 w-[210px] h-[184px] bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('/images/vote-user-bg.png')` }}
            >
              <img
                src={data.avatar}
                alt={data.name}
                className="object-cover absolute top-0 right-8 w-[130px] h-[156px]"
              />
            </div>
            <div className="flex flex-col items-center justify-between h-full py-6">
              <p className="text-2xl font-bold text-[#3b82f6] uppercase">
                {data.name}
              </p>

              {/* Custom Input */}
              <input
                type="number"
                className="vote-input"
                value={voteValue}
                onChange={handleChangeVote}
              />

              <Button 
                label={isVoting ? "Đang bình chọn..." : "Bình chọn"} 
                onClick={handleVoteClick} 
                size="small"
                disabled={isVoting}
              />
            </div>
          </div>
          <img
            src="/images/elements/star-doub-element.png"
            alt="tag"
            className="w-[350px] h-[250px] absolute top-8 left-10 -rotate-10 z-10"
          />
        </div>
      </div>

      <GameModal
        isOpen={isNotEnoughOpen}
        onClose={handleCloseNotEnough}
        onConfirm={handleCloseNotEnough}
        title="không đủ lượt"
        message="Bạn không đủ lượt để thực hiện bình chọn này."
      />
      <GameModal
        isOpen={isSuccessOpen}
        onClose={handleCloseSuccess}
        onConfirm={handleConfirmSuccess}
        title=""
        message="Bạn đã bình chọn thành công."
        displayAction={false}
      />
    </>
  );
};

export default DialogVote;
