import Link from "@/components/ui/Link";
import { ArrowRight, Phone, Plus } from "lucide-react";
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
        title="Answers for *your family*."
        text="Common questions about our services, coverage, licensing and caregivers. Don't see your question? Our team is only a call away."
        crumb="FAQ"
        image="/images/banners/faq.webp"
        imageAlt="A mother and her daughter smiling as they look something up together on a laptop"
        focus="object-[48%_25%]"
      />

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[17rem_1fr] lg:gap-14">
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <nav aria-label="FAQ topics" className="glass rounded-[1.75rem] p-5">
              <p className="eyebrow">Topics</p>
              <ul className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
                {faqCategories.map((c) => (
                  <li key={c}>
                    <a
                      href={`#${slug(c)}`}
                      className="block rounded-full bg-white/70 px-4 py-2 font-semibold text-ink ring-1 ring-plum-100 transition hover:text-plum-700 lg:rounded-2xl lg:bg-transparent lg:px-3 lg:ring-0 lg:hover:bg-white/80"
                    >
                      {c}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-5 hidden rounded-[1.75rem] bg-sage p-6 ring-1 ring-sage-200 lg:block">
              <p className="font-display text-lg font-bold text-plum-700">Still have questions?</p>
              <a href={site.phone.href} className="btn-primary mt-4 w-full">
                <Phone className="size-4" /> {site.phone.display}
              </a>
              <Link href="/contact#request" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-plum-700 hover:text-blush-600">
                Request more information <ArrowRight className="size-4" />
              </Link>
            </div>
          </aside>

          <div className="space-y-14">
            {faqCategories.map((c) => (
              <div key={c} id={slug(c)} className="scroll-mt-32">
                <h2 data-reveal className="text-[1.6rem] sm:text-[1.9rem]">
                  {c}
                </h2>
                <div className="mt-6 space-y-3">
                  {faqs
                    .filter((f) => f.category === c)
                    .map((f) => (
                      <details key={f.q} data-reveal className="group glass rounded-[1.5rem] transition-shadow open:shadow-[0_30px_60px_-30px_rgb(96_52_159/0.45)]">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-lg font-bold text-ink hover:text-plum-700">
                          {f.q}
                          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-plum-50 text-plum-700 transition duration-300 group-open:rotate-45 group-open:bg-linear-to-br group-open:from-plum-600 group-open:to-blush-500 group-open:text-white">
                            <Plus className="size-4" aria-hidden />
                          </span>
                        </summary>
                        <p className="max-w-3xl px-6 pb-6">{rich(f.a)}</p>
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
