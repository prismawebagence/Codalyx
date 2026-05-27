"use client";

import { Component, Suspense, lazy, useState, type ReactNode } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

const SCENE_URL = "https://prod.spline.design/NViLH8HcrBNNOGLQ/scene.splinecode";

/**
 * Spline charge sa scène 3D depuis prod.spline.design. Si la connexion échoue
 * (réseau bloqué, proxy d'entreprise, certificat SSL, etc.), on dégrade en
 * arrière-plan dégradé plutôt que de crasher la page entière.
 */
class SplineErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    // Silent — la démo reste utilisable, seule la 3D disparaît.
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

const Fallback = () => (
  <div
    aria-hidden
    className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_30%_40%,#5C1F2A_0%,#1A0608_60%,#0D0D0D_100%)]"
  />
);

export default function SplineBackground() {
  // `onError` couvre les erreurs runtime du chargement de la scène (fetch
  // bloqué, format invalide, etc.) que l'ErrorBoundary ne capture pas car
  // elles arrivent dans des callbacks async.
  const [crashed, setCrashed] = useState(false);

  if (crashed) {
    return (
      <div className="absolute inset-0 z-0">
        <Fallback />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0">
      <SplineErrorBoundary fallback={<Fallback />}>
        <Suspense fallback={<Fallback />}>
          <Spline
            scene={SCENE_URL}
            className="h-full w-full"
            onError={() => setCrashed(true)}
          />
        </Suspense>
      </SplineErrorBoundary>
      {/* Cover the Spline watermark rendered inside the canvas */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-14 w-48 bg-[#0D0D0D]"
      />
    </div>
  );
}
