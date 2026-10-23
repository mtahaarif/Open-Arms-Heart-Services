import { Photo } from "@/components/ui/Photo";
import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";
import { audiences } from "@/lib/content";
import { site } from "@/lib/site";
import { GlowCard } from "../../ui/GlowCard";
import { SectionIntro } from "../../ui/SectionIntro";
import { Reveal, Stagger, StaggerItem } from "../../ui/motion";

// Same bento layout at every breakpoint: 6-col grid, tall lead card, then 3+3 and 4+2.
const spans = [
  "col-span-3 row-span-2",
  "col-span-3",
  "col-span-3",
  "col-span-4",
  "col-span-2",
];

/** Bento grid of who we serve — image cards with spotlight glow and hover-reveal copy. */
export function AudienceBento() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionIntro
          align="center"
          eyebrow="Who we care for"
          title="Care for children, adults, *seniors, and families.*"
          text="Support for children, adults, seniors, veterans, and people with disabilities — and the families who care for them."
        />

        <Stagger className="mt-16 grid grid-cols-6 auto-rows-[140px] gap-2.5 sm:auto-rows-[200px] sm:gap-4 md:auto-rows-[260px]" stagger={0.1}>
          {audiences.map((a, i) => (
            <StaggerItem key={a.title} className={spans[i]}>
              <GlowCard tilt className="group relative isolate h-full overflow-hidden rounded-[1.4rem] sm:rounded-[2rem]">
                <Photo
                  src={a.image}
                  alt={a.alt}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="-z-10 object-cover transition duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-110"
                />
                <div className="absolute inset-0 -z-10 bg-linear-to-t from-iris-950/90 via-iris-950/30 to-transparent transition-opacity duration-700 group-hover:opacity-95" />
                <div className="relative z-10 flex h-full flex-col justify-between p-3 sm:p-6">
                  <span className="glass-dark grid size-9 place-items-center rounded-xl text-blush-200 sm:size-12 sm:rounded-2xl">
                    <a.icon className="size-4 sm:size-5" />
                  </span>
                  <div className="transition-transform duration-700 ease-[var(--ease-out-expo)] md:translate-y-10 md:group-hover:translate-y-0">
                    <h3 className="font-display text-[0.95rem] leading-tight text-white sm:text-2xl md:text-3xl">{a.title}</h3>
                    <p className="mt-2 hidden max-w-sm text-white/80 sm:block transition-opacity duration-700 md:opacity-0 md:group-hover:opacity-100">
                      {a.text}
                    </p>
                  </div>
                </div>
              </GlowCard>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-4">
            <GlowCard className="flex flex-col items-start justify-between gap-6 rounded-[2rem] border border-iris-100 bg-linear-to-r from-iris-50 via-white to-blush-50 p-7 sm:flex-row sm:items-center sm:p-9">
              <div className="relative z-10">
                <p className="font-display text-2xl text-iris-950 sm:text-3xl">Open Arms &amp; Heart Services is only a call away!</p>
                <p className="mt-1 text-ink-soft">Office: {site.phone.display} · {site.email}</p>
              </div>
              <div className="relative z-10 flex flex-wrap gap-3">
                <a href={site.phone.href} className="btn-primary">
                  <Phone className="size-4" /> {site.phone.display}
                </a>
                <Link href="/services" className="btn-ghost">
                  Types of care <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </GlowCard>
        </Reveal>
      </div>
    </section>
  );
}
