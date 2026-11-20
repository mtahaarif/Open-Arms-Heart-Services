"use client";

import { MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { Photo } from "@/components/ui/Photo";

/** `position` is a static Tailwind object-position class that keeps the faces in frame. */
type Slide = { src: string; alt: string; position?: string };

/** Time each photo stays up (matches the `hero-progress` bar). */
const DURATION = 7000;

/**
 * Home banner photo card (the reference site's hero card): a large rounded photo that cross-fades
 * between the banner photos with a slow zoom, a location chip in the top corner, slide bars along
 * the bottom, and a "Call our team" card overlapping its lower-left edge. Autoplay is off for
 * reduced-motion visitors. Slides are plain data from the server page; the first is the LCP image.
 */
export function HeroSlides({ slides, location, phone }: { slides: Slide[]; location: string; phone: { display: string; href: string } }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(false);
  const n = slides.length;

  useEffect(() => setAuto(!window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  useEffect(() => {
    if (!auto) return;
    const t = window.setTimeout(() => setActive((i) => (i + 1) % n), DURATION);
    return () => window.clearTimeout(t);
  }, [active, auto, n]);

  return (
    <div className="relative pb-8 sm:pb-0">
      <div className="relative aspect-[4/3.3] overflow-hidden rounded-[2rem] bg-plum-100 shadow-[0_40px_90px_-40px_rgb(102_45_145/0.55)] sm:aspect-[5/4] lg:rounded-[2.25rem]">
        {slides.map((s, i) => (
          <div
            key={s.src}
            className={`absolute inset-0 transition-opacity duration-[1.4s] ease-out ${i === active ? "opacity-100" : "opacity-0"}`}
            aria-hidden={i !== active}
          >
            <div className={`absolute inset-0 ${i === active ? "animate-[kenburns_9s_ease-out_both]" : ""}`}>
              <Photo src={s.src} alt={s.alt} preload={i === 0} sizes="(min-width: 1024px) 1500px, 270vw" className={s.position ?? "object-center"} />
            </div>
          </div>
        ))}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-black/30 to-transparent" />
        {/* Phones: the slide bars sit top-left (the call card covers the bottom edge), on a faint shade */}
        <div aria-hidden className="absolute inset-x-0 top-0 h-16 bg-linear-to-b from-black/30 to-transparent sm:hidden" />

        <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-2 text-[0.82rem] font-bold text-ink shadow-sm backdrop-blur sm:top-5 sm:right-5">
          <MapPin className="size-4 text-blush-500" aria-hidden /> {location}
        </span>

        <div className="absolute top-3 left-2.5 flex items-center sm:top-auto sm:right-4 sm:bottom-3.5 sm:left-auto" role="tablist" aria-label="Banner photos">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Show photo ${i + 1}`}
              onClick={() => setActive(i)}
              className="grid h-8 min-w-8 cursor-pointer place-items-center px-1.5"
            >
              <span className={`relative block h-1 overflow-hidden rounded-full bg-white/50 transition-all duration-500 ${i === active ? "w-9" : "w-6 hover:bg-white/80"}`}>
                {i === active && (
                  <span key={`${active}-${auto}`} className={`absolute inset-0 origin-left rounded-full bg-white ${auto ? "animate-[hero-progress_7s_linear_both]" : ""}`} />
                )}
              </span>
            </button>
          ))}
        </div>
      </div>

      <a
        href={phone.href}
        className="enter absolute bottom-0 left-4 inline-flex items-center gap-3 rounded-2xl bg-white py-3 pr-5 pl-3 shadow-[0_20px_50px_-20px_rgb(102_45_145/0.5)] ring-1 ring-plum-100 transition-transform [--d:500ms] hover:-translate-y-0.5 sm:-bottom-6 sm:-left-6"
      >
        <span className="grid size-11 place-items-center rounded-xl bg-linear-to-br from-plum-700 to-blush-500 text-white">
          <Phone className="size-5" aria-hidden />
        </span>
        <span>
          <span className="block text-[0.7rem] font-bold tracking-[0.14em] text-body uppercase">Call our team</span>
          <span className="block font-display text-lg leading-tight font-bold text-ink">{phone.display}</span>
        </span>
      </a>
    </div>
  );
}
