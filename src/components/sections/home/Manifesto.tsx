"use client";

import { Photo } from "@/components/ui/Photo";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { homeCare, homeHealth } from "@/lib/services";
import { site } from "@/lib/site";
import { Counter, Reveal } from "../../ui/motion";

const TEXT =
  "We believe care should feel like a welcome, not a transaction. So we arrive with open arms, listen with an open heart, and treat every home we enter as if it belongs to our own family.";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [6, 0]);
  const highlight = /open|family|welcome/i.test(children);
  return (
    <motion.span style={{ opacity, y }} className={`mr-[0.25em] inline-block ${highlight ? "text-gradient italic" : ""}`}>
      {children}
    </motion.span>
  );
}

/** Scroll-scrubbed manifesto: each word brightens as you read down the page. */
export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = TEXT.split(" ");

  const stats = [
    { n: homeHealth.services.length, label: "Skilled home health disciplines" },
    { n: homeCare.services.length, label: "Non-skilled home care services" },
    { n: site.areas.length, label: "Central Florida counties served" },
  ];

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Reveal>
            <span className="eyebrow">
              <span className="size-1.5 rounded-full bg-blush-500" /> Our heart
            </span>
          </Reveal>
          <div ref={ref}>
            <p className="mt-8 font-display text-[2rem] leading-[1.18] font-normal text-iris-950 sm:text-5xl sm:leading-[1.12]">
              {words.map((w, i) => (
                <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                  {w}
                </Word>
              ))}
            </p>
          </div>
          <Reveal delay={0.1} className="mt-10">
            <Link href="/about" className="group inline-flex items-center gap-2 text-lg font-semibold text-iris-700">
              <span className="bg-linear-to-r from-iris-600 to-blush-500 bg-[length:0%_2px] bg-bottom-left bg-no-repeat pb-1 transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">
                Read our story
              </span>
              <ArrowRight className="size-5 transition group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="flex flex-col gap-4 lg:col-span-4 lg:pt-20">
          <Reveal className="relative overflow-hidden rounded-[2rem] bg-iris-900 p-7 text-white">
            <Photo src="/images/hands.jpg" alt="" sizes="400px" className="object-cover opacity-25" />
            <div className="relative">
              <p className="text-sm font-semibold tracking-[0.16em] text-blush-200 uppercase">Serving families since</p>
              <p className="mt-1 font-display text-7xl">
                <Counter from={2000} to={site.founded} />
              </p>
              <p className="mt-2 text-iris-100/80">Founded by {site.founder.name}, {site.founder.title.toLowerCase()}.</p>
            </div>
          </Reveal>
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={0.1 * (i + 1)} className="glass flex items-center gap-5 rounded-[1.6rem] p-5">
              <span className="font-display text-5xl text-gradient">
                <Counter to={s.n} />
              </span>
              <span className="text-ink-soft">{s.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
