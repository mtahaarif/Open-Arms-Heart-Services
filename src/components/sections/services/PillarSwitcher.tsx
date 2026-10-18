"use client";

import { Photo } from "@/components/ui/Photo";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { pillars } from "@/lib/services";
import { GlowCard } from "../../ui/GlowCard";
import { EASE } from "../../ui/motion";
import { rich } from "@/lib/rich";

/** Segmented control that morphs between the two pillars' service grids. */
export function PillarSwitcher() {
  const [idx, setIdx] = useState(0);
  const p = pillars[idx];

  return (
    <section className="relative py-20 sm:py-28">
      <div className="container-x">
        <div className="flex justify-center">
          <div role="tablist" aria-label="Care level" className="glass inline-flex rounded-full p-1.5">
            {pillars.map((pl, i) => (
              <button
                key={pl.slug}
                role="tab"
                aria-selected={idx === i}
                onClick={() => setIdx(i)}
                className={`relative rounded-full px-5 py-3 text-sm font-semibold transition-colors sm:px-8 sm:text-base ${
                  idx === i ? "text-white" : "text-iris-800 hover:text-iris-950"
                }`}
              >
                {idx === i && (
                  <motion.span
                    layoutId="switch-pill"
                    className="absolute inset-0 rounded-full bg-linear-to-r from-iris-700 to-iris-500 shadow-lg shadow-iris-600/30"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">
                  {pl.name} <span className="opacity-70">({pl.level})</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.55, ease: EASE }}
            className="mt-14"
          >
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
              <div>
                <p className="text-sm font-bold tracking-[0.16em] text-blush-700 uppercase">{p.level} care</p>
                <h2 className="mt-3 text-4xl leading-tight font-medium sm:text-5xl">{p.headline}</h2>
                <p className="mt-5 text-lg leading-relaxed text-ink-soft">{rich(p.intro)}</p>
                <Link href={p.href} className="btn-primary mt-8">
                  Explore {p.name.toLowerCase()} <ArrowRight className="size-4" />
                </Link>
              </div>
              <div className="relative h-72 overflow-hidden rounded-[2.25rem] sm:h-96">
                <motion.div
                  initial={{ scale: 1.15 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2, ease: EASE }}
                  className="absolute inset-0"
                >
                  <Photo src={p.image} alt="" sizes="(min-width: 1280px) 640px, (min-width: 1024px) 50vw, 100vw" className="object-cover" />
                </motion.div>
                <div className="absolute inset-0 bg-linear-to-tr from-iris-900/40 to-transparent" />
              </div>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {p.services.map((s, i) => (
                <motion.div
                  key={s.slug}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.06, ease: EASE }}
                >
                  <GlowCard
                    as={Link}
                    href={`${p.href}#${s.slug}`}
                    className="group flex h-full flex-col rounded-[1.75rem] border border-iris-100 bg-white p-6 transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgb(96_52_159/0.45)]"
                  >
                    <div className="relative z-10 flex items-start justify-between">
                      <span className="grid size-12 place-items-center rounded-2xl bg-iris-50 text-iris-600 transition duration-500 group-hover:bg-linear-to-br group-hover:from-iris-600 group-hover:to-blush-500 group-hover:text-white">
                        <s.icon className="size-5" />
                      </span>
                      <ArrowUpRight className="size-5 text-iris-300 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-iris-700" />
                    </div>
                    <h3 className="relative z-10 mt-5 font-display text-2xl">{s.name}</h3>
                    <p className="relative z-10 mt-2 text-[0.95rem] text-ink-soft">{s.summary}</p>
                  </GlowCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
