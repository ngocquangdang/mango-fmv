import React from "react";

type ModalIntroProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
};

const ModalIntro: React.FC<ModalIntroProps> = ({
  isOpen,
  onClose,
  title = "Giới thiệu",
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="game-modal-overlay z-[1000]">
      <div
        className="relative flex flex-col items-center pt-4 pb-8"
        style={{
          backgroundImage: "url('/images/rank-bg.png')",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "624px",
          height: "380px",
          maxWidth: "624px",
        }}
      >
        {/* Close Button */}
        <button
          className="absolute top-0 -right-6 w-12 h-12 z-50 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={onClose}
        >
          <img
            src="/images/close-icon.png"
            alt="close"
            className="w-full h-full object-cover"
          />
        </button>

        {/* Title Area */}
        <div className="game-title-area top-4">
          <div className="game-title-bg"></div>
          <h2 className="game-title-text uppercase text-[#26396C]!">{title}</h2>

          {/* Decorative Stars from dialog-vote */}
          <img
            src="/images/elements/start-bold-element.png"
            alt="decoration"
            className="w-[18px] h-[18px] object-cover absolute top-2 right-0"
          />
          <img
            src="/images/elements/start-bold-element.png"
            alt="decoration"
            className="w-[28px] h-[28px] object-cover absolute top-0 left-0"
          />
          <img
            src="/images/elements/start-bold-element.png"
            alt="decoration"
            className="w-[28px] h-[28px] object-cover absolute top-2 right-4"
          />
        </div>

        {/* Content Area */}
        <div className="w-full h-full px-8 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalIntro;
