import { AreasServed } from "@/components/sections/AreasServed";
import { CareChooser } from "@/components/sections/CareChooser";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqPreview } from "@/components/sections/FaqPreview";
import { HorizontalServices } from "@/components/sections/HorizontalServices";
import { StackingCards } from "@/components/sections/StackingCards";
import { AudienceBento } from "@/components/sections/home/AudienceBento";
import { CrossMarquee } from "@/components/sections/home/CrossMarquee";
import { Hero } from "@/components/sections/home/Hero";
import { Manifesto } from "@/components/sections/home/Manifesto";
import { PillarsReveal } from "@/components/sections/home/PillarsReveal";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/",
  absoluteTitle: true,
  title: "Open Arms & Heart Services | Home Is Where The Heart Is",
  description: site.description,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <CrossMarquee />
      <PillarsReveal />
      <Manifesto />
      <AudienceBento />
      <StackingCards />
      {/*<CareChooser />
      <HorizontalServices />
      <AreasServed />
      <FaqPreview />
      */}

      <CtaBand />
    </>
  );
}
