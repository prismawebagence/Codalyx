import type { NextConfig } from "next";

// CSP large mais explicite — autorise Spline (anciennes démos), Calendly (BookingCTA),
// Google Fonts, Pexels (images/vidéos) et Picsum (images des démos). Tout le reste reste bloqué.
const csp = [
  "default-src 'self'",
  // Spline + Calendly nécessitent 'unsafe-eval' (WASM) et 'unsafe-inline' (runtime).
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://assets.calendly.com https://*.spline.design https://unpkg.com",
  "style-src 'self' 'unsafe-inline' https://assets.calendly.com https://fonts.googleapis.com",
  "img-src 'self' data: blob: https://images.pexels.com https://picsum.photos https://*.spline.design https://*.calendly.com",
  "font-src 'self' data: https://fonts.gstatic.com https://*.spline.design",
  // Spline charge scène + textures depuis prod.spline.design + CDNs variés.
  "connect-src 'self' https: wss: blob: data:",
  "media-src 'self' blob: data: https://videos.pexels.com https://*.spline.design",
  "frame-src https://calendly.com https://*.calendly.com",
  "worker-src 'self' blob:",
  "child-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  // SAMEORIGIN au lieu de DENY pour permettre les previews internes (Vercel, etc.).
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=(), browsing-topics=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com", pathname: "/**" },
      { protocol: "https", hostname: "videos.pexels.com", pathname: "/**" },
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      // Anciennes URLs des offres (avant refonte mai 2026) — 301 vers les nouvelles.
      { source: "/offres/essentiel", destination: "/offres/vitrine", permanent: true },
      { source: "/offres/premium", destination: "/offres/pro", permanent: true },
    ];
  },
};

export default nextConfig;
