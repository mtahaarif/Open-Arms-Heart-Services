import Link from "@/components/ui/Link";
import { Phone } from "lucide-react";
import { AreasBand } from "@/components/sections/AreasBand";
import { CareersFeature } from "@/components/sections/CareersFeature";
import { ComingSoon } from "@/components/sections/ComingSoon";
import { ContactBand } from "@/components/sections/ContactBand";
import { Coverage } from "@/components/sections/Coverage";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { Steps } from "@/components/sections/Steps";
import { TrustStrip } from "@/components/sections/TrustStrip";
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

const heroPhoto = { src: "/images/hero-home.jpg", alt: "A caregiver and an older woman laughing together over a tablet on the sofa at home" };

export default function HomePage() {
  return (
    <>
      {/* Hero — full-bleed photo on the right, fading into cream behind the copy */}
      <section className="relative overflow-hidden bg-cream">
        <div className="wrap relative z-10 py-16 sm:py-20 lg:py-32">
          <div className="max-w-[35rem]">
            <p className="eyebrow">Rooted in compassion · Central Florida</p>
            <h1 className="mt-4 lg:text-[3.6rem]">
              Care that comes from <span className="text-plum-700">the heart.</span>
            </h1>
            <p className="lead mt-6">
              Thoughtful support for children, adults, seniors and people with disabilities. Here for your family, through the everyday moments that matter.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link href="/services" className="btn-primary">
                Find your care
              </Link>
              <Link href="/contact" className="link-arrow">
                Connect with our team <span aria-hidden>→</span>
              </Link>
            </div>
            <p className="mt-10 font-display text-xl text-plum-700">{site.motto}</p>
          </div>
        </div>
        {/* Below the copy on phones; a full-height panel on the right from lg up. */}
        <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[60%]">
          <Photo src={heroPhoto.src} alt={heroPhoto.alt} preload sizes="(min-width: 1024px) 60vw, 100vw" className="object-[60%_center]" />
          <div className="absolute inset-y-0 left-0 hidden w-1/2 bg-linear-to-r from-cream to-transparent lg:block" />
        </div>
      </section>

      <TrustStrip />

      {/* Welcome + call panel */}
      <section className="section">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
          <SectionHeading
            eyebrow="Support that meets you where you are"
            title={"At home. In the community.\nBy your side."}
            text="From help with daily routines to building independent living skills, our services are centered on the person receiving care—and the family standing beside them."
          >
            <ul className="check-list mt-7 flex flex-wrap gap-x-7 gap-y-3 text-sm font-bold text-ink">
              {["Children & families", "Adults with disabilities", "Seniors & veterans"].map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </SectionHeading>
          <aside className="rounded-lg border-t-4 border-plum-700 bg-plum-50 p-7 shadow-[0_10px_30px_-18px_rgb(23_43_72/0.3)] sm:p-9">
            <p className="eyebrow">Let&apos;s start a conversation</p>
            <h3 className="mt-3 font-display text-2xl font-normal">Finding care should feel less overwhelming.</h3>
            <p className="mt-3">Tell us what you need. We&apos;ll explain available services and help you understand the next step.</p>
            <a href={site.phone.href} className="btn-primary mt-6 w-full sm:w-auto">
              <Phone className="size-4" /> Call {site.phone.display}
            </a>
            <p className="mt-4 text-xs tracking-wide">Care inquiries · Referrals · Screening appointments</p>
          </aside>
        </div>
      </section>

      {/* A personal approach */}
      <section className="pb-16 sm:pb-24">
        <div className="wrap grid items-center gap-10 border-t border-line pt-16 sm:pt-24 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Photo src="/images/caregiver-companion.jpg" alt="A caregiver chatting with an older man in his backyard garden" sizes="(min-width: 1024px) 560px, 100vw" />
          </div>
          <div>
            <SectionHeading eyebrow="A personal approach" title={"Your family.\nYour goals. Our heart."} />
            {approach.map((t) => (
              <p key={t} className="mt-5">
                {rich(t)}
              </p>
            ))}
            <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3">
              <Link href="/about" className="link-arrow">
                Read our story <span aria-hidden>→</span>
              </Link>
              <Link href="/contact" className="link-arrow">
                Tell us how we can help <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section bg-plum-50" id="services">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Our services"
              title={"Care for everyday needs.\nSupport for individual goals."}
              text="Explore each service to see how we can help. Our team can discuss availability, referrals and authorization requirements with you."
            />
            <Link href="/services" className="btn-outline">
              View all services
            </Link>
          </div>
          <div className="mt-12">
            <ServiceCards />
          </div>
        </div>
      </section>

      <AreasBand />
      <ComingSoon />
      <CareersFeature />
      <Coverage withResources={false} />
      <Steps className="bg-white" />
      <ContactBand />
    </>
  );
}
