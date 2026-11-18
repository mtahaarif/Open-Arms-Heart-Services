import Link from "@/components/ui/Link";
import { ArrowRight, ArrowUpRight, Phone } from "lucide-react";
import { Ribbons } from "@/components/brand/Ribbons";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { addressLines, mapsUrl, site } from "@/lib/site";

/** "Let's find the support that feels right." — the closing deep-plum card: photo wash, ribbons, glass office card. */
export function ContactBand() {
  return (
    <section className="py-16 sm:py-24">
      <div className="wrap">
        <div className="band-dark rounded-[2.5rem] px-6 py-14 sm:px-12 sm:py-20 lg:px-16">
          <Photo src="/images/friends-smiling.webp" alt="" sizes="1600px" className="-z-20 opacity-25" />
          <div className="absolute inset-0 -z-10 bg-linear-to-br from-navy-900 via-plum-900/90 to-blush-700/60" />
          <Ribbons className="absolute -right-20 -bottom-10 -z-10 h-full w-[80%] opacity-60" />

          <div className="grid items-center gap-12 lg:grid-cols-[1.35fr_1fr]">
            <SectionHeading
              eyebrow="We're here to listen"
              title="Let's find the support that *feels right*."
              tone="light"
              text="Whether you're looking for care, making a referral or asking about screening services, our team can help you take the next step."
            >
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={site.phone.href} className="btn-light">
                  <Phone className="size-4" /> Call {site.phone.display}
                </a>
                <Link href="/contact#request" className="btn-outline-light">
                  Request more information <ArrowRight className="size-4" />
                </Link>
              </div>
            </SectionHeading>

            <div data-reveal className="glass-dark rounded-[2rem] p-7 [--d:150ms] sm:p-8">
              <h3 className="text-sm tracking-[0.16em] text-blush-200 uppercase">Visit our office</h3>
              <address className="mt-3 text-lg text-white not-italic">
                {site.name}
                <br />
                {addressLines[0]}
                <br />
                {addressLines[1]}
              </address>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-blush-200 hover:text-white">
                Get directions <ArrowUpRight className="size-3.5" />
              </a>
              <h3 className="mt-7 border-t border-white/10 pt-6 text-sm tracking-[0.16em] text-blush-200 uppercase">Call, fax or email</h3>
              <a href={site.phone.href} className="mt-3 block font-display text-3xl text-white hover:text-blush-200">
                {site.phone.display}
              </a>
              <p className="mt-1 text-navy-100/80">Fax: {site.fax.display}</p>
              <a href={`mailto:${site.email}`} className="block text-sm break-all text-navy-100/80 hover:text-white">
                {site.email}
              </a>
              <p className="mt-4 text-sm text-navy-100/70">Call to discuss service availability or schedule a fingerprinting appointment.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
