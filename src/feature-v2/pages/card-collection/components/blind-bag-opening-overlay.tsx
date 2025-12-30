import { useState, useEffect, useRef } from "react";
import Button from "../../../components/ui/button";
import confetti from "canvas-confetti";
import type { Card } from "../services/card-collection-service";
import { useNavigate } from 'react-router-dom';

interface BlindBagOpeningOverlayProps {
  isOpen: boolean;
  onSkip?: () => void;
  cards?: Card[];
  blindBagImage?: string;
}

const BlindBagOpeningOverlay = ({
  isOpen,
  onSkip,
  cards = [],
  blindBagImage = "",
}: BlindBagOpeningOverlayProps) => {
  const navigate = useNavigate();
  const [revealedIndices, setRevealedIndices] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [zoomedItemIndex, setZoomedItemIndex] = useState<number | null>(null);

  const isAllRevealed = revealedIndices.length === cards.length;

  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    let animationFrameId: number;
    let myConfetti: any;

    if (isAllRevealed && !isLoading && canvasRef.current) {
      myConfetti = confetti.create(canvasRef.current, {
        resize: true,
        useWorker: true,
      });

      // Launch confetti when all revealed
      const duration = 500;
      const end = Date.now() + duration;

      const frame = () => {
        myConfetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          zIndex: 100,
          colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
        });
        myConfetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          zIndex: 100,
          colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
        });

        if (Date.now() < end) {
          animationFrameId = requestAnimationFrame(frame);
        }
      };

      frame();
    }
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (myConfetti) myConfetti.reset();
    };
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
      const allIndices = cards.map((_, i) => i);
      setRevealedIndices(allIndices);
    } else {
      onSkip?.();
    }
  };

  const handleViewCollection = () => navigate('/collection')

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
            {cards.map((item: any, index) => {
              const isRevealed = revealedIndices.includes(index);
              const cardImage = item?.imageUrl;
              const cardName = item?.name;

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
                        src={blindBagImage}
                        alt="blind bag"
                        className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] transform transition-transform hover:scale-105 active:scale-95"
                      />
                    </>
                  ) : (
                    /* Card Reveal View */
                    <div className="w-full h-full bg-slate-800 rounded-lg overflow-hidden relative border-2 border-white/20 animate-in spin-in-y duration-500 hover:scale-105 transition-transform shadow-lg">
                      <img src={cardImage} alt={cardName} className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Button */}
          <div className="relative flex items-center justify-center gap-4 animate-in slide-in-from-bottom-10 fade-in duration-500">
            <Button
              label={isAllRevealed ? "TIẾP TỤC" : "SKIP"}
              size="small"
              lgSize="medium"
              containerClassName=" w-fit! px-8"
              className="text-white"
              onClick={handleAction}
              customBgImage="/images/collection/button-primary.png"
            />
            {isAllRevealed && <Button
              label="Xem bộ sưu tập"
              size="small"
              lgSize="medium"
              containerClassName="w-fit!"
              className="text-[#F76933]! "
              onClick={handleViewCollection}
              customBgImage="/images/collection/button-white.png"

            />}

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
              {(() => {
                const item: any = cards[zoomedItemIndex];
                const cardImage = item?.imageUrl || item?.image || "/images/home/charactor.png";
                const cardName = item?.name || `ITEM ${zoomedItemIndex + 1}`;
                return (
                  <>
                    <img src={cardImage} alt={cardName} className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 pt-20">
                      <h3 className="text-white text-2xl lg:text-3xl font-bold uppercase text-center tracking-wider">{cardName}</h3>
                      <p className="text-white/80 text-center mt-2 text-sm">Chạm ra ngoài để đóng</p>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-[100]"
      />
    </div>
  );
};

export default BlindBagOpeningOverlay;
