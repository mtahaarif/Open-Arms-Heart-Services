import Link from "@/components/ui/Link";
import { Clock, Mail, MapPin, Phone, Printer } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { mission } from "@/lib/content";
import { programHref, programs } from "@/lib/services";
import { addressLines, licenseLine, mapsUrl, site } from "@/lib/site";

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
 * Simplified, bright footer: four short columns — the company with a one-line mission, Care
 * services, Company (About, Careers, Referral partners, FAQ) and Contact (address, phone, fax, email,
 * hours) — and a bottom line with the Florida licence / registration numbers and the copyright.
 * Warm cream with soft sage and blush glows; the logo violet for headings, icons and a thin top rule.
 */
export function Footer() {
  return (
    <footer className="relative isolate mt-10 overflow-hidden border-t border-line bg-sand text-[0.95rem] text-body">

      <div className="wrap grid gap-10 pt-14 pb-12 sm:grid-cols-2 sm:pt-16 lg:grid-cols-[1.35fr_1fr_0.8fr_1.25fr] lg:gap-12">
        <div>
          <div className="inline-flex rounded-2xl bg-white p-2.5 shadow-sm ring-1 ring-sand-200">
            <Logo className="h-14" />
          </div>
          <p className="mt-5 font-display text-lg font-bold text-plum-700">Open Arms &amp; Heart Services</p>
          <p className="mt-2 max-w-xs leading-relaxed">{missionLine}</p>
          <p className="mt-4 font-display text-[0.95rem] font-bold text-blush-700">{site.tagline}</p>
        </div>

        <div>
          <Heading>Care services</Heading>
          <ul className="mt-4 space-y-2.5">
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
          <ul className="mt-4 space-y-2.5">
            {company.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="transition-colors hover:text-plum-700">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
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
        <div className="flex flex-col gap-2 border-t border-sand-200 py-6 text-[0.85rem] sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-ink">{licenseLine}</p>
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
