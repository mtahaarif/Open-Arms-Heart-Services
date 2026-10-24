import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { resources } from "@/lib/content";
import { programHref, programs } from "@/lib/services";
import { addressLines, licenseLine, mapsUrl, site } from "@/lib/site";

const company = [
  { href: "/about", label: "About us & our mission" },
  { href: "/careers", label: "Careers" },
  { href: "/faq", label: "Frequently asked questions" },
  { href: "/contact", label: "Contact us" },
];

function Heading({ children }: { children: React.ReactNode }) {
  return <h2 className="font-sans text-xs font-bold tracking-[0.18em] text-plum-700 uppercase">{children}</h2>;
}

export function Footer() {
  return (
    <footer className="bg-plum-50 text-[0.95rem]">
      <div className="wrap grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.95fr_0.85fr_1.3fr]">
        <div>
          <Logo className="h-20" />
          <p className="mt-5 max-w-xs">{site.description}</p>
          <p className="mt-4 text-sm">{licenseLine}</p>
        </div>

        <div>
          <Heading>Our services</Heading>
          <ul className="mt-4 space-y-2.5">
            {programs.map((p) => (
              <li key={p.slug}>
                <Link href={programHref(p)} className="hover:text-plum-700 hover:underline">
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
              <li key={l.href}>
                <Link href={l.href} className="hover:text-plum-700 hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={site.applicationUrl} target="_blank" rel="noopener noreferrer" className="hover:text-plum-700 hover:underline">
                Apply online
              </a>
            </li>
          </ul>
        </div>

        <div>
          <Heading>Visit or call</Heading>
          <address className="mt-4 space-y-2.5 not-italic">
            <p>
              <a href={site.phone.href} className="text-lg font-semibold text-ink hover:text-plum-700">
                {site.phone.display}
              </a>
            </p>
            <p>Fax: {site.fax.display}</p>
            <p>
              <a href={`mailto:${site.email}`} className="text-[0.9rem] [overflow-wrap:anywhere] hover:text-plum-700 hover:underline">
                {site.email}
              </a>
            </p>
            <p>
              {addressLines[0]}
              <br />
              {addressLines[1]}
            </p>
            <p>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="link-arrow text-sm">
                Get directions →
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="wrap border-t border-plum-200 py-6 text-sm">
        <span className="font-semibold text-ink">Community resources: </span>
        {resources.map((r, i) => (
          <span key={r.name}>
            <a href={r.href} target="_blank" rel="noopener noreferrer" className="hover:text-plum-700 hover:underline">
              {r.name}
            </a>
            {i < resources.length - 1 && <span aria-hidden> · </span>}
          </span>
        ))}
      </div>

      <div className="bg-navy-950 text-navy-200">
        <div className="wrap flex flex-col gap-2 py-5 text-[0.8rem] sm:flex-row sm:justify-between">
          <span>
            © {new Date().getFullYear()} {site.name} All rights reserved.
          </span>
          <span>{site.closing}</span>
        </div>
      </div>
    </footer>
  );
}
