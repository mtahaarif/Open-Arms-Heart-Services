import { Photo } from "@/components/ui/Photo";
import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";
import { audiences } from "@/lib/content";
import { site } from "@/lib/site";
import { GlowCard } from "../../ui/GlowCard";
import { SectionIntro } from "../../ui/SectionIntro";
import { Reveal, Stagger, StaggerItem } from "../../ui/motion";

const spans = [
  "md:col-span-3 md:row-span-2 min-h-[420px] md:min-h-0",
  "md:col-span-3 min-h-[280px] md:min-h-0",
  "md:col-span-3 min-h-[280px] md:min-h-0",
  "md:col-span-4 min-h-[300px] md:min-h-0",
  "md:col-span-2 min-h-[300px] md:min-h-0",
];

/** Bento grid of who we serve — image cards with spotlight glow and hover-reveal copy. */
export function AudienceBento() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionIntro
          align="center"
          eyebrow="Who we care for"
          title="Every age. Every ability. *Every family.*"
          text="Our arms are open to seniors, adults and children alike — and to the family members who love them."
        />

        <Stagger className="mt-16 grid gap-4 md:auto-rows-[260px] md:grid-cols-6" stagger={0.1}>
          {audiences.map((a, i) => (
            <StaggerItem key={a.title} className={spans[i]}>
              <GlowCard tilt className="group relative isolate h-full overflow-hidden rounded-[2rem]">
                <Photo
                  src={a.image}
                  alt={a.alt}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="-z-10 object-cover transition duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-110"
                />
                <div className="absolute inset-0 -z-10 bg-linear-to-t from-iris-950/90 via-iris-950/30 to-transparent transition-opacity duration-700 group-hover:opacity-95" />
                <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-7">
                  <span className="glass-dark grid size-12 place-items-center rounded-2xl text-blush-200">
                    <a.icon className="size-5" />
                  </span>
                  <div className="transition-transform duration-700 ease-[var(--ease-out-expo)] md:translate-y-10 md:group-hover:translate-y-0">
                    <h3 className="font-display text-2xl text-white sm:text-3xl">{a.title}</h3>
                    <p className="mt-2 max-w-sm text-white/80 transition-opacity duration-700 md:opacity-0 md:group-hover:opacity-100">
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
                <p className="font-display text-2xl text-iris-950 sm:text-3xl">Not sure if we can help?</p>
                <p className="mt-1 text-ink-soft">Call us — if we're not the right fit, we'll point you to someone who is.</p>
              </div>
              <div className="relative z-10 flex flex-wrap gap-3">
                <a href={site.phone.href} className="btn-primary">
                  <Phone className="size-4" /> {site.phone.display}
                </a>
                <Link href="/services" className="btn-ghost">
                  All services <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </GlowCard>
        </Reveal>
      </div>
    </section>
  );
}
