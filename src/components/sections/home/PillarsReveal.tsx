"use client";

import { Photo } from "@/components/ui/Photo";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { pillars } from "@/lib/services";
import { SectionIntro } from "../../ui/SectionIntro";
import { EASE, Reveal } from "../../ui/motion";
import { rich } from "@/lib/rich";

/** Two pillars as expanding panels — hover (or tap) grows one and reveals its services. */
export function PillarsReveal() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionIntro
            eyebrow="Two levels of care"
            title="One agency. *Skilled and non-skilled* care, side by side."
            text="Some days call for a nurse or therapist. Others call for a helping hand and good company. Most families need a little of both — so we offer both under one roof."
          />
          <Reveal delay={0.2} className="flex gap-2 lg:mb-2">
            {pillars.map((p, i) => (
              <button
                key={p.slug}
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
                <span className="relative">{p.level}</span>
              </button>
            ))}
          </Reveal>
        </div>

        <div className="mt-14 -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:h-[620px] lg:snap-none lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
          {pillars.map((p, i) => {
            const isActive = active === i;
            return (
              <motion.article
                key={p.slug}
                layout
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                animate={{ flexGrow: isActive ? 1.75 : 1 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="glow-card group relative isolate min-h-[600px] w-[86vw] max-w-[440px] shrink-0 snap-center overflow-hidden rounded-[2.25rem] sm:w-[70vw] lg:min-h-0 lg:w-auto lg:max-w-none lg:min-w-0 lg:flex-1 lg:basis-0"
              >
                <motion.div
                  className="absolute inset-0 -z-10"
                  animate={{ scale: isActive ? 1.04 : 1.12 }}
                  transition={{ duration: 1.2, ease: EASE }}
                >
                  <Photo src={p.image} alt="" sizes="(min-width: 1280px) 780px, (min-width: 1024px) 60vw, 70vw" className="object-cover" />
                </motion.div>
                <div
                  className={`absolute inset-0 -z-10 transition-colors duration-700 ${
                    i === 0
                      ? "bg-linear-to-t from-iris-950 via-iris-950/70 to-iris-900/10"
                      : "bg-linear-to-t from-[#3b1230] via-blush-800/60 to-blush-700/5"
                  }`}
                />

                <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-10">
                  <div className="flex items-start justify-between">
                    <span className="glass-dark rounded-full px-4 py-1.5 text-xs font-bold tracking-[0.18em] text-white uppercase">
                      {p.level}
                    </span>
                    <span className="font-display text-7xl leading-none text-white/15">0{i + 1}</span>
                  </div>

                  <div>
                    <h3 className="font-display text-4xl text-white sm:text-5xl">{p.name}</h3>
                    <p className="mt-2 font-display text-xl text-blush-200 italic">{p.headline}</p>

                    {/* Always visible on phones; revealed on the active panel from lg up. */}
                    <div
                      className={`transition-all duration-700 ease-[var(--ease-out-expo)] ${
                        isActive
                          ? "lg:max-h-[460px] lg:translate-y-0 lg:opacity-100 lg:delay-150"
                          : "lg:pointer-events-none lg:max-h-0 lg:translate-y-6 lg:overflow-hidden lg:opacity-0"
                      }`}
                    >
                      <p className="mt-4 max-w-xl text-[0.95rem] text-white/80 sm:mt-5 sm:text-base">{rich(p.intro)}</p>
                      <ul className="mt-5 flex max-w-2xl flex-wrap gap-2 sm:mt-6">
                        {p.services.map((s, j) => (
                          <li
                            key={s.slug}
                            className={`transition-all duration-500 ${isActive ? "lg:scale-100 lg:opacity-100" : "lg:scale-90 lg:opacity-0"}`}
                            style={{ transitionDelay: isActive ? `${250 + j * 50}ms` : "0ms" }}
                          >
                            <Link
                              href={`${p.href}#${s.slug}`}
                              className="glass-dark inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[0.8rem] text-white transition hover:bg-white/20 sm:px-3.5 sm:py-2 sm:text-sm"
                            >
                              <s.icon className="size-3.5 text-blush-200" />
                              {s.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href={p.href}
                      className="mt-6 inline-flex items-center gap-3 rounded-full bg-white py-2 pr-2 pl-5 text-sm sm:mt-8 font-semibold text-iris-900 transition hover:gap-4"
                    >
                      Explore {p.name.toLowerCase()}
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
