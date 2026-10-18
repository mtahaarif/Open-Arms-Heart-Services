import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { CtaBand } from "@/components/sections/CtaBand";
import { DayTimeline } from "@/components/sections/services/DayTimeline";
import { HoverRevealGrid } from "@/components/sections/services/HoverRevealGrid";
import { RespiteSpotlight } from "@/components/sections/services/RespiteSpotlight";
import { PageHero } from "@/components/ui/PageHero";
import { homeCare } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Home Care (Non-Skilled)",
  description:
    "Personal care, companion services, homemaking, respite care, personal supports, transportation and residential habilitation across Polk, Lake and Orange counties, Florida.",
  alternates: { canonical: "/services/home-care" },
};

export default function HomeCarePage() {
  return (
    <>
      <PageHero
        eyebrow="Home Care · Non-Skilled"
        title="Everyday help, *with heart.*"
        text={homeCare.intro}
        crumbs={[{ href: "/services", label: "Services" }, { label: "Home Care" }]}
        images={["/images/companion-care.jpg", "/images/homemaker.jpg"]}
      >
        <Link href="/contact?care=home-care" className="btn-primary">
          Request home care <ArrowRight className="size-4" />
        </Link>
        <a href={site.phone.href} className="btn-ghost">
          <Phone className="size-4 text-blush-600" /> {site.phone.display}
        </a>
      </PageHero>
      <HoverRevealGrid />
      <DayTimeline />
      <RespiteSpotlight />
      <CtaBand image="/images/grandpa-granddaughter.jpg" />
    </>
  );
}
