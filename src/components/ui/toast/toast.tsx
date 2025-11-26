import React from "react";

export type ToastPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "center";

export type ToastProps = {
  description?: string;
  isOpen: boolean;
  onClose?: () => void;
  duration?: number;
  autoHide?: boolean;
  position?: ToastPosition;
};

const cn = (...classes: Array<string | false | undefined | null>) =>
  classes.filter(Boolean).join(" ");

const positionClasses: Record<ToastPosition, string> = {
  "top-left": "top-6 left-6",
  "top-right": "top-6 right-6",
  "bottom-left": "bottom-6 left-6",
  "bottom-right": "bottom-6 right-6",
  center: "top-6 left-1/2 -translate-x-1/2",
};

const BASE_WIDTH = 534;
const BASE_HEIGHT = 91;
const SCALE_FACTOR = 0.7;

const scaledWidth = BASE_WIDTH * SCALE_FACTOR;
const scaledHeight = BASE_HEIGHT * SCALE_FACTOR;

const Toast = ({
  description,
  isOpen,
  onClose,
  duration = 3000,
  autoHide = true,
  position = "top-right",
}: ToastProps) => {
  React.useEffect(() => {
    if (!isOpen || !autoHide || !onClose) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [isOpen, autoHide, onClose, duration]);

  if (!isOpen) return null;


  return (
    <div
      className={cn(
        "pointer-events-none fixed z-50 transition-all duration-200",
        positionClasses[position]
      )}
    >
      <div
        className="relative pointer-events-auto"
        style={{ width: scaledWidth, height: scaledHeight }}
      >
        <svg
          width={scaledWidth}
          height={scaledHeight}
          viewBox="0 0 534 91"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
        <g clip-path="url(#clip0_3_9931)">
          <path d="M524 10H529V81H524V86H5V76H0V15H5V5H524V10Z" fill="white" />
          <rect x="524" y="5" width="5" height="5" fill="#D96D35" />
          <rect
            x="10"
            y="86"
            width="5"
            height="5"
            transform="rotate(180 10 86)"
            fill="#D96D35"
          />
          <rect
            width="5"
            height="5"
            transform="matrix(-1 0 0 1 10 5)"
            fill="#D96D35"
          />
          <rect
            width="5"
            height="5"
            transform="matrix(1 0 0 -1 524 86)"
            fill="#D96D35"
          />
          <rect
            x="5"
            y="81"
            width="5"
            height="71"
            transform="rotate(180 5 81)"
            fill="#D96D35"
          />
          <rect
            x="534"
            y="81"
            width="5"
            height="71"
            transform="rotate(180 534 81)"
            fill="#D96D35"
          />
          <rect
            x="10"
            y="5"
            width="5.00001"
            height="514"
            transform="rotate(-90 10 5)"
            fill="#D96D35"
          />
          <rect
            x="524"
            y="86"
            width="5.00001"
            height="514"
            transform="rotate(90 524 86)"
            fill="#D96D35"
          />
        </g>
        <text
          x="34%"
          y="58%"
          textAnchor="middle"
          fill="#D96D35"
          fontSize="28"
          fontFamily="'Press Start 2P', 'VT323', monospace"
          fontWeight="bold"
        >
          {description}
        </text>
          <defs>
            <clipPath id="clip0_3_9931">
              <rect width="534" height="91" fill="white" />
            </clipPath>
          </defs>
        </svg>

        
      </div>
    </div>
  );
};

export default Toast;
