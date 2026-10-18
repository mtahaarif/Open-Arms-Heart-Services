"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { RotateCw } from "lucide-react";
import { useRef, useState } from "react";
import { promises } from "@/lib/content";
import { site } from "@/lib/site";
import { LogoMark } from "../../brand/Logo";
import { Marquee } from "../../ui/Marquee";
import { SectionIntro } from "../../ui/SectionIntro";
import { EASE, Reveal } from "../../ui/motion";

/* ───────────── Story: sticky image stack + scrolling chapters ───────────── */

const chapters = [
  {
    kicker: "Where it began",
    title: "A simple idea: treat every client like family.",
    text: `${site.founder.name} founded Open Arms & Heart Services in ${site.founded} with a family-oriented approach to care — the belief that the people we serve deserve the same patience, warmth and respect we'd want for our own parents, children and grandparents.`,
    image: "/images/activities-coloring.jpg",
  },
  {
    kicker: "What we do",
    title: "Two levels of care, one caring team.",
    text: "Today we provide both skilled home health — nursing, therapy, medical social work and home health aides — and non-skilled home care, from personal care and companionship to respite, transportation and support for people with developmental disabilities.",
    image: "/images/nurse-blood-pressure.jpg",
  },
  {
    kicker: "Who we serve",
    title: "Seniors, adults, children — and the families who love them.",
    text: "We care for seniors aging in place, adults recovering after hospital stays, individuals with disabilities, and children and youth who need extra support, across Polk, Lake and Orange counties.",
    image: "/images/therapy-play.jpg",
  },
  {
    kicker: "How we work",
    title: "Listening first. Adjusting always.",
    text: "Every plan starts with a conversation in your home. We keep families in the loop, check in often and adapt as needs change — because good care is never one-size-fits-all.",
    image: "/images/celebration.jpg",
  },
];

