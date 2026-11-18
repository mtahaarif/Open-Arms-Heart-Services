import Link from "@/components/ui/Link";
import { ArrowRight, Heart, Phone } from "lucide-react";
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
  title: `${site.shortName} | ${site.tagline}`,
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
      {/* Banner — the site-wide banner structure (see <PageHeader>): cross-fading photos under the dark
          plum treatment, running up behind the header, with the copy centred on top */}
      <section className="relative isolate -mt-[5.25rem] flex items-center overflow-hidden bg-plum-950 pt-[6.75rem] pb-[4.5rem] text-white sm:pb-20 lg:-mt-[5.75rem] lg:pt-[7.5rem] lg:pb-[4.5rem]">
        <HeroSlides slides={heroSlides} />

        <div className="wrap relative text-center">
          <p className="enter inline-flex items-center gap-3 text-xs font-bold tracking-[0.22em] text-blush-200 uppercase">
            <span aria-hidden className="h-px w-8 bg-blush-300/70" />
            Rooted in compassion · Central Florida
          </p>

          <h1 className="mx-auto mt-4 text-[2rem] leading-[1] text-white sm:text-5xl xl:text-[3.6rem]">
            <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
              <span className="block animate-[mask-up_0.9s_var(--ease-out-expo)_both] [animation-delay:200ms]">Care that comes</span>
            </span>
            <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
              <span className="block animate-[mask-up_0.9s_var(--ease-out-expo)_both] [animation-delay:300ms]">
                from <span className="text-gradient-light">the heart</span>
              </span>
            </span>
          </h1>

          <p className="enter mx-auto mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-white/80 [--d:450ms] sm:mt-5 sm:text-lg">
            Thoughtful support for children, adults, seniors and people with disabilities. Here for your family, through{" "}
            <strong className="font-semibold text-white">the everyday moments that matter</strong>.
          </p>

          <div className="enter mt-6 flex flex-wrap items-center justify-center gap-2.5 [--d:550ms] sm:mt-7 sm:gap-3">
            <Link href="/services" className="btn-primary btn-shine h-11 px-6 hover:-translate-y-0.5 sm:h-12 sm:px-8 sm:text-base">
              Find your care <ArrowRight className="size-4" />
            </Link>
            <Link href="/contact" className="btn-outline-light h-11 px-6 backdrop-blur sm:h-12 sm:px-8 sm:text-base">
              Connect with our team <ArrowRight className="size-4" />
            </Link>
          </div>

          <p className="enter mt-5 flex items-center justify-center gap-2.5 font-display text-base text-blush-200 [--d:650ms] sm:mt-6 sm:text-lg">
            <Heart className="size-4 fill-blush-400 text-blush-400" aria-hidden />
            {site.motto}
          </p>
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
              <h3 className="mt-4 font-display text-2xl font-medium uppercase">Finding care should feel less overwhelming</h3>
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
              <p className="mt-1 text-xs font-bold tracking-[0.14em] text-plum-800 uppercase">Central Florida</p>
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
