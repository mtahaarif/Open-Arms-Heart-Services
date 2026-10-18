import Link from "next/link";
import { ArrowUpRight, Clock, MapPin, Phone, Printer } from "lucide-react";
import { homeCare, homeHealth } from "@/lib/services";
import { fullAddress, site } from "@/lib/site";
import { Logo, LogoMark } from "../brand/Logo";
import { Marquee } from "../ui/Marquee";
import { FacebookIcon, LinkedInIcon } from "../ui/SocialIcons";
import { BackToTop } from "./BackToTop";

const words = ["Open arms", "Open heart", "Open lines", "Open door"];

// Descriptive anchors (the header already uses the short labels).
const footerLinks = [
  { href: "/about", label: "About our agency" },
  { href: "/services", label: "All home care services" },
  { href: "/getting-started", label: "How to start care" },
  { href: "/careers", label: "Caregiver jobs" },
  { href: "/faq", label: "Home care FAQs" },
  { href: "/contact", label: "Contact our office" },
];

export function Footer() {
  return (
    <footer className="relative mt-10 overflow-hidden rounded-t-[3rem] bg-iris-950 text-iris-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_0%,rgb(234_106_156/0.18),transparent_40%),radial-gradient(circle_at_0%_100%,rgb(139_96_211/0.3),transparent_45%)]" />
      <div className="noise absolute inset-0" />

      {/* Oversized outlined marquee */}
      <Marquee duration={36} gap="3rem" className="relative border-b border-white/10 py-8" pauseOnHover={false}>
        {words.map((w) => (
          <span key={w} className="flex items-center gap-12">
            <span
              className="font-display text-6xl font-medium whitespace-nowrap text-transparent italic sm:text-8xl"
              style={{ WebkitTextStroke: "1.2px rgb(225 210 248 / 0.45)" }}
            >
              {w}
            </span>
            <LogoMark tone="light" className="h-12 w-auto opacity-50 sm:h-16" />
          </span>
        ))}
      </Marquee>

      <div className="container-x relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-6 max-w-sm leading-relaxed text-iris-100/70">
            Skilled home health and non-skilled home care for Central Florida families — delivered with open arms
            and an open heart since {site.founded}.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Open Arms & Heart Services on Facebook"
              className="grid size-11 place-items-center rounded-full border border-white/15 transition hover:-translate-y-0.5 hover:border-blush-300 hover:bg-white/10 hover:text-white"
            >
              <FacebookIcon />
            </a>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="Open Arms & Heart Services on LinkedIn"
              className="grid size-11 place-items-center rounded-full border border-white/15 transition hover:-translate-y-0.5 hover:border-blush-300 hover:bg-white/10 hover:text-white"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>

        {[homeHealth, homeCare].map((p) => (
          <div key={p.slug}>
            <h2 className="font-sans text-sm font-bold tracking-[0.16em] text-blush-200 uppercase">
              {p.name} <span className="font-medium text-iris-300/70 normal-case">· {p.level}</span>
            </h2>
            <ul className="mt-5 space-y-2.5 text-[0.95rem]">
              {p.services.map((s) => (
                <li key={s.slug}>
                  <Link href={`${p.href}#${s.slug}`} className="text-iris-100/75 transition hover:text-white">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h2 className="font-sans text-sm font-bold tracking-[0.16em] text-blush-200 uppercase">Contact</h2>
          <ul className="mt-5 space-y-4 text-[0.95rem]">
            <li>
              <a href={site.phone.href} className="group flex gap-3 text-white">
                <Phone className="mt-0.5 size-4 shrink-0 text-blush-300" />
                <span className="font-semibold group-hover:text-blush-200">{site.phone.display}</span>
              </a>
            </li>
            <li className="flex gap-3 text-iris-100/75">
              <Printer className="mt-0.5 size-4 shrink-0 text-blush-300" />
              <span>Fax {site.fax.display}</span>
            </li>
            <li>
              <a href={site.mapsUrl} target="_blank" rel="noreferrer" className="group flex gap-3 text-iris-100/75">
                <MapPin className="mt-0.5 size-4 shrink-0 text-blush-300" />
                <span className="group-hover:text-white">{fullAddress}</span>
              </a>
            </li>
            <li className="flex gap-3 text-iris-100/75">
              <Clock className="mt-0.5 size-4 shrink-0 text-blush-300" />
              <span>
                {site.hours.map((h) => (
                  <span key={h.days} className="block">
                    {h.days}: {h.time}
                  </span>
                ))}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-x relative">
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 py-6 text-sm">
          {footerLinks.map((n) => (
            <Link key={n.href} href={n.href} className="group inline-flex items-center gap-1 text-iris-100/70 hover:text-white">
              {n.label}
              <ArrowUpRight className="size-3 opacity-0 transition group-hover:opacity-100" />
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 pb-24 text-xs text-iris-100/50 sm:flex-row sm:items-center sm:justify-between lg:pb-6">
          <p>
            © {new Date().getFullYear()} {site.name} All rights reserved. · NPI {site.npi}
          </p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
