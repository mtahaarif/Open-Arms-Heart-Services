import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqExplorer } from "@/components/sections/faq/FaqExplorer";
import { PageHero } from "@/components/ui/PageHero";
import { faqs } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers about home health vs. home care, doctor's orders, Medicaid and payment, service areas, respite care for children, caregiver screening and more.",
  alternates: { canonical: "/faq" },
};

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
        text="Straight answers about services, getting started, paying for care and our caregivers. Search or browse by topic."
        crumbs={[{ label: "FAQ" }]}
      />
      <FaqExplorer />
      <CtaBand title="Didn't find your answer? *Just ask.*" image="/images/speech-therapy.jpg" />
    </>
  );
}
