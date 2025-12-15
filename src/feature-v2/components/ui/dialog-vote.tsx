import Button from "./button";
import "./vote-input.css";

type DialogVoteProps = {
  isOpen: boolean;
  onClose: () => void;
  data: {
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
    avatar: "https://picsum.photos/id/64/100/100",
    name: "THÁI LÊ MINH HIẾU",
    score: 100,
  },
  onVote,
}: DialogVoteProps) => {
  if (!isOpen) return null;

  return (
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
        </div>

        <div className="flex items-center justify-between w-full px-10">
          <div
            className="relative w-[210px] h-[184px] bg-cover bg-center bg-no-repeat"
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
            <input type="number" className="vote-input" defaultValue={100} />

            <Button label="Bình chọn" onClick={onVote} size="small" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogVote;
