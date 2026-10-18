import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { CareChooser } from "@/components/sections/CareChooser";
import { CtaBand } from "@/components/sections/CtaBand";
import { PaymentGrid } from "@/components/sections/PaymentGrid";
import { ComparisonTable } from "@/components/sections/services/ComparisonTable";
import { PillarSwitcher } from "@/components/sections/services/PillarSwitcher";
import { PageHero } from "@/components/ui/PageHero";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/services",
  title: "Home Health & Home Care",
  description: "Compare skilled home health (nursing, PT, OT, speech) and non-skilled home care (personal care, companions, respite) across Central Florida.",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Care for *every chapter* of life at home."
        text="Thirteen services across two levels of care — so whether you need a nurse, a therapist, a helping hand or a friendly face, you only need to make **one call**."
        crumbs={[{ label: "Services" }]}
        images={["/images/aide-smiling-patient.jpg", "/images/therapy-play.jpg"]}
      >
        <Link href="#care-finder" className="btn-primary">
          Find the right care <ArrowRight className="size-4" />
        </Link>
        <a href={site.phone.href} className="btn-ghost">
          <Phone className="size-4 text-blush-700" /> {site.phone.display}
        </a>
      </PageHero>
      <PillarSwitcher />
      <ComparisonTable />
      <CareChooser />
      <PaymentGrid />
      <CtaBand />
    </>
  );
}
