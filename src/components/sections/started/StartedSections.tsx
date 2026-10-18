"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView } from "motion/react";
import { Check, Pause, Play, Printer, Phone, Stethoscope } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { checklist, steps } from "@/lib/content";
import { site } from "@/lib/site";
import { SectionIntro } from "../../ui/SectionIntro";
import { EASE, Reveal } from "../../ui/motion";

const DURATION = 6000;

/** Story-style stepper: auto-advances with progress bars; click any step to jump. */
export function StoryStepper() {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const run = playing && inView;

  useEffect(() => {
    if (!run) return;
    const t = setTimeout(() => setI((v) => (v + 1) % steps.length), DURATION);
    return () => clearTimeout(t);
  }, [i, run]);

  const s = steps[i];

  return (
    <section ref={ref} className="relative py-20 sm:py-28">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionIntro eyebrow="Four simple steps" title="Here's how *getting started* works." />
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="btn-ghost self-start py-2.5 text-sm md:self-auto"
            aria-label={playing ? "Pause steps" : "Play steps"}
          >
            {playing ? <Pause className="size-4" /> : <Play className="size-4" />} {playing ? "Pause" : "Play"}
          </button>
        </div>

        <div className="mt-10 grid grid-cols-4 gap-2" role="tablist" aria-label="Steps">
          {steps.map((st, k) => (
            <button key={st.title} role="tab" aria-selected={k === i} onClick={() => setI(k)} className="group text-left">
              <span className="block h-1.5 overflow-hidden rounded-full bg-iris-100">
                {k < i && <span className="block h-full w-full bg-linear-to-r from-iris-500 to-blush-500" />}
                {k === i && (
                  <motion.span
                    key={`${i}-${run}`}
                    className="block h-full bg-linear-to-r from-iris-500 to-blush-500"
                    initial={{ width: run ? "0%" : "100%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: run ? DURATION / 1000 : 0, ease: "linear" }}
                  />
                )}
              </span>
              <span
                className={`mt-3 hidden text-sm font-semibold transition-colors sm:block ${k === i ? "text-iris-900" : "text-ink-soft group-hover:text-iris-700"}`}
              >
                {String(k + 1).padStart(2, "0")} {st.title}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-8 grid overflow-hidden rounded-[2.5rem] bg-iris-950 lg:grid-cols-2">
          <div className="relative h-72 sm:h-96 lg:h-[520px]">
            <AnimatePresence initial={false}>
              <motion.div
                key={s.image}
                initial={{ opacity: 0, scale: 1.12 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: EASE }}
                className="absolute inset-0"
              >
                <Image src={s.image} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-linear-to-r from-transparent to-iris-950/30" />
          </div>
          <div className="relative flex flex-col justify-center p-8 text-white sm:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgb(234_106_156/0.2),transparent_50%)]" />
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
                transition={{ duration: 0.5, ease: EASE }}
                className="relative"
              >
                <span className="font-display text-8xl leading-none text-white/10">0{i + 1}</span>
                <span className="mt-4 grid size-14 place-items-center rounded-2xl bg-linear-to-br from-iris-500 to-blush-500">
                  <s.icon className="size-6" />
                </span>
                <h3 className="mt-6 font-display text-4xl text-white">{s.title}</h3>
                <p className="mt-4 text-lg leading-relaxed text-iris-100/80">{s.text}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {s.details.map((d) => (
                    <li key={d} className="glass-dark flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-iris-50">
                      <Check className="size-3.5 text-blush-300" /> {d}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Tick-off checklist with a live progress ring. */
export function ReadyChecklist() {
  const [done, setDone] = useState<number[]>([]);
  const pct = done.length / checklist.length;
  const C = 2 * Math.PI * 52;

  return (
    <section className="relative bg-iris-50/70 py-24 sm:py-28">
      <div className="container-x grid items-center gap-14 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SectionIntro
            eyebrow="Before your first visit"
            title="What to *have ready.*"
            text="None of this is required to call us — but having it handy helps us build the right plan faster. Tick items off as you go."
          />
          <Reveal delay={0.2} className="mt-10 flex items-center gap-6">
            <div className="relative size-32">
              <svg viewBox="0 0 120 120" className="size-full -rotate-90">
                <circle cx="60" cy="60" r="52" fill="none" stroke="#e1d2f8" strokeWidth="10" />
                <motion.circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="url(#ring)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={C}
                  animate={{ strokeDashoffset: C * (1 - pct) }}
                  transition={{ type: "spring", stiffness: 90, damping: 18 }}
                />
                <defs>
                  <linearGradient id="ring">
                    <stop offset="0" stopColor="#8b60d3" />
                    <stop offset="1" stopColor="#ea6a9c" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="absolute inset-0 grid place-items-center font-display text-3xl text-iris-900">
                {done.length}/{checklist.length}
              </span>
            </div>
            <p className="max-w-[14rem] text-ink-soft">
              {done.length === checklist.length ? "All set — you're ready for your visit!" : "items ready for your in-home visit"}
            </p>
          </Reveal>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {checklist.map((c, k) => {
            const on = done.includes(k);
            return (
              <Reveal as="li" key={c} delay={k * 0.05}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => setDone((d) => (on ? d.filter((x) => x !== k) : [...d, k]))}
                  className={`flex h-full w-full items-center gap-4 rounded-[1.4rem] border p-5 text-left transition duration-500 ${
                    on
                      ? "border-transparent bg-white shadow-[0_20px_40px_-25px_rgb(96_52_159/0.6)]"
                      : "border-iris-100 bg-white/60 hover:border-iris-300 hover:bg-white"
                  }`}
                >
                  <motion.span
                    animate={on ? { scale: [1, 1.25, 1] } : { scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className={`grid size-8 shrink-0 place-items-center rounded-full border-2 transition-colors ${
                      on ? "border-transparent bg-linear-to-br from-iris-600 to-blush-500 text-white" : "border-iris-200 text-transparent"
                    }`}
                  >
                    <Check className="size-4" />
                  </motion.span>
                  <span className={`font-medium transition ${on ? "text-iris-400 line-through" : "text-iris-950"}`}>{c}</span>
                </button>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** Dark glass panel for physicians, hospitals and case managers. */
export function ReferralPanel() {
  return (
    <section className="py-12">
      <div className="container-x">
        <Reveal className="relative isolate overflow-hidden rounded-[2.5rem] bg-iris-950 p-8 text-white sm:p-12">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_0%_0%,rgb(139_96_211/0.45),transparent_45%),radial-gradient(circle_at_100%_100%,rgb(234_106_156/0.25),transparent_45%)]" />
          <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <span className="eyebrow-dark">
                <Stethoscope className="size-3.5" /> For referral partners
              </span>
              <h2 className="mt-5 text-4xl font-medium text-white sm:text-5xl">
                Physicians, hospitals &amp; case managers — <span className="text-gradient-light italic">we&apos;re ready.</span>
              </h2>
              <p className="mt-4 max-w-xl text-lg text-iris-100/80">
                Send referrals by fax or call our office to coordinate skilled home health, home care or respite for your
                patients and clients. We&apos;ll keep you updated on their care.
              </p>
            </div>
            <div className="grid gap-3">
              <div className="glass-dark flex items-center gap-4 rounded-2xl p-5">
                <span className="grid size-12 place-items-center rounded-xl bg-white/10 text-blush-200">
                  <Printer className="size-5" />
                </span>
                <span>
                  <span className="block text-xs font-semibold tracking-[0.14em] text-iris-200 uppercase">Referral fax</span>
                  <span className="font-display text-2xl">{site.fax.display}</span>
                </span>
              </div>
              <a href={site.phone.href} className="glass-dark flex items-center gap-4 rounded-2xl p-5 transition hover:bg-white/10">
                <span className="grid size-12 place-items-center rounded-xl bg-blush-500 text-white">
                  <Phone className="size-5" />
                </span>
                <span>
                  <span className="block text-xs font-semibold tracking-[0.14em] text-iris-200 uppercase">Office</span>
                  <span className="font-display text-2xl">{site.phone.display}</span>
                </span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
