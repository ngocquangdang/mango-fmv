import React from "react";

export const useMgSdk = () => {
  const timeoutMs = 8000,
    pollMs = 50;
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const [mgApi, setMgApi] = React.useState<Window["MgApi"] | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    const start = Date.now();
    const tick = () => {
      if (cancelled) return;
      const found = (window as Window)?.MgApi ?? null;
      if (found) {
        setMgApi(found);
        setLoading(false);
        return;
      }
      if (Date.now() - start >= timeoutMs) {
        setError(new Error("MgApi not available (timeout)"));
        return;
      }
      setTimeout(tick, pollMs);
    };
    tick();
    return () => {
      cancelled = true;
    };
  }, []);

  return { loading, error, mgApi };
};
