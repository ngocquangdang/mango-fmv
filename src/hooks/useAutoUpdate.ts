import { useState, useEffect, useCallback } from 'react';

export const useAutoUpdate = (checkInterval = 5 * 60 * 1000) => {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);

  const checkVersion = useCallback(async () => {
    try {
      const res = await fetch(`/version.json?t=${Date.now()}`);
      if (!res.ok) return;
      const data = await res.json();
      const remoteVersion = data.version;
      const localVersion = localStorage.getItem('app_version');

      if (localVersion && remoteVersion && remoteVersion !== localVersion) {
        setIsUpdateAvailable(true);
      } else if (remoteVersion && !localVersion) {
        localStorage.setItem('app_version', remoteVersion);
      }
    } catch (e) {
      // Ignore errors (network offline, etc)
    }
  }, []);

  useEffect(() => {
    checkVersion();
    const timer = setInterval(checkVersion, checkInterval);
    return () => clearInterval(timer);
  }, [checkVersion, checkInterval]);

  const reloadApp = useCallback(() => {
    fetch(`/version.json?t=${Date.now()}`)
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem('app_version', data.version);
        window.location.reload();
      })
      .catch(() => {
        window.location.reload();
      });
  }, []);

  return { isUpdateAvailable, reloadApp };
};
