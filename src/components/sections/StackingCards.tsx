"use client";

import { Photo } from "@/components/ui/Photo";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowRight, Phone } from "lucide-react";
import { useRef } from "react";
import { trustQAs } from "@/lib/content";
import { site } from "@/lib/site";
import { SectionIntro } from "../ui/SectionIntro";
import { Magnetic, Reveal } from "../ui/motion";

const tints = ["from-white to-iris-50", "from-white to-blush-50", "from-iris-50 to-white", "from-blush-50 to-white"];

type QA = (typeof trustQAs)[number];

function StackCard({ item, i, total, progress }: { item: QA; i: number; total: number; progress: MotionValue<number> }) {
  const start = i / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - i) * 0.035]);
  const dim = useTransform(progress, [start, Math.min(1, start + 0.25)], [0, i === total - 1 ? 0 : 0.18]);

  return (
    <div className="sticky min-h-[74svh] md:h-[80vh] md:min-h-[560px]" style={{ top: `calc(5.5rem + ${i * 14}px)` }}>
      <motion.article
        style={{ scale, transformOrigin: "top center" }}
        className={`relative grid h-auto overflow-hidden rounded-[2.25rem] border border-white bg-linear-to-br shadow-[0_30px_80px_-40px_rgb(51_27_88/0.45)] md:grid-cols-[1.15fr_1fr] ${tints[i % tints.length]}`}
      >
        <div className="flex flex-col p-6 sm:p-10">
          <div className="flex items-center gap-4">
            <span className="grid size-14 place-items-center rounded-2xl bg-linear-to-br from-iris-600 to-blush-500 text-white shadow-lg shadow-iris-600/25">
              <item.icon className="size-6" />
            </span>
            <span className="font-display text-sm text-iris-400">
              {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
          <h3 className="mt-6 text-3xl font-medium sm:text-4xl">{item.q}</h3>
          <p className="mt-3 text-base leading-relaxed text-ink-soft sm:text-lg">{item.a}</p>
          {item.chips && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {item.chips.map((c) => (
                <li key={c} className="rounded-full bg-white/85 px-3 py-1.5 text-sm font-medium text-iris-900 ring-1 ring-iris-100">
                  {c}
                </li>
              ))}
            </ul>
          )}
          {item.link && (
            <Link href={item.link.href} className="group mt-6 inline-flex items-center gap-2 font-semibold text-iris-700">
              {item.link.label} <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </Link>
          )}
        </div>
        <div className="relative hidden min-h-[320px] md:block">
          <Photo src={item.image} alt={item.imageAlt} sizes="(min-width: 1280px) 400px, 45vw" className="object-cover" />
          <div className="absolute inset-0 bg-linear-to-r from-white/30 to-transparent" />
        </div>
        <motion.div style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-iris-950" />
      </motion.article>
    </div>
  );
}

/** The agency's home-page Q&As as sticky stacking cards beside a sticky intro column. */
export function StackingCards() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section className="relative py-24 sm:py-32" aria-label="Questions families ask first">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionIntro
              eyebrow="Peace of mind"
              title="Questions & *answers.*"
              text="Your safety, trust, and peace of mind are our highest priorities."
            />
            <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <a href={site.phone.href} className="btn-primary">
                  <Phone className="size-4" /> {site.phone.display}
                </a>
              </Magnetic>
              <Link href="/faq" className="btn-ghost">
                All FAQs <ArrowRight className="size-4" />
              </Link>
            </Reveal>
          </div>
        </div>

        <div ref={ref} className="relative lg:col-span-8">
          {trustQAs.map((item, i) => (
            <StackCard key={item.q} item={item} i={i} total={trustQAs.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
