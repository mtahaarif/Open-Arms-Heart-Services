"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Item = { slug: string; name: string; short: string };

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * /services: a sticky photo with each service's description as stacking cards (see `.svc` in
 * globals.css). Phones: the photo sticks at the top and the cards stack below it. From sm: photo and
 * cards side by side, one shared size, both sticking centred below the header (a centred pair on
 * desktop). The service whose cards cross the middle
 * of the screen is "active": its photo wipes up over the last one while settling from a slight zoom
 * (the story section of the earlier About page — `.svc-layer`), with its name, number and title.
 * Photos and card groups are server-rendered; each group carries the service slug as its id, so
 * `/services#slug` links land on it.
 */
export function ServiceStack({ items, photos, groups }: { items: Item[]; photos: ReactNode[]; groups: ReactNode[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const i = refs.current.indexOf(e.target as HTMLDivElement);
          if (i >= 0) setActive(i);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const cur = items[active];

  return (
    <div className="svc grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-[repeat(2,minmax(0,var(--card-w)))] lg:justify-center lg:gap-12">
      {/* Decorative: every service is named by its own (visually hidden) h2 in the card column.
          Phones: this whole block sticks at the top on a cream backing, so the cards slide under it
          once a service's stack moves on. From sm: the photo card sticks beside the stack. */}
      <div aria-hidden className="sticky top-(--photo-top) z-10 -mx-4 bg-cream px-4 pt-2 pb-3 sm:static sm:z-auto sm:mx-0 sm:bg-transparent sm:p-0">
        <div className="sm:sticky sm:top-(--stick)">
          <div className="relative h-(--photo-h) overflow-hidden rounded-[1.5rem] shadow-[0_30px_60px_-35px_rgb(51_27_88/0.6)] sm:h-(--card-h) sm:rounded-[2rem] sm:shadow-[0_40px_90px_-40px_rgb(51_27_88/0.6)] lg:rounded-[2.5rem]">
            {photos.map((photo, i) => (
              <div key={items[i].slug} className="svc-layer absolute inset-0" data-state={i === active ? "on" : i < active ? "past" : "next"}>
                {photo}
              </div>
            ))}
            <div className="absolute inset-0 bg-linear-to-t from-plum-900/75 via-plum-800/10 to-transparent" />
            <span className="glass absolute top-4 left-4 hidden max-w-[calc(100%-2rem)] truncate rounded-full px-4 py-2 text-sm font-semibold text-plum-900 sm:top-6 sm:left-6 sm:inline-block">
              {cur.short}
            </span>
            <div className="absolute inset-x-4 bottom-3.5 flex items-end gap-3 sm:inset-x-6 sm:bottom-6 sm:block lg:inset-x-8 lg:bottom-8">
              <span className="block font-display text-4xl leading-none text-white/90 sm:text-6xl">{pad(active + 1)}</span>
              <p
                key={active}
                className="animate-[enter-up_0.6s_var(--ease-out-expo)_both] font-display text-[0.95rem] leading-tight text-white uppercase sm:mt-3 sm:text-xl lg:text-2xl"
              >
                {cur.name}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="min-w-0">
        {groups.map((group, i) => (
          <div
            key={items[i].slug}
            id={items[i].slug}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="scroll-mt-(--stick) pb-[16vh] last:pb-0"
          >
            {group}
          </div>
        ))}
      </div>
    </div>
  );
}
