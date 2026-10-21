"use client";

import { Photo } from "@/components/ui/Photo";
import { motion } from "motion/react";
import { ArrowUpRight, BadgeCheck, Check, ClipboardList, GraduationCap, HeartHandshake, MapPin, Plus, Users } from "lucide-react";
import { useState } from "react";
import { applicationChecklist, requirements, roles } from "@/lib/content";
import { allCounties, site } from "@/lib/site";
import { GlowCard } from "../../ui/GlowCard";
import { Marquee } from "../../ui/Marquee";
import { SectionIntro } from "../../ui/SectionIntro";
import { EASE, Magnetic, Reveal, Stagger, StaggerItem } from "../../ui/motion";

const perks = [
  { icon: HeartHandshake, title: "Make a difference", text: "Help children, adults, seniors, veterans, and people with disabilities live safely and comfortably at home." },
  { icon: MapPin, title: "Close to home", text: `Serve clients in communities across ${allCounties.length} Central Florida counties.` },
  { icon: Users, title: "A family-oriented team", text: "Join an agency that treats every client — and every caregiver — like family." },
  { icon: GraduationCap, title: "Build a meaningful career", text: "Home care and group home roles, with role-appropriate training to help you grow." },
];

const applyProps = { href: site.applicationUrl, target: "_blank", rel: "noreferrer" } as const;

export function CareersClient() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      {/* Perks bento */}
      <section className="relative py-24 sm:py-28">
        <div className="container-x grid gap-4 lg:grid-cols-3">
          <Reveal className="relative min-h-[380px] overflow-hidden rounded-[2.25rem] lg:row-span-2 lg:min-h-0">
            <Photo src="/images/nurses-team.jpg" alt="Two smiling healthcare workers in scrubs" sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover object-top" />
            <div className="absolute inset-0 bg-linear-to-t from-iris-950/85 via-iris-950/10 to-transparent" />
            <div className="absolute right-0 bottom-0 left-0 p-7 text-white">
              <h2 className="font-display text-3xl text-white">Join our care team!</h2>
              <p className="mt-2 text-iris-100/80">Make a difference and build a meaningful career.</p>
            </div>
          </Reveal>
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
            {perks.map((p) => (
              <StaggerItem key={p.title}>
                <GlowCard tilt className="group h-full rounded-[2rem] border border-iris-100 bg-white p-7">
                  <div className="relative z-10">
                    <span className="grid size-12 place-items-center rounded-2xl bg-iris-50 text-iris-600 transition duration-500 group-hover:scale-110 group-hover:bg-linear-to-br group-hover:from-iris-600 group-hover:to-blush-500 group-hover:text-white">
                      <p.icon className="size-5" />
                    </span>
                    <h3 className="mt-5 font-display text-2xl">{p.title}</h3>
                    <p className="mt-2 text-ink-soft">{p.text}</p>
                  </div>
                </GlowCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Requirements ticker */}
      <section aria-label="Requirements" className="border-y border-iris-100 bg-white py-6">
        <Marquee duration={35} gap="1rem">
          {requirements.map((r) => (
            <span key={r} className="flex items-center gap-2 rounded-full bg-iris-50 px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-iris-800">
              <BadgeCheck className="size-4 text-blush-500" /> {r}
            </span>
          ))}
        </Marquee>
      </section>

      {/* Roles */}
      <section className="relative py-24 sm:py-28">
        <div className="container-x">
          <SectionIntro
            eyebrow="Open positions"
            title="Find *your place* on our team."
            text="We're always glad to meet compassionate people. Expand a position to learn more, then complete our online employment application."
          />
          <ul className="mt-12 divide-y divide-iris-100 border-y border-iris-100">
            {roles.map((r, i) => {
              const isOpen = open === i;
              return (
                <li key={r.title}>
                  <h3 className="m-0 font-sans tracking-normal">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group flex w-full items-center gap-6 py-7 text-left"
                    >
                      <span className="hidden font-display text-2xl text-iris-300 sm:block">{String(i + 1).padStart(2, "0")}</span>
                      <span className="flex-1">
                        <span className="block font-display text-2xl text-iris-950 transition group-hover:translate-x-2 group-hover:text-iris-700 sm:text-3xl">
                          {r.title}
                        </span>
                        <span className="mt-1 block text-sm font-semibold tracking-[0.12em] text-blush-700 uppercase">{r.type}</span>
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className={`grid size-12 shrink-0 place-items-center rounded-full transition-colors ${
                          isOpen ? "bg-iris-900 text-white" : "bg-iris-50 text-iris-700 group-hover:bg-iris-100"
                        }`}
                      >
                        <Plus className="size-5" />
                      </motion.span>
                    </button>
                  </h3>
                  <div
                    inert={!isOpen}
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-expo)] ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="grid gap-6 pb-8 sm:pl-14 md:grid-cols-[1.3fr_1fr_auto] md:items-end">
                        <p className="text-lg text-ink-soft">{r.text}</p>
                        <ul className="space-y-2">
                          {r.needs.map((n) => (
                            <li key={n} className="flex items-start gap-2 text-sm text-ink">
                              <Check className="mt-0.5 size-4 shrink-0 text-blush-500" /> {n}
                            </li>
                          ))}
                        </ul>
                        <a {...applyProps} className="btn-primary">
                          Apply for this role <ArrowUpRight className="size-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Application */}
      <section id="apply" className="relative scroll-mt-28 pb-24 sm:pb-32">
        <div className="container-x">
          <Reveal className="relative isolate grid gap-10 overflow-hidden rounded-[2.5rem] bg-iris-950 p-8 text-white sm:p-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_0%_0%,rgb(139_96_211/0.45),transparent_45%),radial-gradient(circle_at_100%_100%,rgb(234_106_156/0.25),transparent_45%)]" />
            <div>
              <span className="eyebrow-dark">
                <ClipboardList className="size-3.5" /> Employment application
              </span>
              <h2 className="mt-5 text-4xl font-medium text-white sm:text-5xl">
                Quality care. <span className="text-gradient-light italic">Brighter tomorrows.</span>
              </h2>
              <p className="mt-4 max-w-lg text-lg text-iris-100/80">
                Apply online in one sitting — our secure application opens in a new tab. Have your resume and certificates
                ready to upload.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Magnetic>
                  <a {...applyProps} className="btn-light">
                    Apply now <ArrowUpRight className="size-4" />
                  </a>
                </Magnetic>
                <a href={site.phone.href} className="btn-outline-light">
                  Questions? {site.phone.display}
                </a>
              </div>
            </div>
            <div className="glass-dark rounded-[2rem] p-6 sm:p-8">
              <p className="text-sm font-semibold tracking-[0.14em] text-blush-200 uppercase">What the application asks for</p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {applicationChecklist.map((c) => (
                  <li key={c} className="flex items-start gap-2.5 text-iris-50">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-blush-500/80">
                      <Check className="size-3" />
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-iris-100/60">
                Open Arms &amp; Heart Services is an equal opportunity employer. Employment requires Florida Level 2 background
                screening and drug &amp; alcohol screening.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
