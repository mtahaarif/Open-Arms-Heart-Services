"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { programHref, programs } from "@/lib/services";
import { nav, sinceLine, site } from "@/lib/site";

export function TopBar() {
  return (
    <div className="bg-navy-900 text-[0.8rem] text-white">
      <div className="wrap flex items-center justify-center gap-6 py-2 sm:justify-between">
        <span className="hidden sm:block">{sinceLine}</span>
        <a href={site.phone.href} className="font-semibold hover:underline">
          Call our team: {site.phone.display}
        </a>
      </div>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <div className="wrap flex h-20 items-center justify-between gap-6 lg:h-24">
        <Logo withName preload className="h-14 lg:h-[4.5rem]" />

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {nav.map((item) =>
            item.href === "/services" ? (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className={`inline-flex items-center gap-1 py-8 text-[0.95rem] font-semibold transition-colors hover:text-plum-700 ${
                    isActive(item.href) ? "text-plum-700" : "text-ink"
                  }`}
                >
                  {item.label} <ChevronDown className="size-4 transition-transform group-focus-within:rotate-180 group-hover:rotate-180" />
                </Link>
                <div className="invisible absolute top-full left-1/2 w-[22rem] -translate-x-1/2 opacity-0 transition-opacity duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <ul className="card -mt-3 p-2">
                    {programs.map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={programHref(p)}
                          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-[0.95rem] font-semibold text-ink hover:bg-plum-50 hover:text-plum-700"
                        >
                          <p.icon className="size-[1.1rem] shrink-0 text-plum-600" aria-hidden />
                          {p.short}
                        </Link>
                      </li>
                    ))}
                    <li className="mt-1 border-t border-line px-3 pt-3 pb-2">
                      <Link href="/services" className="link-arrow text-sm">
                        View all services →
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`text-[0.95rem] font-semibold transition-colors hover:text-plum-700 ${isActive(item.href) ? "text-plum-700" : "text-ink"}`}
              >
                {item.label}
              </Link>
            ),
          )}
          <Link href="/contact" className="btn-primary px-5 py-3">
            Let&apos;s talk
          </Link>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <a href={site.phone.href} className="grid size-11 place-items-center rounded-md border border-line text-plum-700" aria-label={`Call ${site.phone.display}`}>
            <Phone className="size-5" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid size-11 place-items-center rounded-md bg-plum-700 text-white"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="max-h-[calc(100svh-5rem)] overflow-y-auto border-t border-line bg-white lg:hidden">
          <ul className="wrap divide-y divide-line py-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={`block py-4 text-lg font-semibold ${isActive(item.href) ? "text-plum-700" : "text-ink"}`}>
                  {item.label}
                </Link>
                {item.href === "/services" && (
                  <ul className="-mt-1 grid gap-1 pb-4 pl-4">
                    {programs.map((p) => (
                      <li key={p.slug}>
                        <Link href={programHref(p)} className="block py-1.5 text-body hover:text-plum-700">
                          {p.short}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li className="grid gap-3 py-5 sm:grid-cols-2">
              <a href={site.phone.href} className="btn-primary">
                <Phone className="size-4" /> Call {site.phone.display}
              </a>
              <Link href="/contact" className="btn-outline">
                Let&apos;s talk
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
