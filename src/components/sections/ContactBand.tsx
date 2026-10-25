import Link from "@/components/ui/Link";
import { Phone } from "lucide-react";
import { addressLines, mapsUrl, site } from "@/lib/site";

/** "Let's find the support that feels right." — navy contact band that closes most pages. */
export function ContactBand() {
  return (
    <section className="section bg-navy-900 text-navy-100">
      <div className="wrap grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <div>
          <p className="eyebrow text-blush-300">We&apos;re here to listen</p>
          <h2 className="mt-3 text-white">Let&apos;s find the support that feels right.</h2>
          <p className="lead mt-5 max-w-xl">
            Whether you&apos;re looking for care, making a referral or asking about screening services, our team can help you take the next step.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href={site.phone.href} className="btn-light">
              <Phone className="size-4" /> Call {site.phone.display}
            </a>
            <Link href="/contact#request" className="btn border border-white/60 text-white hover:bg-white/10">
              Request more information
            </Link>
          </div>
        </div>
        <div className="border-t border-navy-600 pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
          <h3 className="text-sm tracking-[0.16em] text-blush-200 uppercase">Visit our office</h3>
          <address className="mt-3 text-lg not-italic">
            {site.name}
            <br />
            {addressLines[0]}
            <br />
            {addressLines[1]}
          </address>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-blush-200 underline underline-offset-4 hover:text-white">
            Get directions
          </a>
          <h3 className="mt-8 text-sm tracking-[0.16em] text-blush-200 uppercase">Call, fax or email</h3>
          <p className="mt-3 text-lg">
            <a href={site.phone.href} className="font-semibold text-white hover:underline">
              {site.phone.display}
            </a>
            <br />
            Fax: {site.fax.display}
            <br />
            <a href={`mailto:${site.email}`} className="text-base break-all text-white hover:underline">
              {site.email}
            </a>
          </p>
          <p className="mt-4 text-sm">Call to discuss service availability or schedule a fingerprinting appointment.</p>
        </div>
      </div>
    </section>
  );
}