export function StoryChapters() {
  const [active, setActive] = useState(0);
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="hidden lg:block">
          <div className="sticky top-32 h-[calc(100vh-10rem)] max-h-[680px]">
            <div className="relative h-full overflow-hidden rounded-[2.5rem] shadow-[0_40px_90px_-40px_rgb(51_27_88/0.6)]">
              {chapters.map((c, i) => (
                <motion.div
                  key={c.image}
                  className="absolute inset-0"
                  initial={false}
                  animate={{
                    opacity: active === i ? 1 : 0,
                    scale: active === i ? 1 : 1.08,
                    clipPath: active >= i ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
                  }}
                  transition={{ duration: 0.9, ease: EASE }}
                >
                  <Image src={c.image} alt="" fill sizes="50vw" className="object-cover" />
                </motion.div>
              ))}
              <div className="absolute inset-0 bg-linear-to-t from-iris-950/60 via-transparent to-transparent" />
              <div className="absolute right-6 bottom-6 left-6 flex items-end justify-between">
                <span className="glass rounded-full px-4 py-2 text-sm font-semibold text-iris-900">{chapters[active].kicker}</span>
                <span className="font-display text-6xl text-white/90">0{active + 1}</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          {chapters.map((c, i) => (
            <motion.div
              key={c.title}
              onViewportEnter={() => setActive(i)}
              viewport={{ margin: "-45% 0px -45% 0px" }}
              className="flex min-h-[60vh] flex-col justify-center py-10 lg:min-h-[75vh]"
            >
              <Reveal>
                <div className="relative mb-6 h-56 overflow-hidden rounded-[2rem] lg:hidden">
                  <Image src={c.image} alt="" fill sizes="100vw" className="object-cover" />
                </div>
                <p className="text-sm font-bold tracking-[0.16em] text-blush-600 uppercase">
                  {String(i + 1).padStart(2, "0")} · {c.kicker}
                </p>
                <h2 className="mt-4 text-4xl leading-[1.08] font-medium sm:text-5xl">{c.title}</h2>
                <p className="mt-5 text-lg leading-relaxed text-ink-soft">{c.text}</p>
              </Reveal>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Name meaning: words slide apart on scroll ───────────── */

export function NameMeaning() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const left = useTransform(scrollYProgress, [0, 1], ["12%", "-18%"]);
  const right = useTransform(scrollYProgress, [0, 1], ["-14%", "16%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-iris-950 py-28 text-white sm:py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgb(139_96_211/0.35),transparent_60%)]" />
      <div className="noise absolute inset-0" />
      <motion.p
        style={{ x: left }}
        className="relative font-display text-[18vw] leading-[0.9] font-medium whitespace-nowrap text-white/90 italic lg:text-[13vw]"
      >
        Open Arms
      </motion.p>
      <div className="relative z-10 my-4 flex justify-center">
        <motion.div style={{ rotate }}>
          <LogoMark tone="light" className="h-24 w-auto sm:h-32" />
        </motion.div>
      </div>
      <motion.p
        style={{ x: right }}
        className="relative text-right font-display text-[18vw] leading-[0.9] font-medium whitespace-nowrap text-transparent lg:text-[13vw]"
      >
        <span style={{ WebkitTextStroke: "2px rgb(244 139 181)" }}>&amp; Heart</span>
      </motion.p>
      <div className="container-x relative mt-14">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xl leading-relaxed text-iris-100/85 sm:text-2xl">
            Our name is our promise. <span className="text-white">Open arms</span> means everyone is welcome.{" "}
            <span className="text-blush-200">Heart</span> means compassion leads everything we do.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────── Founder spotlight ───────────── */

export function FounderSpotlight() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-x">
        <Reveal className="relative isolate grid overflow-hidden rounded-[2.5rem] bg-linear-to-br from-iris-50 via-white to-blush-50 p-8 ring-1 ring-iris-100 sm:p-12 lg:grid-cols-[auto_1fr] lg:gap-14">
          <LogoMark className="absolute -right-10 -bottom-10 -z-10 h-72 w-auto opacity-[0.06]" />
          <div className="relative mx-auto mb-8 h-fit self-center lg:mb-0">
            <div className="animate-spin-slow absolute -inset-3 rounded-full bg-[conic-gradient(from_0deg,var(--color-iris-400),var(--color-blush-400),var(--color-iris-200),var(--color-iris-400))] opacity-70 blur-[2px]" />
            <div className="relative grid size-44 place-items-center rounded-full bg-linear-to-br from-iris-700 to-blush-500 font-display text-6xl text-white ring-8 ring-white sm:size-52">
              SJ
            </div>
          </div>
          <div>
            <span className="eyebrow">
              <span className="size-1.5 rounded-full bg-blush-500" /> Meet our founder
            </span>
            <h2 className="mt-5 text-4xl font-medium sm:text-5xl">{site.founder.name}</h2>
            <p className="mt-1 font-display text-xl text-blush-600 italic">{site.founder.title}</p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
              As founder and President, {site.founder.name} leads Open Arms &amp; Heart Services with a family-oriented
              approach to care — one that brings skilled home health and non-skilled home care together under one roof
              for Central Florida families.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {[`Founded ${site.founded}`, "Florida Medicaid provider", "Serving Polk, Lake & Orange counties"].map((t) => (
                <span key={t} className="glass rounded-full px-4 py-2 text-sm font-semibold text-iris-800">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────── The "Open" promises: 3D flip cards ───────────── */

export function FlipPromises() {
  const [flipped, setFlipped] = useState<number | null>(null);
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-paper to-iris-50 py-24 sm:py-32">
      <div className="container-x">
        <SectionIntro
          align="center"
          eyebrow="Our promise"
          title="Four ways we keep *everything open.*"
          text="Hover or tap a card to turn it over."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {promises.map((p, i) => (
            <Reveal key={p.word} delay={i * 0.08}>
              <button
                type="button"
                onClick={() => setFlipped(flipped === i ? null : i)}
                data-flipped={flipped === i}
                className="flip-scene block h-[340px] w-full text-left"
                aria-label={`${p.title}: ${p.text}`}
              >
                <div className="flip-inner relative h-full w-full">
                  <div className="flip-face absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[2rem] bg-linear-to-br from-iris-700 via-iris-600 to-iris-500 p-7 text-white shadow-[0_30px_60px_-30px_rgb(96_52_159/0.7)]">
                    <div className="absolute -top-16 -right-16 size-48 rounded-full bg-blush-400/30 blur-2xl" />
                    <p.icon className="relative size-8 text-blush-200" />
                    <div className="relative">
                      <p className="font-display text-2xl text-iris-100">Open</p>
                      <p className="font-display text-6xl leading-none italic">{p.word}</p>
                    </div>
                    <span className="relative flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-iris-100/80 uppercase">
                      <RotateCw className="size-3.5" /> Turn over
                    </span>
                  </div>
                  <div className="flip-face flip-back absolute inset-0 flex flex-col justify-center rounded-[2rem] bg-white p-7 ring-1 ring-iris-100">
                    <p className="font-display text-3xl text-gradient italic">{p.title}</p>
                    <p className="mt-4 text-lg leading-relaxed text-ink-soft">{p.text}</p>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Photo marquee ───────────── */

const gallery = [
  "/images/hero-caregiver-laughing.jpg",
  "/images/family-baking.jpg",
  "/images/companion-care.jpg",
  "/images/child-smiling.jpg",
  "/images/seniors-smiling.jpg",
  "/images/personal-supports.jpg",
  "/images/breakfast-family.jpg",
  "/images/occupational-therapy.jpg",
  "/images/grandpa-granddaughter.jpg",
  "/images/bench-sea.jpg",
];

export function PhotoMarquee() {
  const rowA = gallery.slice(0, 5);
  const rowB = gallery.slice(5);
  return (
    <section aria-label="Moments of care" className="overflow-hidden py-20">
      <SectionIntro align="center" eyebrow="Moments that matter" title="The heart of *what we do.*" className="mb-12 px-4" />
      <div className="space-y-4">
        {[rowA, rowB].map((row, r) => (
          <Marquee key={r} duration={50} reverse={r === 1} gap="1rem">
            {row.map((src, i) => (
              <div
                key={src}
                className={`relative h-56 shrink-0 overflow-hidden rounded-[1.75rem] sm:h-72 ${i % 2 ? "w-64 sm:w-80" : "w-80 sm:w-[28rem]"}`}
              >
                <Image src={src} alt="" fill sizes="450px" className="object-cover transition duration-700 hover:scale-110" />
              </div>
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
}
