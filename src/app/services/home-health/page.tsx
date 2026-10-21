import { ArrowRight, Phone } from "lucide-react";
import { CtaBand } from "@/components/sections/CtaBand";
import { ConnectedSteps } from "@/components/sections/services/ConnectedSteps";
import { ServiceScrollspy } from "@/components/sections/services/ServiceScrollspy";
import { PageHero } from "@/components/ui/PageHero";
import { homeHealth } from "@/lib/services";
import { site } from "@/lib/site";
import { CareLink } from "@/components/forms/CareLink";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/services/home-health",
  title: "Home Health (Skilled Care)",
  description: "Skilled nursing, physical, occupational and speech therapy, medical social work and home health aides, delivered at home in Central Florida.",
});

export default function HomeHealthPage() {
  return (
    <>
      <PageHero
        eyebrow="Home Health · Skilled"
        title="Clinical care, *brought home.*"
        text={homeHealth.intro}
        crumbs={[{ href: "/services", label: "Types of Care" }, { label: "Home Health" }]}
        images={["/images/skilled-nursing.jpg", "/images/nurse-blood-pressure.jpg"]}
      >
        <CareLink care="home-health" className="btn-primary">
          Request skilled care <ArrowRight className="size-4" />
        </CareLink>
        <a href={site.phone.href} className="btn-ghost">
          <Phone className="size-4 text-blush-700" /> {site.phone.display}
        </a>
      </PageHero>
      <ConnectedSteps />
      <ServiceScrollspy source="home-health" />
      <CtaBand
        title="Coming home from the hospital? *We can help.*"
        text="Ask your doctor or discharge planner about home health with Open Arms & Heart Services — or call us and we'll coordinate with them."
        image="/images/walker-autumn.jpg"
      />
    </>
  );
}
