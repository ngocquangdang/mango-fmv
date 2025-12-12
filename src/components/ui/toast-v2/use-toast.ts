import React from "react";
import type { ToastProps } from "./toast";

type ToastOptions = Omit<ToastProps, "isOpen" | "onClose">;

type ToastContextValue = {
  showToast: (options: ToastOptions) => string;
  hideToast: (id: string) => void;
};

export const ToastContext = React.createContext<ToastContextValue | undefined>(
  undefined
);

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
};
