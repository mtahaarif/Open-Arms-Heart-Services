"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { homeCare, homeHealth, type PillarSlug, type Service } from "@/lib/services";
import { EASE, Reveal } from "../../ui/motion";

function ServiceBlock({ s, i, onActive }: { s: Service; i: number; onActive: (slug: string) => void }) {
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
          <Image src={s.image} alt={s.imageAlt} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-linear-to-t from-iris-950/60 via-transparent to-transparent" />
        <div className="absolute bottom-5 left-5 flex items-center gap-3">
          <span className="glass grid size-14 place-items-center rounded-2xl text-iris-700">
            <s.icon className="size-6" />
          </span>
          <span className="font-display text-6xl leading-none text-white/90">{String(i + 1).padStart(2, "0")}</span>
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-8 text-4xl font-medium sm:text-5xl">{s.name}</h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">{s.summary}</p>
      </Reveal>
      <div className="mt-8 grid gap-4 md:grid-cols-[1.2fr_1fr]">
        <Reveal delay={0.1} className="rounded-[1.75rem] border border-iris-100 bg-white p-6">
          <p className="text-sm font-bold tracking-[0.16em] text-iris-500 uppercase">What&apos;s included</p>
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
        <Reveal delay={0.18} className="relative overflow-hidden rounded-[1.75rem] bg-iris-900 p-6 text-white">
          <Sparkles className="absolute -top-4 -right-4 size-28 text-white/5" />
          <p className="text-sm font-bold tracking-[0.16em] text-blush-200 uppercase">Who it helps</p>
          <p className="mt-4 leading-relaxed text-iris-50/90">{s.helps}</p>
          <Link
            href={`/contact?care=${homeHealth.services.includes(s) ? "home-health" : "home-care"}`}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blush-200 hover:text-white"
          >
            Ask about {s.name.toLowerCase()} <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </div>
    </article>
  );
}

/** Sticky sidebar with scroll-spy + long-form service sections. */
export function ServiceScrollspy({ slug }: { slug: PillarSlug }) {
  const pillar = slug === "home-health" ? homeHealth : homeCare;
  const [active, setActive] = useState(pillar.services[0].slug);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.3", "end 0.7"] });
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative py-16 sm:py-24">
      <div className="container-x grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-16">
        <aside className="hidden lg:block">
          <div className="sticky top-32">
            <p className="text-sm font-bold tracking-[0.16em] text-blush-600 uppercase">{pillar.level} services</p>
            <nav aria-label={`${pillar.name} services`} className="relative mt-5 pl-5">
              <span className="absolute top-0 bottom-0 left-0 w-0.5 rounded bg-iris-100" />
              <motion.span
                style={{ height: progress }}
                className="absolute top-0 left-0 w-0.5 rounded bg-linear-to-b from-iris-500 to-blush-500"
              />
              <ul className="space-y-1">
                {pillar.services.map((s) => {
                  const on = active === s.slug;
                  return (
                    <li key={s.slug}>
                      <a
                        href={`#${s.slug}`}
                        className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[0.95rem] transition-colors ${
                          on ? "font-semibold text-iris-900" : "text-ink-soft hover:text-iris-800"
                        }`}
                      >
                        {on && (
                          <motion.span
                            layoutId={`spy-${slug}`}
                            className="absolute inset-0 rounded-xl bg-white shadow-[0_10px_30px_-15px_rgb(96_52_159/0.4)] ring-1 ring-iris-100"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          />
                        )}
                        <s.icon className={`relative size-4 ${on ? "text-blush-500" : ""}`} />
                        <span className="relative">{s.name}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="glass mt-8 rounded-[1.5rem] p-5">
              <p className="font-display text-xl text-iris-950">Have questions?</p>
              <p className="mt-1 text-sm text-ink-soft">Talk to a real person about your situation.</p>
              <Link href="/contact" className="btn-primary mt-4 w-full py-3 text-sm">
                Request a consultation
              </Link>
            </div>
          </div>
        </aside>
        <div ref={ref}>
          {pillar.services.map((s, i) => (
            <ServiceBlock key={s.slug} s={s} i={i} onActive={setActive} />
          ))}
        </div>
      </div>
    </section>
  );
}
