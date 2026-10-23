"use client";

import { Photo } from "@/components/ui/Photo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useLenis } from "lenis/react";
import { ArrowRight, ArrowUpRight, BadgeCheck, ChevronDown, Mail, MapPin, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { programHref, programs } from "@/lib/services";
import { nav, sinceLine, site } from "@/lib/site";
import { Logo } from "../brand/Logo";
import { EASE, Magnetic } from "../ui/motion";

export function Header() {
  const pathname = usePathname();
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 30);
    setHidden(y > prev && y > 380);
  });

  useEffect(() => {
    setMenuOpen(false);
    setMega(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen, lenis]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <a
        href="#main"
        className="fixed top-3 left-3 z-[80] -translate-y-24 rounded-full bg-iris-900 px-4 py-2 text-sm font-semibold text-white focus:translate-y-0"
      >
        Skip to content
      </a>

      <motion.header
        animate={{ y: hidden && !mega ? "-130%" : "0%" }}
        transition={{ duration: 0.5, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50"
        onMouseLeave={() => setMega(false)}
      >
        {/* Utility bar */}
        <AnimatePresence initial={false}>
          {!scrolled && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="hidden overflow-hidden lg:block"
            >
              <div className="container-x flex items-center justify-between py-2.5 text-[0.8rem] text-ink-soft">
                <div className="flex items-center gap-6">
                  <span className="flex items-center gap-1.5">
                    <BadgeCheck className="size-3.5 text-blush-500" /> {site.credentials.join(" · ")}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-blush-500" /> {sinceLine}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <a href={`mailto:${site.email}`} className="flex items-center gap-1.5 hover:text-iris-800">
                    <Mail className="size-3.5" /> {site.email}
                  </a>
                  <span className="h-3 w-px bg-iris-200" />
                  <a href={site.phone.href} className="flex items-center gap-1.5 font-semibold text-iris-800 hover:text-blush-700">
                    <Phone className="size-3.5" /> Office {site.phone.display}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating glass nav */}
        <div className="container-x pt-3 lg:pt-0">
          <motion.div
            animate={{
              paddingTop: scrolled ? 8 : 12,
              paddingBottom: scrolled ? 8 : 12,
            }}
            transition={{ duration: 0.4, ease: EASE }}
            className={`flex items-center justify-between gap-4 rounded-full pr-2 pl-4 transition-[background,box-shadow,border-color] duration-500 sm:pl-5 ${
              scrolled || mega ? "glass" : "border border-transparent bg-white/40 backdrop-blur-sm"
            }`}
          >
            <Logo />

            <nav aria-label="Main" className="hidden items-center lg:flex" onMouseLeave={() => setHovered(null)}>
              {nav.map((item) => {
                const active = isActive(item.href);
                const isServices = item.href === "/services";
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => {
                      setHovered(item.href);
                      setMega(isServices);
                    }}
                  >
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onFocus={() => setMega(isServices)}
                      className={`relative z-10 flex items-center gap-1 rounded-full px-4 py-2 text-[0.92rem] font-medium transition-colors ${
                        active ? "text-iris-700" : "text-ink hover:text-iris-800"
                      }`}
                    >
                      {item.label}
                      {isServices && (
                        <ChevronDown className={`size-3.5 transition-transform duration-300 ${mega ? "rotate-180" : ""}`} />
                      )}
                      {active && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-blush-500"
                        />
                      )}
                    </Link>
                    {hovered === item.href && (
                      <motion.span
                        layoutId="nav-hover"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-iris-100/80"
                      />
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <Magnetic className="hidden sm:block">
                <a
                  href={site.phone.href}
                  aria-label={`Call ${site.phone.display}`}
                  className="relative grid size-11 place-items-center rounded-full bg-white text-iris-700 shadow-sm ring-1 ring-iris-100 transition hover:text-blush-700"
                >
                  <span className="animate-pulse-ring absolute inset-0 rounded-full bg-blush-300/50" />
                  <Phone className="relative size-[1.05rem]" />
                </a>
              </Magnetic>
              <Magnetic className="hidden sm:block">
                <Link href="/contact" className="btn-primary py-3">
                  Request care <ArrowRight className="size-4" />
                </Link>
              </Magnetic>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                className="grid size-11 place-items-center rounded-full bg-iris-900 text-white lg:hidden"
              >
                <span className="flex w-5 flex-col items-end gap-[5px]">
                  <span className="h-[2px] w-5 rounded bg-current" />
                  <span className="h-[2px] w-3.5 rounded bg-current" />
                  <span className="h-[2px] w-5 rounded bg-current" />
                </span>
              </button>
            </div>
          </motion.div>

          {/* Services mega menu */}
          <AnimatePresence>
            {mega && (
              <motion.div
                initial={{ opacity: 0, y: -12, scale: 0.98, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, scale: 0.98, filter: "blur(4px)" }}
                transition={{ duration: 0.35, ease: EASE }}
                className="glass absolute inset-x-4 mx-auto mt-3 hidden max-w-5xl origin-top rounded-[2rem] p-3 lg:block"
                onMouseLeave={() => setMega(false)}
              >
                <div className="grid grid-cols-[2fr_0.9fr] gap-3">
                  <div className="rounded-[1.6rem] bg-white/70 p-5">
                    <Link href="/services" className="group flex items-baseline justify-between">
                      <span>
                        <span className="text-[0.7rem] font-bold tracking-[0.16em] text-blush-700 uppercase">
                          {site.credentials[0]}
                        </span>
                        <span className="block font-display text-xl text-iris-950">Types of care</span>
                      </span>
                      <ArrowUpRight className="size-4 text-iris-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-iris-700" />
                    </Link>
                    <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-0.5">
                      {programs.map((p) => (
                        <li key={p.slug}>
                          <Link
                            href={programHref(p)}
                            className="group flex items-start gap-3 rounded-xl px-2 py-2 text-sm text-ink transition hover:bg-iris-50 hover:text-iris-800"
                          >
                            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-iris-50 text-iris-600 transition group-hover:bg-white">
                              <p.icon className="size-4" />
                            </span>
                            <span>
                              <span className="block font-semibold text-iris-950">{p.short}</span>
                              <span className="block text-xs text-ink-soft">{p.tag}</span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href="/services#care-finder"
                    className="group relative isolate flex flex-col justify-end overflow-hidden rounded-[1.6rem] p-5 text-white"
                  >
                    <Photo
                      src="/images/hero-caregiver-laughing.jpg"
                      alt=""
                      sizes="320px"
                      className="-z-10 object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 -z-10 bg-linear-to-t from-iris-950/90 via-iris-900/40 to-transparent" />
                    <span className="text-xs font-bold tracking-[0.16em] text-blush-200 uppercase">Not sure?</span>
                    <span className="mt-1 font-display text-2xl leading-tight">Find the right care in 30 seconds</span>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold">
                      Try the care finder <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                    </span>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 44px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 44px)" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-iris-950 text-white lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            data-lenis-prevent
          >
            <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_80%_10%,rgb(234_106_156/0.25),transparent_45%),radial-gradient(circle_at_10%_90%,rgb(139_96_211/0.35),transparent_50%)]" />
            <div className="container-x relative flex items-center justify-between pt-6">
              <Logo tone="light" />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="grid size-11 place-items-center rounded-full bg-white/10 text-white"
              >
                <X className="size-5" />
              </button>
            </div>
            <nav aria-label="Mobile" className="container-x relative mt-10 flex-1">
              <ul>
                {[{ href: "/", label: "Home" }, ...nav].map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.06, ease: EASE }}
                    className="border-b border-white/10"
                  >
                    <Link href={item.href} className="group flex items-baseline gap-4 py-4">
                      <span className="font-mono text-xs text-blush-300">{String(i + 1).padStart(2, "0")}</span>
                      <span className="font-display text-4xl transition group-hover:translate-x-2 group-hover:text-blush-200">
                        {item.label}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
              className="container-x relative pt-8 pb-10"
            >
              <a href={site.phone.href} className="btn-light w-full">
                <Phone className="size-4" /> {site.phone.display}
              </a>
              <p className="mt-4 text-center text-sm text-iris-200/70">
                {sinceLine}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
