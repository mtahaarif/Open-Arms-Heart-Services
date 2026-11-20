import Link from "@/components/ui/Link";
import { ArrowUpRight, Mail, MapPin, Phone, Printer, Sparkle } from "lucide-react";
import { Fragment } from "react";
import { Logo } from "@/components/brand/Logo";
import { Marquee } from "@/components/ui/Marquee";
import { resources } from "@/lib/content";
import { programHref, programs } from "@/lib/services";
import { addressLines, mapsUrl, site } from "@/lib/site";

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

/** Round frosted icon for the contact rows. */
function GlassIcon({ children }: { children: React.ReactNode }) {
  return <span className="liquid-glass grid size-9 shrink-0 place-items-center rounded-full text-blush-200">{children}</span>;
}

/**
 * Footer, laid out like lovethyneighborhhc.com's, in frosted "liquid glass": on the client's violet
 * (#5f2d8f) a few large, slowly drifting pink and lilac glows give the glass something to refract;
 * the service-name ticker runs in a glass strip, the logo / links / contact columns sit in one large
 * glass panel (contact icons in small glass discs), and community resources and the copyright share
 * a slim glass bar. Text is the client's lavender (#e9dcf7).
 */
export function Footer() {
  return (
    <footer className="relative isolate mt-10 overflow-hidden bg-[#5f2d8f] text-[0.95rem] text-[#e9dcf7]">
      {/* Colour behind the glass */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-blob absolute -top-32 -left-24 size-[30rem] rounded-full bg-blush-400/45 blur-3xl" />
        <div className="animate-blob absolute top-1/3 right-[-8rem] size-[34rem] rounded-full bg-plum-400/50 blur-3xl [animation-delay:-6s]" />
        <div className="animate-blob absolute bottom-[-10rem] left-1/3 size-[28rem] rounded-full bg-[#c4479a]/45 blur-3xl [animation-delay:-12s]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgb(255_255_255/0.07)_1px,transparent_1px)] [background-size:22px_22px]" />
      </div>

      <div className="wrap pt-8 sm:pt-10">
        <div className="liquid-glass overflow-hidden rounded-full">
          <Marquee duration={45} gap="2.25rem" pauseOnHover={false} className="py-3.5 sm:py-4">
            {programs.map((p) => (
              <Fragment key={p.slug}>
                <span className="font-display text-[1.5rem] font-bold tracking-[-0.02em] whitespace-nowrap text-white sm:text-[2.1rem]">{p.short}</span>
                <Sparkle className="size-5 shrink-0 fill-blush-200 text-blush-200 sm:size-7" aria-hidden />
              </Fragment>
            ))}
          </Marquee>
        </div>

        <div className="liquid-glass mt-6 grid gap-12 rounded-[2rem] p-7 sm:grid-cols-2 sm:p-10 lg:grid-cols-[1.3fr_0.9fr_1fr_1.25fr] lg:gap-10 lg:rounded-[2.5rem] lg:p-12">
          <div>
            <div className="inline-flex rounded-2xl bg-white/95 p-2.5 shadow-lg ring-1 shadow-black/10 ring-white/60">
              <Logo className="h-14" />
            </div>
            <p className="mt-6 flex flex-wrap gap-x-2 gap-y-1 text-sm font-bold text-white">
              {site.licenses.map((l, i) => (
                <span key={l} className="whitespace-nowrap">
                  Lic# {l}
                  {i < site.licenses.length - 1 && <span className="ml-2 text-[#e9dcf7]/70">·</span>}
                </span>
              ))}
            </p>
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
            <address className="mt-5 space-y-3.5 not-italic">
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors hover:text-white">
                <GlassIcon>
                  <MapPin className="size-4" aria-hidden />
                </GlassIcon>
                <span>
                  {addressLines[0]}, {addressLines[1]}
                </span>
              </a>
              <a href={site.phone.href} className="flex items-center gap-3 font-semibold text-white transition-colors hover:text-blush-200">
                <GlassIcon>
                  <Phone className="size-4" aria-hidden />
                </GlassIcon>
                {site.phone.display}
              </a>
              <p className="flex items-center gap-3">
                <GlassIcon>
                  <Printer className="size-4" aria-hidden />
                </GlassIcon>
                Fax: {site.fax.display}
              </p>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 transition-colors hover:text-white">
                <GlassIcon>
                  <Mail className="size-4" aria-hidden />
                </GlassIcon>
                <span className="[overflow-wrap:anywhere]">{site.email}</span>
              </a>
            </address>
          </div>
        </div>

        <div className="liquid-glass mt-6 mb-8 rounded-[1.75rem] px-6 py-5 text-sm sm:mb-10 sm:px-8">
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <span className="font-semibold text-white">Community resources:</span>
            {resources.map((r) => (
              <a key={r.name} href={r.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1 transition-colors hover:text-white">
                {r.name} <ArrowUpRight className="size-3 opacity-60 group-hover:opacity-100" aria-hidden />
              </a>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-2 border-t border-white/15 pt-4 text-[0.82rem] sm:flex-row sm:justify-between">
            <span>
              Copyright © {new Date().getFullYear()} {site.name} All rights reserved.
            </span>
            <span>{site.closing}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
