"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

function ResetOnRouteChange() {
  const lenis = useLenis();
  const pathname = usePathname();
  useEffect(() => {
    if (!window.location.hash) lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname, lenis]);
  return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true, anchors: { offset: -110 } }}>
      <ResetOnRouteChange />
      {children}
    </ReactLenis>
  );
}
