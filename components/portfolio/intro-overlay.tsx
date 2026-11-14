"use client";

import * as React from "react";
import { useIntro } from "@/components/portfolio/intro-provider";
import AmourSunrisePreloader, {
  type AmourPalette,
} from "@/components/portfolio/amour-sunrise-preloader";

const PORTFOLIO_PALETTE: AmourPalette = {
  paper: "#0a1510",
  ink: "#F5F0E6",
  sun: "#1E3B2F",
  core: "#0f1f18",
  glow: "#C8B48A",
};

export function IntroOverlay() {
  const { revealed, reveal } = useIntro();

  if (revealed) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#0a1510]"
      aria-label="Tharaka Portfolio Intro"
    >
      <AmourSunrisePreloader
        word="THARAKA"
        caption="loading with passion"
        palette={PORTFOLIO_PALETTE}
        durationMs={3800}
        onComplete={reveal}
        height="100svh"
        className="h-full w-full"
      />
    </div>
  );
}
