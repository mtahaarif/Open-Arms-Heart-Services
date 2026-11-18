import { ArrowRight, Phone } from "lucide-react";
import { Fragment, type ReactNode } from "react";
import { CareLink } from "@/components/forms/CareLink";
import { GoogleForm } from "@/components/forms/GoogleForm";
import { ComingSoon } from "@/components/sections/ComingSoon";
import { Coverage } from "@/components/sections/Coverage";
import { ServiceStack } from "@/components/sections/ServiceStack";
import { PageHeader } from "@/components/ui/PageHeader";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { steps } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { formLabels, programs, type Program } from "@/lib/services";
import { site } from "@/lib/site";
import { rich } from "@/lib/rich";

export const metadata = pageMetadata({
  path: "/services",
  title: "Our Services",
  description:
    "Non-skilled home health, APD services, vulnerable adult support, children & family support (CBC), veterans home care & respite, and Live Scan fingerprinting.",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our services"
        title={"Care for everyday needs.\n*Support for individual goals*."}
        text="Explore each service to see how we can help. Our team can discuss availability, referrals and authorization requirements with you."
        crumb="Our services"
        image="/images/banners/services.jpg"
        imageAlt="A caregiver steadying an older woman as she walks with her walker at home"
        focus="object-[42%_25%]"
      />

      {/* Each service: a sticky photo + title (left) beside its description as stacking cards (right) */}
      <section className="relative pt-14 pb-20 sm:pt-20 sm:pb-28">
        <div className="wrap">
          <ServiceStack
            items={programs.map((p) => ({ slug: p.slug, name: p.name, short: p.short }))}
            photos={programs.map((p) => (
              <Photo key={p.slug} src={p.image} alt="" sizes="(min-width: 1024px) 480px, 42vw" />
            ))}
            groups={programs.map((p, i) => (
              <ServiceCards key={p.slug} program={p} index={i} />
            ))}
          />
        </div>
      </section>

      <ComingSoon />
      <Coverage withResources={false} />

      <section id="request" className="section relative scroll-mt-28 overflow-hidden bg-linear-to-b from-plum-50 to-cream">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow="Request more information"
              title="Let's talk about the support *you need*."
              text="Complete the form and a member of our team will contact you. Prefer to talk now? Call our office."
            />
            <a href={site.phone.href} className="btn-primary mt-7">
              <Phone className="size-4" /> Call {site.phone.display}
            </a>
            <ol className="mt-10 space-y-3">
              {steps.map((s, i) => (
                <li key={s.title} data-reveal className="glass flex gap-4 rounded-[1.5rem] p-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-linear-to-br from-plum-600 to-blush-500 font-display text-lg text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block font-bold text-ink">{s.title}</span>
                    {s.text}
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <GoogleForm formLabels={formLabels} />
        </div>
      </section>
    </>
  );
}

/** At most this many "Services and support" items per card, so every card fits on a phone screen. */
const POINTS_PER_CARD = 4;

const chunk = <T,>(list: T[], size: number) => Array.from({ length: Math.ceil(list.length / size) }, (_, i) => list.slice(i * size, i * size + size));

/**
 * One service's description as a stack of cards that stick (each a little lower than the last) and
 * slide over one another: overview (tagline + description), the named program (CBC only), "Services
 * and support" in short runs, then the closing note with the call to action. Every card is the size
 * of the photo card (`--card-h`). The group is the sticky boundary, so the stack releases when the
 * service ends.
 */
function ServiceCards({ program: p, index }: { program: Program; index: number }) {
  const n = String(index + 1).padStart(2, "0");
  const lists = chunk(p.points, POINTS_PER_CARD);
  const kicker = "text-[0.66rem] font-bold tracking-[0.16em] text-blush-700 uppercase sm:text-xs";
  const title = "mt-2 font-display text-[1.15rem] leading-[1.15] font-medium text-ink uppercase sm:mt-3 sm:text-2xl lg:text-[1.75rem]";
  const body = "mt-2.5 text-[0.9rem] leading-relaxed max-[359px]:text-[0.82rem] sm:mt-4 sm:text-base lg:text-[1.05rem]";
  const shell = "flex h-(--card-h) flex-col justify-center overflow-hidden rounded-[1.5rem] p-5 max-[359px]:p-4 shadow-[0_24px_60px_-34px_rgb(51_27_88/0.5)] ring-1 sm:rounded-[2rem] sm:p-8 lg:rounded-[2.5rem] lg:p-9";
  const light = `${shell} bg-white ring-plum-100`;

  const cards: ReactNode[] = [
    <div key="overview" className={`${light} bg-linear-to-br from-white to-plum-50`}>
      <p className={kicker}>{n} · Overview</p>
      <p className={title}>{p.tagline}</p>
      <p className={body}>{rich(p.intro)}</p>
    </div>,
  ];
  if (p.feature) {
    cards.push(
      <div key="feature" className={`${light} bg-linear-to-br from-blush-50 to-white`}>
        <p className={kicker}>{n} · Program</p>
        <h3 className={title}>{p.feature.title}</h3>
        <p className={body}>{rich(p.feature.text)}</p>
      </div>,
    );
  }
  lists.forEach((list, j) =>
    cards.push(
      <div key={`points-${j}`} className={`${light} bg-linear-to-br ${j % 2 ? "from-plum-50 to-white" : "from-white to-blush-50"}`}>
        <p className={kicker}>
          Services and support{lists.length > 1 && <span className="text-plum-900/40"> · {j + 1}/{lists.length}</span>}
        </p>
        <ul className="check-list mt-3 space-y-2.5 text-[0.9rem] max-[359px]:space-y-2 max-[359px]:text-[0.82rem] leading-snug text-ink sm:mt-5 sm:space-y-3 sm:text-base">
          {list.map((pt) => (
            <li key={pt}>{pt}</li>
          ))}
        </ul>
      </div>,
    ),
  );
  cards.push(
    <div key="note" className={`${shell} band-dark ring-white/10`}>
      <p className="text-[0.66rem] font-bold tracking-[0.16em] text-blush-200 uppercase sm:text-xs">{n} · Next step</p>
      <p className="mt-2.5 text-[0.9rem] leading-relaxed text-navy-100/90 max-[359px]:text-[0.82rem] sm:mt-4 sm:text-base [&_strong]:text-white">{rich(p.note)}</p>
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 sm:mt-6">
        <CareLink care={p.slug} className="btn-light px-4 py-2.5 text-[0.8rem] sm:px-5 sm:py-3 sm:text-sm">
          Ask about {p.short} <ArrowRight className="size-3.5 sm:size-4" />
        </CareLink>
        <a href={site.phone.href} className="inline-flex items-center gap-1.5 text-[0.8rem] font-semibold text-blush-200 hover:text-white sm:text-sm">
          <Phone className="size-3.5 sm:size-4" /> {site.phone.display}
        </a>
      </div>
    </div>,
  );

  return (
    <div>
      <h2 className="sr-only">{p.name}</h2>
      {/* The gaps are spacer elements, not margins on the sticky cards: a sticky card's own margin
          would let the cards beneath it slip away early. With spacers — one after the last card
          too — the whole stack, "Next step" on top, holds for the length of that last gap and then
          moves on together. */}
      {cards.map((card, j) => (
        <Fragment key={j}>
          <div className="sticky" style={{ top: `calc(var(--stick) + ${j * 8}px)` }}>
            {card}
          </div>
          <div aria-hidden className="h-[22vh]" />
        </Fragment>
      ))}
    </div>
  );
}
