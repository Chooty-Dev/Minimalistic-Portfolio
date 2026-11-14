"use client";

import * as React from "react";
import { useSyncExternalStore } from "react";
import { MeshGradient } from "@paper-design/shaders-react";

const SHADER_COLORS = [
  "#08110dff",
  "#193027ff",
  "#2B4E3E",
  "#7F8C6A",
  "#998a6aff",
];

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

class ShaderErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

export function BackgroundShader() {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot
  );

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-background"
      aria-hidden="true"
    >
      <ShaderErrorBoundary>
        <MeshGradient
          className="absolute inset-0 h-full w-full"
          colors={SHADER_COLORS}
          distortion={0.78}
          swirl={0.28}
          grainMixer={0.14}
          grainOverlay={0.08}
          minPixelRatio={1}
          maxPixelCount={960 * 540}
          speed={reducedMotion ? 0 : 0.52}
        />
      </ShaderErrorBoundary>
      {/* Calibrated dark scrim so scrolling foreground sections stay crisp and legible */}
      <div className="absolute inset-0 bg-background/5" />
    </div>
  );
}
