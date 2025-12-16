import React from "react";

type RewardDetailProps = {
  isOpen: boolean;
  imageUrl: string | null;
  description?: string | null;
  onClose: () => void;
};

const RewardDetail = ({ isOpen, imageUrl, description, onClose }: RewardDetailProps) => {
  if (!isOpen || !imageUrl) {
    return null;
  }

  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      role="dialog"
      aria-modal="true"
      aria-label="Reward detail"
      tabIndex={0}
      onClick={onClose}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          onClose();
        }
      }}
    >
      <div
        className="relative flex flex-col items-center animate-scale-up"
        onClick={handleContainerClick}
      >
        <h2 className="mb-4 px-4 text-center text-lg font-bold text-white drop-shadow-md">
          {description}
        </h2>

        <div className="relative h-[284px] w-[364px] cursor-pointer transition-transform duration-300 hover:scale-105">
          <img
            src="/images/note-frame.png"
            alt="frame"
            className="pointer-events-none absolute inset-0 z-20 h-full w-full object-fill shadow-2xl"
          />

          <div className="absolute left-[4.5%] right-[4.5%] top-[6%] bottom-[22%] z-10 overflow-hidden bg-gray-100">
            <img src={imageUrl} alt="reward" className="h-full w-full object-cover" />
          </div>

          <div className="absolute bottom-[4%] left-0 z-30 flex w-full justify-center gap-3">
            <img src="/images/heart-icon.png" alt="heart" className="h-10 w-10" />
            <img src="/images/heart-icon.png" alt="heart" className="h-10 w-10" />
            <img src="/images/heart-icon.png" alt="heart" className="h-10 w-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardDetail;

