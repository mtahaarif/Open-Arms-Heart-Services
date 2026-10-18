"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowRight, BadgeCheck, HandHeart, Phone, Stethoscope } from "lucide-react";
import { useRef } from "react";
import { site } from "@/lib/site";
import { Aurora, Ribbons } from "../../brand/Ribbons";
import { EASE, Magnetic, SplitHeading } from "../../ui/motion";

function RotatingBadge() {
  return (
    <div className="relative grid size-32 place-items-center">
      <svg viewBox="0 0 100 100" className="animate-spin-slow absolute inset-0 size-full" aria-hidden="true">
        <defs>
          <path id="badge-circle" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" />
        </defs>
        <text className="fill-iris-800 font-sans text-[9.5px] font-bold tracking-[0.28em] uppercase">
          <textPath href="#badge-circle">open arms • open heart • since 2017 •</textPath>
        </text>
      </svg>
      <span className="grid size-14 place-items-center rounded-full bg-linear-to-br from-iris-600 to-blush-500 text-white shadow-lg shadow-blush-500/30">
        <HandHeart className="size-6" />
      </span>
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Mouse parallax for the floating composition
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 18 });
  const smy = useSpring(my, { stiffness: 60, damping: 18 });
  const near = { x: useTransform(smx, (v) => v * 26), y: useTransform(smy, (v) => v * 26) };
  const far = { x: useTransform(smx, (v) => v * -14), y: useTransform(smy, (v) => v * -14) };
  const tiltX = useTransform(smy, (v) => v * -4);
  const tiltY = useTransform(smx, (v) => v * 4);

  return (
    <section
      ref={ref}
      className="relative isolate min-h-[100svh] overflow-hidden pt-32 pb-20 sm:pt-40 lg:pt-44"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
      }}
    >
      <Aurora />
      <div className="hairline-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]" />
      <Ribbons className="absolute right-0 bottom-0 -z-0 h-[75%] w-full opacity-70 lg:w-[70%]" />

      <div className="container-x relative grid items-center gap-16 lg:grid-cols-12 lg:gap-8">
        <motion.div style={{ y: yText, opacity }} className="lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="eyebrow"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-blush-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-blush-500" />
            </span>
            Home health &amp; home care · Central Florida
          </motion.div>

          <SplitHeading
            as="h1"
            delay={0.1}
            text="Care that welcomes you with *open arms.*"
            className="mt-7 text-[3.1rem] leading-[0.98] font-medium sm:text-7xl lg:text-[5.4rem]"
          />

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl"
          >
            From nurse and therapy visits after a hospital stay to a friendly face at the kitchen table —{" "}
            <span className="font-semibold text-iris-800">{site.shortName}</span> brings skilled and non-skilled care
            home to families across Central Florida.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <Link href="/contact" className="btn-primary px-7 py-4 text-base">
                Request a care consultation <ArrowRight className="size-4" />
              </Link>
            </Magnetic>
            <Magnetic>
              <a href={site.phone.href} className="btn-ghost px-6 py-4 text-base">
                <Phone className="size-4 text-blush-600" /> {site.phone.display}
              </a>
            </Magnetic>
          </motion.div>

          <motion.ul
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.9 } } }}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-iris-900"
          >
            {["Florida Medicaid provider", "Skilled & non-skilled care", `Family-oriented since ${site.founded}`].map((t) => (
              <motion.li
                key={t}
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
                className="flex items-center gap-2"
              >
                <BadgeCheck className="size-4.5 text-blush-500" /> {t}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Composition */}
        <motion.div
          style={{ y: yImg, rotateX: tiltX, rotateY: tiltY, transformPerspective: 1200 }}
          className="relative mx-auto h-[520px] w-full max-w-[540px] sm:h-[600px] lg:col-span-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 60, borderRadius: "48px" }}
            animate={{ opacity: 1, y: 0, borderRadius: "999px 999px 48px 48px" }}
            transition={{ duration: 1.3, delay: 0.2, ease: EASE }}
            className="absolute top-0 right-2 bottom-10 left-12 overflow-hidden shadow-[0_40px_100px_-30px_rgb(51_27_88/0.55)] sm:left-20"
          >
            <motion.div style={far} className="absolute -inset-6">
              <Image
                src="/images/hero-caregiver-laughing.jpg"
                alt="A caregiver in lavender scrubs sharing a laugh with an older woman"
                fill
                priority
                sizes="(min-width: 1024px) 520px, 90vw"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-linear-to-t from-iris-950/45 via-transparent to-transparent" />
          </motion.div>

          {/* Secondary circular photo */}
          <motion.div
            style={near}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: EASE }}
            className="absolute bottom-0 left-0 size-40 overflow-hidden rounded-full border-[7px] border-paper shadow-2xl sm:size-48"
          >
            <Image src="/images/aide-smiling-patient.jpg" alt="" fill sizes="192px" className="object-cover" />
          </motion.div>

          {/* Floating glass cards */}
          <motion.div
            style={near}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.85, ease: EASE }}
            className="absolute top-16 left-0 sm:top-20"
          >
            <div className="animate-float" style={{ ["--r" as string]: "-2deg" }}>
            <Link
              href="/services/home-health"
              className="glass group flex items-center gap-3 rounded-2xl py-3 pr-5 pl-3 transition duration-500 hover:scale-[1.04]"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-iris-600 text-white">
                <Stethoscope className="size-5" />
              </span>
              <span>
                <span className="block text-[0.68rem] font-bold tracking-[0.16em] text-blush-600 uppercase">Skilled</span>
                <span className="block font-display text-lg leading-tight text-iris-950">Home Health</span>
                <span className="block text-xs text-ink-soft">Nursing · PT · OT · Speech</span>
              </span>
            </Link>
            </div>
          </motion.div>

          <motion.div
            style={far}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1, ease: EASE }}
            className="absolute right-0 bottom-24 sm:-right-4"
          >
            <div className="animate-float-slow" style={{ ["--r" as string]: "2deg" }}>
            <Link
              href="/services/home-care"
              className="glass group flex items-center gap-3 rounded-2xl py-3 pr-5 pl-3 transition duration-500 hover:scale-[1.04]"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-blush-500 text-white">
                <HandHeart className="size-5" />
              </span>
              <span>
                <span className="block text-[0.68rem] font-bold tracking-[0.16em] text-iris-600 uppercase">Non-skilled</span>
                <span className="block font-display text-lg leading-tight text-iris-950">Home Care</span>
                <span className="block text-xs text-ink-soft">Personal care · Companions · Respite</span>
              </span>
            </Link>
            </div>
          </motion.div>

          <motion.div
            style={near}
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 1.1, ease: EASE }}
            className="glass absolute -top-6 right-6 rounded-full p-1 sm:right-0"
          >
            <RotatingBadge />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.7rem] font-semibold tracking-[0.2em] text-iris-700/70 uppercase lg:flex"
      >
        Scroll
        <span className="flex h-10 w-6 justify-center rounded-full border border-iris-300 pt-2">
          <motion.span
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-2 w-1 rounded-full bg-iris-500"
          />
        </span>
      </motion.div>
    </section>
  );
}
