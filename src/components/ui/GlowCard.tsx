"use client";

import { useRef, type ReactNode, type ElementType, type ComponentPropsWithoutRef } from "react";

type GlowCardProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
  /** Adds a subtle 3D tilt toward the cursor. */
  tilt?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

/** Card with a cursor-following gradient border + spotlight (see .glow-card in globals.css). */
export function GlowCard<T extends ElementType = "div">({
  as,
  children,
  className = "",
  tilt = false,
  ...rest
}: GlowCardProps<T>) {
  const Comp = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);

  return (
    <Comp
      ref={ref}
      className={`glow-card ${tilt ? "transition-transform duration-300 ease-out will-change-transform" : ""} ${className}`}
      onPointerMove={(e: React.PointerEvent<HTMLElement>) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const px = e.clientX - r.left;
        const py = e.clientY - r.top;
        el.style.setProperty("--mx", `${px}px`);
        el.style.setProperty("--my", `${py}px`);
        if (tilt && e.pointerType === "mouse") {
          const rx = ((py / r.height) - 0.5) * -6;
          const ry = ((px / r.width) - 0.5) * 6;
          el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        }
      }}
      onPointerLeave={() => {
        if (tilt && ref.current) ref.current.style.transform = "";
      }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
