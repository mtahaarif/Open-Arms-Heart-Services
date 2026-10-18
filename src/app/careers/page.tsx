import { ArrowRight } from "lucide-react";
import { CareersClient } from "@/components/sections/careers/CareersClient";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/careers",
  title: "Caregiver & Nursing Jobs",
  description: "Join our team: nurse, therapist, home health aide, companion, respite and direct support jobs in Polk, Lake and Orange counties, FL.",
});

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Do work that *feels like home.*"
        text="We're looking for **compassionate nurses, therapists, aides, companions and respite caregivers** who believe care should come with open arms and an open heart."
        crumbs={[{ label: "Careers" }]}
        images={["/images/caregiver-portrait.jpg", "/images/nurses-team.jpg"]}
      >
        <a href="#apply" className="btn-primary">
          Apply now <ArrowRight className="size-4" />
        </a>
      </PageHero>
      <CareersClient />
    </>
  );
}
