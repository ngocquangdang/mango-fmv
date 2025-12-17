type LogLevel = "info" | "warn" | "error" | "debug";

interface LogData {
  level: LogLevel;
  message: string;
  data?: any;
  timestamp: string;
  userAgent?: string;
  url?: string;
  component?: string;
}

const LOG_ENDPOINT = "/api/log";

const sendLogToServer = async (logData: LogData): Promise<void> => {
  try {
    // Chỉ gửi log trong production hoặc khi có endpoint
    if (typeof window === "undefined") return;

    // Gửi log lên server (non-blocking)
    fetch(LOG_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...logData,
        userAgent: navigator.userAgent,
        url: window.location.href,
      }),
    }).catch((error) => {
      // Silently fail để không ảnh hưởng đến app
      console.debug("Failed to send log to server:", error);
    });
  } catch (error) {
    // Silently fail
    console.debug("Error sending log:", error);
  }
};

export const serverLog = (
  level: LogLevel,
  message: string,
  data?: any,
  component?: string
): void => {
  const logData: LogData = {
    level,
    message,
    data,
    timestamp: new Date().toISOString(),
    component,
  };

  // Log vào console (browser)
  const consoleMethod = console[level] || console.log;
  consoleMethod(`[${level.toUpperCase()}] ${message}`, data || "");

  // Gửi log lên server (async, non-blocking)
  sendLogToServer(logData);
};

export const logInfo = (message: string, data?: any, component?: string): void => {
  serverLog("info", message, data, component);
};

export const logWarn = (message: string, data?: any, component?: string): void => {
  serverLog("warn", message, data, component);
};

export const logError = (message: string, data?: any, component?: string): void => {
  serverLog("error", message, data, component);
};

export const logDebug = (message: string, data?: any, component?: string): void => {
  serverLog("debug", message, data, component);
};

