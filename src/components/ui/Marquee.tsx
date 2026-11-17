import type { CSSProperties, ReactNode } from "react";

/**
 * Simple single-row CSS ticker. The content is rendered twice (the copy is aria-hidden) and the
 * track slides by exactly half, so the loop is seamless. Pauses on hover.
 */
export function Marquee({
  children,
  duration = 40,
  gap = "2rem",
  pauseOnHover = true,
  className = "",
}: {
  children: ReactNode;
  duration?: number;
  gap?: string;
  pauseOnHover?: boolean;
  className?: string;
}) {
  return (
    <div className={`group/marquee mask-fade-x overflow-hidden ${className}`} style={{ "--duration": `${duration}s`, "--gap": gap } as CSSProperties}>
      <div className={`animate-marquee flex w-max ${pauseOnHover ? "group-hover/marquee:[animation-play-state:paused]" : ""}`} style={{ gap }}>
        <div className="flex shrink-0 items-center" style={{ gap }}>
          {children}
        </div>
        <div className="flex shrink-0 items-center" style={{ gap }} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
