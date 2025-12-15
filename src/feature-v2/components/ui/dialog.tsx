import Button from "./button";

type GameModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
};

const GameModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Rời Khỏi",
  message = "Bạn chưa hoàn thành xong nhiệm vụ. Bạn có chắc chắn muốn thoát khỏi màn này?",
}: GameModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="game-modal-overlay">
      <div className="game-modal-box">
        <button className="absolute top-0 -right-6 w-12 h-12" onClick={onClose}>
          <img
            src="/images/close-icon.png"
            alt="close"
            className="w-full h-full object-cover"
          />
        </button>
        <div className="game-title-area">
          <div className="game-title-bg"></div>
          <h2 className="game-title-text">{title}</h2>
        </div>
        <p className="game-modal-message">{message}</p>
        <Button label="Xác nhận" onClick={onConfirm} size="small" />
      </div>
    </div>
  );
};

export default GameModal;
