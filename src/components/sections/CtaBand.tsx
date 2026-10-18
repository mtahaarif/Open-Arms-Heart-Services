"use client";

import { Photo } from "@/components/ui/Photo";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Phone } from "lucide-react";
import { useRef } from "react";
import { site } from "@/lib/site";
import { LogoMark } from "../brand/Logo";
import { Ribbons } from "../brand/Ribbons";
import { Magnetic, Reveal, SplitHeading } from "../ui/motion";

/** Closing call-to-action: parallax photo, iris gradient wash, glass card and animated ribbons. */
export function CtaBand({
  title = "Let's talk about care for *someone you love.*",
  text = "Tell us what's going on and we'll help you find the right mix of skilled and non-skilled support — no pressure, no obligation.",
  image = "/images/breakfast-family.jpg",
}: {
  title?: string;
  text?: string;
  image?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.94, 1]);

  return (
    <section className="py-20 sm:py-28">
      <div className="container-x">
        <motion.div
          ref={ref}
          style={{ scale }}
          className="relative isolate overflow-hidden rounded-[2.5rem] bg-iris-950 px-6 py-16 sm:px-12 sm:py-20 lg:px-20"
        >
          <motion.div style={{ y }} className="absolute inset-[-14%_0] -z-10">
            <Photo src={image} alt="" sizes="(min-width: 1024px) 960px, 100vw" className="object-cover opacity-40" />
          </motion.div>
          <div className="absolute inset-0 -z-10 bg-linear-to-br from-iris-950 via-iris-900/90 to-blush-800/70" />
          <div className="noise absolute inset-0 -z-10" />
          <Ribbons className="absolute -right-20 -bottom-10 -z-10 h-full w-[80%] opacity-70" />
          <LogoMark tone="light" className="absolute -top-10 -left-10 -z-10 h-64 w-auto opacity-[0.07]" />

          <div className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <SplitHeading
                text={title}
                className="text-4xl leading-[1.05] font-medium text-white sm:text-5xl lg:text-6xl"
                accentClassName="text-gradient-light italic"
              />
              <Reveal delay={0.2}>
                <p className="mt-6 max-w-xl text-lg text-iris-100/85">{text}</p>
              </Reveal>
            </div>
            <Reveal delay={0.3} className="glass-dark rounded-[2rem] p-7 sm:p-8">
              <p className="text-sm font-semibold tracking-[0.14em] text-blush-200 uppercase">Call our office</p>
              <a
                href={site.phone.href}
                className="mt-2 block font-display text-3xl text-white transition-colors hover:text-blush-200 sm:text-4xl"
              >
                {site.phone.display}
              </a>
              <p className="mt-2 text-sm text-iris-100/70">
                {site.hours[0].days}, {site.hours[0].time}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Magnetic className="block">
                  <a href={site.phone.href} className="btn-light w-full">
                    <Phone className="size-4" /> Call now
                  </a>
                </Magnetic>
                <Magnetic className="block">
                  <Link href="/contact" className="btn-outline-light w-full">
                    Send a message <ArrowRight className="size-4" />
                  </Link>
                </Magnetic>
              </div>
            </Reveal>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
