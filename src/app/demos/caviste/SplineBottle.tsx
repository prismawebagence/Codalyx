"use client";

import { Suspense, lazy } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

const SCENE_URL = "https://prod.spline.design/NViLH8HcrBNNOGLQ/scene.splinecode";

export default function SplineBackground() {

  return (
    <div className="absolute inset-0 z-0">
      <Suspense fallback={null}>
        <Spline scene={SCENE_URL} className="h-full w-full" />
      </Suspense>
      {/* Cover the Spline watermark rendered inside the canvas */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-14 w-48 bg-[#0D0D0D]"
      />
    </div>
  );
}
