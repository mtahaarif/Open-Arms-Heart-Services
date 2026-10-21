"use client";

import { Photo } from "@/components/ui/Photo";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { highlights } from "@/lib/services";
import { SectionIntro } from "../../ui/SectionIntro";
import { EASE, Reveal } from "../../ui/motion";
import { rich } from "@/lib/rich";

const washes = [
  "bg-linear-to-t from-iris-950 via-iris-950/70 to-iris-900/10",
  "bg-linear-to-t from-[#3b1230] via-blush-800/60 to-blush-700/5",
  "bg-linear-to-t from-iris-950 via-iris-900/70 to-blush-800/10",
];

/**
 * The agency's three signature highlights (Companion Care, Residential, Personal Support)
 * as expanding panels — hover (or tap) grows one and reveals its details. Snap carousel on phones.
 */
export function PillarsReveal() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionIntro
            eyebrow="What we provide"
            title="Care that comes *from the heart.*"
            text="Dependable, person-centered support designed to meet the unique needs of each individual — promoting independence, safety, and overall well-being."
          />
          <Reveal delay={0.2} className="flex flex-wrap gap-2 lg:mb-2">
            {highlights.map((h, i) => (
              <button
                key={h.slug}
                type="button"
                onClick={() => setActive(i)}
                className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                  active === i ? "text-white" : "text-iris-800 hover:bg-iris-50"
                }`}
              >
                {active === i && (
                  <motion.span
                    layoutId="pillar-pill"
                    className="absolute inset-0 rounded-full bg-iris-800"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{h.name}</span>
              </button>
            ))}
          </Reveal>
        </div>

        <div className="mt-14 -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:h-[600px] lg:snap-none lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
          {highlights.map((h, i) => {
            const isActive = active === i;
            return (
              <motion.article
                key={h.slug}
                layout
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                animate={{ flexGrow: isActive ? 2 : 1 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="glow-card group relative isolate min-h-[540px] w-[84vw] max-w-[420px] shrink-0 snap-center overflow-hidden rounded-[2.25rem] sm:w-[60vw] lg:min-h-0 lg:w-auto lg:max-w-none lg:min-w-0 lg:flex-1 lg:basis-0"
              >
                <motion.div
                  className="absolute inset-0 -z-10"
                  animate={{ scale: isActive ? 1.04 : 1.12 }}
                  transition={{ duration: 1.2, ease: EASE }}
                >
                  <Photo src={h.image} alt="" sizes="(min-width: 1280px) 640px, (min-width: 1024px) 50vw, 84vw" className="object-cover" />
                </motion.div>
                <div className={`absolute inset-0 -z-10 ${washes[i % washes.length]}`} />

                <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-9">
                  <div className="flex items-start justify-between">
                    <span className="glass-dark grid size-12 place-items-center rounded-2xl text-blush-200">
                      <h.icon className="size-5" />
                    </span>
                    <span className="font-display text-7xl leading-none text-white/15">0{i + 1}</span>
                  </div>

                  <div>
                    <h3 className="font-display text-4xl text-white sm:text-5xl">{h.name}</h3>
                    <p className="mt-2 font-display text-xl text-blush-200 italic">{h.headline}</p>

                    {/* Always visible on phones; revealed on the active panel from lg up. */}
                    <div
                      className={`transition-all duration-700 ease-[var(--ease-out-expo)] ${
                        isActive
                          ? "lg:max-h-[420px] lg:translate-y-0 lg:opacity-100 lg:delay-150"
                          : "lg:pointer-events-none lg:max-h-0 lg:translate-y-6 lg:overflow-hidden lg:opacity-0"
                      }`}
                    >
                      <p className="mt-4 max-w-xl text-[0.95rem] text-white/85 sm:mt-5 sm:text-base">{rich(h.intro)}</p>
                      <ul className="mt-5 flex max-w-2xl flex-wrap gap-2">
                        {h.tags.map((t, j) => (
                          <li
                            key={t}
                            className={`glass-dark rounded-full px-3 py-1.5 text-[0.8rem] text-white transition-all duration-500 sm:px-3.5 sm:py-2 sm:text-sm ${
                              isActive ? "lg:scale-100 lg:opacity-100" : "lg:scale-90 lg:opacity-0"
                            }`}
                            style={{ transitionDelay: isActive ? `${250 + j * 50}ms` : "0ms" }}
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href={h.href}
                      className="mt-6 inline-flex items-center gap-3 rounded-full bg-white py-2 pr-2 pl-5 text-sm font-semibold text-iris-900 transition hover:gap-4 sm:mt-8"
                    >
                      Learn about {h.name.toLowerCase()}
                      <span className="grid size-9 place-items-center rounded-full bg-iris-900 text-white transition group-hover:rotate-45">
                        <ArrowUpRight className="size-4" />
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
