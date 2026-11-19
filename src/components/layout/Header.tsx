"use client";

import Link from "@/components/ui/Link";
import { usePathname } from "next/navigation";
import {
  Accessibility,
  ArrowUpRight,
  Baby,
  ChevronDown,
  FingerprintPattern,
  HeartHandshake,
  Medal,
  Menu,
  Phone,
  ShieldCheck,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Logo } from "@/components/brand/Logo";
import { nav, site } from "@/lib/site";

/** Service link for the menus. `slug` picks the icon (components can't cross the server/client boundary). */
export type NavService = { href: string; label: string; slug: string };

/** Same icons as lib/services.ts. */
const ICONS: Record<string, LucideIcon> = {
  "home-care": HeartHandshake,
  apd: Accessibility,
  dcf: ShieldCheck,
  cbc: Baby,
  va: Medal,
  "live-scan": FingerprintPattern,
};

/**
 * Site header, modelled on lovethyneighborhhc.com: a full-width frosted white bar that sticks to the
 * top and tightens (72 → 64px, soft shadow) once the page scrolls; pill-shaped links with a tinted
 * active state; "Our services" opens a white dropdown with icon tiles; a round phone button and a
 * "Let's talk" pill on the right. Below `lg` the links move into a white sheet that slides in from
 * the right, with Services as an expandable list. A thin brand-gradient bar shows scroll progress.
 */
