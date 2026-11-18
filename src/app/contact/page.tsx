import { ArrowRight, ArrowUpRight, Mail, MapPin, Phone, Printer } from "lucide-react";
import { GoogleForm } from "@/components/forms/GoogleForm";
import { AreasBand } from "@/components/sections/AreasBand";
import { Steps } from "@/components/sections/Steps";
import { GlowCard } from "@/components/ui/GlowCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/seo";
import { formLabels } from "@/lib/services";
import { addressLines, licenseLine, mapsUrl, site } from "@/lib/site";
import { rich } from "@/lib/rich";

export const metadata = pageMetadata({
  path: "/contact",
  title: "Contact Us & Request Info",
  description: `Call ${site.phone.display} or request more information. Office: ${site.address.street}, ${site.address.city}, FL. Fax ${site.fax.display}.`,
});

/** Gradient icon tile used on the contact cards. */
function Icon({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <span
      className={`relative z-[4] grid size-14 shrink-0 place-items-center rounded-2xl transition duration-500 group-hover:-rotate-6 ${
        accent ? "bg-linear-to-br from-plum-600 to-blush-500 text-white shadow-lg shadow-blush-500/30" : "bg-plum-50 text-plum-600"
      }`}
    >
      {children}
    </span>
  );
}

const label = "block text-xs font-bold tracking-[0.16em] text-blush-700 uppercase";

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="We're here to listen"
        title="Let's find the support that *feels right*."
        text="Whether you're looking for care, making a referral or asking about screening services, our team can help you take the next step."
        crumb="Contact"
        image="/images/banners/contact.jpg"
        imageAlt="A care coordinator on the phone at her laptop while an older woman smiles over her tea"
        focus="object-[40%_25%]"
      >
        <a href={site.phone.href} className="btn-primary">
          <Phone className="size-4" /> Call {site.phone.display}
        </a>
        <a href="#request" className="btn-outline-light">
          Request more information <ArrowRight className="size-4 text-blush-300" />
        </a>
      </PageHeader>

      <section id="request" className="section scroll-mt-28">
        <div className="wrap grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow="Contact us"
              title="Connect with *our team*."
              text={rich("**Call to discuss service availability** or schedule a fingerprinting appointment — or complete the form and a member of our team will contact you.")}
            />
            <ul className="mt-9 space-y-3">
              <GlowCard as="li" className="group glass flex items-center gap-5 rounded-[1.75rem] p-5" data-reveal>
                <Icon accent>
                  <Phone className="size-6" aria-hidden />
                </Icon>
                <span className="relative z-[4]">
                  <span className={label}>Call our team</span>
                  <a href={site.phone.href} className="font-display text-3xl text-ink hover:text-plum-700">
                    {site.phone.display}
                  </a>
                </span>
              </GlowCard>
              <GlowCard as="li" className="group glass flex items-center gap-5 rounded-[1.75rem] p-5 [--d:80ms]" data-reveal>
                <Icon>
                  <Mail className="size-6" aria-hidden />
                </Icon>
                <span className="relative z-[4] min-w-0">
                  <span className={label}>Email</span>
                  <a href={`mailto:${site.email}`} className="font-semibold break-all text-ink hover:text-plum-700">
                    {site.email}
                  </a>
                </span>
              </GlowCard>
              <GlowCard as="li" className="group glass flex items-center gap-5 rounded-[1.75rem] p-5 [--d:160ms]" data-reveal>
                <Icon>
                  <Printer className="size-6" aria-hidden />
                </Icon>
                <span className="relative z-[4]">
                  <span className={label}>Fax</span>
                  <span className="font-semibold text-ink">{site.fax.display}</span>
                </span>
              </GlowCard>
              <GlowCard as="li" className="group glass flex items-start gap-5 rounded-[1.75rem] p-5 [--d:240ms]" data-reveal>
                <Icon>
                  <MapPin className="size-6" aria-hidden />
                </Icon>
                <span className="relative z-[4]">
                  <span className={label}>Visit our office</span>
                  <address className="font-semibold text-ink not-italic">
                    {addressLines[0]}
                    <br />
                    {addressLines[1]}
                  </address>
                  <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="link-arrow mt-1 text-sm">
                    Get directions <ArrowUpRight className="size-3.5" />
                  </a>
                </span>
              </GlowCard>
            </ul>
            <p className="mt-6 inline-flex rounded-full bg-linear-to-r from-plum-700 to-blush-600 px-4 py-2 text-sm font-semibold text-white">{licenseLine}</p>
          </div>
          <GoogleForm formLabels={formLabels} />
        </div>
      </section>

      <Steps />
      <AreasBand />
    </>
  );
}
