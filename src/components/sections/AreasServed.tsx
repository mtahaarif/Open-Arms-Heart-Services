import Link from "next/link";
import { ArrowUpRight, MapPin, Navigation } from "lucide-react";
import { allCounties, fullAddress, site } from "@/lib/site";
import { GlowCard } from "../ui/GlowCard";
import { SectionIntro } from "../ui/SectionIntro";
import { Reveal, Stagger, StaggerItem } from "../ui/motion";

/** Service areas as published by the agency, grouped by program. */
export function AreasServed() {
  return (
    <section className="relative isolate overflow-hidden bg-iris-950 py-24 text-white sm:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_0%,rgb(139_96_211/0.4),transparent_45%),radial-gradient(circle_at_100%_100%,rgb(234_106_156/0.22),transparent_45%)]" />
      <div className="noise absolute inset-0 -z-10" />
      {/* Decorative dotted "map" */}
      <div className="absolute inset-0 -z-10 opacity-30 [background-image:radial-gradient(rgb(225_210_248/0.35)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_70%)]" />

      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-end">
          <SectionIntro
            dark
            eyebrow="Where we serve"
            title="Serving *Central Florida* since 2017."
            text={`From our office in ${site.address.city}, our caregivers support families across ${allCounties.length} Central Florida counties.`}
          />
          <Reveal delay={0.2}>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="glass-dark group flex items-center gap-5 rounded-[1.75rem] p-5 transition hover:bg-white/10 sm:p-6"
            >
              <span className="relative grid size-14 shrink-0 place-items-center rounded-2xl bg-blush-500">
                <span className="animate-pulse-ring absolute inset-0 rounded-2xl bg-blush-400" />
                <MapPin className="relative size-6" />
              </span>
              <span className="flex-1">
                <span className="block text-sm font-semibold tracking-[0.14em] text-blush-200 uppercase">Our office</span>
                <span className="mt-0.5 block text-lg text-white">{fullAddress}</span>
              </span>
              <Navigation className="size-5 text-iris-200 transition group-hover:rotate-12 group-hover:text-white" />
            </a>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid grid-cols-2 gap-2.5 sm:gap-4" stagger={0.12}>
          {site.areas.map((a, i) => (
            <StaggerItem key={a.program}>
              <GlowCard className="glass-dark h-full rounded-[1.4rem] p-4 sm:rounded-[2rem] sm:p-8">
                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-lg leading-tight text-white sm:text-3xl">{a.program}</h3>
                      <p className="mt-1 text-xs text-iris-200/80 sm:text-sm">{a.note}</p>
                    </div>
                    <span className="hidden font-display text-5xl text-white/10 sm:block">0{i + 1}</span>
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-1.5 sm:mt-6 sm:gap-2">
                    {a.counties.map((c) => (
                      <li
                        key={c}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.72rem] text-iris-100 transition hover:border-blush-300/60 hover:text-white sm:px-3.5 sm:py-1.5 sm:text-sm"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={a.href}
                    className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-blush-200 hover:text-white sm:mt-7 sm:text-sm"
                  >
                    View services <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </GlowCard>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-6 text-center text-iris-200/70">
          Not sure if we serve your area? Call{" "}
          <a href={site.phone.href} className="font-semibold text-white underline decoration-blush-400 underline-offset-4">
            {site.phone.display}
          </a>{" "}
          — Open Arms &amp; Heart Services is only a call away.
        </Reveal>
      </div>
    </section>
  );
}
