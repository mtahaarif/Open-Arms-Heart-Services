import { CtaBand } from "@/components/sections/CtaBand";
import { FaqExplorer } from "@/components/sections/faq/FaqExplorer";
import { PageHero } from "@/components/ui/PageHero";
import { faqs } from "@/lib/faqs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/faq",
  title: "Home Health & Home Care FAQs",
  description: "Answers about types of care, APD and veteran services, insurance we accept, licensing, background checks, service areas and Live Scan.",
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PageHero
        eyebrow="FAQ"
        title="Questions families *ask us most.*"
        text="Straight answers about our types of care, getting started, insurance and licensing, and our caregivers. Search or browse by topic."
        crumbs={[{ label: "FAQ" }]}
        images={["/images/speech-therapy.jpg", "/images/seniors-smiling.jpg"]}
      />
      <FaqExplorer />
      <CtaBand title="Didn't find your answer? *Just ask.*" image="/images/speech-therapy.jpg" />
    </>
  );
}
