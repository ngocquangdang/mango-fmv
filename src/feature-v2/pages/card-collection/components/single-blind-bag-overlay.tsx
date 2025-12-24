
import { useEffect } from "react";
import confetti from "canvas-confetti";
import Button from "../../../components/ui/button";

interface SingleBlindBagOverlayProps {
  isOpen: boolean;
  onConfirm: () => void;
  cardImage?: string;
  cardName?: string;
}

const SingleBlindBagOverlay = ({
  isOpen,
  onConfirm,
  cardImage = "/images/home/charactor.png", // Fallback image
  cardName = "ĐÔNG QUAN",
}: SingleBlindBagOverlayProps) => {
  useEffect(() => {
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
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative flex flex-col items-center">

        {/* Card Container with Glow */}
        <div className="relative mb-8 transform hover:scale-105 transition-transform duration-300">
          {/* Glow behind card */}
          <div className="absolute inset-0 bg-white/50 blur-2xl rounded-xl"></div>

          {/* Card Frame/Image */}
          <div className="relative w-[280px] h-[400px] lg:w-[350px] lg:h-[500px] bg-gradient-to-b from-gray-300 to-gray-100 rounded-xl p-2 shadow-2xl border-4 border-white/20">
            <div className="w-full h-full bg-slate-800 rounded-lg overflow-hidden relative">
              <img src={cardImage} alt={cardName} className="w-full h-full object-cover" />

              {/* Card Name Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12">
                <h3 className="text-white text-xl lg:text-2xl font-bold uppercase text-center tracking-wider">{cardName}</h3>
              </div>

              {/* R+ Badge (Mockup) */}
              <div className="absolute top-2 right-2 text-white font-bold text-xs bg-black/50 px-2 py-1 rounded">
                R+
              </div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <Button
          label="TIẾP TỤC"
          size="medium"
          lgSize="large"
          className="text-black! font-bold uppercase bg-[#C2F04D]! min-w-[200px]"
          onClick={onConfirm}
        />
      </div>
    </div>
  );
};

export default SingleBlindBagOverlay;
