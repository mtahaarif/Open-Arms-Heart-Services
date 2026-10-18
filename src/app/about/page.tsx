import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/sections/CtaBand";
import { FlipPromises, FounderSpotlight, NameMeaning, PhotoMarquee, StoryChapters } from "@/components/sections/about/AboutSections";
import { PageHero } from "@/components/ui/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `Founded in ${site.founded} by ${site.founder.name}, Open Arms & Heart Services brings family-oriented skilled home health and non-skilled home care to Central Florida.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Care with open arms. *Service with heart.*"
        text={`Since ${site.founded}, we've been helping Central Florida families stay safe, comfortable and connected at home — with a family-oriented approach that puts people before paperwork.`}
        crumbs={[{ label: "About" }]}
        images={["/images/hero-caregiver-laughing.jpg", "/images/family-baking.jpg"]}
      >
        <Link href="/services" className="btn-primary">
          Explore our services <ArrowRight className="size-4" />
        </Link>
      </PageHero>
      <StoryChapters />
      <NameMeaning />
      <FounderSpotlight />
      <FlipPromises />
      <PhotoMarquee />
      <CtaBand />
    </>
  );
}
