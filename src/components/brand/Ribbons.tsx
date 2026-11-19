/**
 * Decorative brand graphics (server-rendered, CSS-animated — no animation library).
 * The ribbon gradients live once in <RibbonDefs> in the root layout, so ids stay unique.
 */

export function RibbonDefs() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" className="pointer-events-none absolute">
      <defs>
        <linearGradient id="rib-a" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#c9aff1" stopOpacity="0" />
          <stop offset="0.45" stopColor="#8b60d3" />
          <stop offset="1" stopColor="#662d91" />
        </linearGradient>
        <linearGradient id="rib-b" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#fdcbe0" stopOpacity="0" />
          <stop offset="0.5" stopColor="#f48bb5" />
          <stop offset="1" stopColor="#ea6a9c" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const RIBBONS = [
  { d: "M-40 520 C 180 420, 320 520, 520 360 S 860 120, 1040 -40", w: 70, g: "rib-a", o: 0.55 },
  { d: "M-40 580 C 220 470, 360 560, 560 420 S 880 200, 1060 40", w: 34, g: "rib-b", o: 0.7 },
  { d: "M-40 640 C 240 540, 420 610, 620 480 S 920 280, 1080 140", w: 18, g: "rib-a", o: 0.45 },
  { d: "M-40 470 C 160 380, 300 450, 480 300 S 820 60, 1000 -80", w: 8, g: "rib-b", o: 0.6 },
];

/**
 * Flowing purple → pink ribbons that fade in once. (A stroke "draw-in" animation can't run on
 * the compositor and cost ~1 s of main-thread time per page on mobile, so it was dropped.)
 */
export function Ribbons({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1000 640"
      preserveAspectRatio="xMaxYMax slice"
      className={`pointer-events-none [animation:fade-in_1.6s_var(--ease-out-expo)_both] ${className}`}
      aria-hidden="true"
    >
      {RIBBONS.map((r, i) => (
        <path
          key={i}
          d={r.d}
          fill="none"
          stroke={`url(#${r.g})`}
          strokeWidth={r.w}
          strokeLinecap="round"
          strokeOpacity={r.o}
        />
      ))}
    </svg>
  );
}

/** Soft drifting colour blobs behind heroes (radial gradients — no blur filters). */
export function Aurora({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`} aria-hidden="true">
      <div className="animate-blob absolute -top-1/4 -left-1/6 h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(closest-side,rgb(225_210_248/0.85),transparent)]" />
      <div className="animate-blob absolute top-1/4 -right-1/5 h-[50vmax] w-[50vmax] rounded-full bg-[radial-gradient(closest-side,rgb(253_203_224/0.7),transparent)] [animation-delay:-6s]" />
      <div className="animate-blob absolute -bottom-1/3 left-1/4 h-[45vmax] w-[45vmax] rounded-full bg-[radial-gradient(closest-side,rgb(240_233_252/0.9),transparent)] [animation-delay:-12s]" />
    </div>
  );
}

/** Circular text badge that slowly rotates around a gradient heart icon. */
export function RotatingBadge({ text, children }: { text: string; children: React.ReactNode }) {
  return (
    <div className="relative grid size-32 place-items-center">
      <svg viewBox="0 0 100 100" className="animate-spin-slow absolute inset-0 size-full" aria-hidden="true">
        <defs>
          <path id="badge-circle" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" />
        </defs>
        <text className="fill-plum-800 font-sans text-[6.7px] font-bold tracking-[0.13em] uppercase">
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </svg>
      <span className="grid size-14 place-items-center rounded-full bg-linear-to-br from-plum-600 to-blush-500 text-white shadow-lg shadow-blush-500/30">
        {children}
      </span>
    </div>
  );
}
