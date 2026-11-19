import Link from "@/components/ui/Link";
import { ArrowUpRight, Phone } from "lucide-react";
import { ContactBand } from "@/components/sections/ContactBand";
import { MissionStatement } from "@/components/sections/MissionStatement";
import { GlowCard } from "@/components/ui/GlowCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { approach, audiences, screening, story } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { licenseLine, site } from "@/lib/site";
import { rich } from "@/lib/rich";

export const metadata = pageMetadata({
  path: "/about",
  title: "About Us & Our Mission",
  description: `Our mission, and the story of ${site.owner.name}, owner of Open Arms & Heart Services Inc. — compassionate, person-centered care in Central Florida since ${site.since}.`,
});

/** Bento spans (6-column grid, every breakpoint): tall lead card, then 3 + 3 and 4 + 2. */
const bento = [
  "col-span-3 row-span-2",
  "col-span-3 [--d:100ms]",
  "col-span-3 [--d:200ms]",
  "col-span-4 [--d:300ms]",
  "col-span-2 [--d:400ms]",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title={"Your family.\nYour goals. *Our heart*."}
        text={rich(approach.join(" "))}
        crumb="About us"
        image="/images/banners/about.webp"
        imageAlt="An older man and his adult son laughing over a family photo album at the kitchen table"
        focus="object-[55%_25%]"
      />

      <MissionStatement />

      {/* Meet the owner — one rounded panel: portrait in a rotating gradient ring + her story as plain prose */}
      <section id="story" className="scroll-mt-28 py-10 sm:py-14">
        <div className="wrap">
          <div
            data-reveal
            className="relative isolate grid items-center gap-12 overflow-hidden rounded-[2.5rem] bg-linear-to-br from-plum-50 via-white to-blush-50 p-6 ring-1 ring-plum-100 sm:p-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- decorative tiny static PNG */}
            <img src="/brand/logo-mark.webp" alt="" width={200} height={154} loading="lazy" className="absolute -right-10 -bottom-10 -z-10 h-72 w-auto opacity-[0.06]" />
            <div className="relative mx-auto w-full max-w-sm lg:self-start">
              <div className="relative isolate overflow-hidden rounded-[2.3rem] p-[6px] shadow-[0_30px_70px_-30px_rgb(96_52_159/0.6)]">
                <div className="animate-spin-slow absolute -inset-1/2 -z-10 bg-[conic-gradient(from_0deg,var(--color-plum-500),var(--color-blush-400),var(--color-plum-200),var(--color-blush-500),var(--color-plum-500))]" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-white">
                  <Photo
                    src="/images/founder-shantana-johnson.webp"
                    alt={`${site.owner.name}, ${site.owner.title.toLowerCase()} of ${site.name}`}
                    sizes="(min-width: 1024px) 384px, 90vw"
                    className="object-top"
                  />
                </div>
              </div>
              <div className="glass absolute -bottom-5 left-1/2 z-10 w-max max-w-[92%] -translate-x-1/2 rounded-full px-5 py-2.5 text-center text-sm font-semibold text-plum-900">
                Serving Central Florida since {site.since}
              </div>
            </div>
            <div>
              <p className="eyebrow">Meet the owner</p>
              <h2 className="mt-5">{site.owner.name}</h2>
              <p className="mt-2 font-display text-xl text-blush-700">{site.owner.title}</p>
              <div className="mt-6 space-y-4 text-lg leading-relaxed">
                {story.map((t) => (
                  <p key={t.slice(0, 24)}>{rich(t)}</p>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {[site.credentials[1], site.credentials[0], `Serving Central Florida since ${site.since}`].map((t) => (
                  <span key={t} className="glass rounded-full px-4 py-2 text-sm font-semibold text-plum-800">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who we serve — the bento from the earlier design's home page ("Who we care for", AudienceBento
          at git 1732445): the same 6-column layout at every size — a tall lead card, then 3 + 3 and 4 + 2 —
          with rows that grow from 140px (phones) to 200px (sm) and 260px (md+). */}
      <section className="relative py-24 sm:py-32">
        {/* The earlier design's container (max-w-7xl, 16/24/32px gutters) so the bento matches it exactly. */}
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading align="center" eyebrow="Who we serve" title="Support for *every stage of life*." />

          <ul className="mt-16 grid auto-rows-[140px] grid-cols-6 gap-2.5 sm:auto-rows-[200px] sm:gap-4 md:auto-rows-[260px] lg:mx-auto lg:max-w-[min(100%,61rem)] lg:auto-rows-[208px] lg:gap-3.5">
            {audiences.map((a, i) => (
              <li key={a.title} data-reveal className={bento[i]}>
                <GlowCard tilt href={a.href} className="group relative isolate block h-full overflow-hidden rounded-[1.4rem] sm:rounded-[2rem]">
                  <Photo
                    src={a.image}
                    alt={a.alt}
                    sizes="(min-width: 1024px) 660px, (min-width: 768px) 810px, 115vw"
                    className="-z-10 transition duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 -z-10 bg-linear-to-t from-plum-900/80 via-plum-800/20 to-transparent transition-opacity duration-700 group-hover:opacity-95" />
                  <div className="relative z-10 flex h-full flex-col justify-between p-3 sm:p-6 lg:p-5">
                    <span className="glass-dark grid size-9 place-items-center rounded-xl text-blush-200 sm:size-12 sm:rounded-2xl lg:size-10 lg:rounded-xl">
                      <a.icon className="size-4 sm:size-5" aria-hidden />
                    </span>
                    <div className="transition-transform duration-700 ease-[var(--ease-out-expo)] md:can-hover:translate-y-10 md:can-hover:group-hover:translate-y-0">
                      <h3 className="font-display text-[0.95rem] leading-tight font-medium text-white uppercase hyphens-auto max-[359px]:text-[0.72rem] sm:text-2xl md:text-3xl lg:text-2xl">{a.title}</h3>
                      <p className="mt-2 hidden max-w-sm text-white/80 transition-opacity duration-700 sm:line-clamp-2 md:line-clamp-none md:can-hover:opacity-0 md:can-hover:group-hover:opacity-100">
                        {a.text}
                      </p>
                    </div>
                  </div>
                </GlowCard>
              </li>
            ))}
          </ul>

          <div data-reveal className="mt-4 [--d:150ms] lg:mx-auto lg:mt-3.5 lg:max-w-[min(100%,61rem)]">
            <GlowCard className="flex flex-col items-start justify-between gap-6 rounded-[2rem] border border-plum-100 bg-linear-to-r from-plum-50 via-white to-blush-50 p-7 sm:flex-row sm:items-center sm:p-9 lg:rounded-[1.6rem] lg:px-8 lg:py-7">
              <div className="relative z-10">
                <p className="font-display text-2xl text-plum-950 sm:text-3xl lg:text-2xl">Open Arms &amp; Heart Services is only a call away!</p>
                <p className="mt-1">
                  Office: {site.phone.display} · {site.email}
                </p>
              </div>
              <div className="relative z-10 flex flex-wrap gap-3 lg:shrink-0 lg:flex-nowrap">
                <a href={site.phone.href} className="btn-primary">
                  <Phone className="size-4" /> {site.phone.display}
                </a>
                <Link href="/services" className="btn-outline">
                  Our services <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </GlowCard>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="pb-6">
        <div className="wrap grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionHeading eyebrow="Licensed & trusted" title="Care you can feel *confident about*." text={rich(screening)} />
          <div data-reveal className="glass rounded-[2rem] p-7 [--d:120ms] sm:p-9">
            <ul className="check-list space-y-3.5">
              {site.credentials.map((c) => (
                <li key={c} className="font-semibold text-ink">
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-7 inline-flex rounded-full bg-linear-to-r from-plum-700 to-blush-600 px-4 py-2 text-sm font-semibold text-white">{licenseLine}</p>
          </div>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
