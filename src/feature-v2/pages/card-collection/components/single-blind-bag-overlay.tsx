
import { useEffect } from "react";
import confetti from "canvas-confetti";
import Button from "../../../components/ui/button";
import type { Card } from "../services/card-collection-service";

interface SingleBlindBagOverlayProps {
  isOpen: boolean;
  onConfirm: () => void;
  card?: Card | null;
}

const SingleBlindBagOverlay = ({
  isOpen,
  onConfirm,
  card,
}: SingleBlindBagOverlayProps) => {
  const cardImage = card?.imageUrl || card?.image || "";
  const cardName = card?.name || "";
  const rarity = card?.tier || card?.rarity || "R";

  useEffect(() => {
    let animationFrameId: number;
    if (isOpen) {
      // Launch confetti
      const duration = 500;
      const end = Date.now() + duration;

      const frame = () => {
        // launch a few confetti from the left edge
        confetti({
          particleCount: 7,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          zIndex: 100, // Make sure it's above overlay
          colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'] // Colorful
        });
        // and launch a few from the right edge
        confetti({
          particleCount: 7,
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
      confetti.reset();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative flex flex-col items-center">

        {/* Card Container with Glow */}
        <div className="relative mb-4 transform hover:scale-105 transition-transform duration-300">
          {/* Glow behind card */}
          <div className="absolute inset-0 bg-white/50 blur-2xl rounded-xl"></div>

          {/* Card Frame/Image */}
          <div className="relative w-[200px] h-[288px] lg:w-[250px] lg:h-[360px] bg-gradient-to-b from-gray-300 to-gray-100 rounded-xl p-1.5 shadow-2xl border-4 border-white/20">
            <div className="w-full h-full bg-slate-800 rounded-lg overflow-hidden relative">
              <img src={cardImage} alt={cardName} className="w-full h-full object-cover" />

              {/* Card Name Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-10">
                <h3 className="text-white text-lg lg:text-xl font-bold uppercase text-center tracking-wider">{cardName}</h3>
              </div>

              {/* Rarity Badge */}
              <div className="absolute top-2 right-2 text-white font-bold text-[10px] bg-black/50 px-2 py-0.5 rounded">
                {rarity}
              </div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <Button
          label="TIẾP TỤC"
          size="medium"
          lgSize="large"
          className="text-black! font-bold uppercase min-w-[160px] lg:min-w-[180px] py-1"
          onClick={onConfirm}
        />
      </div>
    </div>
  );
};

export default SingleBlindBagOverlay;
