import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";
const gtm = Boolean(process.env.NEXT_PUBLIC_GTM_ID);

// Third parties the site actually uses: the Vercel preview toolbar and — only when
// NEXT_PUBLIC_GTM_ID is set — Google Tag Manager/Analytics. (The Google Form is posted server-side.)
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
  ["frame-src", "https://vercel.live", gtm && "https://www.googletagmanager.com"],
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
    // Cap generated widths at 1920px — nothing on the site renders wider, and the
    // default 2048/3840 variants were producing 100 KB+ downloads.
    deviceSizes: [640, 750, 828, 1080, 1280, 1600, 1920],
    minimumCacheTTL: 60 * 60 * 24 * 31,
  },
  // Pages removed because their content was not verified by the agency's original website.
  async redirects() {
    return [
      { source: "/services/home-care", destination: "/services#home-care", permanent: true },
      { source: "/services/home-health", destination: "/services", permanent: true },
      { source: "/getting-started", destination: "/contact", permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
