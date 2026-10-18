"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Check, Phone } from "lucide-react";
import { homeCare } from "@/lib/services";
import { site } from "@/lib/site";
import { GlowCard } from "../../ui/GlowCard";
import { SectionIntro } from "../../ui/SectionIntro";
import { EASE } from "../../ui/motion";

/** Tall photo cards — details slide up over the image on hover (always shown on touch screens). */
export function HoverRevealGrid() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="container-x">
        <SectionIntro
          eyebrow="Home care services"
          title="Help with the little things *that mean everything.*"
          text="Mix and match services to build the support that fits — a few hours a week, or every day."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {homeCare.services.map((s, i) => (
            <motion.div
              key={s.slug}
              id={s.slug}
              className="scroll-mt-32"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 0.8, delay: (i % 4) * 0.08, ease: EASE }}
            >
              <GlowCard as="article" className="group relative isolate h-[480px] overflow-hidden rounded-[2rem] focus-within:ring-2 focus-within:ring-iris-400">
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="-z-10 object-cover transition duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-110 group-hover:blur-[2px]"
                />
                <div className="absolute inset-0 -z-10 bg-linear-to-t from-iris-950/95 via-iris-950/40 to-transparent" />
                <div className="absolute inset-0 -z-10 bg-iris-950/0 transition duration-700 [@media(hover:hover)]:group-hover:bg-iris-950/60" />

                <div className="relative z-10 flex h-full flex-col p-6">
                  <div className="flex items-center justify-between">
                    <span className="glass-dark grid size-12 place-items-center rounded-2xl text-blush-200 transition duration-500 group-hover:rotate-[-8deg] group-hover:bg-blush-500 group-hover:text-white">
                      <s.icon className="size-5" />
                    </span>
                    <span className="font-display text-2xl text-white/40">{String(i + 1).padStart(2, "0")}</span>
                  </div>

                  <div className="mt-auto">
                    <h3 className="font-display text-[1.7rem] leading-tight text-white">{s.name}</h3>
                    <p className="mt-2 text-sm text-white/75">{s.summary}</p>
                    <div className="grid transition-[grid-template-rows,opacity] duration-700 ease-[var(--ease-out-expo)] [@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:grid-rows-[1fr] [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-within:grid-rows-[1fr] [@media(hover:hover)]:group-focus-within:opacity-100">
                      <div className="overflow-hidden">
                        <ul className="mt-4 space-y-1.5">
                          {s.points.map((p) => (
                            <li key={p} className="flex items-center gap-2 text-sm text-iris-50">
                              <Check className="size-3.5 text-blush-300" /> {p}
                            </li>
                          ))}
                        </ul>
                        <Link
                          href={`/contact?care=home-care`}
                          className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-iris-900 transition hover:bg-blush-100"
                        >
                          Ask about this <ArrowRight className="size-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.24, ease: EASE }}
            className="flex h-[480px] flex-col justify-between overflow-hidden rounded-[2rem] bg-linear-to-br from-iris-700 via-iris-600 to-blush-500 p-7 text-white"
          >
            <p className="font-display text-4xl leading-tight">
              Not sure where to start?
              <span className="mt-2 block text-blush-100 italic">Let&apos;s build it together.</span>
            </p>
            <div>
              <p className="text-white/85">We&apos;ll recommend a mix of services and a schedule that fits your family.</p>
              <a href={site.phone.href} className="btn-light mt-6 w-full">
                <Phone className="size-4" /> {site.phone.display}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
