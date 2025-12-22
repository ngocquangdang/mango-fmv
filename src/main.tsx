import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./feature-v2/AppV2";
import { ToastProvider } from "./components/ui/toast-v2/toast-context.tsx";
import VConsole from "vconsole";

// Khởi tạo vConsole (có thể điều kiện hóa theo môi trường)
if (import.meta.env.DEV) {
  new VConsole({
    theme: "light",
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </StrictMode>
);

window.React = React;
window.ReactDOM = ReactDOM;
(window.ReactDOM as any).createRoot = createRoot;
