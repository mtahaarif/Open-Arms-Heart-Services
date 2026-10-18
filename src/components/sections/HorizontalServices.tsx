"use client";

import { Photo } from "@/components/ui/Photo";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import { homeCare, homeHealth, type PillarSlug } from "@/lib/services";
import { GlowCard } from "../ui/GlowCard";
import { rich } from "@/lib/rich";

/**
 * Pinned horizontal scroller: the section sticks to the viewport while vertical
 * scroll drives the card track sideways.
 */
export function HorizontalServices({ slug }: { slug: PillarSlug }) {
  const pillar = slug === "home-health" ? homeHealth : homeCare;
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [vh, setVh] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
      setVh(window.innerHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (p) => -p * distance);
  const smoothX = useSpring(x, { stiffness: 140, damping: 30, mass: 0.6 });
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-iris-950"
      style={{ height: distance ? distance + vh : "320vh" }}
      aria-label={`${pillar.name} services`}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgb(139_96_211/0.35),transparent_40%),radial-gradient(circle_at_90%_80%,rgb(234_106_156/0.18),transparent_40%)]" />
        <div className="noise absolute inset-0" />

        <motion.div ref={trackRef} style={{ x: smoothX }} className="relative flex w-max items-stretch gap-5 pr-[8vw] pl-4 sm:gap-6 sm:pl-[6vw]">
          {/* Intro panel */}
          <div className="flex w-[82vw] shrink-0 flex-col justify-center pr-4 text-white sm:w-[480px] sm:pr-10">
            <span className="eyebrow-dark w-fit">
              <span className="size-1.5 rounded-full bg-blush-300" /> {pillar.name} · {pillar.level}
            </span>
            <h2 className="mt-6 text-5xl leading-[1.02] font-medium text-white sm:text-6xl">
              {pillar.headline.split(",")[0]},
              <span className="text-gradient-light block italic">{pillar.headline.split(",")[1]?.trim() ?? ""}</span>
            </h2>
            <p className="mt-6 max-w-md text-lg text-iris-100/75">{rich(pillar.intro)}</p>
            <div className="mt-10 flex items-center gap-4 text-sm text-iris-200/80">
              <div className="h-1 w-40 overflow-hidden rounded-full bg-white/10">
                <motion.div style={{ width: bar }} className="h-full rounded-full bg-linear-to-r from-iris-400 to-blush-400" />
              </div>
              Keep scrolling
            </div>
          </div>

          {pillar.services.map((s, i) => (
            <GlowCard
              key={s.slug}
              as="article"
              className="group flex w-[82vw] shrink-0 flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl sm:w-[400px]"
            >
              <div className="relative h-52 overflow-hidden sm:h-60">
                <Photo
                  src={s.image}
                  alt={s.imageAlt}
                  sizes="(min-width: 640px) 400px, 82vw"
                  className="object-cover transition duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-iris-950 via-iris-950/20 to-transparent" />
                <span className="absolute top-5 left-5 font-display text-5xl text-white/90">{String(i + 1).padStart(2, "0")}</span>
                <span className="glass-dark absolute top-5 right-5 grid size-12 place-items-center rounded-2xl text-blush-200">
                  <s.icon className="size-5" />
                </span>
              </div>
              <div className="relative z-10 flex flex-1 flex-col p-7">
                <h3 className="font-display text-2xl text-white">{s.name}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-iris-100/70">{s.summary}</p>
                <ul className="mt-5 space-y-2">
                  {s.points.map((pt) => (
                    <li key={pt} className="tick text-sm text-iris-50/90 [--tick:var(--color-blush-300)]">
                      {pt}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`${pillar.href}#${s.slug}`}
                  className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-semibold text-blush-200 transition hover:text-white"
                >
                  Learn more<span className="sr-only"> about {s.name.toLowerCase()}</span> <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </GlowCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
