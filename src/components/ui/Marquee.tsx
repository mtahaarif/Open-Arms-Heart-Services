import type { CSSProperties, ReactNode } from "react";

/** Seamless CSS marquee. Content is duplicated once; the track translates by exactly half. */
export function Marquee({
  children,
  duration = 40,
  reverse = false,
  vertical = false,
  gap = "2rem",
  pauseOnHover = true,
  className = "",
  trackClassName = "",
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  vertical?: boolean;
  gap?: string;
  pauseOnHover?: boolean;
  className?: string;
  trackClassName?: string;
}) {
  const anim = vertical ? "animate-marquee-y" : reverse ? "animate-marquee-reverse" : "animate-marquee";
  return (
    <div
      className={`group/marquee overflow-hidden ${vertical ? "mask-fade-y" : "mask-fade-x"} ${className}`}
      style={{ "--duration": `${duration}s`, "--gap": gap } as CSSProperties}
    >
      <div
        className={`flex w-max ${vertical ? "h-max flex-col" : ""} ${anim} ${pauseOnHover ? "group-hover/marquee:[animation-play-state:paused]" : ""} ${trackClassName}`}
        style={{ gap }}
      >
        <div className={`flex shrink-0 ${vertical ? "flex-col" : ""}`} style={{ gap }}>
          {children}
        </div>
        <div className={`flex shrink-0 ${vertical ? "flex-col" : ""}`} style={{ gap }} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
