import Link from "@/components/ui/Link";
import { ArrowRight, CircleCheck, Phone } from "lucide-react";
import { HeroSlides } from "@/components/sections/HeroSlides";
import { AreasBand } from "@/components/sections/AreasBand";
import { CareersFeature } from "@/components/sections/CareersFeature";
import { ComingSoon } from "@/components/sections/ComingSoon";
import { ContactBand } from "@/components/sections/ContactBand";
import { Coverage } from "@/components/sections/Coverage";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { StackingCards } from "@/components/sections/StackingCards";
import { Steps } from "@/components/sections/Steps";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { GlowCard } from "@/components/ui/GlowCard";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { approach } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { rich } from "@/lib/rich";

export const metadata = pageMetadata({
  path: "/",
  title: `${site.shortName} | ${site.message}`,
  absoluteTitle: true,
  description: site.description,
});

/** Banner photos (cross-fade). The first is the LCP image. */
const heroSlides = [
  { src: "/images/banners/home-1.webp", alt: "A caregiver building a tower of colourful blocks with a laughing little boy", position: "object-[70%_35%]" },
  { src: "/images/banners/home-2.webp", alt: "A caregiver helping a young man in a wheelchair cook in his kitchen", position: "object-[60%_30%]" },
  { src: "/images/banners/home-3.webp", alt: "A grandmother reading a picture book with her granddaughter on a porch swing", position: "object-[66%_30%]" },
  { src: "/images/banners/home-4.webp", alt: "A caregiver chatting with a smiling older woman over tea on her sofa", position: "object-[50%_25%]" },
];

export default function HomePage() {
  return (
    <>
      {/* Banner (the reference site's home hero): light background; headline, intro, two pill buttons
          and credential ticks on the left; the photo card (cross-fading photos, location chip, slide
          bars, call card) on the right. Stacks text-first on phones. */}
      <section className="relative isolate overflow-hidden bg-white">

        <div className="wrap grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-20">
          <div>
            <h1 className="text-[2.6rem] sm:text-[3.5rem] lg:text-[4.1rem]">
              <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
                <span className="block animate-[mask-up_0.9s_var(--ease-out-expo)_both] [animation-delay:100ms]">Care that comes</span>
              </span>
              <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
                <span className="block animate-[mask-up_0.9s_var(--ease-out-expo)_both] [animation-delay:200ms]">
                  from <span className="text-gradient">the heart</span>
                </span>
              </span>
            </h1>

            <p className="enter mt-6 max-w-xl text-[1.05rem] leading-relaxed [--d:350ms] sm:text-[1.15rem]">
              Thoughtful support for children, adults, seniors and people with disabilities. Here for your family, through{" "}
              <strong className="font-semibold text-ink">the everyday moments that matter</strong>.
            </p>

            <div className="enter mt-8 flex flex-wrap items-center gap-3 [--d:450ms]">
              <a href={site.phone.href} className="btn-primary btn-shine gap-2.5 py-3 pr-6 pl-3 text-base">
                <span className="grid size-8 place-items-center rounded-full bg-white/20">
                  <Phone className="size-4" aria-hidden />
                </span>
                Call us
              </a>
              <Link href="/#services" className="btn-outline py-3.5 text-base">
                Find your care <ArrowRight className="size-4 text-blush-600" aria-hidden />
              </Link>
            </div>

            <ul className="enter mt-8 flex flex-wrap gap-x-6 gap-y-2.5 text-[0.92rem] font-medium text-ink/80 [--d:550ms]">
              {site.credentials.slice(0, 3).map((c) => (
                <li key={c} className="inline-flex items-center gap-2">
                  <CircleCheck className="size-[1.1rem] text-plum-600" aria-hidden /> {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="enter [--d:200ms]">
            <HeroSlides slides={heroSlides} location={`${site.address.city}, ${site.address.region}`} phone={site.phone} />
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* Welcome + glass call panel */}
      <section className="section">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <SectionHeading
            eyebrow="Support that meets you where you are"
            title={"At home. In the community.\n*By your side*."}
            text="From help with daily routines to building independent living skills, our services are centered on the person receiving care—and the family standing beside them."
          >
            <ul className="mt-8 flex flex-wrap gap-3">
              {["Children & families", "Adults with disabilities", "Seniors & veterans"].map((t) => (
                <li key={t} className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-plum-900">
                  <span className="size-2 rounded-full bg-linear-to-br from-plum-500 to-blush-500" />
                  {t}
                </li>
              ))}
            </ul>
          </SectionHeading>
          <GlowCard as="article" className="glass overflow-hidden rounded-[2rem] p-8 [--d:120ms] sm:p-10" data-reveal>
            <span className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-plum-600 via-plum-400 to-blush-500" aria-hidden />
            <div className="relative z-[4]">
              <span className="grid size-14 place-items-center rounded-2xl bg-linear-to-br from-plum-600 to-blush-500 text-white shadow-lg shadow-blush-500/30">
                <Phone className="size-6" aria-hidden />
              </span>
              <p className="eyebrow mt-6">Let&apos;s start a conversation</p>
              <h3 className="mt-4 font-display text-2xl font-bold">Finding care should feel less overwhelming</h3>
              <p className="mt-3">Tell us what you need. We&apos;ll explain available services and help you understand the next step.</p>
              <a href={site.phone.href} className="btn-primary mt-7 w-full sm:w-auto">
                <Phone className="size-4" /> Call {site.phone.display}
              </a>
              <p className="mt-4 text-xs tracking-wide">Care inquiries · Referrals · Screening appointments</p>
            </div>
          </GlowCard>
        </div>
      </section>

      {/* A personal approach — rounded-square photo with a glass "since" badge */}
      <section className="pb-20 sm:pb-28">
        <div className="wrap grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div data-reveal className="relative mx-auto w-full max-w-md sm:pr-10">
            <div className="relative aspect-square overflow-hidden rounded-[2rem] shadow-[0_40px_90px_-35px_rgb(51_27_88/0.55)] sm:rounded-[2.5rem]">
              <Photo src="/images/caregiver-companion.webp" alt="A caregiver chatting with an older man in his backyard garden" sizes="(min-width: 1024px) 640px, 165vw" />
            </div>
            <div className="glass absolute -right-2 bottom-10 rounded-[1.5rem] px-5 py-4 sm:right-0">
              <p className="font-display text-4xl leading-none text-gradient">{site.since}</p>
              <p className="mt-1 text-xs font-bold tracking-[0.14em] text-plum-800 uppercase">Central Region</p>
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="A personal approach" title={"Your family.\nYour goals. *Our heart*."} />
            <div data-reveal className="[--d:120ms]">
              {approach.map((t) => (
                <p key={t} className="mt-5">
                  {rich(t)}
                </p>
              ))}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/about" className="btn-primary">
                  Read our story <ArrowRight className="size-4" />
                </Link>
                <Link href="/contact" className="btn-outline">
                  Tell us how we can help <ArrowRight className="size-4 text-blush-600" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services — horizontal card track (pinned scroll on desktop, swipe on phones) */}
      <ServiceCards />
      <StackingCards />

      {/*<AreasBand />
      <ComingSoon />
      <CareersFeature />
      <Coverage withResources={false} />
      <Steps />
      */}
      <ContactBand />
    </>
  );
}
