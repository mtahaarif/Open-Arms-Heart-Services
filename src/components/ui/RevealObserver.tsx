"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * One IntersectionObserver for the whole page that keeps watching every `[data-reveal]` element, so
 * the fade works in both scroll directions: `.is-in` is added once ~8% of the element is on screen
 * and removed only after it has left the screen completely (above or below), so it fades in again
 * whenever it comes back. CSS in globals.css does the fade. Re-scans after client navigation.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio >= 0.08) e.target.classList.add("is-in");
          else if (!e.isIntersecting) e.target.classList.remove("is-in");
        }
      },
      { threshold: [0, 0.08] },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
