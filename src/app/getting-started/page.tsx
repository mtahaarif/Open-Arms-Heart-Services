import { ArrowRight, Phone } from "lucide-react";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { PaymentGrid } from "@/components/sections/PaymentGrid";
import { ReadyChecklist, ReferralPanel, StoryStepper } from "@/components/sections/started/StartedSections";
import { PageHero } from "@/components/ui/PageHero";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/getting-started",
  title: "How to Start Home Care",
  description: "What happens after you call, what to have ready for your first visit, and how to pay for care, including Florida Medicaid.",
});

export default function GettingStartedPage() {
  return (
    <>
      <PageHero
        eyebrow="Getting started"
        title="Starting care, *without the stress.*"
        text="**One phone call** is all it takes. Here's what happens next, what to have on hand, and how paying for care works."
        crumbs={[{ label: "Getting Started" }]}
        images={["/images/breakfast-family.jpg", "/images/friends-talking.jpg"]}
      >
        <a href="#request" className="btn-primary">
          Request a consultation <ArrowRight className="size-4" />
        </a>
        <a href={site.phone.href} className="btn-ghost">
          <Phone className="size-4 text-blush-700" /> {site.phone.display}
        </a>
      </PageHero>
      <StoryStepper />
      <ReadyChecklist />
      <PaymentGrid />
      <ReferralPanel />
      <section id="request" className="scroll-mt-28 py-24 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionIntro
            eyebrow="Ready when you are"
            title="Let's start *the conversation.*"
            text="Share a few details and we'll call you back. Prefer to talk now? Our office line is open during business hours."
          />
          <InquiryForm />
        </div>
      </section>
    </>
  );
}
