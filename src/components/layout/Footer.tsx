import Link from "@/components/ui/Link";
import { ArrowUpRight, Mail, MapPin, Phone, Printer, Sparkle } from "lucide-react";
import { Fragment } from "react";
import { Logo } from "@/components/brand/Logo";
import { Marquee } from "@/components/ui/Marquee";
import { resources } from "@/lib/content";
import { programHref, programs } from "@/lib/services";
import { addressLines, licenseLine, mapsUrl, site } from "@/lib/site";

const quickLinks = [
  { href: "/", label: "Home page" },
  { href: "/about", label: "About us & our mission" },
  { href: "/careers", label: "Careers & open positions" },
  { href: "/faq", label: "Frequently asked questions" },
  { href: "/contact", label: "Contact us" },
];

function Heading({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-lg font-bold tracking-normal text-white">{children}</h2>;
}

/**
 * Footer, laid out like lovethyneighborhhc.com's: a ticker of the service names in large bold type
 * with sparkle separators; then the logo, licence numbers, description and motto; Quick links;
 * Services; Contact (address, phone, fax, email); community resources; copyright. Solid violet
 * (#5f2d8f) with lavender text (#e9dcf7), the client's chosen colours.
 */
export function Footer() {
  return (
    <footer className="relative isolate mt-10 overflow-hidden bg-[#5f2d8f] text-[0.95rem] text-[#e9dcf7]">
      <div aria-hidden className="absolute -top-40 left-1/4 -z-10 size-[34rem] rounded-full bg-white/[0.06] blur-3xl" />
      <div aria-hidden className="absolute -right-40 bottom-0 -z-10 size-[30rem] rounded-full bg-blush-400/10 blur-3xl" />

      <Marquee duration={45} gap="2.25rem" pauseOnHover={false} className="border-b border-white/12 py-5 sm:py-6">
        {programs.map((p) => (
          <Fragment key={p.slug}>
            <span className="font-display text-[1.7rem] font-bold tracking-[-0.02em] whitespace-nowrap text-white sm:text-[2.5rem]">{p.short}</span>
            <Sparkle className="size-6 shrink-0 fill-blush-300 text-blush-300 sm:size-8" aria-hidden />
          </Fragment>
        ))}
      </Marquee>

      <div className="wrap grid gap-12 py-14 sm:grid-cols-2 sm:py-16 lg:grid-cols-[1.3fr_0.9fr_1fr_1.25fr] lg:gap-10">
        <div>
          <div className="inline-flex rounded-2xl bg-white p-2.5 shadow-lg shadow-black/15">
            <Logo className="h-14" />
          </div>
          <p className="mt-6 text-sm font-bold text-white">{licenseLine}</p>
          <p className="mt-4 max-w-xs leading-relaxed">{site.description}</p>
          <p className="mt-6 text-xs font-bold tracking-[0.2em] text-blush-200 uppercase">{site.motto.replace(/\.$/, "")}</p>
        </div>

        <div>
          <Heading>Quick links</Heading>
          <ul className="mt-5 space-y-3">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={site.applicationUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1 transition-colors hover:text-white">
                Apply online <ArrowUpRight className="size-3.5 opacity-70 group-hover:opacity-100" aria-hidden />
              </a>
            </li>
          </ul>
        </div>

        <div>
          <Heading>Services</Heading>
          <ul className="mt-5 space-y-3">
            {programs.map((p) => (
              <li key={p.slug}>
                <Link href={programHref(p)} className="transition-colors hover:text-white">
                  {p.short}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <Heading>Contact us</Heading>
          <address className="mt-5 space-y-4 not-italic">
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="flex gap-3 transition-colors hover:text-white">
              <MapPin className="mt-1 size-[1.1rem] shrink-0 text-blush-300" aria-hidden />
              <span>
                {addressLines[0]}, {addressLines[1]}
              </span>
            </a>
            <a href={site.phone.href} className="flex gap-3 font-semibold text-white transition-colors hover:text-blush-200">
              <Phone className="mt-0.5 size-[1.1rem] shrink-0 text-blush-300" aria-hidden /> {site.phone.display}
            </a>
            <p className="flex gap-3">
              <Printer className="mt-0.5 size-[1.1rem] shrink-0 text-blush-300" aria-hidden /> Fax: {site.fax.display}
            </p>
            <a href={`mailto:${site.email}`} className="flex gap-3 transition-colors hover:text-white">
              <Mail className="mt-0.5 size-[1.1rem] shrink-0 text-blush-300" aria-hidden />
              <span className="[overflow-wrap:anywhere]">{site.email}</span>
            </a>
          </address>
        </div>
      </div>

      <div className="wrap">
        <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-white/12 py-6 text-sm">
          <span className="font-semibold text-white">Community resources:</span>
          {resources.map((r) => (
            <a key={r.name} href={r.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1 transition-colors hover:text-white">
              {r.name} <ArrowUpRight className="size-3 opacity-60 group-hover:opacity-100" aria-hidden />
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-2 border-t border-white/12 py-6 text-[0.82rem] sm:flex-row sm:justify-between">
          <span>
            Copyright © {new Date().getFullYear()} {site.name} All rights reserved.
          </span>
          <span>{site.closing}</span>
        </div>
      </div>
    </footer>
  );
}
