import { useState, useEffect } from "react";
import { useVideoPlayerContext } from "../../contexts";

// Mock API call function
const fetchGiftImage = async (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("https://picsum.photos/id/102/300/300");
    }, 1500);
  });
};

const GiftSelection = () => {
  const { closeGiftSelection } = useVideoPlayerContext();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [revealedGiftIndex, setRevealedGiftIndex] = useState<number | null>(
    null
  );
  const [revealedGiftImage, setRevealedGiftImage] = useState<string | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Handle global click to close reward modal (if it's not handled by backdrop click)
  useEffect(() => {
    if (!showRewardModal) return;

    const handleWindowClick = () => {
      setShowRewardModal(false);
    };

    // Add event listener with a small delay to avoid immediate trigger from the click that opened the modal
    const timer = setTimeout(() => {
      window.addEventListener("click", handleWindowClick);
    }, 100);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", handleWindowClick);
    };
  }, [showRewardModal, closeGiftSelection]);

  const handleGiftClick = async (index: number) => {
    if (isSubmitting || revealedGiftIndex !== null) return;

    setIsSubmitting(true);
    setSelectedIndex(index);

    try {
      const imageUrl = await fetchGiftImage();
      setRevealedGiftIndex(index);
      setRevealedGiftImage(imageUrl);
      // Delay to show the modal after revealing the image
      setTimeout(() => {
        setShowRewardModal(true);
      }, 500);
    } catch (error) {
      console.error("Failed to fetch gift:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // If reward modal is open, show full-screen overlay
  if (showRewardModal && revealedGiftImage) {
    return (
      <div
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80"
        onClick={closeGiftSelection} // Close everything when clicking backdrop
      >
        <div
          className="relative flex flex-col items-center animate-scale-up"
        // Prevent closing when clicking content
        >
          {/* Title */}
          <h2 className="text-xl md:text-2xl text-white font-bold mb-4 text-center drop-shadow-md px-4">
            Hình ảnh đã được lưu vào Phần thưởng trong Nhật ký của bạn
          </h2>

          {/* Polaroid Frame */}
          <div
            className="relative w-[364px] h-[284px] transition-transform hover:scale-105 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Frame Image */}
            <img
              src="/images/note-frame.png"
              alt="frame"
              className="absolute inset-0 w-full h-full object-fill z-20 pointer-events-none shadow-2xl"
            />

            {/* Inner Content (Image) */}
            <div className="absolute top-[6%] left-[4.5%] right-[4.5%] bottom-[22%] z-10 overflow-hidden bg-gray-100">
              <img
                src={revealedGiftImage}
                alt="reward"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Hearts / Decor */}
            <div className="absolute bottom-[6%] left-0 w-full z-30 flex justify-center gap-3">
              <span className="text-[#E85D35] text-2xl animate-bounce delay-100">
                ♥
              </span>
              <span className="text-[#E85D35] text-2xl animate-bounce delay-200">
                ♥
              </span>
              <span className="text-[#E85D35] text-2xl animate-bounce delay-300">
                ♥
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"
        }`}
      onClick={closeGiftSelection} // Close when clicking grid backdrop
    >
      <div
        className={`flex flex-col items-center justify-center transition-transform duration-500 ease-out transform ${isVisible ? "translate-y-0" : "translate-y-full"
          }`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking grid content
      >
        {/* Title Section */}
        <div className="relative mb-6 landscape:mb-1 w-[360px] h-[60px] landscape:h-[40px] flex items-center justify-center">
          <img
            src="/images/bg-title.png"
            alt="bg-title"
            className="absolute inset-0 w-full h-full object-contain"
          />
          <h2 className="relative z-10 text-2xl landscape:text-lg text-white font-bold drop-shadow-sm pb-2 landscape:pb-1">
            Hãy Chọn 1 Món Quà
          </h2>
          {/* Stars */}
          <div className="absolute -top-3 landscape:-top-1 left-4 text-yellow-400 text-3xl landscape:text-xl rotate-[-15deg] drop-shadow-md">
            ★
          </div>
          <div className="absolute -top-1 landscape:top-0 right-6 text-yellow-400 text-3xl landscape:text-xl rotate-[15deg] drop-shadow-md">
            ★
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-3 landscape:grid-cols-6 gap-x-6 gap-y-6 landscape:gap-x-2 landscape:gap-y-2">
          {Array.from({ length: 6 }).map((_, index) => {
            const isRevealed = revealedGiftIndex === index;
            const isSelected = selectedIndex === index;
            const isDisabled = isSubmitting || revealedGiftIndex !== null;

            return (
              <div
                key={index}
                onClick={() => !isDisabled && handleGiftClick(index)}
                className={`relative w-[152px] h-[120px] landscape:w-[90px] landscape:h-[70px] transition-all duration-200 
                  ${!isDisabled
                    ? "cursor-pointer hover:scale-105"
                    : "cursor-default opacity-80"
                  }
                  ${isSelected
                    ? "outline outline-4 outline-[#3b82f6] scale-105"
                    : ""
                  }
                `}
              >
                {/* The Frame Image acting as container background */}
                <img
                  src="/images/note-frame.png"
                  alt="frame"
                  className="absolute inset-0 w-full h-full object-fill z-20 pointer-events-none"
                />

                {/* Inner Content (The "Photo" part) */}
                <div className="absolute top-[6%] left-[4.5%] landscape:left-[4%] right-[4.5%] landscape:right-[4%] bottom-[22%] landscape:bottom-[18%] z-10 overflow-hidden bg-[#93c5fd]">
                  <div
                    className="w-full h-full relative flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(to bottom, #7dd3fc, #bae6fd)",
                    }}
                  >
                    {!isRevealed ? (
                      <>
                        <div className="absolute top-2 left-2 w-4 h-2 bg-white rounded-full opacity-60 blur-[2px]" />
                        <div className="absolute top-4 right-4 w-6 h-3 bg-white rounded-full opacity-60 blur-[2px]" />
                        <div className="absolute bottom-2 left-6 w-5 h-2 bg-white rounded-full opacity-60 blur-[2px]" />
                        <div className="absolute bottom-4 right-2 w-3 h-2 bg-white rounded-full opacity-60 blur-[2px]" />

                        <img
                          src="/images/gift-highlight.png"
                          alt="gift"
                          className={`w-3/4 h-3/4 object-contain drop-shadow-sm z-10 ${isSelected && isSubmitting ? "animate-pulse" : ""
                            }`}
                        />
                      </>
                    ) : (
                      <img
                        src={revealedGiftImage || ""}
                        alt="revealed gift"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>

                {!isRevealed && (
                  <div className="absolute bottom-[3%] left-0 w-full z-30 text-center">
                    <span className="text-black font-bold text-lg landscape:text-sm tracking-widest leading-none">
                      {isSelected && isSubmitting ? "..." : "???"}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GiftSelection;
