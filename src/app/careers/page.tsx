import { ArrowRight, ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import { CareersClient } from "@/components/sections/careers/CareersClient";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/careers",
  title: "Careers — Join Our Care Team",
  description: "Quality care. Brighter tomorrows. Make a difference and build a meaningful career — apply for Home Health Aide or Group Home Staff positions.",
});

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Quality care. *Brighter tomorrows.*"
        text="**Make a difference and build a meaningful career.** Join Our Care Team!"
        crumbs={[{ label: "Careers" }]}
        images={["/images/caregiver-portrait.jpg", "/images/nurses-team.jpg"]}
      >
        <a href={site.applicationUrl} target="_blank" rel="noreferrer" className="btn-primary">
          Apply now <ArrowUpRight className="size-4" />
        </a>
        <a href="#apply" className="btn-ghost">
          About the application <ArrowRight className="size-4" />
        </a>
      </PageHero>
      <CareersClient />
    </>
  );
}
