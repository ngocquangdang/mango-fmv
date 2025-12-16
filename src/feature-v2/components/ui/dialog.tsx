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
        <img
          src="/images/elements/dog-element.png"
          alt="modal"
          className="w-[110px] h-[96px] object-cover absolute top-[80px] -left-[30px]"
        />

        <img
          src="/images/elements/cloud-element.png"
          alt="modal"
          className="w-[78px] h-[78px] object-cover absolute -top-10 left-5"
        />
        <img
          src="/images/elements/cloud-element.png"
          alt="modal"
          className="w-[60px] h-[60px] object-cover absolute top-30 -right-10"
        />

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
            className="w-[28px] h-[28px] object-cover absolute top-4 right-4"
          />
        </div>
        <p className="game-modal-message pl-10 pr-8">{message}</p>
        <Button label="Xác nhận" onClick={onConfirm} size="small" />
      </div>
    </div>
  );
};

export default GameModal;
