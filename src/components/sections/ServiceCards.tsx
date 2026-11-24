import Link from "@/components/ui/Link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { programHref, programs } from "@/lib/services";

/**
 * Home "Our services" — the six services as a horizontal card track (see `.hs` in globals.css):
 * pinned and driven by vertical scroll on desktop, a swipeable snap row on phones.
 * Cards: tall photo, a neutral dark fade at the bottom (no colour cast), glass number badge, cursor glow, slow zoom on hover.
 */
export function ServiceCards() {
  return (
    <section id="services" aria-labelledby="services-title" className="hs relative bg-linear-to-b from-sand via-cream to-cream [--n:6]">
      <div className="hs-pin py-20 lg:py-0">
        <div className="wrap mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Our services"
            title={"Care for everyday needs.\n*Support for individual goals*."}
            text="Explore each service to see how we can help. Our team can discuss availability, referrals and authorization requirements with you."
          />
          <div data-reveal className="flex shrink-0 items-center gap-5 [--d:120ms]">
            <p className="hidden items-center gap-2 text-sm font-semibold text-plum-700 lg:flex" aria-hidden>
              Scroll to explore <ArrowRight className="size-4 animate-pulse" />
            </p>
            <Link href="/contact" className="btn-outline">
              Talk to our team <ArrowRight className="size-4 text-blush-600" />
            </Link>
          </div>
        </div>

        <div className="wrap mb-8 hidden lg:block" aria-hidden>
          <div className="h-[3px] overflow-hidden rounded-full bg-plum-100">
            <div className="hs-bar h-full origin-left rounded-full bg-linear-to-r from-plum-600 via-plum-400 to-blush-500" />
          </div>
        </div>

        <ul className="hs-track" aria-label="Our services">
          {programs.map((p, i) => (
            <li key={p.slug}>
              <GlowCard
                href={programHref(p)}
                className="group relative flex aspect-[4/5] flex-col lg:aspect-auto lg:h-[min(28rem,46svh)] justify-end overflow-hidden rounded-[2rem] bg-neutral-800 p-6 text-white shadow-[0_30px_60px_-35px_rgb(51_27_88/0.7)] sm:p-7"
              >
                <Photo
                  src={p.image}
                  alt={p.imageAlt}
                  sizes="(min-width: 640px) 720px, 155vw"
                  className="object-[center_30%] transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-110"
                />
                {/* Neutral shade (no colour cast) only at the bottom, so the white title stays readable */}
                <div className="absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-black/75 via-black/35 to-transparent" />
                <span className="glass-dark absolute top-5 left-5 z-[4] grid size-12 place-items-center rounded-2xl font-display text-lg">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="absolute top-5 right-5 z-[4] grid size-11 place-items-center rounded-full bg-white/15 backdrop-blur-md transition duration-500 group-hover:rotate-45 group-hover:bg-white group-hover:text-plum-800">
                  <ArrowUpRight className="size-5" aria-hidden />
                </span>
                <div className="relative z-[4]">
                  <h3 className="font-display text-2xl font-bold text-white">{p.short}</h3>
                  <p className="mt-2 text-white/90">{p.tagline}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-blush-200">
                    Explore services <span aria-hidden>→</span>
                  </span>
                </div>
              </GlowCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
