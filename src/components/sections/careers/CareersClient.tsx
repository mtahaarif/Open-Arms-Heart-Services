"use client";

import { Photo } from "@/components/ui/Photo";
import { ArrowUpRight, BadgeCheck, Check, ClipboardList, HeartHandshake, HouseHeart } from "lucide-react";
import { applicationChecklist, requirements, roles } from "@/lib/content";
import { site } from "@/lib/site";
import { GlowCard } from "../../ui/GlowCard";
import { Marquee } from "../../ui/Marquee";
import { SectionIntro } from "../../ui/SectionIntro";
import { Magnetic, Reveal, Stagger, StaggerItem } from "../../ui/motion";

const applyProps = { href: site.applicationUrl, target: "_blank", rel: "noreferrer" } as const;
const roleIcons = [HeartHandshake, HouseHeart];

/**
 * Careers content — the original Careers page plus the facts in the employment
 * application it links to (positions, requirements, what the application asks for).
 */
export function CareersClient() {
  return (
    <>
      {/* Positions bento */}
      <section className="relative py-24 sm:py-28">
        <div className="container-x grid gap-4 lg:grid-cols-3">
          <Reveal className="relative min-h-[380px] overflow-hidden rounded-[2.25rem] lg:row-span-2 lg:min-h-0">
            <Photo src="/images/nurses-team.jpg" alt="Two smiling healthcare workers in scrubs" sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover object-top" />
            <div className="absolute inset-0 bg-linear-to-t from-iris-950/85 via-iris-950/10 to-transparent" />
            <div className="absolute right-0 bottom-0 left-0 p-7 text-white">
              <h2 className="font-display text-3xl text-white">Join Our Care Team!</h2>
              <p className="mt-2 text-iris-100/80">Make a difference and build a meaningful career.</p>
            </div>
          </Reveal>

          <div className="lg:col-span-2">
            <SectionIntro eyebrow="Positions" title="Positions you can *apply for.*" />
            <Stagger className="mt-8 grid gap-4 sm:grid-cols-2" stagger={0.1}>
              {roles.map((r, i) => {
                const Icon = roleIcons[i % roleIcons.length];
                return (
                  <StaggerItem key={r}>
                    <GlowCard tilt className="group flex h-full flex-col rounded-[2rem] border border-iris-100 bg-white p-7">
                      <div className="relative z-10 flex flex-1 flex-col">
                        <span className="grid size-12 place-items-center rounded-2xl bg-iris-50 text-iris-600 transition duration-500 group-hover:scale-110 group-hover:bg-linear-to-br group-hover:from-iris-600 group-hover:to-blush-500 group-hover:text-white">
                          <Icon className="size-5" />
                        </span>
                        <h3 className="mt-5 font-display text-2xl">{r}</h3>
                        <a {...applyProps} className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-iris-700 hover:text-iris-950">
                          Apply now<span className="sr-only"> for {r}</span> <ArrowUpRight className="size-4" />
                        </a>
                      </div>
                    </GlowCard>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </div>
      </section>

      {/* Requirements ticker */}
      <section aria-label="Requirements" className="border-y border-iris-100 bg-white py-6">
        <Marquee duration={30} gap="1rem">
          {requirements.map((r) => (
            <span key={r} className="flex items-center gap-2 rounded-full bg-iris-50 px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-iris-800">
              <BadgeCheck className="size-4 text-blush-500" /> {r}
            </span>
          ))}
        </Marquee>
      </section>

      {/* Application */}
      <section id="apply" className="relative scroll-mt-28 py-24 sm:py-28">
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
              <p className="mt-4 max-w-lg text-lg text-iris-100/80">Make a difference and build a meaningful career.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Magnetic>
                  <a {...applyProps} className="btn-light">
                    Apply now <ArrowUpRight className="size-4" />
                  </a>
                </Magnetic>
                <a href={site.phone.href} className="btn-outline-light">
                  Office {site.phone.display}
                </a>
              </div>
            </div>
            <div className="glass-dark rounded-[2rem] p-6 sm:p-8">
              <p className="text-sm font-semibold tracking-[0.14em] text-blush-200 uppercase">The application asks for</p>
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
                The application includes an equal-opportunity and ADA notice to applicants.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
