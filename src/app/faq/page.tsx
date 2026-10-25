import Link from "@/components/ui/Link";
import { Phone, Plus } from "lucide-react";
import { ContactBand } from "@/components/sections/ContactBand";
import { PageHeader } from "@/components/ui/PageHeader";
import { faqCategories, faqs } from "@/lib/faqs";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { plain, rich } from "@/lib/rich";

export const metadata = pageMetadata({
  path: "/faq",
  title: "Frequently Asked Questions",
  description: "Answers about our services, service areas, insurance and licensing, background screening, APD, veterans, CBC and Live Scan fingerprinting.",
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: plain(f.a) },
  })),
};

const slug = (s: string) => s.toLowerCase().replace(/[^a-z]+/g, "-");

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PageHeader
        eyebrow="FAQ"
        title="Answers for your family."
        text="Common questions about our services, coverage, licensing and caregivers. Don't see your question? Our team is only a call away."
        crumb="FAQ"
      />

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[0.32fr_0.68fr] lg:gap-16">
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <nav aria-label="FAQ topics">
              <p className="eyebrow">Topics</p>
              <ul className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
                {faqCategories.map((c) => (
                  <li key={c}>
                    <a href={`#${slug(c)}`} className="block rounded-md border border-line px-4 py-2 font-semibold text-ink hover:border-plum-300 hover:text-plum-700 lg:border-0 lg:px-0 lg:py-1.5">
                      {c}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-8 hidden rounded-lg bg-plum-50 p-6 lg:block">
              <p className="font-bold text-ink">Still have questions?</p>
              <a href={site.phone.href} className="btn-primary mt-4 w-full">
                <Phone className="size-4" /> {site.phone.display}
              </a>
              <Link href="/contact#request" className="link-arrow mt-4 text-sm">
                Request more information →
              </Link>
            </div>
          </aside>

          <div className="space-y-14">
            {faqCategories.map((c) => (
              <div key={c} id={slug(c)} className="scroll-mt-32">
                <h2 className="text-[1.75rem] sm:text-[2rem]">{c}</h2>
                <div className="mt-5 divide-y divide-line border-y border-line">
                  {faqs
                    .filter((f) => f.category === c)
                    .map((f) => (
                      <details key={f.q} className="group">
                        <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-lg font-bold text-ink hover:text-plum-700 [&::-webkit-details-marker]:hidden">
                          {f.q}
                          <Plus className="mt-1 size-5 shrink-0 text-plum-700 transition-transform group-open:rotate-45" aria-hidden />
                        </summary>
                        <p className="max-w-3xl pb-6">{rich(f.a)}</p>
                      </details>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
