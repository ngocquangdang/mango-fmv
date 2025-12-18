import { useEffect, useRef, useState } from "react";

type HookButtonProps = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export default function HookButton({
  label,
  onClick,
  disabled = false,
  className = "",
}: HookButtonProps) {
  const textRef = useRef<HTMLSpanElement | null>(null);
  const [baseScale, setBaseScale] = useState(1);
  const [pulseScale, setPulseScale] = useState(1);

  useEffect(() => {
    const textElement = textRef.current;

    if (!textElement) {
      return;
    }

    const calculateScale = () => {
      const parentElement = textElement.parentElement as HTMLElement | null;

      if (!parentElement) {
        setBaseScale(1);
        return;
      }

      const maxWidth = parentElement.clientWidth;
      const naturalTextWidth = textElement.scrollWidth;

      if (!maxWidth || !naturalTextWidth) {
        setBaseScale(1);
        return;
      }

      const rawScale = maxWidth / naturalTextWidth;

      if (rawScale >= 1) {
        setBaseScale(1);
        return;
      }

      const clampedScale = Math.max(rawScale, 0.6);
      setBaseScale(clampedScale);
    };

    calculateScale();

    const resizeObserver = new ResizeObserver(() => {
      calculateScale();
    });

    resizeObserver.observe(textElement);

    const parentElement = textElement.parentElement as HTMLElement | null;
    if (parentElement) {
      resizeObserver.observe(parentElement);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [label]);

  useEffect(() => {
    let animationFrameId: number;
    const startTime = performance.now();

    const animatePulse = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const duration = 1600;
      const progress = (elapsed % duration) / duration;
      const wave = Math.sin(progress * 2 * Math.PI);
      const normalizedWave = (wave + 1) / 2;
      const minFactor = 1;
      const maxFactor = 1.08;
      const currentFactor =
        minFactor + (maxFactor - minFactor) * normalizedWave;

      setPulseScale(currentFactor);
      animationFrameId = requestAnimationFrame(animatePulse);
    };

    animationFrameId = requestAnimationFrame(animatePulse);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className={`relative min-w-[134px] min-h-[116px] ${className}`}
      aria-label={label}
      role="button"
      tabIndex={0}
      onClick={() => !disabled && onClick?.()}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          if (!disabled) onClick?.();
        }
      }}
    >
      <img src="/images/hook-button.png" alt="hook-button" className="w-full h-[116px]" />
      <button
        type="button"
        onClick={() => !disabled && onClick?.()}
        disabled={disabled}
        className="text-[22px] w-[100px] font-regular text-white absolute z-10 h-fit top-[38%] left-[41%] -translate-x-1/2 -translate-y-1/2 -rotate-5 overflow-hidden flex items-center justify-center"
      >
        <span
          ref={textRef}
          style={{
            transform: `scale(${baseScale * pulseScale})`,
            transformOrigin: "center center",
            whiteSpace: "nowrap",
            display: "inline-block",
          }}
        >
          {label}
        </span>
      </button>
    </div>
  );
}

