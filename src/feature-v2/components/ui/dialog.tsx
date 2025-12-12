type GameModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  closeIcon?: React.ReactNode;
};

const GameModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Rời Khỏi",
  message = "Bạn chưa hoàn thành xong nhiệm vụ. Bạn có chắc chắn muốn thoát khỏi màn này?",
  closeIcon,
}: GameModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="game-modal-overlay">
      <div className="game-modal-box">


        {/* Close Button: Render closeIcon nếu có, nếu không thì render text 'X' */}
        <button className="game-close-btn" onClick={onClose}>
          {closeIcon ? closeIcon : "X"}
        </button>

        {/* Title */}
        <div className="game-title-area">
          <div className="game-title-bg"></div>
          <h2 className="game-title-text">{title}</h2>
        </div>

        {/* Message */}
        <p className="game-modal-message">{message}</p>

        {/* Confirm Button */}
        <button className="game-confirm-btn" onClick={onConfirm}>
          Xác nhận
        </button>
      </div>
    </div>
  );
};

export default GameModal;
