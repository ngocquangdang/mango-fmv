import React from "react";
import Toast, { type ToastPosition, type ToastProps } from "./toast";
import { ToastContext } from "./use-toast";

type ToastOptions = Omit<ToastProps, "isOpen" | "onClose">;

type ToastItem = ToastOptions & { id: string };

const createToastId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const hideToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = React.useCallback((options: ToastOptions) => {
    const id = createToastId();
    setToasts((prev) => [
      ...prev,
      {
        id,
        description: options.description,
        duration: options.duration,
        autoHide: options.autoHide ?? true,
        position: options.position ?? "top-right",
      },
    ]);
    return id;
  }, []);

  const value = React.useMemo(
    () => ({
      showToast,
      hideToast,
    }),
    [showToast, hideToast]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          description={toast.description}
          duration={toast.duration}
          autoHide={toast.autoHide}
          position={toast.position as ToastPosition}
          isOpen
          onClose={() => hideToast(toast.id)}
        />
      ))}
    </ToastContext.Provider>
  );
};
