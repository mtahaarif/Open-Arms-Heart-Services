import Link from "@/components/ui/Link";
import { ArrowUpRight, Mail, MapPin, Phone, Printer } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Marquee } from "@/components/ui/Marquee";
import { resources } from "@/lib/content";
import { programHref, programs } from "@/lib/services";
import { addressLines, licenseLine, mapsUrl, site } from "@/lib/site";

const company = [
  { href: "/about", label: "About us & our mission" },
  { href: "/careers", label: "Careers & open positions" },
  { href: "/faq", label: "Frequently asked questions" },
  { href: "/contact", label: "Contact us" },
];

/** The site's own lines, shown in the giant outlined ticker (full stops dropped, as in headings). */
const tickerWords = [site.tagline, site.motto, site.closing].map((w) => w.replace(/\./g, "").trim());

function Heading({ children }: { children: React.ReactNode }) {
  return <h2 className="font-sans text-xs font-bold tracking-[0.18em] text-blush-200 uppercase">{children}</h2>;
}

export function Footer() {
  return (
    <footer className="band-dark mt-10 rounded-t-[3rem] text-[0.95rem]">
      {/* Oversized outlined ticker — a single, simple row */}
      <Marquee duration={50} gap="2.45rem" pauseOnHover={false} className="border-b border-white/10 py-[1.4rem]">
        {tickerWords.map((w) => (
          <span key={w} className="flex items-center gap-[2.45rem]">
            <span className="font-display text-[2.1rem] font-medium whitespace-nowrap text-transparent uppercase [-webkit-text-stroke:1px_rgb(225_210_248/0.45)] sm:text-[3.15rem]">
              {w}
            </span>
            <span className="size-2 rounded-full bg-linear-to-br from-plum-400 to-blush-400" />
          </span>
        ))}
      </Marquee>

      <div className="wrap grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.25fr_0.95fr_0.95fr_1.25fr]">
        <div>
          <div className="inline-flex rounded-2xl bg-white p-2.5 shadow-lg shadow-black/20">
            <Logo className="h-14" />
          </div>
          <p className="mt-6 max-w-xs leading-relaxed text-navy-100/75">{site.description}</p>
          <p className="mt-4 text-xs font-semibold tracking-wide text-blush-200">{licenseLine}</p>
        </div>

        <div>
          <Heading>Services</Heading>
          <ul className="mt-5 space-y-2.5">
            {programs.map((p) => (
              <li key={p.slug}>
                <Link href={programHref(p)} className="text-navy-100/75 transition hover:text-white">
                  {p.short}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <Heading>Company</Heading>
          <ul className="mt-5 space-y-2.5">
            {company.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-navy-100/75 transition hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={site.applicationUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1 text-navy-100/75 transition hover:text-white">
                Apply online <ArrowUpRight className="size-3.5 opacity-60 group-hover:opacity-100" />
              </a>
            </li>
          </ul>
        </div>

        <div>
          <Heading>Visit or call</Heading>
          <address className="mt-5 space-y-3.5 not-italic">
            <a href={site.phone.href} className="group flex gap-3 text-white">
              <Phone className="mt-1 size-4 shrink-0 text-blush-300" aria-hidden />
              <span className="font-display text-xl group-hover:text-blush-200">{site.phone.display}</span>
            </a>
            <p className="flex gap-3 text-navy-100/75">
              <Printer className="mt-1 size-4 shrink-0 text-blush-300" aria-hidden /> Fax: {site.fax.display}
            </p>
            <a href={`mailto:${site.email}`} className="group flex gap-3 text-navy-100/75">
              <Mail className="mt-1 size-4 shrink-0 text-blush-300" aria-hidden />
              <span className="text-[0.9rem] [overflow-wrap:anywhere] group-hover:text-white">{site.email}</span>
            </a>
            <p className="flex gap-3 text-navy-100/75">
              <MapPin className="mt-1 size-4 shrink-0 text-blush-300" aria-hidden />
              <span>
                {addressLines[0]}
                <br />
                {addressLines[1]}
                <br />
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-blush-200 hover:text-white">
                  Get directions <ArrowUpRight className="size-3.5" />
                </a>
              </span>
            </p>
          </address>
        </div>
      </div>

      <div className="wrap">
        <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 py-6 text-sm">
          <span className="font-semibold text-white">Community resources:</span>
          {resources.map((r) => (
            <a key={r.name} href={r.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1 text-navy-100/70 hover:text-white">
              {r.name} <ArrowUpRight className="size-3 opacity-50 group-hover:opacity-100" />
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-2 border-t border-white/10 py-6 text-[0.8rem] text-navy-100/55 sm:flex-row sm:justify-between">
          <span>
            © {new Date().getFullYear()} {site.name} All rights reserved.
          </span>
          <span>{site.closing}</span>
        </div>
      </div>
    </footer>
  );
}
