import Link from "next/link";

const HAND =
  "M56 101 C41 93 25.5 79 21.5 56 C19 44 18.5 29 21 17.5 Q24.5 11.5 28 17.5 L28 22 Q31.5 18.5 34.5 25.5 L34.5 30 Q38 27.5 40.5 34.5 L40.5 39.5 Q44 37.5 46 44.5 C46.4 50 46.6 56 47 62 C49 59 51 56 52.5 53 Q55.5 51 55 55 C54 60 52 65 51.5 70 C53 80 57 91 60 101 Z";

const HEART =
  "M61 62 C60 60 59.8 59 59.6 58.5 C52 51 41.5 42 41.5 28.5 C41.5 17 54 13 60 23.5 C66 13 78.5 16.5 78.5 28 C78.5 38 72 45.5 66.5 50.5";

const MASK = "oa-logo-gaps";
const GRAD = { brand: "oa-logo-brand", light: "oa-logo-light" } as const;

/**
 * Shared SVG definitions for every <LogoMark>, rendered once in the root layout.
 * Referencing one set of ids (instead of per-instance ids) keeps ids unique even
 * when a mark is cloned, e.g. inside the footer marquee.
 */
export function LogoDefs() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" className="pointer-events-none absolute">
      <defs>
        <linearGradient id={GRAD.brand} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8b60d3" />
          <stop offset="1" stopColor="#6a3cb0" />
        </linearGradient>
        <linearGradient id={GRAD.light} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e1d2f8" />
        </linearGradient>
        <mask id={MASK} maskUnits="userSpaceOnUse" x="0" y="0" width="120" height="104">
          <rect width="120" height="104" fill="#fff" />
          <g fill="none" stroke="#000" strokeWidth="1.7" strokeLinecap="round">
            <path d="M28 20.5 C27.5 40 32 55 41 67" />
            <path d="M34.5 28.5 C34 43 38 55 44 63.5" />
            <path d="M40.5 38 C40.6 47 42.8 54.5 46.4 60.5" />
          </g>
        </mask>
      </defs>
    </svg>
  );
}

/** Hands-holding-heart mark, redrawn as SVG from the Open Arms & Heart Services logo. */
export function LogoMark({
  className,
  tone = "brand",
}: {
  className?: string;
  tone?: "brand" | "light";
}) {
  const fill = `url(#${GRAD[tone]})`;
  return (
    <svg viewBox="0 0 120 104" className={className} aria-hidden="true" focusable="false">
      <path d={HAND} fill={fill} mask={`url(#${MASK})`} />
      <path d={HAND} fill={fill} mask={`url(#${MASK})`} transform="translate(120 0) scale(-1 1)" />
      <path
        d={HEART}
        fill="none"
        stroke={tone === "light" ? "#fdcbe0" : "#f48bb5"}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({
  tone = "brand",
  className = "",
  compact = false,
}: {
  tone?: "brand" | "light";
  className?: string;
  compact?: boolean;
}) {
  const light = tone === "light";
  return (
    <Link
      href="/"
      aria-label="Open Arms & Heart Services Inc — home page"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <LogoMark
        tone={tone}
        className="h-11 w-auto shrink-0 transition-transform duration-500 ease-[var(--ease-spring)] group-hover:-rotate-6 group-hover:scale-105"
      />
      <span className="flex flex-col leading-none">
        <span
          className={`font-script text-[1.55rem] leading-[1.05] ${light ? "text-white" : "text-iris-600"}`}
          style={{ WebkitTextStroke: "0.4px currentColor" }}
        >
          Open Arms
        </span>
        {!compact && (
          <span
            className={`font-tag pl-4 text-[0.72rem] font-medium tracking-[0.03em] ${light ? "text-blush-200" : "text-blush-500"}`}
          >
            &amp; Heart Services Inc
          </span>
        )}
      </span>
    </Link>
  );
}
