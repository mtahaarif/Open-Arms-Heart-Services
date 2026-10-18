"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { ChevronRight } from "lucide-react";
import { useRef, type ReactNode } from "react";
import { rich } from "@/lib/rich";
import { Aurora, Ribbons } from "../brand/Ribbons";
import { CssSplitHeading } from "./CssSplitHeading";
import { Photo } from "./Photo";

/**
 * Shared inner-page hero: aurora + ribbons, breadcrumb, split headline and a parallax image collage.
 * Entrances are CSS so the headline and lead image paint at first render (fast LCP);
 * Motion only drives the scroll parallax.
 */
export function PageHero({
  eyebrow,
  title,
  text,
  crumbs,
  images,
  children,
}: {
  eyebrow: string;
  title: string;
  /** Supports **bold** emphasis. */
  text: string;
  crumbs: { href?: string; label: string }[];
  images?: [string, string?];
  children?: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yMain = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const ySub = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <section ref={ref} className="relative overflow-hidden pt-32 pb-16 sm:pt-44 lg:pb-28">
      <Aurora />
      <div className="hairline-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <Ribbons className="absolute -right-24 bottom-0 h-[70%] w-[75%] opacity-60" />

      <div className="container-x relative grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <motion.div style={{ opacity: fade }} className={images ? "lg:col-span-7" : "lg:col-span-10"}>
          <nav aria-label="Breadcrumb" className="enter mb-6 flex flex-wrap items-center gap-1 text-sm text-ink-soft">
            <Link href="/" className="hover:text-iris-700">
              Home
            </Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-1">
                <ChevronRight className="size-3.5 opacity-50" />
                {c.href ? (
                  <Link href={c.href} className="hover:text-iris-700">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="font-medium text-iris-800">
                    {c.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
          <span className="eyebrow enter [--d:60ms]">
            <span className="size-1.5 rounded-full bg-blush-500" />
            {eyebrow}
          </span>
          <CssSplitHeading
            text={title}
            delay={120}
            className="mt-6 text-[2.75rem] leading-[1.02] font-medium text-balance sm:text-6xl lg:text-7xl"
          />
          <p className="enter mt-6 max-w-xl text-lg leading-relaxed text-ink-soft [--d:320ms]">{rich(text)}</p>
          {children && <div className="enter mt-8 flex flex-wrap gap-3 [--d:440ms]">{children}</div>}
        </motion.div>

        {images && (
          <div className="relative mx-auto h-56 w-full sm:h-72 lg:col-span-5 lg:h-[440px] lg:max-w-md">
            <motion.div style={{ y: yMain }} className="absolute inset-0 lg:left-auto lg:w-[78%]">
              <div className="relative size-full overflow-hidden rounded-[2rem] shadow-2xl shadow-iris-900/20 [animation:arch-reveal_1.2s_var(--ease-out-expo)_both] lg:rounded-t-full lg:rounded-b-[32px]">
                <Photo src={images[0]} alt="" priority sizes="(min-width: 1024px) 360px, 92vw" />
                <div className="absolute inset-0 bg-linear-to-t from-iris-900/30 to-transparent" />
              </div>
            </motion.div>
            {images[1] && (
              <motion.div style={{ y: ySub }} className="absolute bottom-6 left-0 hidden lg:block">
                <div className="enter relative size-48 -rotate-4 overflow-hidden rounded-[2rem] border-[6px] border-white shadow-xl [--d:300ms] [--enter:enter-left]">
                  <Photo src={images[1]} alt="" sizes="192px" />
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
