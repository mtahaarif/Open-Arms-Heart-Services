"use client";

import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { ArrowRight, Check, RotateCcw, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { needs } from "@/lib/content";
import { allServices, homeCare, homeHealth } from "@/lib/services";
import { Aurora } from "../brand/Ribbons";
import { SectionIntro } from "../ui/SectionIntro";
import { EASE } from "../ui/motion";
import { CareLink } from "@/components/forms/CareLink";

/** Interactive "which care fits?" helper. */
export function CareChooser() {
  const [picked, setPicked] = useState<string[]>([]);

  const result = useMemo(() => {
    const chosen = needs.filter((n) => picked.includes(n.id));
    const skilled = chosen.some((n) => n.pillar === "home-health");
    const nonSkilled = chosen.some((n) => n.pillar === "home-care");
    const slugs = [...new Set(chosen.flatMap((n) => n.services))];
    const services = allServices.filter((s) => slugs.includes(s.slug));
    const pillarOf = (slug: string) => (homeHealth.services.some((s) => s.slug === slug) ? homeHealth : homeCare);
    const verdict =
      skilled && nonSkilled
        ? { title: "A blend of both", text: "Skilled visits for health needs, plus non-skilled help with daily life — coordinated by one team.", care: "both" as const }
        : skilled
          ? { title: "Home Health (Skilled)", text: "Clinical care from licensed nurses and therapists, usually with a physician's order. We can coordinate with your doctor.", care: "home-health" as const }
          : { title: "Home Care (Non-Skilled)", text: "Hands-on help with daily routines and companionship — no doctor's order needed.", care: "home-care" as const };
    return { services, pillarOf, verdict, any: chosen.length > 0 };
  }, [picked]);

  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  return (
    <section id="care-finder" className="relative isolate overflow-hidden bg-iris-950 py-24 sm:py-32">
      <Aurora dark />
      <div className="noise absolute inset-0" />
      <div className="container-x relative">
        <SectionIntro
          dark
          align="center"
          eyebrow="Care finder"
          title="Not sure what kind of care you need? *Let's figure it out.*"
          text="Tap everything that applies. We'll suggest where to start — then a real person can talk it through with you."
        />

        <LayoutGroup>
          <div className="mt-14 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
            <motion.div layout className="glass-dark rounded-[2rem] p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold tracking-[0.14em] text-blush-200 uppercase">My loved one needs…</p>
                <AnimatePresence>
                  {picked.length > 0 && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      type="button"
                      onClick={() => setPicked([])}
                      className="flex items-center gap-1.5 text-sm text-iris-200 hover:text-white"
                    >
                      <RotateCcw className="size-3.5" /> Reset
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {needs.map((n) => {
                  const on = picked.includes(n.id);
                  return (
                    <motion.button
                      layout
                      key={n.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(n.id)}
                      whileTap={{ scale: 0.95 }}
                      className={`relative flex items-center gap-2 rounded-full border px-4 py-2.5 text-left text-sm font-medium transition-colors duration-300 ${
                        on
                          ? "border-transparent text-white"
                          : "border-white/15 bg-white/[0.04] text-iris-100 hover:border-white/35 hover:bg-white/10"
                      }`}
                    >
                      {on && (
                        <motion.span
                          layoutId={`chip-bg-${n.id}`}
                          className="absolute inset-0 -z-0 rounded-full bg-linear-to-r from-iris-600 to-blush-500 shadow-[0_8px_24px_-8px_rgb(234_106_156/0.7)]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        />
                      )}
                      <span className="relative flex items-center gap-2">
                        <AnimatePresence initial={false}>
                          {on && (
                            <motion.span
                              initial={{ width: 0, opacity: 0 }}
                              animate={{ width: "auto", opacity: 1 }}
                              exit={{ width: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <Check className="size-4" />
                            </motion.span>
                          )}
                        </AnimatePresence>
                        {n.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              layout
              className="relative overflow-hidden rounded-[2rem] bg-white p-6 text-ink shadow-[0_40px_100px_-30px_rgb(0_0_0/0.6)] sm:p-8"
            >
              <AnimatePresence mode="wait">
                {!result.any ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="flex h-full min-h-[280px] flex-col items-center justify-center text-center"
                  >
                    <span className="grid size-16 place-items-center rounded-full bg-iris-50 text-iris-600">
                      <Sparkles className="size-7" />
                    </span>
                    <p className="mt-5 font-display text-2xl text-iris-950">Your suggestion appears here</p>
                    <p className="mt-2 max-w-xs text-ink-soft">Choose one or more needs on the left to see which services fit.</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={result.verdict.title}
                    initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    <p className="text-sm font-semibold tracking-[0.14em] text-blush-700 uppercase">We'd suggest</p>
                    <h3 className="mt-2 text-3xl font-medium text-gradient sm:text-4xl">{result.verdict.title}</h3>
                    <p className="mt-3 text-ink-soft">{result.verdict.text}</p>
                    <ul className="mt-6 space-y-2">
                      <AnimatePresence initial={false}>
                        {result.services.map((s) => {
                          const p = result.pillarOf(s.slug);
                          return (
                            <motion.li
                              key={s.slug}
                              layout
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ duration: 0.35, ease: EASE }}
                            >
                              <Link
                                href={`${p.href}#${s.slug}`}
                                className="group flex items-center gap-3 rounded-2xl border border-iris-100 p-3 transition hover:border-iris-300 hover:bg-iris-50"
                              >
                                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-iris-50 text-iris-700 group-hover:bg-white">
                                  <s.icon className="size-4.5" />
                                </span>
                                <span className="flex-1">
                                  <span className="block font-semibold text-iris-950">{s.name}</span>
                                  <span className="text-xs text-ink-soft">
                                    {p.name} · {p.level}
                                  </span>
                                </span>
                                <ArrowRight className="size-4 text-iris-400 transition group-hover:translate-x-1 group-hover:text-iris-700" />
                              </Link>
                            </motion.li>
                          );
                        })}
                      </AnimatePresence>
                    </ul>
                    <CareLink care={result.verdict.care} className="btn-primary mt-7 w-full">
                      Talk it through with us <ArrowRight className="size-4" />
                    </CareLink>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </LayoutGroup>
      </div>
    </section>
  );
}
