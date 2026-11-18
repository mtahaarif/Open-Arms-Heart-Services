"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { BannerOverlay } from "@/components/ui/BannerOverlay";
import { Photo } from "@/components/ui/Photo";

/** `position` is a static Tailwind object-position class that keeps the faces in frame. */
type Slide = { src: string; alt: string; position?: string };

/** Time each photo stays up (matches the `hero-progress` bar). */
const DURATION = 7000;

/**
 * Home banner background: full-bleed photos that cross-fade (with a slow zoom on the active one)
 * under the site-wide dark banner treatment (<BannerOverlay>), and a glass control pill
 * (progress bars, counter, previous / next). Autoplay is off for reduced-motion visitors.
 * Slides are plain data from the server page; the first photo is the LCP image (preloaded).
 */
export function HeroSlides({ slides }: { slides: Slide[] }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(false);
  const n = slides.length;

  useEffect(() => setAuto(!window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  useEffect(() => {
    if (!auto) return;
    const t = window.setTimeout(() => setActive((i) => (i + 1) % n), DURATION);
    return () => window.clearTimeout(t);
  }, [active, auto, n]);

  const go = (i: number) => setActive((i + n) % n);

  return (
    <>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {slides.map((s, i) => (
          <div
            key={s.src}
            className={`absolute inset-0 transition-opacity duration-[1.4s] ease-out ${i === active ? "opacity-100" : "opacity-0"}`}
            aria-hidden={i !== active}
          >
            <div className={`absolute inset-0 ${i === active ? "animate-[kenburns_9s_ease-out_both]" : ""}`}>
              <Photo src={s.src} alt={s.alt} preload={i === 0} sizes="2200px" className={s.position ?? "object-[65%_center]"} />
            </div>
          </div>
        ))}
        <BannerOverlay />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-3 z-10 sm:bottom-5 lg:bottom-6">
        <div className="wrap flex justify-end">
          <div className="glass-dark enter pointer-events-auto flex items-center gap-3 rounded-full py-1.5 pr-1.5 pl-4 [--d:900ms]">
            <div className="flex items-center gap-1.5" role="tablist" aria-label="Banner photos">
              {slides.map((s, i) => (
                <button
                  key={s.src}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Show photo ${i + 1}`}
                  onClick={() => go(i)}
                  className={`relative h-1.5 overflow-hidden rounded-full bg-white/25 transition-all duration-500 ${i === active ? "w-10" : "w-4 hover:bg-white/45"}`}
                >
                  {i === active && (
                    <span
                      key={`${active}-${auto}`}
                      className={`absolute inset-0 origin-left rounded-full bg-linear-to-r from-plum-700 to-blush-500 ${auto ? "animate-[hero-progress_7s_linear_both]" : ""}`}
                    />
                  )}
                </button>
              ))}
            </div>
            <span className="w-12 text-center text-xs font-bold text-white/80 tabular-nums">
              {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
            <button
              type="button"
              aria-label="Previous photo"
              onClick={() => go(active - 1)}
              className="grid size-9 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white hover:text-plum-900"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={() => go(active + 1)}
              className="grid size-9 place-items-center rounded-full bg-linear-to-br from-plum-700 to-blush-500 text-white transition-transform hover:scale-105"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
