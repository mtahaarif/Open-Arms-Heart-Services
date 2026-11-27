import { Fragment } from "react";
import Link from "@/components/ui/Link";
import { ArrowUpRight, Clock, Mail, MapPin, Phone, Printer, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { clearinghouseNotice, mission } from "@/lib/content";
import { programHref, programs } from "@/lib/services";
import { addressLines, mapsUrl, site } from "@/lib/site";

/** The first sentence of the mission statement. */
const missionLine = mission.split(/(?<=\.)\s/)[0];

const company = [
  { href: "/about", label: "About us" },
  { href: "/careers", label: "Careers" },
  // No dedicated page yet: referrals are handled through the contact form.
  { href: "/contact#request", label: "Referral partners" },
  { href: "/faq", label: "FAQ" },
];

function Heading({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-base font-bold tracking-normal text-plum-700">{children}</h2>;
}

function Row({ icon: Icon, children }: { icon: typeof Phone; children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <Icon className="mt-1 size-4 shrink-0 text-plum-600" aria-hidden />
      <span>{children}</span>
    </li>
  );
}

/**
 * Simplified footer on the light-grey surface: the company with a one-line mission, Care services,
 * Company (About, Careers, Referral partners, FAQ) and Contact (address, phone, fax, email, hours),
 * then the Florida licence / registration numbers and the copyright. Four columns on desktop; on
 * phones and tablets two — the intro and Contact span the full width, with Care services and
 * Company side by side between them. The logo violet for headings and icons.
 */
export function Footer() {
  return (
    <footer className="relative isolate mt-10 overflow-hidden border-t border-line bg-sand text-[0.95rem] text-body">
      <div className="wrap grid grid-cols-2 gap-x-6 gap-y-9 pt-12 pb-10 sm:gap-x-10 sm:pt-16 sm:pb-12 lg:grid-cols-[1.35fr_1fr_0.8fr_1.25fr] lg:gap-12">
        <div className="col-span-2 lg:col-span-1">
          {/* Logo beside the name on phones and tablets (saves height), above it on desktop */}
          <div className="flex items-center gap-4 lg:block">
            <div className="inline-flex shrink-0 rounded-2xl bg-white p-2 shadow-sm ring-1 ring-sand-200 lg:p-2.5">
              <Logo className="h-11 lg:h-14" />
            </div>
            <p className="font-display text-lg leading-tight font-bold text-plum-700 lg:mt-5">Open Arms &amp; Heart Services</p>
          </div>
          <p className="mt-3 max-w-md leading-relaxed lg:mt-2 lg:max-w-xs">{missionLine}</p>
          <p className="mt-4 font-display text-[0.95rem] font-bold text-blush-700">{site.tagline}</p>
        </div>

        <div>
          <Heading>Care services</Heading>
          <ul className="mt-3.5 space-y-2 text-[0.9rem] sm:mt-4 sm:space-y-2.5 sm:text-[0.95rem]">
            {programs.map((p) => (
              <li key={p.slug}>
                <Link href={programHref(p)} className="transition-colors hover:text-plum-700">
                  {p.short}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <Heading>Company</Heading>
          <ul className="mt-3.5 space-y-2 text-[0.9rem] sm:mt-4 sm:space-y-2.5 sm:text-[0.95rem]">
            {company.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="transition-colors hover:text-plum-700">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 lg:col-span-1">
          <Heading>Contact</Heading>
          <address className="not-italic">
            <ul className="mt-4 space-y-3">
              <Row icon={MapPin}>
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-plum-700">
                  {addressLines[0]}, {addressLines[1]}
                </a>
              </Row>
              <Row icon={Phone}>
                <a href={site.phone.href} className="font-bold text-ink transition-colors hover:text-plum-700">
                  {site.phone.display}
                </a>
              </Row>
              <Row icon={Printer}>Fax: {site.fax.display}</Row>
              <Row icon={Mail}>
                <a href={`mailto:${site.email}`} className="[overflow-wrap:anywhere] transition-colors hover:text-plum-700">
                  {site.email}
                </a>
              </Row>
              <Row icon={Clock}>24/7 on-call service</Row>
            </ul>
          </address>
        </div>
      </div>

      <div className="wrap">
        {/* AHCA-required employment notice, on every page (Section 435.12, F.S.) — wording verbatim */}
        <section aria-labelledby="footer-clearinghouse" className="border-t border-sand-200 py-7 text-[0.85rem] leading-relaxed">
          <h2 id="footer-clearinghouse" className="flex items-start gap-2.5 font-display text-[0.95rem] leading-snug font-bold tracking-normal text-plum-700">
            <ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden />
            {clearinghouseNotice.title}
          </h2>
          <div className="mt-3 space-y-2">
            {/* Legal wording: never hyphenated; left-aligned on phones (narrow justified lines open wide gaps) */}
            {clearinghouseNotice.paragraphs.map((t) => (
              <p key={t.slice(0, 24)} className="text-left hyphens-none sm:text-justify">
                {t}
              </p>
            ))}
            <p data-label>
              {clearinghouseNotice.linkIntro}{" "}
              <a href={clearinghouseNotice.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-plum-700 underline underline-offset-4 hover:text-blush-700">
                {clearinghouseNotice.url} <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            </p>
          </div>
        </section>
        <div className="flex flex-col gap-2 border-t border-sand-200 py-6 text-[0.85rem] sm:flex-row sm:items-center sm:justify-between">
          <p data-label className="font-semibold text-ink">
            {/* Each label stays with its number; the line can wrap after a "·" */}
            {site.licenses.map((l, i) => (
              <Fragment key={l.number}>
                {i > 0 && " · "}
                <span className="whitespace-nowrap">
                  {l.short} {l.number}
                </span>
              </Fragment>
            ))}
          </p>
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
