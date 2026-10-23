import { BadgeCheck, Phone } from "lucide-react";
import { insurances } from "@/lib/content";
import { site } from "@/lib/site";
import { GlowCard } from "../ui/GlowCard";
import { Marquee } from "../ui/Marquee";
import { SectionIntro } from "../ui/SectionIntro";
import { Reveal, Stagger, StaggerItem } from "../ui/motion";

const initials = (name: string) =>
  name
    .replace(/[()']/g, "")
    .split(/\s+/)
    .filter((w) => /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

/** "Do you accept insurance?" — the insurances the agency accepts, as glow tiles. */
export function InsuranceSection({ eyebrow = "Insurance" }: { eyebrow?: string }) {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="lg:sticky lg:top-32">
          <SectionIntro
            eyebrow={eyebrow}
            title="Do you accept *insurance?*"
            text="Insurances we accept:"
          />
          <Reveal delay={0.2} className="mt-8">
            <a href={site.phone.href} className="btn-primary">
              <Phone className="size-4" /> Office {site.phone.display}
            </a>
          </Reveal>
        </div>

        <div>
          <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3" stagger={0.05}>
            {insurances.map((name) => (
              <StaggerItem key={name}>
                <GlowCard
                  tilt
                  className="group flex h-full items-center gap-3 rounded-[1.4rem] border border-iris-100 bg-white p-4 sm:p-5"
                >
                  <span className="relative z-10 grid size-11 shrink-0 place-items-center rounded-xl bg-linear-to-br from-iris-50 to-blush-50 font-display text-base font-semibold text-iris-700 ring-1 ring-iris-100 transition duration-500 group-hover:from-iris-600 group-hover:to-blush-500 group-hover:text-white">
                    {initials(name)}
                  </span>
                  <span className="relative z-10 text-sm leading-tight font-semibold text-iris-950 sm:text-[0.95rem]">
                    {name}
                  </span>
                </GlowCard>
              </StaggerItem>
            ))}
          </Stagger>

        </div>
      </div>

      <div className="mt-16 border-y border-iris-100 bg-white py-5">
        <Marquee duration={40} gap="1rem">
          {insurances.map((name) => (
            <span
              key={name}
              className="flex items-center gap-2 rounded-full bg-iris-50 px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-iris-800"
            >
              <BadgeCheck className="size-4 text-blush-500" /> {name}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
