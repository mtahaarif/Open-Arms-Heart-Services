"use client";

import { Photo } from "@/components/ui/Photo";
import { motion } from "motion/react";
import { useLenis } from "lenis/react";
import { ArrowUpRight, BadgeCheck, Check, GraduationCap, HeartHandshake, MapPin, Plus, Users } from "lucide-react";
import { useState } from "react";
import { requirements, roles } from "@/lib/content";
import { InquiryForm } from "../../forms/InquiryForm";
import { GlowCard } from "../../ui/GlowCard";
import { Marquee } from "../../ui/Marquee";
import { SectionIntro } from "../../ui/SectionIntro";
import { EASE, Reveal, Stagger, StaggerItem } from "../../ui/motion";

const perks = [
  { icon: HeartHandshake, title: "Work that matters", text: "Every visit makes a real difference in someone's day — and you'll see it." },
  { icon: MapPin, title: "Close to home", text: "Serve clients in communities across Polk, Lake and Orange counties." },
  { icon: Users, title: "A family-oriented team", text: "Supportive colleagues and an office that picks up when you call." },
  { icon: GraduationCap, title: "Room to grow", text: "Skilled and non-skilled roles mean many paths to build your career." },
];

export function CareersClient() {
  const [open, setOpen] = useState<number | null>(0);
  const [role, setRole] = useState(roles[0].title);
  const lenis = useLenis();

  const apply = (title: string) => {
    setRole(title);
    const el = document.getElementById("apply");
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -110, duration: 1.4 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Perks bento */}
      <section className="relative py-24 sm:py-28">
        <div className="container-x grid gap-4 lg:grid-cols-3">
          <Reveal className="relative min-h-[380px] overflow-hidden rounded-[2.25rem] lg:row-span-2 lg:min-h-0">
            <Photo src="/images/nurses-team.jpg" alt="Two smiling healthcare workers in scrubs" sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover object-top" />
            <div className="absolute inset-0 bg-linear-to-t from-iris-950/85 via-iris-950/10 to-transparent" />
            <div className="absolute right-0 bottom-0 left-0 p-7 text-white">
              <h2 className="font-display text-3xl text-white">Bring your heart to work.</h2>
              <p className="mt-2 text-iris-100/80">We hire for kindness and train for excellence.</p>
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
            eyebrow="Open roles"
            title="Find *your place* on our team."
            text="We're always glad to meet compassionate people. Expand a role to learn more, then apply in a minute."
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
                        <button type="button" onClick={() => apply(r.title)} className="btn-primary">
                          Apply for this role <ArrowUpRight className="size-4" />
                        </button>
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
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionIntro
              eyebrow="Apply"
              title="Ready to *open your arms?*"
              text="Send us your details and our team will be in touch about next steps, including Florida's Level 2 background screening."
            />
          </div>
          <InquiryForm variant="careers" role={role} onRoleChange={setRole} />
        </div>
      </section>
    </>
  );
}
