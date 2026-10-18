import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { CareChooser } from "@/components/sections/CareChooser";
import { CtaBand } from "@/components/sections/CtaBand";
import { PaymentGrid } from "@/components/sections/PaymentGrid";
import { ComparisonTable } from "@/components/sections/services/ComparisonTable";
import { PillarSwitcher } from "@/components/sections/services/PillarSwitcher";
import { PageHero } from "@/components/ui/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services — Home Health & Home Care",
  description:
    "Skilled home health (nursing, physical, occupational & speech therapy, medical social work, home health aides) and non-skilled home care (personal care, companions, homemaking, respite, transportation) across Central Florida.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Care for *every chapter* of life at home."
        text="Thirteen services across two levels of care — so whether you need a nurse, a therapist, a helping hand or a friendly face, you only need to make one call."
        crumbs={[{ label: "Services" }]}
        images={["/images/aide-smiling-patient.jpg", "/images/therapy-play.jpg"]}
      >
        <Link href="#care-finder" className="btn-primary">
          Find the right care <ArrowRight className="size-4" />
        </Link>
        <a href={site.phone.href} className="btn-ghost">
          <Phone className="size-4 text-blush-600" /> {site.phone.display}
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
