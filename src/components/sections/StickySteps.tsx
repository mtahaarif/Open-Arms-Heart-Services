"use client";

import { Photo } from "@/components/ui/Photo";
import Link from "next/link";
import { AnimatePresence, motion, useInView, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { steps } from "@/lib/content";
import { SectionIntro } from "../ui/SectionIntro";
import { EASE, Magnetic } from "../ui/motion";

function Step({
  i,
  active,
  onActive,
}: {
  i: number;
  active: boolean;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(i);
  }, [inView, i, onActive]);
  const s = steps[i];

  return (
    <div ref={ref} className="flex min-h-[70vh] items-center py-6 lg:min-h-[78vh]">
      <motion.article
        animate={{ opacity: active ? 1 : 0.35, scale: active ? 1 : 0.96 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="glass w-full overflow-hidden rounded-[2rem]"
      >
        <div className="relative h-56 sm:h-64">
          <Photo src={s.image} alt="" sizes="(min-width: 1280px) 560px, (min-width: 1024px) 45vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-white via-white/10 to-transparent" />
        </div>
        <div className="relative -mt-10 p-7 sm:p-9">
          <span className="grid size-14 place-items-center rounded-2xl bg-linear-to-br from-iris-600 to-blush-500 text-white shadow-lg">
            <s.icon className="size-6" />
          </span>
          <p className="mt-5 text-sm font-semibold tracking-[0.14em] text-blush-700 uppercase">Step {i + 1}</p>
          <h3 className="mt-1 text-3xl font-medium">{s.title}</h3>
          <p className="mt-3 text-lg leading-relaxed text-ink-soft">{s.text}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {s.details.map((d) => (
              <li key={d} className="tick rounded-full bg-iris-50 py-1.5 pr-3 text-sm text-iris-800 [--tick:var(--color-blush-500)] before:!left-2.5 before:!top-2 before:!size-3.5 !pl-7">
                {d}
              </li>
            ))}
          </ul>
        </div>
      </motion.article>
    </div>
  );
}

/** Process with a sticky left column that tracks the active step on the right. */
export function StickySteps({ title = "From first call to *first visit.*" }: { title?: string }) {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const rail = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-20">
        <div>
          <div className="lg:sticky lg:top-32">
            <SectionIntro
              eyebrow="How care begins"
              title={title}
              text="Starting care shouldn't feel complicated. Here's exactly what happens after you reach out."
            />
            <div className="mt-12 hidden items-end gap-8 lg:flex">
              <div className="relative h-40 w-36 overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={active}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="absolute inset-0 font-display text-[9rem] leading-none text-gradient"
                  >
                    0{active + 1}
                  </motion.span>
                </AnimatePresence>
              </div>
              <ol className="relative mb-3 space-y-3 pl-6">
                <span className="absolute top-1 bottom-1 left-0 w-px bg-iris-100" />
                <motion.span style={{ height: rail }} className="absolute top-1 left-0 w-px origin-top bg-linear-to-b from-iris-500 to-blush-500" />
                {steps.map((s, i) => (
                  <li
                    key={s.title}
                    className={`relative text-sm font-semibold transition-colors duration-500 ${i === active ? "text-iris-800" : "text-ink-soft/60"}`}
                  >
                    <span
                      className={`absolute top-1/2 -left-[1.72rem] size-2.5 -translate-y-1/2 rounded-full border-2 transition-colors duration-500 ${
                        i <= active ? "border-blush-500 bg-blush-500" : "border-iris-200 bg-paper"
                      }`}
                    />
                    {s.title}
                  </li>
                ))}
              </ol>
            </div>
            <div className="mt-10">
              <Magnetic>
                <Link href="/getting-started" className="btn-ghost">
                  Getting started guide <ArrowRight className="size-4" />
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>

        <div ref={ref}>
          {steps.map((s, i) => (
            <Step key={s.title} i={i} active={active === i} onActive={setActive} />
          ))}
        </div>
      </div>
    </section>
  );
}
