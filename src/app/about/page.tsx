import Link from "@/components/ui/Link";
import { ContactBand } from "@/components/sections/ContactBand";
import { PageHeader } from "@/components/ui/PageHeader";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { approach, audiences, mission, screening, story } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { licenseLine, site } from "@/lib/site";
import { rich } from "@/lib/rich";

export const metadata = pageMetadata({
  path: "/about",
  title: "About Us & Our Mission",
  description: `Our mission, and the story of ${site.owner.name}, owner of Open Arms & Heart Services Inc. — compassionate, person-centered care in Central Florida since ${site.since}.`,
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title={"Your family.\nYour goals. Our heart."}
        text={rich(approach.join(" "))}
        crumb="About us"
        image="/images/grandmother-granddaughter.jpg"
        imageAlt="A grandmother and her granddaughter smiling cheek to cheek"
      />

      {/* Owner's story */}
      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="relative mx-auto aspect-[928/1122] max-w-sm overflow-hidden rounded-lg">
              <Photo
                src="/images/founder-shantana-johnson.jpg"
                alt={`${site.owner.name}, ${site.owner.title.toLowerCase()} of ${site.name}`}
                sizes="(min-width: 1024px) 380px, 90vw"
              />
            </div>
            <p className="mt-5 text-center">
              <span className="block font-display text-2xl text-ink">{site.owner.name}</span>
              <span className="text-sm font-semibold tracking-[0.14em] text-plum-700 uppercase">
                {site.owner.title} · Since {site.since}
              </span>
            </p>
          </div>
          <div>
            <SectionHeading eyebrow="Our story" title="Inspired by family. Guided by love." />
            <div className="mt-6 space-y-5 text-lg leading-relaxed">
              {story.map((t) => (
                <p key={t.slice(0, 24)}>{rich(t)}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section bg-plum-50">
        <div className="wrap max-w-4xl text-center">
          <p className="eyebrow">Our mission</p>
          <blockquote className="mt-5 font-display text-2xl leading-relaxed text-ink sm:text-[1.75rem]">“{mission}”</blockquote>
          <p className="mt-6 font-display text-lg text-plum-700">{site.motto}</p>
        </div>
      </section>

      {/* Who we serve */}
      <section className="section">
        <div className="wrap">
          <SectionHeading eyebrow="Who we serve" title="Support for every stage of life." />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((a) => (
              <li key={a.title}>
                <Link href={a.href} className="card group block h-full overflow-hidden">
                  <div className="relative aspect-[4/3] bg-plum-100">
                    <Photo src={a.image} alt={a.alt} sizes="(min-width: 1024px) 270px, (min-width: 640px) 50vw, 100vw" />
                  </div>
                  <div className="p-6">
                    <h3 className="group-hover:text-plum-700">{a.title}</h3>
                    <p className="mt-2 text-[0.95rem]">{a.text}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Credentials */}
      <section className="section bg-cream">
        <div className="wrap grid gap-10 lg:grid-cols-2 lg:gap-20">
          <SectionHeading eyebrow="Licensed & trusted" title="Care you can feel confident about." text={rich(screening)} />
          <div className="card p-7 sm:p-9">
            <ul className="check-list space-y-3">
              {site.credentials.map((c) => (
                <li key={c} className="font-semibold text-ink">
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-line pt-5 text-sm font-semibold text-ink">{licenseLine}</p>
          </div>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
