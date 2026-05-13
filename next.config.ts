import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Spline + Calendly need 'unsafe-eval' (WASM) and 'unsafe-inline' (runtime).
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://assets.calendly.com https://*.spline.design https://unpkg.com",
      "style-src 'self' 'unsafe-inline' https://assets.calendly.com https://fonts.googleapis.com",
      "img-src 'self' data: blob: https://images.pexels.com https://*.spline.design https://*.calendly.com",
      "font-src 'self' data: https://fonts.gstatic.com https://*.spline.design",
      // Spline fetches scene + textures + assets from prod.spline.design and CDNs.
      "connect-src 'self' https: wss: blob: data:",
      // Spline embeds audio (howler) — needs media-src.
      "media-src 'self' blob: data: https://*.spline.design",
      "frame-src https://calendly.com https://*.calendly.com",
      "worker-src 'self' blob:",
      "child-src 'self' blob:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "videos.pexels.com",
        pathname: "/**",
      },
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
};

export default nextConfig;
