"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { ChevronRight } from "lucide-react";
import { useRef, type ReactNode } from "react";
import { Aurora, Ribbons } from "../brand/Ribbons";
import { EASE, SplitHeading } from "./motion";

/** Shared inner-page hero: aurora + ribbons, breadcrumb, split headline and a parallax image collage. */
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
    <section ref={ref} className="relative overflow-hidden pt-36 pb-20 sm:pt-44 lg:pb-28">
      <Aurora />
      <div className="hairline-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <Ribbons className="absolute -right-24 bottom-0 h-[70%] w-[75%] opacity-60" />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-12">
        <motion.div style={{ opacity: fade }} className={images ? "lg:col-span-7" : "lg:col-span-10"}>
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-6 flex flex-wrap items-center gap-1 text-sm text-ink-soft"
          >
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
          </motion.nav>
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
          >
            <span className="size-1.5 rounded-full bg-blush-500" />
            {eyebrow}
          </motion.span>
          <SplitHeading
            as="h1"
            text={title}
            delay={0.1}
            className="mt-6 text-[2.75rem] leading-[1.02] font-medium sm:text-6xl lg:text-7xl"
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft"
          >
            {text}
          </motion.p>
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
              className="mt-8 flex flex-wrap gap-3"
            >
              {children}
            </motion.div>
          )}
        </motion.div>

        {images && (
          <div className="relative mx-auto hidden h-[440px] w-full max-w-md lg:col-span-5 lg:block">
            <motion.div
              style={{ y: yMain }}
              initial={{ opacity: 0, scale: 0.92, borderRadius: "40%" }}
              animate={{ opacity: 1, scale: 1, borderRadius: "999px 999px 32px 32px" }}
              transition={{ duration: 1.2, ease: EASE }}
              className="absolute inset-y-0 right-0 w-[78%] overflow-hidden shadow-2xl shadow-iris-900/20"
            >
              <Image src={images[0]} alt="" fill priority sizes="360px" className="object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-iris-900/30 to-transparent" />
            </motion.div>
            {images[1] && (
              <motion.div
                style={{ y: ySub }}
                initial={{ opacity: 0, x: -30, rotate: -8 }}
                animate={{ opacity: 1, x: 0, rotate: -4 }}
                transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
                className="absolute bottom-6 left-0 size-48 overflow-hidden rounded-[2rem] border-[6px] border-white shadow-xl"
              >
                <Image src={images[1]} alt="" fill sizes="192px" className="object-cover" />
              </motion.div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