export function Header({ services }: { services: NavService[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close the menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
    setSvcOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the sheet is open: no page scroll behind it, and Escape closes it.
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const pill = (active: boolean) =>
    `inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.9rem] font-semibold transition-colors ${
      active ? "bg-plum-50 text-plum-700" : "text-ink/80 hover:bg-plum-50/70 hover:text-plum-700"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-plum-100/70 transition-all duration-300 ${
        scrolled ? "bg-white/90 shadow-[0_10px_40px_-12px_rgb(102_45_145/0.22)] backdrop-blur-xl" : "bg-white/75 backdrop-blur-lg"
      }`}
    >
      {/* Scroll progress (CSS scroll-driven; hidden where unsupported) */}
      <span aria-hidden className="scroll-progress absolute inset-x-0 top-0 h-[3px] origin-left bg-linear-to-r from-plum-600 via-plum-400 to-blush-400" />

      <div className={`mx-auto flex max-w-[1320px] items-center gap-4 px-4 transition-[height] duration-300 sm:px-6 lg:px-8 ${scrolled ? "h-16" : "h-[72px]"}`}>
        <Logo withName preload className={`transition-[height] duration-300 ${scrolled ? "h-11" : "h-[52px]"}`} />

        <nav aria-label="Main" className="ml-auto hidden items-center gap-1 lg:flex">
          {nav.map((item) =>
            item.href === "/services" ? (
              <div key={item.href} className="group relative">
                <button type="button" aria-haspopup="true" className={`${pill(isActive("/services"))} cursor-pointer group-focus-within:bg-plum-50 group-hover:bg-plum-50`}>
                  {item.label}
                  <ChevronDown className="size-4 transition-transform group-focus-within:rotate-180 group-hover:rotate-180" aria-hidden />
                </button>
                <div className="invisible absolute top-full left-1/2 w-[20rem] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <ul className="rounded-2xl border border-plum-100/80 bg-white p-2 shadow-[0_24px_60px_-20px_rgb(102_45_145/0.35)]">
                    {services.map((s) => {
                      const Icon = ICONS[s.slug] ?? HeartHandshake;
                      return (
                        <li key={s.href}>
                          <Link
                            href={s.href}
                            aria-current={pathname === s.href ? "page" : undefined}
                            className={`flex items-center gap-3 rounded-xl px-2.5 py-2 text-[0.9rem] font-semibold transition-colors ${
                              pathname === s.href ? "bg-plum-50 text-plum-700" : "text-ink/80 hover:bg-plum-50/70 hover:text-plum-700"
                            }`}
                          >
                            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-plum-50 text-plum-700 ring-1 ring-plum-100">
                              <Icon className="size-[1.05rem]" aria-hidden />
                            </span>
                            {s.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            ) : (
              <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className={pill(isActive(item.href))}>
                {item.label}
                {item.hint && <span className="sr-only"> {item.hint}</span>}
              </Link>
            ),
          )}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-3">
          <a href={site.phone.href} className="grid size-10 place-items-center rounded-full bg-plum-50 text-plum-700 transition-colors hover:bg-plum-100">
            <Phone className="size-[1.05rem]" aria-hidden />
            <span className="sr-only">Call {site.phone.display}</span>
          </a>
          <Link href="/contact" className="btn-primary hidden gap-2.5 py-2.5 pr-5 pl-2.5 text-[0.9rem] sm:inline-flex">
            <span className="grid size-7 place-items-center rounded-full bg-white/20">
              <Phone className="size-3.5" aria-hidden />
            </span>
            Let&apos;s talk
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid size-11 cursor-pointer place-items-center rounded-full bg-plum-50 text-ink transition-colors hover:bg-plum-100 hover:text-plum-700 lg:hidden"
          >
            <Menu className="size-5" aria-hidden />
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </div>

      {/* Phone / tablet menu: a white sheet from the right over a dimmed page. Portalled to <body>:
          the header's backdrop-filter would otherwise trap a fixed element inside the header bar. */}
      {open &&
        createPortal(
        <div className="fixed inset-0 z-[70] lg:hidden">
          <div aria-hidden onClick={() => setOpen(false)} className="absolute inset-0 animate-[fade-in_0.25s_ease-out_both] bg-black/35 backdrop-blur-[2px]" />
          <nav
            id="mobile-menu"
            aria-label="Mobile"
            className="absolute inset-y-0 right-0 flex w-[min(24rem,100%)] animate-[sheet-in_0.35s_var(--ease-out-expo)_both] flex-col bg-white shadow-2xl"
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-plum-100/70 px-5">
              <span className="font-display text-lg font-bold text-ink">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid size-10 cursor-pointer place-items-center rounded-full bg-plum-50 text-ink transition-colors hover:bg-plum-100"
              >
                <X className="size-5" aria-hidden />
                <span className="sr-only">Close menu</span>
              </button>
            </div>

            <ul className="flex-1 space-y-1 overflow-y-auto overscroll-contain p-4">
              <li>
                <Link href="/" className={`block rounded-xl px-4 py-3.5 text-[0.95rem] font-semibold ${pathname === "/" ? "bg-plum-50 text-plum-700" : "text-ink hover:bg-plum-50/60"}`}>
                  Home
                </Link>
              </li>
              {nav.map((item) =>
                item.href === "/services" ? (
                  <li key={item.href}>
                    <button
                      type="button"
                      onClick={() => setSvcOpen((o) => !o)}
                      aria-expanded={svcOpen}
                      className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-4 py-3.5 text-left text-[0.95rem] font-semibold ${
                        isActive("/services") ? "bg-plum-50 text-plum-700" : "text-ink hover:bg-plum-50/60"
                      }`}
                    >
                      {item.label}
                      <ChevronDown className={`size-4 transition-transform ${svcOpen ? "rotate-180" : ""}`} aria-hidden />
                    </button>
                    {svcOpen && (
                      <ul className="mt-1 space-y-0.5 pb-1 pl-3">
                        {services.map((s) => {
                          const Icon = ICONS[s.slug] ?? HeartHandshake;
                          return (
                            <li key={s.href}>
                              <Link
                                href={s.href}
                                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[0.9rem] font-medium ${
                                  pathname === s.href ? "text-plum-700" : "text-body hover:text-plum-700"
                                }`}
                              >
                                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-plum-50 text-plum-700 ring-1 ring-plum-100">
                                  <Icon className="size-4" aria-hidden />
                                </span>
                                {s.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block rounded-xl px-4 py-3.5 text-[0.95rem] font-semibold ${isActive(item.href) ? "bg-plum-50 text-plum-700" : "text-ink hover:bg-plum-50/60"}`}
                    >
                      {item.label}
                      {item.hint && <span className="sr-only"> {item.hint}</span>}
                    </Link>
                  </li>
                ),
              )}
            </ul>

            <div className="grid shrink-0 gap-2.5 border-t border-plum-100/70 p-4">
              <a href={site.phone.href} className="btn-primary">
                <Phone className="size-4" aria-hidden /> Call {site.phone.display}
              </a>
              <Link href="/contact" className="btn-outline">
                Let&apos;s talk <ArrowUpRight className="size-4" aria-hidden />
              </Link>
            </div>
          </nav>
        </div>,
          document.body,
        )}
    </header>
  );
}
