import Link from "@/components/ui/Link";
import { ArrowRight, ArrowUpRight, ChevronRight, House, Info, Mail, MapPin, Phone, Printer } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CareLink } from "@/components/forms/CareLink";
import { ComingSoon } from "@/components/sections/ComingSoon";
import { Coverage } from "@/components/sections/Coverage";
import { Photo } from "@/components/ui/Photo";
import { pageMetadata } from "@/lib/seo";
import { programBySlug, programHref, programs } from "@/lib/services";
import { addressLines, mapsUrl, site } from "@/lib/site";
import { plain, rich } from "@/lib/rich";

/**
 * One page per service (/services/<slug>), laid out like the service pages of lovethyneighborhhc.com:
 * a light banner (breadcrumb, "Service 0n / 06", the name, intro, call buttons, framed photo); the
 * service's details beside a sticky sidebar (every service, with this one highlighted, and a call
 * card); then the other services as a swipeable row of photo cards. Copy is the published service
 * description (lib/services.ts). There is no /services overview page — it redirects to the home
 * page's services section (next.config.ts).
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = programBySlug((await params).slug);
  if (!p) return {};
  const description = `${p.tagline} ${plain(p.intro)}`;
  return pageMetadata({
    path: programHref(p),
    title: p.short,
    description: description.length > 155 ? `${description.slice(0, 152).replace(/\s+\S*$/, "")}…` : description,
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const p = programBySlug((await params).slug);
  if (!p) notFound();
  const index = programs.indexOf(p);
  const n = (i: number) => String(i + 1).padStart(2, "0");
  const others = programs.filter((o) => o.slug !== p.slug);

  return (
    <>
      {/* Banner: light, split — copy left, framed photo right */}
      <section className="relative isolate overflow-hidden bg-linear-to-br from-plum-50 via-cream to-blush-50/70">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(rgb(102_45_145/0.08)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div aria-hidden className="absolute -top-40 -left-40 -z-10 size-[32rem] rounded-full bg-plum-200/40 blur-3xl" />
        <div aria-hidden className="absolute -right-32 -bottom-40 -z-10 size-[28rem] rounded-full bg-blush-200/40 blur-3xl" />

        <div className="wrap grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:py-20">
          <div>
            <nav aria-label="Breadcrumb" className="enter text-[0.82rem]">
              <ol className="flex flex-wrap items-center gap-1.5 text-body">
                <li>
                  <Link href="/" className="grid size-6 place-items-center rounded-full transition-colors hover:text-plum-700">
                    <House className="size-3.5" aria-hidden />
                    <span className="sr-only">Home page</span>
                  </Link>
                </li>
                <li aria-hidden>
                  <ChevronRight className="size-3.5 opacity-50" />
                </li>
                <li>
                  <Link href="/#services" className="hover:text-plum-700">
                    Our services
                  </Link>
                </li>
                <li aria-hidden>
                  <ChevronRight className="size-3.5 opacity-50" />
                </li>
                <li aria-current="page" className="font-semibold text-ink">
                  {p.short}
                </li>
              </ol>
            </nav>

            <p className="enter eyebrow mt-6 [--d:60ms]">
              Service {n(index)} / {n(programs.length - 1)}
            </p>
            <h1 className="enter mt-4 text-[2.1rem] sm:text-[2.8rem] lg:text-[3.3rem] [--d:120ms]">{p.name}</h1>
            <p className="enter mt-5 font-display text-xl font-bold text-plum-700 [--d:180ms] sm:text-2xl">{p.tagline.replace(/\.$/, "")}</p>
            <p className="enter mt-3 max-w-xl text-[1.02rem] leading-relaxed [--d:240ms] sm:text-[1.08rem]">{rich(p.intro)}</p>

            <div className="enter mt-8 flex flex-wrap gap-3 [--d:300ms]">
              <a href={site.phone.href} className="btn-primary gap-2.5 py-3 pr-6 pl-3">
                <span className="grid size-8 place-items-center rounded-full bg-white/20">
                  <Phone className="size-4" aria-hidden />
                </span>
                Call us
              </a>
              <CareLink care={p.slug} className="btn-outline">
                Request more information <ArrowRight className="size-4 text-blush-600" aria-hidden />
              </CareLink>
            </div>
          </div>

          <div className="enter relative [--d:200ms]">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] bg-plum-100 shadow-[0_40px_90px_-40px_rgb(102_45_145/0.55)] ring-8 ring-white/70">
              <Photo src={p.image} alt={p.imageAlt} preload sizes="(min-width: 1024px) 760px, 140vw" />
            </div>
            <span className="absolute -bottom-5 left-5 inline-flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_20px_50px_-20px_rgb(102_45_145/0.45)] ring-1 ring-plum-100 sm:left-8">
              <span className="grid size-10 place-items-center rounded-xl bg-linear-to-br from-plum-700 to-blush-500 text-white">
                <p.icon className="size-5" aria-hidden />
              </span>
              <span className="font-display text-base leading-tight font-bold text-ink">{p.short}</span>
            </span>
          </div>
        </div>
      </section>

      {/* Details beside a sticky sidebar (sidebar drops below the details on phones) */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="wrap grid gap-10 lg:grid-cols-[18.5rem_1fr] lg:gap-14">
          <aside className="order-2 space-y-5 lg:order-1 lg:sticky lg:top-24 lg:self-start">
            <nav aria-label="Our services" className="rounded-[1.5rem] bg-plum-50/70 p-3 ring-1 ring-plum-100">
              <p className="px-3 pt-2 pb-3 text-xs font-bold tracking-[0.2em] text-plum-700 uppercase">Our services</p>
              <ul className="space-y-1">
                {programs.map((o) => {
                  const current = o.slug === p.slug;
                  return (
                    <li key={o.slug}>
                      <Link
                        href={programHref(o)}
                        aria-current={current ? "page" : undefined}
                        className={`flex items-center justify-between gap-3 rounded-xl px-3.5 py-3 text-[0.9rem] font-semibold transition-colors ${
                          current ? "bg-linear-to-r from-plum-700 to-plum-500 text-white shadow-[0_10px_24px_-12px_rgb(102_45_145/0.7)]" : "text-ink/80 hover:bg-white hover:text-plum-700"
                        }`}
                      >
                        {o.short}
                        <ArrowUpRight className={`size-4 shrink-0 ${current ? "" : "opacity-50"}`} aria-hidden />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="band-dark rounded-[1.5rem] p-6 text-white">
              <p className="font-display text-xl leading-snug font-bold text-white">Open Arms &amp; Heart Services is only a call away!</p>
              <a href={site.phone.href} className="mt-4 flex items-center gap-2.5 font-display text-xl font-bold text-blush-200 hover:text-white">
                <Phone className="size-5" aria-hidden /> {site.phone.display}
              </a>
              <ul className="mt-5 space-y-3 border-t border-white/15 pt-5 text-[0.9rem] text-navy-100">
                <li className="flex gap-3">
                  <Printer className="mt-0.5 size-4 shrink-0 text-blush-200" aria-hidden /> Fax: {site.fax.display}
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-blush-200" aria-hidden />
                  <a href={`mailto:${site.email}`} className="[overflow-wrap:anywhere] hover:text-white">
                    {site.email}
                  </a>
                </li>
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-blush-200" aria-hidden />
                  <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    {addressLines[0]}, {addressLines[1]}
                  </a>
                </li>
              </ul>
            </div>
          </aside>

          <div className="order-1 min-w-0 lg:order-2">
            <p data-reveal className="eyebrow">
              {p.short}
            </p>
            <h2 data-reveal className="mt-4 [--d:60ms]">
              Services and support
            </h2>
            {p.feature && (
              <div data-reveal className="mt-8 rounded-[1.5rem] border border-blush-200 bg-linear-to-br from-blush-50 to-white p-6 sm:p-8">
                <p className="text-xs font-bold tracking-[0.2em] text-blush-700 uppercase">Program</p>
                <h3 className="mt-2 text-2xl">{p.feature.title}</h3>
                <p className="mt-3 leading-relaxed">{rich(p.feature.text)}</p>
              </div>
            )}

            <ul data-reveal className="check-list mt-8 grid gap-x-8 gap-y-3.5 text-[1.02rem] text-ink/90 md:grid-cols-2">
              {p.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>

            <p data-reveal className="mt-8 flex max-w-3xl gap-3 rounded-2xl bg-plum-50/70 p-5 text-[0.98rem] leading-relaxed ring-1 ring-plum-100">
              <Info className="mt-1 size-5 shrink-0 text-plum-600" aria-hidden />
              <span>{rich(p.note)}</span>
            </p>

            <div data-reveal className="mt-10 flex flex-col items-start justify-between gap-6 rounded-[1.75rem] bg-white p-7 shadow-[0_24px_60px_-34px_rgb(102_45_145/0.45)] ring-1 ring-plum-100 sm:flex-row sm:items-center sm:p-8">
              <div>
                <p className="font-display text-2xl leading-tight font-bold text-ink">Let&apos;s talk about the support you need</p>
                <p className="mt-2 text-[0.98rem]">Our team can discuss availability, referrals and authorization requirements with you.</p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <a href={site.phone.href} className="btn-primary">
                  <Phone className="size-4" aria-hidden /> Call us
                </a>
                <CareLink care={p.slug} className="btn-outline">
                  Ask about this service <ArrowRight className="size-4 text-blush-600" aria-hidden />
                </CareLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The other services: a swipeable row of photo cards */}
      <section aria-labelledby="more-services" className="overflow-hidden bg-linear-to-b from-plum-50/70 to-cream py-16 sm:py-20">
        <div className="wrap">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p data-reveal className="eyebrow">
                Our services
              </p>
              <h2 id="more-services" data-reveal className="mt-4 [--d:60ms]">
                More ways we can help
              </h2>
            </div>
          </div>
          <ul className="-mx-4 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 [scrollbar-width:thin] sm:-mx-7 sm:px-7">
            {others.map((o) => (
              <li key={o.slug} className="w-[min(78vw,19rem)] shrink-0 snap-start">
                <Link href={programHref(o)} className="group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[1.75rem] p-6 text-white shadow-[0_24px_50px_-28px_rgb(102_45_145/0.6)]">
                  <Photo src={o.image} alt="" sizes="(min-width: 640px) 460px, 120vw" className="-z-20 transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 -z-10 bg-linear-to-t from-plum-900/85 via-plum-800/25 to-transparent" />
                  <span className="absolute top-5 left-5 rounded-full bg-white/85 px-2.5 py-1 text-xs font-bold text-plum-800">{n(programs.indexOf(o))}</span>
                  <span className="absolute top-5 right-5 grid size-10 place-items-center rounded-full bg-white text-plum-700 transition-transform group-hover:rotate-45">
                    <ArrowUpRight className="size-4" aria-hidden />
                  </span>
                  <h3 className="text-2xl leading-tight text-white">{o.short}</h3>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-blush-200">
                    Learn more <span aria-hidden className="h-px w-8 bg-current transition-all group-hover:w-12" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Coverage withResources={false} />
      <ComingSoon />
    </>
  );
}
