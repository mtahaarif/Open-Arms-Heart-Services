"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { useRef } from "react";
import { homeCare, homeHealth, type PillarSlug, type Service } from "@/lib/services";
import { SectionIntro } from "../ui/SectionIntro";
import { Magnetic, Reveal } from "../ui/motion";

const tints = [
  "from-white to-iris-50",
  "from-white to-blush-50",
  "from-iris-50 to-white",
  "from-blush-50 to-white",
];

function StackCard({
  s,
  i,
  total,
  progress,
  href,
}: {
  s: Service;
  i: number;
  total: number;
  progress: MotionValue<number>;
  href: string;
}) {
  const start = i / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - i) * 0.035]);
  const dim = useTransform(progress, [start, Math.min(1, start + 0.25)], [0, i === total - 1 ? 0 : 0.18]);

  return (
    <div className="mb-5 md:sticky md:mb-0 md:h-[80vh] md:min-h-[560px]" style={{ top: `calc(7rem + ${i * 18}px)` }}>
      <motion.article
        style={{ scale, transformOrigin: "top center" }}
        className={`relative grid h-auto overflow-hidden rounded-[2.25rem] border border-white bg-linear-to-br shadow-[0_30px_80px_-40px_rgb(51_27_88/0.45)] md:grid-cols-[1.05fr_1fr] ${tints[i % tints.length]}`}
      >
        <div className="flex flex-col p-7 sm:p-10">
          <div className="flex items-center gap-4">
            <span className="grid size-14 place-items-center rounded-2xl bg-linear-to-br from-iris-600 to-blush-500 text-white shadow-lg shadow-iris-600/25">
              <s.icon className="size-6" />
            </span>
            <span className="font-display text-sm text-iris-400">
              {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
          <h3 className="mt-6 text-3xl font-medium sm:text-4xl">{s.name}</h3>
          <p className="mt-3 text-lg leading-relaxed text-ink-soft">{s.summary}</p>
          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {s.points.map((p) => (
              <li key={p} className="flex items-start gap-2 text-[0.95rem] text-ink">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-iris-100 text-iris-700">
                  <Check className="size-3" />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-6 rounded-2xl bg-white/70 p-4 text-sm text-ink-soft">
            <span className="font-semibold text-iris-800">Who it helps: </span>
            {s.helps}
          </p>
          <Link href={`${href}#${s.slug}`} className="group mt-6 inline-flex items-center gap-2 font-semibold text-iris-700">
            More about {s.name.toLowerCase()} <ArrowRight className="size-4 transition group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="relative hidden min-h-[320px] md:block">
          <Image src={s.image} alt={s.imageAlt} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-linear-to-r from-white/30 to-transparent" />
        </div>
        <motion.div style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-iris-950" />
      </motion.article>
    </div>
  );
}

/** Sticky intro on the left; service cards pin and stack on the right as you scroll. */
export function StackingCards({ slug }: { slug: PillarSlug }) {
  const pillar = slug === "home-health" ? homeHealth : homeCare;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section className="relative py-24 sm:py-32" aria-label={`${pillar.name} services`}>
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionIntro
              eyebrow={`${pillar.name} · ${pillar.level}`}
              title={`Everyday help, *with heart.*`}
              text={pillar.intro}
            />
            <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <Link href={pillar.href} className="btn-primary">
                  All home care services <ArrowRight className="size-4" />
                </Link>
              </Magnetic>
            </Reveal>
            <Reveal delay={0.3} className="mt-10 hidden lg:block">
              <ol className="space-y-1 border-l border-iris-100 pl-5 text-sm text-ink-soft">
                {pillar.services.map((s) => (
                  <li key={s.slug}>{s.name}</li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>

        <div ref={ref} className="relative lg:col-span-8">
          {pillar.services.map((s, i) => (
            <StackCard key={s.slug} s={s} i={i} total={pillar.services.length} progress={scrollYProgress} href={pillar.href} />
          ))}
        </div>
      </div>
    </section>
  );
}
