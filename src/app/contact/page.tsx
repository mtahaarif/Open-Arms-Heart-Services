import { Mail, MapPin, Phone, Printer } from "lucide-react";
import { GoogleForm } from "@/components/forms/GoogleForm";
import { AreasBand } from "@/components/sections/AreasBand";
import { Steps } from "@/components/sections/Steps";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/seo";
import { addressLines, licenseLine, mapsUrl, site } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/contact",
  title: "Contact Us & Request Info",
  description: `Call ${site.phone.display} or request more information. Office: ${site.address.street}, ${site.address.city}, FL. Fax ${site.fax.display}.`,
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="We're here to listen"
        title="Let's find the support that feels right."
        text="Whether you're looking for care, making a referral or asking about screening services, our team can help you take the next step."
        crumb="Contact"
        image="/images/friends-smiling.jpg"
        imageAlt="Two women smiling together outdoors"
      >
        <a href={site.phone.href} className="btn-primary">
          <Phone className="size-4" /> Call {site.phone.display}
        </a>
        <a href="#request" className="link-arrow">
          Request more information <span aria-hidden>→</span>
        </a>
      </PageHeader>

      <section id="request" className="section scroll-mt-24">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading eyebrow="Contact us" title="Connect with our team." text="Call to discuss service availability or schedule a fingerprinting appointment — or complete the form and a member of our team will contact you." />
            <ul className="mt-8 space-y-4">
              <li className="card flex items-start gap-4 p-5">
                <Phone className="mt-1 size-5 shrink-0 text-plum-700" aria-hidden />
                <span>
                  <span className="block text-xs font-bold tracking-[0.16em] text-plum-700 uppercase">Call our team</span>
                  <a href={site.phone.href} className="font-serif text-2xl font-semibold text-ink hover:text-plum-700">
                    {site.phone.display}
                  </a>
                </span>
              </li>
              <li className="card flex items-start gap-4 p-5">
                <Mail className="mt-1 size-5 shrink-0 text-plum-700" aria-hidden />
                <span className="min-w-0">
                  <span className="block text-xs font-bold tracking-[0.16em] text-plum-700 uppercase">Email</span>
                  <a href={`mailto:${site.email}`} className="font-semibold break-all text-ink hover:text-plum-700">
                    {site.email}
                  </a>
                </span>
              </li>
              <li className="card flex items-start gap-4 p-5">
                <Printer className="mt-1 size-5 shrink-0 text-plum-700" aria-hidden />
                <span>
                  <span className="block text-xs font-bold tracking-[0.16em] text-plum-700 uppercase">Fax</span>
                  <span className="font-semibold text-ink">{site.fax.display}</span>
                </span>
              </li>
              <li className="card flex items-start gap-4 p-5">
                <MapPin className="mt-1 size-5 shrink-0 text-plum-700" aria-hidden />
                <span>
                  <span className="block text-xs font-bold tracking-[0.16em] text-plum-700 uppercase">Visit our office</span>
                  <address className="font-semibold text-ink not-italic">
                    {addressLines[0]}
                    <br />
                    {addressLines[1]}
                  </address>
                  <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="link-arrow mt-1 text-sm">
                    Get directions →
                  </a>
                </span>
              </li>
            </ul>
            <p className="mt-6 text-sm">{licenseLine}</p>
          </div>
          <GoogleForm />
        </div>
      </section>

      <Steps />
      <AreasBand />
    </>
  );
}
