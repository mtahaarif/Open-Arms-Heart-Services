import { ArrowRight, Phone } from "lucide-react";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { InsuranceSection } from "@/components/sections/InsuranceSection";
import { ResourcesSection } from "@/components/sections/ResourcesSection";
import { ReadyChecklist, ReferralPanel, StoryStepper } from "@/components/sections/started/StartedSections";
import { PageHero } from "@/components/ui/PageHero";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/getting-started",
  title: "How to Start Home Care",
  description: "How to start services with Open Arms & Heart Services: what happens after you reach out, what to have ready, insurance and helpful resources.",
});

export default function GettingStartedPage() {
  return (
    <>
      <PageHero
        eyebrow="Getting started"
        title="Starting care, *without the stress.*"
        text="Open Arms & Heart Services is **only a call away.** Here's what happens after you reach out, what to have on hand, and the insurance we accept."
        crumbs={[{ label: "Getting Started" }]}
        images={["/images/breakfast-family.jpg", "/images/friends-talking.jpg"]}
      >
        <a href="#request" className="btn-primary">
          Request more information <ArrowRight className="size-4" />
        </a>
        <a href={site.phone.href} className="btn-ghost">
          <Phone className="size-4 text-blush-700" /> {site.phone.display}
        </a>
      </PageHero>
      <StoryStepper />
      <ReadyChecklist />
      <InsuranceSection eyebrow="Paying for care" />
      <ReferralPanel />
      <ResourcesSection />
      <section id="request" className="scroll-mt-28 py-24 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionIntro
            eyebrow="Ready when you are"
            title="Let's start *the conversation.*"
            text="Share a few details and our staff will reach out to discuss how we can help your family. Prefer to talk now? Open Arms & Heart Services is only a call away."
          />
          <InquiryForm />
        </div>
      </section>
    </>
  );
}
