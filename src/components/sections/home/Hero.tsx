"use client";

import { Photo } from "@/components/ui/Photo";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Accessibility, ArrowRight, BadgeCheck, HandHeart, HeartHandshake, Phone } from "lucide-react";
import { useRef } from "react";
import { sinceLine, site } from "@/lib/site";
import { Aurora, Ribbons } from "../../brand/Ribbons";
import { CssSplitHeading } from "../../ui/CssSplitHeading";
import { Magnetic } from "../../ui/motion";

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
          <div className="eyebrow enter">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-blush-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-blush-500" />
            </span>
            {sinceLine}
          </div>

          <CssSplitHeading
            delay={80}
            text="Home is where *the heart is.*"
            className="mt-7 text-[3.1rem] leading-[0.98] font-medium text-balance sm:text-7xl lg:text-[5.4rem]"
          />
          <p className="enter mt-4 font-display text-2xl text-blush-700 italic [--d:280ms] sm:text-3xl">
            Where there is love, there is life.
          </p>

          <p className="enter mt-6 max-w-xl text-lg leading-relaxed text-ink-soft [--d:350ms] sm:text-xl">
            Caring for a developmentally disabled family member or senior can be extremely challenging, and{" "}
            <strong className="font-semibold text-iris-800">we are here to help.</strong> We provide dedicated,{" "}
            <strong className="font-semibold text-iris-800">family-oriented care that comes from the heart.</strong>
          </p>

          <div className="enter mt-9 flex flex-wrap items-center gap-3 [--d:480ms]">
            <Magnetic>
              <Link href="/contact" className="btn-primary px-7 py-4 text-base">
                Request more information <ArrowRight className="size-4" />
              </Link>
            </Magnetic>
            <Magnetic>
              <a href={site.phone.href} className="btn-ghost px-6 py-4 text-base">
                <Phone className="size-4 text-blush-700" /> {site.phone.display}
              </a>
            </Magnetic>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-iris-900">
            {[...site.credentials, "Level 2 background screening"].map((t, i) => (
              <li key={t} className="enter flex items-center gap-2" style={{ ["--d" as string]: `${620 + i * 90}ms` }}>
                <BadgeCheck className="size-4.5 text-blush-500" /> {t}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Composition — entrances are CSS (instant paint); parallax/tilt stay in Motion. */}
        <motion.div
          style={{ y: yImg, rotateX: tiltX, rotateY: tiltY, transformPerspective: 1200 }}
          className="relative mx-auto h-[520px] w-full max-w-[540px] sm:h-[600px] lg:col-span-6"
        >
          <div className="absolute top-0 right-2 bottom-10 left-12 overflow-hidden rounded-t-full rounded-b-[48px] shadow-[0_40px_100px_-30px_rgb(51_27_88/0.55)] [animation:arch-reveal_1.2s_var(--ease-out-expo)_both] sm:left-20">
            <motion.div style={far} className="absolute -inset-6">
              <Photo
                src="/images/hero-caregiver-laughing.jpg"
                alt="A caregiver in lavender scrubs sharing a laugh with an older woman"
                priority
                sizes="(min-width: 1024px) 540px, (min-width: 640px) 480px, 92vw"
                
              />
            </motion.div>
            <div className="absolute inset-0 bg-linear-to-t from-iris-950/45 via-transparent to-transparent" />
          </div>

          {/* Secondary circular photo */}
          <motion.div style={near} className="absolute bottom-0 left-0">
            <div className="enter relative size-40 overflow-hidden rounded-full border-[7px] border-paper shadow-2xl [--d:450ms] [--enter:enter-pop] sm:size-48">
              <Photo
                src="/images/aide-smiling-patient.jpg"
                alt=""
                sizes="192px"
                
              />
            </div>
          </motion.div>

          {/* Floating glass cards */}
          <motion.div style={near} className="absolute top-16 left-0 sm:top-20">
            <div className="enter [--d:650ms] [--enter:enter-left]">
              <div className="animate-float" style={{ ["--r" as string]: "-2deg" }}>
                <Link
                  href="/services#home-care"
                  className="glass group flex items-center gap-3 rounded-2xl py-3 pr-5 pl-3 transition duration-500 hover:scale-[1.04]"
                >
                  <span className="grid size-11 place-items-center rounded-xl bg-iris-600 text-white">
                    <HeartHandshake className="size-5" />
                  </span>
                  <span>
                    <span className="block text-[0.68rem] font-bold tracking-[0.16em] text-blush-700 uppercase">Non-Skilled</span>
                    <span className="block font-display text-lg leading-tight text-iris-950">Home Health Services</span>
                    <span className="block text-xs text-ink-soft">Personal care · Companionship · Respite</span>
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div style={far} className="absolute right-0 bottom-24 sm:-right-4">
            <div className="enter [--d:800ms] [--enter:enter-right]">
              <div className="animate-float-slow" style={{ ["--r" as string]: "2deg" }}>
                <Link
                  href="/services#apd"
                  className="glass group flex items-center gap-3 rounded-2xl py-3 pr-5 pl-3 transition duration-500 hover:scale-[1.04]"
                >
                  <span className="grid size-11 place-items-center rounded-xl bg-blush-500 text-white">
                    <Accessibility className="size-5" />
                  </span>
                  <span>
                    <span className="block text-[0.68rem] font-bold tracking-[0.16em] text-iris-600 uppercase">APD</span>
                    <span className="block font-display text-lg leading-tight text-iris-950">Central Region Provider</span>
                    <span className="block text-xs text-ink-soft">Personal Supports · Group Home</span>
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div style={near} className="absolute -top-6 right-6 sm:right-0">
            <div className="glass enter rounded-full p-1 [--d:900ms] [--enter:enter-pop]">
              <RotatingBadge />
            </div>
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
