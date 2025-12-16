import { useState, useEffect, useCallback } from "react";
import { useVideoPlayerContext } from "../../contexts";
import RewardDetail from "./ui/reward-detail";

export type RewardItem = {
  imageUrl: string;
  rewardId: string;
};

type RewardCollectionProps = {
  items: RewardItem[];
  onClose?: () => void;
  title?: string;
  description?: string;
};

const RewardCollection = ({
  items = [],
  onClose,
  title,
  description,
}: RewardCollectionProps) => {
  const { closeGiftSelection } = useVideoPlayerContext();
  const [isVisible, setIsVisible] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [revealedGiftImage, setRevealedGiftImage] = useState<string | null>(
    null
  );

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleCloseAll = useCallback(() => {
    closeGiftSelection();
    if (onClose) onClose();
  }, [closeGiftSelection, onClose]);

  // Handle global click to close reward modal (if it's not handled by backdrop click)
  useEffect(() => {
    if (!showRewardModal) return;

    const handleWindowClick = () => {
      setShowRewardModal(false);
      // Don't close everything here, just the detail modal
    };

    // Add event listener with a small delay to avoid immediate trigger from the click that opened the modal
    const timer = setTimeout(() => {
      window.addEventListener("click", handleWindowClick);
    }, 100);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", handleWindowClick);
    };
  }, [showRewardModal]);

  const handleGiftClick = (index: number) => {
    if (!items[index]) return;

    setRevealedGiftImage(items[index].imageUrl);
    setShowRewardModal(true);
  };

  const handleCloseDetail = useCallback(() => {
    setShowRewardModal(false);
    setRevealedGiftImage(null);
  }, []);

  if (!items || items.length === 0) return null;

  // Main grid view
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleCloseAll} // Close everything when clicking main backdrop
    >
      <div
        className={`flex flex-col items-center justify-center transition-transform duration-500 ease-out transform ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking grid content
      >
        {/* Title Section */}
        <div className="relative mb-6 h-[90px] flex items-center justify-center">
          <img
            src="/images/bg-title.png"
            alt="bg-title"
            className="absolute inset-0 w-full h-full "
          />
          <h2 className="relative z-10 text-xl text-white font-bold drop-shadow-sm px-4 py-8">
            {title || ""}
          </h2>
          {/* Stars */}
          <div className="absolute top-0 left-4 text-yellow-400 text-3xl rotate-[-15deg] drop-shadow-md">
            <img src="/images/elements/start-bold-element.png" alt="star" className="w-6 h-6" />
          </div>
          <div className="absolute top-5 right-0 text-yellow-400 text-3xl rotate-15 drop-shadow-md">
            <img src="/images/elements/start-bold-element.png" alt="star" className="w-6 h-6" />
          </div>
        </div>

        {/* Grid Section */}
        <div className="flex flex-row justify-center gap-6">
          {items.map((item, index) => {
            return (
              <div
                key={item.rewardId || index}
                onClick={() => handleGiftClick(index)}
                className="relative w-[152px] h-[120px] transition-all duration-200 cursor-pointer hover:scale-105"
              >
                {/* The Frame Image acting as container background */}
                <img
                  src="/images/note-frame.png"
                  alt="frame"
                  className="absolute inset-0 w-full h-full object-fill z-20 pointer-events-none"
                />

                {/* Inner Content (The "Photo" part) */}
                <div className="absolute top-[6%] left-[4.5%] right-[4.5%] bottom-[22%] z-10 overflow-hidden bg-[#93c5fd]">
                  <div className="w-full h-full relative flex items-center justify-center bg-gray-100">
                    <img
                      src={item.imageUrl}
                      alt="reward"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <RewardDetail
        isOpen={showRewardModal}
        imageUrl={revealedGiftImage}
        description={description}
        onClose={handleCloseDetail}
      />
    </div>
  );
};

export default RewardCollection;
