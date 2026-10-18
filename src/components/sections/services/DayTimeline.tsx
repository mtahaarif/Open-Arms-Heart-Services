"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { Moon, Sun, Sunrise, Sunset } from "lucide-react";
import { useRef } from "react";
import { dayTimeline } from "@/lib/content";
import { SectionIntro } from "../../ui/SectionIntro";
import { EASE } from "../../ui/motion";

const icons = [Sunrise, Sun, Sun, Sun, Sunset, Moon];

/** Alternating timeline whose centre line draws itself as you scroll. */
export function DayTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-paper via-blush-50/60 to-paper py-24 sm:py-32">
      <div className="container-x">
        <SectionIntro
          align="center"
          eyebrow="A day with Open Arms"
          title="What a day of home care *can look like.*"
          text="Every plan is personal — here's one example of how non-skilled care fits gently around a day."
        />

        <div ref={ref} className="relative mx-auto mt-16 max-w-5xl">
          <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-iris-100 md:left-1/2 md:-translate-x-1/2" />
          <motion.div
            style={{ scaleY }}
            className="absolute top-0 bottom-0 left-6 w-0.5 origin-top bg-linear-to-b from-iris-500 via-blush-400 to-iris-700 md:left-1/2 md:-translate-x-1/2"
          />

          <ol className="space-y-10 md:space-y-4">
            {dayTimeline.map((d, i) => {
              const Icon = icons[i] ?? Sun;
              const right = i % 2 === 1;
              return (
                <li key={d.time} className="relative grid md:grid-cols-2 md:gap-16">
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "0px 0px -30% 0px" }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="absolute top-6 left-6 z-10 grid size-12 -translate-x-1/2 place-items-center rounded-full bg-white text-iris-600 shadow-lg ring-4 ring-paper md:left-1/2"
                  >
                    <Icon className="size-5" />
                  </motion.span>
                  <motion.div
                    initial={{ opacity: 0, x: right ? 60 : -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "0px 0px -20% 0px" }}
                    transition={{ duration: 0.8, ease: EASE }}
                    className={`ml-16 md:ml-0 ${right ? "md:col-start-2" : "md:col-start-1 md:text-right"}`}
                  >
                    <div className="glass inline-block w-full rounded-[1.75rem] p-6 text-left md:max-w-md">
                      <div className={`flex items-center gap-3 ${right ? "" : "md:flex-row-reverse"}`}>
                        <span className="rounded-full bg-iris-900 px-3 py-1 text-xs font-bold tracking-wide text-white">{d.time}</span>
                        <span className="text-xs font-semibold tracking-[0.14em] text-blush-600 uppercase">{d.service}</span>
                      </div>
                      <h3 className={`mt-4 font-display text-2xl ${right ? "" : "md:text-right"}`}>{d.title}</h3>
                      <p className={`mt-2 text-ink-soft ${right ? "" : "md:text-right"}`}>{d.text}</p>
                    </div>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
