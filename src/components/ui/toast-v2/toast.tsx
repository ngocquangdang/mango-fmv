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
        "pointer-events-none fixed z-50 transition-all duration-200 h-8 w-fit bg-cover bg-no-repeat toast-item",
        positionClasses[position]
      )}
      style={{
        backgroundImage: `url(/images/toast-bg.png)`,
        padding: "4px 40px",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        fontStyle: "italic",
      }}
    >
      <span className="text-sm font-bold text-[#F76933]">{description}</span>
    </div>
  );
};

export default Toast;
