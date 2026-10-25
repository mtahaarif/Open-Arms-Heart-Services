import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";
const gtm = Boolean(process.env.NEXT_PUBLIC_GTM_ID);

// Third parties the site actually uses: the embedded Google Form, the Vercel preview toolbar and — only when
// NEXT_PUBLIC_GTM_ID is set — Google Tag Manager/Analytics.
const csp = [
  ["default-src", "'self'"],
  [
    "script-src",
    "'self'",
    "'unsafe-inline'", // Next.js inline bootstrap + JSON-LD (nonces would force every page to render dynamically)
    isDev && "'unsafe-eval'",
    "https://vercel.live",
    gtm && "https://www.googletagmanager.com",
  ],
  ["style-src", "'self'", "'unsafe-inline'", "https://vercel.live"],
  [
    "img-src",
    "'self'",
    "data:",
    "blob:",
    "https://vercel.live",
    "https://vercel.com",
    gtm && "https://www.googletagmanager.com https://*.google-analytics.com",
  ],
  ["font-src", "'self'", "data:", "https://vercel.live", "https://assets.vercel.com"],
  [
    "connect-src",
    "'self'",
    "https://vercel.live",
    "wss://ws-us3.pusher.com",
    isDev && "ws:",
    gtm && "https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
  ],
  ["frame-src", "https://docs.google.com", "https://vercel.live", gtm && "https://www.googletagmanager.com"],
  ["frame-ancestors", "'self'"],
  ["base-uri", "'self'"],
  ["form-action", "'self'"],
  ["object-src", "'none'"],
  !isDev && ["upgrade-insecure-requests"],
]
  .filter((d): d is (string | false)[] => Array.isArray(d))
  .map((d) => d.filter(Boolean).join(" "))
  .join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // A short ladder of widths keeps srcset markup small; 1600px covers the widest
    // rendering (the 60vw home hero on large retina screens).
    deviceSizes: [640, 828, 1080, 1280, 1600],
    // 128/256 serve the logo at 1×/2×; photos only draw from 384 upwards.
    imageSizes: [128, 256, 384],
    // Photos use 60 (see components/ui/Photo.tsx); 75 is Next's default.
    qualities: [60, 75],
    minimumCacheTTL: 60 * 60 * 24 * 31,
  },
  // Removed pages: unverified content, and /thank-you (replaced by the embedded Google Form).
  async redirects() {
    return [
      { source: "/services/home-care", destination: "/services#home-care", permanent: true },
      { source: "/services/home-health", destination: "/services", permanent: true },
      { source: "/getting-started", destination: "/contact", permanent: true },
      { source: "/thank-you", destination: "/contact", permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
