"use client";

import { motion } from "motion/react";
import { useId } from "react";

/** Flowing purple → pink ribbons, echoing the swooshes on the brand's Facebook banner. */
export function Ribbons({ className = "", animate = true }: { className?: string; animate?: boolean }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const ribbons = [
    { d: "M-40 520 C 180 420, 320 520, 520 360 S 860 120, 1040 -40", w: 70, g: `a${uid}`, o: 0.55 },
    { d: "M-40 580 C 220 470, 360 560, 560 420 S 880 200, 1060 40", w: 34, g: `b${uid}`, o: 0.7 },
    { d: "M-40 640 C 240 540, 420 610, 620 480 S 920 280, 1080 140", w: 18, g: `a${uid}`, o: 0.45 },
    { d: "M-40 470 C 160 380, 300 450, 480 300 S 820 60, 1000 -80", w: 8, g: `b${uid}`, o: 0.6 },
  ];

  return (
    <svg
      viewBox="0 0 1000 640"
      preserveAspectRatio="xMaxYMax slice"
      className={`pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`a${uid}`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#c9aff1" stopOpacity="0" />
          <stop offset="0.45" stopColor="#8b60d3" />
          <stop offset="1" stopColor="#60349f" />
        </linearGradient>
        <linearGradient id={`b${uid}`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#fdcbe0" stopOpacity="0" />
          <stop offset="0.5" stopColor="#f48bb5" />
          <stop offset="1" stopColor="#ea6a9c" />
        </linearGradient>
      </defs>
      {ribbons.map((r, i) => (
        <motion.path
          key={i}
          d={r.d}
          fill="none"
          stroke={`url(#${r.g})`}
          strokeWidth={r.w}
          strokeLinecap="round"
          strokeOpacity={r.o}
          initial={animate ? { pathLength: 0, opacity: 0 } : false}
          whileInView={animate ? { pathLength: 1, opacity: 1 } : undefined}
          viewport={{ once: true }}
          transition={{ duration: 2.2, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </svg>
  );
}

/** Soft drifting colour blobs used behind heroes. */
export function Aurora({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div
        className={`animate-blob absolute -top-1/4 -left-1/6 h-[55vmax] w-[55vmax] rounded-full blur-3xl ${dark ? "bg-iris-600/40" : "bg-iris-200/70"}`}
      />
      <div
        className={`animate-blob absolute top-1/4 -right-1/5 h-[45vmax] w-[45vmax] rounded-full blur-3xl [animation-delay:-6s] ${dark ? "bg-blush-500/25" : "bg-blush-200/60"}`}
      />
      <div
        className={`animate-blob absolute -bottom-1/3 left-1/4 h-[40vmax] w-[40vmax] rounded-full blur-3xl [animation-delay:-12s] ${dark ? "bg-iris-400/25" : "bg-iris-100/80"}`}
      />
    </div>
  );
}
