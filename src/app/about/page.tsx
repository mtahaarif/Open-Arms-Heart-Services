import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/sections/CtaBand";
import { FounderSpotlight, NameMeaning, PhotoMarquee, StoryChapters } from "@/components/sections/about/AboutSections";
import { PageHero } from "@/components/ui/PageHero";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/about",
  title: "About Us & Our Mission",
  description: `Our mission, and the story of ${site.owner.name}, proud owner of Open Arms & Heart Services Inc. — delivering high-quality, person-centered care since ${site.since}.`,
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Care rooted in *family.*"
        text={`${site.owner.name} is the proud owner of Open Arms & Heart Services Inc., where her passion for delivering **high-quality, person-centered care** is rooted in deeply personal experiences since ${site.since}.`}
        crumbs={[{ label: "About" }]}
        images={["/images/hero-caregiver-laughing.jpg", "/images/friends-talking.jpg"]}
      >
        <Link href="/services" className="btn-primary">
          Explore types of care <ArrowRight className="size-4" />
        </Link>
      </PageHero>
      <StoryChapters />
      <NameMeaning />
      <FounderSpotlight />
      <PhotoMarquee />
      <CtaBand />
    </>
  );
}
