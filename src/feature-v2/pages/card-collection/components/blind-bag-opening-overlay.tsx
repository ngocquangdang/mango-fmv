
import { useState, useEffect } from "react";
import Button from "../../../components/ui/button";
import confetti from "canvas-confetti";

interface BlindBagOpeningOverlayProps {
  isOpen: boolean;
  onSkip?: () => void;
}

const BlindBagOpeningOverlay = ({
  isOpen,
  onSkip,
}: BlindBagOpeningOverlayProps) => {
  const [revealedIndices, setRevealedIndices] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [zoomedItemIndex, setZoomedItemIndex] = useState<number | null>(null);

  const items = Array.from({ length: 10 });
  const isAllRevealed = revealedIndices.length === items.length;

  useEffect(() => {
    if (isOpen) {
      setRevealedIndices([]); // Reset on open
      setIsLoading(true);
      // Simulate loading
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isAllRevealed && !isLoading) {
      // Launch confetti when all revealed
      const duration = 500;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          zIndex: 100,
          colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          zIndex: 100,
          colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, [isAllRevealed, isLoading]);

  if (!isOpen) return null;

  const handleReveal = (index: number) => {
    if (isLoading) return;

    if (!revealedIndices.includes(index)) {
      setRevealedIndices((prev) => [...prev, index]);
    } else {
      // Zoom in if already revealed
      setZoomedItemIndex(index);
    }
  };

  const handleAction = () => {
    if (!isAllRevealed) {
      // Reveal all
      const allIndices = items.map((_, i) => i);
      setRevealedIndices(allIndices);
    } else {
      onSkip?.();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">

      {isLoading ? (
        /* Loading View */
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white font-bold text-xl animate-pulse">Đang mở túi...</p>
        </div>
      ) : (
        <>
          {/* 2 Rows of 5 items */}
          <div className="grid grid-cols-5 gap-4 lg:gap-8 mb-8">
            {items.map((_, index) => {
              const isRevealed = revealedIndices.includes(index);
              return (
                <div
                  key={index}
                  className="relative w-24 h-32 lg:w-32 lg:h-40 animate-in fade-in zoom-in duration-500 cursor-pointer"
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => handleReveal(index)}
                >
                  {!isRevealed ? (
                    <>
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-white/30 blur-lg rounded-full animate-pulse transition-opacity duration-300 hover:opacity-100 opacity-70"></div>
                      <img
                        src="/images/gift-highlight.png"
                        alt="blind bag"
                        className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] transform transition-transform hover:scale-105 active:scale-95"
                      />
                    </>
                  ) : (
                    /* Card Reveal View */
                    <div className="w-full h-full bg-slate-800 rounded-lg overflow-hidden relative border-2 border-white/20 animate-in spin-in-y duration-500 hover:scale-105 transition-transform shadow-lg">
                      <img src="/images/home/charactor.png" alt="Card" className="w-full h-full object-cover" />
                      <div className="absolute bottom-0 w-full bg-black/60 text-white text-[8px] lg:text-[10px] text-center py-1">
                        ITEM {index + 1}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Button */}
          <div className="absolute bottom-10 right-10 animate-in slide-in-from-bottom-10 fade-in duration-500">
            <Button
              label={isAllRevealed ? "TIẾP TỤC" : "SKIP"}
              size="small"
              lgSize="medium"
              className="text-black! font-bold uppercase bg-[#C2F04D]!"
              onClick={handleAction}
            />
          </div>
        </>
      )}

      {/* Zoom Modal */}
      {zoomedItemIndex !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setZoomedItemIndex(null)}
        >
          <div className="relative transform transition-all animate-in zoom-in-95 duration-200 p-4">
            <div className="w-[300px] h-[450px] lg:w-[400px] lg:h-[600px] bg-slate-800 rounded-xl overflow-hidden border-4 border-white/20 shadow-2xl relative">
              <img src="/images/home/charactor.png" alt="Card" className="w-full h-full object-cover" />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 pt-20">
                <h3 className="text-white text-2xl lg:text-3xl font-bold uppercase text-center tracking-wider">ITEM {zoomedItemIndex + 1}</h3>
                <p className="text-white/80 text-center mt-2 text-sm">Chạm ra ngoài để đóng</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlindBagOpeningOverlay;
