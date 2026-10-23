import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Mail, MapPin, Phone, Printer } from "lucide-react";
import { resources } from "@/lib/content";
import { programHref, programs } from "@/lib/services";
import { licenseLine, sinceLine, site } from "@/lib/site";
import { Logo, LogoMark } from "../brand/Logo";
import { Marquee } from "../ui/Marquee";
import { BackToTop } from "./BackToTop";

const words = ["Open arms", "Open heart", "Home is where the heart is", "Where there is love, there is life"];

// Descriptive anchors (the header already uses the short labels).
const footerLinks = [
  { href: "/services", label: "Types of care" },
  { href: "/about", label: "About us & our mission" },
  { href: "/careers", label: "Join our care team" },
  { href: "/faq", label: "Frequently asked questions" },
  { href: "/contact", label: "Contact us" },
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

      <div className="container-x relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1.1fr_1.25fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-6 max-w-sm leading-relaxed text-iris-100/70">
            We provide dedicated, family-oriented care that comes from the heart. {sinceLine}.
          </p>
          <ul className="mt-5 space-y-1.5 text-sm">
            {site.credentials.map((c) => (
              <li key={c} className="flex items-center gap-2 text-iris-100/85">
                <BadgeCheck className="size-4 shrink-0 text-blush-300" /> {c}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs font-semibold tracking-wide text-blush-200">{licenseLine}</p>
        </div>

        <div>
          <h2 className="font-sans text-sm font-bold tracking-[0.16em] text-blush-200 uppercase">Types of care</h2>
          <ul className="mt-5 space-y-2.5 text-[0.95rem]">
            {programs.map((p) => (
              <li key={p.slug}>
                <Link href={programHref(p)} className="text-iris-100/75 transition hover:text-white">
                  {p.short}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-sm font-bold tracking-[0.16em] text-blush-200 uppercase">Resources</h2>
          <ul className="mt-5 space-y-3 text-[0.95rem]">
            {resources.map((r) => (
              <li key={r.name}>
                <a href={r.href} target="_blank" rel="noreferrer" className="group text-iris-100/80 transition hover:text-white">
                  <span className="inline-flex items-center gap-1">
                    {r.name}
                    <ArrowUpRight className="size-3 opacity-50 transition group-hover:opacity-100" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-sm font-bold tracking-[0.16em] text-blush-200 uppercase">Contact</h2>
          <ul className="mt-5 space-y-4 text-[0.95rem]">
            <li>
              <a href={site.phone.href} className="group flex gap-3 text-white">
                <Phone className="mt-0.5 size-4 shrink-0 text-blush-300" />
                <span className="font-semibold group-hover:text-blush-200">Office {site.phone.display}</span>
              </a>
            </li>
            <li className="flex gap-3 text-iris-100/75">
              <Printer className="mt-0.5 size-4 shrink-0 text-blush-300" />
              <span>Fax {site.fax.display}</span>
            </li>
            <li>
              <span className="flex gap-3 text-iris-100/75">
                <MapPin className="mt-0.5 size-4 shrink-0 text-blush-300" />
                <span>
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </span>
              </span>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="group flex gap-3 text-iris-100/75">
                <Mail className="mt-0.5 size-4 shrink-0 text-blush-300" />
                <span className="break-all group-hover:text-white">{site.email}</span>
              </a>
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
            © {new Date().getFullYear()} {site.name} All rights reserved. · {licenseLine}
          </p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
