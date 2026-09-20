import { useEffect } from "react";

export function RegisterPwa() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    const onLoad = () => {
      void navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => {
        /* install still works from the manifest on supporting browsers */
      });
    };
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });
  }, []);
  return null;
}
