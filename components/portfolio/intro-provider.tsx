"use client";

import * as React from "react";

interface IntroContextValue {
  revealed: boolean;
  prefersReduced: boolean;
  reveal: () => void;
}

const IntroContext = React.createContext<IntroContextValue>({
  revealed: false,
  prefersReduced: false,
  reveal: () => {},
});

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerReducedMotionSnapshot() {
  return false;
}

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const prefersReduced = React.useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot
  );
  // Always start with revealed = false so preloader displays on every page load/refresh
  const [revealed, setRevealed] = React.useState(false);

  const reveal = React.useCallback(() => {
    setRevealed(true);
  }, []);

  React.useEffect(() => {
    // Reset browser scroll to top and set manual scroll restoration so refreshes always show preloader
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  const value = React.useMemo(
    () => ({ revealed, prefersReduced, reveal }),
    [revealed, prefersReduced, reveal]
  );

  return (
    <IntroContext.Provider value={value}>{children}</IntroContext.Provider>
  );
}

export function useIntro() {
  return React.useContext(IntroContext);
}
