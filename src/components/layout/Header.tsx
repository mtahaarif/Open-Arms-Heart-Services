"use client";

import Link from "@/components/ui/Link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { nav, site } from "@/lib/site";

type NavItem = { href: string; label: string };

/**
 * Floating glass header (client: mobile-menu state and active-link highlighting).
 * `services` arrives as plain data from the root layout, so the full service copy
 * in lib/services.ts never ships in the client bundle.
 */
export function Header({ services }: { services: NavItem[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const linkClass = (href: string) =>
    `relative py-2 text-[0.95rem] font-semibold transition-colors hover:text-plum-600 after:absolute after:-bottom-0.5 after:left-1/2 after:size-1 after:-translate-x-1/2 after:rounded-full after:bg-blush-500 after:transition-opacity ${
      isActive(href) ? "text-plum-700 after:opacity-100" : "text-ink after:opacity-0"
    }`;

  return (
    <header className="sticky top-0 z-50 px-3 pt-3">
      <div className="glass mx-auto flex h-[4.5rem] max-w-[1200px] items-center justify-between gap-6 rounded-full pr-2.5 pl-5 lg:h-20 lg:pl-6">
        <Logo withName preload className="h-12 lg:h-14" />

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {nav.map((item) =>
            item.href === "/services" ? (
              <div key={item.href} className="group relative">
                <Link href={item.href} className={`inline-flex items-center gap-1 ${linkClass(item.href)}`}>
                  {item.label} <ChevronDown className="size-4 transition-transform group-focus-within:rotate-180 group-hover:rotate-180" />
                </Link>
                <div className="invisible absolute top-full left-1/2 w-[23rem] -translate-x-1/2 pt-5 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <ul className="glass rounded-[1.75rem] p-2.5">
                    {services.map((s, i) => (
                      <li key={s.href}>
                        <Link
                          href={s.href}
                          className="group/item flex items-center gap-3 rounded-2xl px-3 py-2.5 text-[0.95rem] font-semibold text-ink transition hover:bg-white/80 hover:text-plum-700"
                        >
                          <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-linear-to-br from-plum-600 to-blush-500 text-[0.7rem] font-bold text-white">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {s.label}
                        </Link>
                      </li>
                    ))}
                    <li className="mt-1 border-t border-plum-100 px-3 pt-3 pb-2">
                      <Link href="/services" className="link-arrow text-sm">
                        View all of our services <ArrowRight className="size-3.5" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className={linkClass(item.href)}>
                {item.label}
                {item.hint && <span className="sr-only"> {item.hint}</span>}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <a href={site.phone.href} className="grid size-11 place-items-center rounded-full bg-white/80 text-plum-700 ring-1 ring-plum-100 transition hover:text-blush-600">
            <Phone className="size-[1.1rem]" aria-hidden />
            <span className="sr-only">Call {site.phone.display}</span>
          </a>
          <Link href="/contact" className="btn-primary hidden px-5 py-3 lg:inline-flex">
            Let&apos;s talk <ArrowRight className="size-4" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid size-11 place-items-center rounded-full bg-linear-to-br from-plum-700 to-blush-500 text-white lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      {open && (
        // Scrim: dims and blurs the page so it can't show through the menu; tap it to close.
        <div aria-hidden onClick={() => setOpen(false)} className="fixed inset-0 -z-10 animate-[fade-in_0.25s_ease-out_both] bg-plum-950/45 backdrop-blur-sm lg:hidden" />
      )}
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="mx-auto mt-2 max-h-[calc(100svh-7rem)] max-w-[1200px] overflow-y-auto overscroll-contain rounded-[2rem] border border-white/80 bg-cream/97 shadow-[0_30px_70px_-30px_rgb(51_27_88/0.55)] backdrop-blur-xl lg:hidden"
        >
          <ul className="divide-y divide-plum-100 px-5 py-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={`block py-4 font-display text-xl uppercase ${isActive(item.href) ? "text-plum-700" : "text-ink"}`}>
                  {item.label}
                  {item.hint && <span className="sr-only"> {item.hint}</span>}
                </Link>
                {item.href === "/services" && (
                  <ul className="-mt-1 grid gap-1 pb-4 pl-1">
                    {services.map((s) => (
                      <li key={s.href}>
                        <Link href={s.href} className="block py-1.5 text-body hover:text-plum-700">
                          {s.label}
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
