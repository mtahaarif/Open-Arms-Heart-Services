"use client";

import { Photo } from "@/components/ui/Photo";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, ArrowUpRight, Check, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { homeCare, homeHealth, programs, type PillarSlug, type ProgramSlug } from "@/lib/services";
import { EASE, Reveal } from "../../ui/motion";
import { CareLink } from "@/components/forms/CareLink";

type Item = {
  slug: string;
  name: string;
  /** Short label for the sidebar. */
  nav: string;
  tag?: string;
  icon: LucideIcon;
  image: string;
  imageAlt: string;
  summary: string;
  pointsLabel: string;
  points: string[];
  cardLabel: string;
  cardText: string;
  care: ProgramSlug;
  page?: string;
};

function itemsFor(source: "programs" | PillarSlug): { label: string; items: Item[] } {
  if (source === "programs") {
    return {
      label: "Types of care",
      items: programs.map((p) => ({
        slug: p.slug,
        name: p.name,
        nav: p.short,
        tag: p.tag,
        icon: p.icon,
        image: p.image,
        imageAlt: p.imageAlt,
        summary: p.intro,
        pointsLabel: "Services and support",
        points: p.points,
        cardLabel: "Good to know",
        cardText: p.note,
        care: p.slug,
        page: p.href,
      })),
    };
  }
  const pillar = source === "home-health" ? homeHealth : homeCare;
  return {
    label: `${pillar.level} services`,
    items: pillar.services.map((s) => ({
      slug: s.slug,
      name: s.name,
      nav: s.name,
      icon: s.icon,
      image: s.image,
      imageAlt: s.imageAlt,
      summary: s.summary,
      pointsLabel: "What's included",
      points: s.points,
      cardLabel: "Who it helps",
      cardText: s.helps,
      care: pillar.slug,
    })),
  };
}

function Block({ s, i, onActive }: { s: Item; i: number; onActive: (slug: string) => void }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-40% 0px -55% 0px" });
  useEffect(() => {
    if (inView) onActive(s.slug);
  }, [inView, s.slug, onActive]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <article ref={ref} id={s.slug} className="scroll-mt-32 border-b border-iris-100 py-14 first:pt-0 last:border-0">
      <Reveal className="relative h-72 overflow-hidden rounded-[2rem] sm:h-[420px]">
        <motion.div style={{ y }} className="absolute inset-[-12%_0]">
          <Photo src={s.image} alt={s.imageAlt} sizes="(min-width: 1280px) 880px, (min-width: 1024px) 65vw, 100vw" className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-linear-to-t from-iris-950/60 via-transparent to-transparent" />
        <div className="absolute bottom-5 left-5 flex items-center gap-3">
          <span className="glass grid size-14 place-items-center rounded-2xl text-iris-700">
            <s.icon className="size-6" />
          </span>
          <span className="font-display text-6xl leading-none text-white/90">{String(i + 1).padStart(2, "0")}</span>
        </div>
        {s.tag && (
          <span className="glass absolute top-5 right-5 rounded-full px-4 py-1.5 text-xs font-bold tracking-[0.14em] text-iris-800 uppercase">
            {s.tag}
          </span>
        )}
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-8 text-4xl font-medium sm:text-5xl">{s.name}</h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">{s.summary}</p>
      </Reveal>
      <div className="mt-8 grid gap-4 md:grid-cols-[1.2fr_1fr]">
        <Reveal delay={0.1} className="rounded-[1.75rem] border border-iris-100 bg-white p-6">
          <p className="text-sm font-bold tracking-[0.16em] text-iris-500 uppercase">{s.pointsLabel}</p>
          <ul className="mt-4 grid gap-3">
            {s.points.map((p, j) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + j * 0.06, duration: 0.5, ease: EASE }}
                className="flex items-start gap-3 text-ink"
              >
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-linear-to-br from-iris-500 to-blush-500 text-white">
                  <Check className="size-3.5" />
                </span>
                {p}
              </motion.li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.18} className="relative flex flex-col overflow-hidden rounded-[1.75rem] bg-iris-900 p-6 text-white">
          <Sparkles className="absolute -top-4 -right-4 size-28 text-white/5" />
          <p className="text-sm font-bold tracking-[0.16em] text-blush-200 uppercase">{s.cardLabel}</p>
          <p className="mt-4 leading-relaxed text-iris-50/90">{s.cardText}</p>
          <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-6">
            <CareLink care={s.care} className="inline-flex items-center gap-2 text-sm font-semibold text-blush-200 hover:text-white">
              Ask about {s.nav.toLowerCase()} <ArrowRight className="size-4" />
            </CareLink>
            {s.page && (
              <Link href={s.page} className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 hover:text-white">
                Full details <ArrowUpRight className="size-4" />
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </article>
  );
}

/** Sticky sidebar with scroll-spy + long-form sections, for the programs or a pillar's services. */
export function ServiceScrollspy({ source }: { source: "programs" | PillarSlug }) {
  const { label, items } = itemsFor(source);
  const [active, setActive] = useState(items[0].slug);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.3", "end 0.7"] });
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative py-16 sm:py-24">
      <div className="container-x grid gap-12 lg:grid-cols-[300px_1fr] lg:gap-16">
        <aside className="hidden lg:block">
          <div className="sticky top-32">
            <p className="text-sm font-bold tracking-[0.16em] text-blush-700 uppercase">{label}</p>
            <nav aria-label={label} className="relative mt-5 pl-5">
              <span className="absolute top-0 bottom-0 left-0 w-0.5 rounded bg-iris-100" />
              <motion.span style={{ height: progress }} className="absolute top-0 left-0 w-0.5 rounded bg-linear-to-b from-iris-500 to-blush-500" />
              <ul className="space-y-1">
                {items.map((s) => {
                  const on = active === s.slug;
                  return (
                    <li key={s.slug}>
                      <a
                        href={`#${s.slug}`}
                        className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[0.92rem] leading-snug transition-colors ${
                          on ? "font-semibold text-iris-900" : "text-ink-soft hover:text-iris-800"
                        }`}
                      >
                        {on && (
                          <motion.span
                            layoutId={`spy-${source}`}
                            className="absolute inset-0 rounded-xl bg-white shadow-[0_10px_30px_-15px_rgb(96_52_159/0.4)] ring-1 ring-iris-100"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          />
                        )}
                        <s.icon className={`relative size-4 shrink-0 ${on ? "text-blush-500" : ""}`} />
                        <span className="relative">{s.nav}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="glass mt-8 rounded-[1.5rem] p-5">
              <p className="font-display text-xl text-iris-950">Have questions?</p>
              <p className="mt-1 text-sm text-ink-soft">Our staff will reach out to discuss how we can help your family.</p>
              <Link href="/contact" className="btn-primary mt-4 w-full py-3 text-sm">
                Request more information
              </Link>
            </div>
          </div>
        </aside>
        <div ref={ref}>
          {items.map((s, i) => (
            <Block key={s.slug} s={s} i={i} onActive={setActive} />
          ))}
        </div>
      </div>
    </section>
  );
}
