import { AreasServed } from "@/components/sections/AreasServed";
import { CareChooser } from "@/components/sections/CareChooser";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqPreview } from "@/components/sections/FaqPreview";
import { HorizontalServices } from "@/components/sections/HorizontalServices";
import { StackingCards } from "@/components/sections/StackingCards";
import { StickySteps } from "@/components/sections/StickySteps";
import { AudienceBento } from "@/components/sections/home/AudienceBento";
import { CrossMarquee } from "@/components/sections/home/CrossMarquee";
import { Hero } from "@/components/sections/home/Hero";
import { Manifesto } from "@/components/sections/home/Manifesto";
import { PillarsReveal } from "@/components/sections/home/PillarsReveal";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CrossMarquee />
      <PillarsReveal />
      <Manifesto />
      <HorizontalServices slug="home-health" />
      <StackingCards slug="home-care" />
      <CareChooser />
      <StickySteps />
      <AudienceBento />
      <AreasServed />
      <FaqPreview />
      <CtaBand />
    </>
  );
}
