import React from "react";

export type VideoPlayerApi = Window["VideoPlayer"];

type UseVideoPlayerOptions = {
  timeoutMs?: number;
  pollMs?: number;
};

type UseVideoPlayerReturn = {
  api: VideoPlayerApi | null;
  ready: boolean;
  error: Error | null;
};

export const useVideoPlayer = (
  options: UseVideoPlayerOptions = {}
): UseVideoPlayerReturn => {
  const { timeoutMs = 8000, pollMs = 50 } = options;

  const [api, setApi] = React.useState<VideoPlayerApi | null>(null);
  const [ready, setReady] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    const start = Date.now();

    const tick = () => {
      if (cancelled) return;
      const found = (window as Window)?.VideoPlayer ?? null;
      if (found) {
        setApi(found);
        setReady(true);
        return;
      }
      if (Date.now() - start >= timeoutMs) {
        setError(new Error("VideoPlayer not available (timeout)"));
        return;
      }
      setTimeout(tick, pollMs);
    };

    tick();
    return () => {
      cancelled = true;
    };
  }, [timeoutMs, pollMs]);

  return { api, ready, error };
};
