
import { useEffect, useRef } from "react";
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

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let myConfetti: any;

    if (isOpen && canvasRef.current) {
      myConfetti = confetti.create(canvasRef.current, {
        resize: true,
        useWorker: true,
      });

      // Launch confetti
      const duration = 500;
      const end = Date.now() + duration;

      const frame = () => {
        // launch a few confetti from the left edge
        myConfetti({
          particleCount: 7,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          zIndex: 100, // Make sure it's above overlay
          colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'] // Colorful
        });
        // and launch a few from the right edge
        myConfetti({
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
      if (myConfetti) myConfetti.reset();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative flex flex-col items-center">

        {/* Card Container with Glow */}
        <div className="relative mb-4 transform hover:scale-105 transition-transform duration-300">
          {/* Glow behind card */}
          <img src={cardImage} alt={cardName} className="w-[200px] h-[288px] lg:w-[250px] lg:h-[360px] object-contain" />

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
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-[100]"
      />
    </div>
  );
};

export default SingleBlindBagOverlay;
