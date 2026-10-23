"use client";

import { Photo } from "@/components/ui/Photo";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { sinceLine, site } from "@/lib/site";
import { LogoMark } from "../../brand/Logo";
import { Marquee } from "../../ui/Marquee";
import { SectionIntro } from "../../ui/SectionIntro";
import { EASE, Reveal } from "../../ui/motion";

/* ───────────── Story: sticky image stack + scrolling chapters ───────────── */

// The four paragraphs of the original About Us page, verbatim.
const chapters = [
  {
    kicker: "Since 2017",
    title: "High-quality, person-centered care.",
    text: "Shantana Johnson is the proud owner of Open Arms & Heart Services Inc., where her passion for delivering high-quality, person-centered care is rooted in deeply personal experiences since 2017.",
    image: "/images/activities-coloring.jpg",
  },
  {
    kicker: "Her inspiration",
    title: "Inspired by her grandmother.",
    text: "Shantana was inspired by her grandmother, who devoted herself to caring for both her mother, who was living with Alzheimer's disease, and her son with developmental disabilities. Witnessing her grandmother's selfless dedication and compassion left a lasting impression and inspired Shantana to pursue a life of service to others.",
    image: "/images/grandpa-granddaughter.jpg",
  },
  {
    kicker: "Her legacy",
    title: "Patience, love, and exceptional caregiving.",
    text: "Although her grandmother has since passed, the patience, love, and exceptional caregiving she demonstrated continue to guide Shantana's work every day. She carries on that legacy not only through her professional mission but also by continuing to provide care and support to her own uncle.",
    image: "/images/personal-supports.jpg",
  },
  {
    kicker: "Our commitment",
    title: "The same attention and dignity as family.",
    text: "Through Open Arms & Heart Services Inc., Shantana and her staff is committed to ensuring that every individual and family served receives compassionate, respectful, and personalized care. The organization strives to treat every person with the same attention and dignity as family, supporting their independence, well-being, and quality of life.",
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
                  <Photo src={c.image} alt="" sizes="(min-width: 1280px) 600px, 45vw" className="object-cover" />
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
                  <Photo src={c.image} alt="" sizes="(min-width: 1024px) 1px, 92vw" className="object-cover" />
                </div>
                <p className="text-sm font-bold tracking-[0.16em] text-blush-700 uppercase">
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
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-sans text-sm font-bold tracking-[0.2em] text-blush-200 uppercase">Our mission</h2>
          <p className="mt-5 font-display text-2xl leading-relaxed text-white sm:text-3xl">
            To work in partnership with our consumers to help them achieve their goals of{" "}
            <span className="text-gradient-light italic">independence, productivity, and meaningful integration</span>{" "}
            within their communities.
          </p>
          <p className="mt-5 text-lg text-iris-100/80">
            We are committed to fulfilling the needs of our consumers with excellence and care.
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
        <Reveal className="relative isolate grid items-center gap-10 overflow-hidden rounded-[2.5rem] bg-linear-to-br from-iris-50 via-white to-blush-50 p-6 ring-1 ring-iris-100 sm:p-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <LogoMark className="absolute -right-10 -bottom-10 -z-10 h-72 w-auto opacity-[0.06]" />
          <div className="relative mx-auto w-full max-w-sm">
            {/* Rotating gradient border */}
            <div className="relative overflow-hidden rounded-[2.3rem] p-[6px] shadow-[0_30px_70px_-30px_rgb(96_52_159/0.6)]">
              <div className="animate-spin-slow absolute -inset-1/2 bg-[conic-gradient(from_0deg,var(--color-iris-500),var(--color-blush-400),var(--color-iris-200),var(--color-blush-500),var(--color-iris-500))]" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-white">
                <Photo
                  src="/images/founder-shantana-johnson.jpg"
                  alt={`${site.owner.name}, ${site.owner.title.toLowerCase()} of Open Arms & Heart Services`}
                  sizes="(min-width: 1024px) 384px, 90vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
            <div className="glass absolute -bottom-5 left-1/2 z-10 w-max -translate-x-1/2 rounded-full px-5 py-2.5 text-sm font-semibold text-iris-900">
              {sinceLine}
            </div>
          </div>
          <div>
            <span className="eyebrow">
              <span className="size-1.5 rounded-full bg-blush-500" /> Meet the owner
            </span>
            <h2 className="mt-5 text-4xl font-medium sm:text-5xl">{site.owner.name}</h2>
            <p className="mt-1 font-display text-xl text-blush-700 italic">{site.owner.title}</p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {site.owner.name} is the proud owner of Open Arms &amp; Heart Services Inc., where her passion for
              delivering <strong className="font-semibold text-iris-900">high-quality, person-centered care</strong> is rooted
              in deeply personal experiences since {site.since}.
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Through Open Arms &amp; Heart Services Inc., Shantana and her staff is committed to ensuring that every
              individual and family served receives compassionate, respectful, and personalized care.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {[...site.credentials, sinceLine].map((t) => (
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
                <Photo src={src} alt="" sizes="(min-width: 640px) 448px, 320px" className="object-cover transition duration-700 hover:scale-110" />
              </div>
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
}
