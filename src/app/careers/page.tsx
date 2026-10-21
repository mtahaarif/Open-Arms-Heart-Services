import { ArrowRight, ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import { CareersClient } from "@/components/sections/careers/CareersClient";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/careers",
  title: "Careers — Join Our Care Team",
  description: "Home Health Aide and Group Home Staff jobs with Open Arms & Heart Services in Central Florida. Make a difference and build a meaningful career.",
});

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Quality care. *Brighter tomorrows.*"
        text="**Make a difference and build a meaningful career.** Join our care team and help children, adults, seniors, and people with disabilities live safely and comfortably at home."
        crumbs={[{ label: "Careers" }]}
        images={["/images/caregiver-portrait.jpg", "/images/nurses-team.jpg"]}
      >
        <a href={site.applicationUrl} target="_blank" rel="noreferrer" className="btn-primary">
          Apply now <ArrowUpRight className="size-4" />
        </a>
        <a href="#apply" className="btn-ghost">
          What you&apos;ll need <ArrowRight className="size-4" />
        </a>
      </PageHero>
      <CareersClient />
    </>
  );
}
