"use client";

import { useRef, type ReactNode } from "react";
import Link from "./Link";

type GlowCardProps = {
  /** Plain element to render (server pages can't pass components to a client component). */
  as?: "div" | "li" | "article" | "a";
  /** Internal link: renders the site's (no-prefetch) <Link>. */
  href?: string;
  children: ReactNode;
  className?: string;
  /** Adds a subtle 3D tilt toward the cursor (mouse only). */
  tilt?: boolean;
} & Omit<React.HTMLAttributes<HTMLElement>, "children" | "className"> &
  Pick<React.AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel">;

/**
 * Card with a cursor-following gradient border and spotlight (see the `glow-card` utility).
 * Only sets CSS variables (and, with `tilt`, an inline transform) on pointer move — no re-renders.
 */
export function GlowCard({ as = "div", href, children, className = "", tilt = false, ...rest }: GlowCardProps) {
  const ref = useRef<HTMLElement>(null);
  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = e.clientX - r.left;
    const py = e.clientY - r.top;
    el.style.setProperty("--mx", `${px}px`);
    el.style.setProperty("--my", `${py}px`);
    if (tilt && e.pointerType === "mouse") {
      const rx = (py / r.height - 0.5) * -6;
      const ry = (px / r.width - 0.5) * 6;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    }
  };
  const onPointerLeave = tilt
    ? () => {
        if (ref.current) ref.current.style.transform = "";
      }
    : undefined;
  const props = {
    className: `glow-card ${tilt ? "transition-transform duration-300 ease-out will-change-transform" : ""} ${className}`,
    onPointerMove,
    onPointerLeave,
    ...rest,
  };

  if (href && as !== "a") {
    return (
      <Link href={href} ref={ref as React.Ref<HTMLAnchorElement>} {...props}>
        {children}
      </Link>
    );
  }
  const Comp = as;
  return (
    // @ts-expect-error -- ref type differs per tag; all are HTMLElements
    <Comp ref={ref} href={href} {...props}>
      {children}
    </Comp>
  );
}
