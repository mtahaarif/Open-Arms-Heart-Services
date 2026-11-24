import Link from "@/components/ui/Link";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";

/**
 * Closing call to action, modelled on benevolencehomeservices.com's "Let Us Help You Build the Right
 * Care Plan": a pale brand-tint band with rounded top corners, a large centred heading and short
 * paragraph, a solid violet uppercase pill (arrow in a white disc) and a white uppercase call pill.
 */
export function ContactBand() {
  return (
    <section aria-labelledby="cta-title" className="mt-16 rounded-t-[3rem] border-t border-plum-100 bg-plum-50 px-4 py-16 sm:mt-24 sm:px-6 lg:px-8 lg:py-24">
      <div data-reveal className="mx-auto max-w-3xl text-center">
        <h2 id="cta-title" className="text-[2.1rem] leading-[1.08] sm:text-[2.6rem] lg:text-[3.1rem]">
          Let&apos;s find the support that feels right
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-[1.05rem] leading-relaxed sm:text-lg">
          Whether you&apos;re looking for care, making a referral or asking about screening services, our team can help you take the next step.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact#request"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-plum-700 px-8 py-4 text-xs font-bold tracking-[0.12em] text-white uppercase shadow-md transition-all duration-300 hover:bg-plum-800 hover:shadow-lg"
          >
            Request more information
            <span className="grid size-5 place-items-center rounded-full bg-white text-plum-700">
              <ArrowRight className="size-3" aria-hidden />
            </span>
          </Link>
          <a
            href={site.phone.href}
            className="inline-flex items-center justify-center rounded-full border border-line bg-white px-8 py-4 text-xs font-bold tracking-[0.12em] text-plum-700 uppercase shadow-sm transition hover:bg-sand"
          >
            Call {site.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
