"use client";

import { ArrowUpRight, LoaderCircle, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { CARE_KEY } from "./CareLink";

/** Embed URL, pre-ticking any services chosen through <CareLink> (Google Forms "pp_url" prefill). */
function embedUrl(formLabels: Record<string, string>) {
  const params = new URLSearchParams({ embedded: "true" });
  try {
    const raw = sessionStorage.getItem(CARE_KEY);
    sessionStorage.removeItem(CARE_KEY);
    const picked = raw ? (JSON.parse(raw) as string[]) : [];
    const labels = picked.map((slug) => formLabels[slug]).filter(Boolean);
    if (labels.length) {
      params.set("usp", "pp_url");
      labels.forEach((l) => params.append(site.inquiryForm.servicesEntry, l));
    }
  } catch {
    // Storage unavailable (private mode) — the form simply starts with nothing ticked.
  }
  return `${site.inquiryForm.url}?${params}`;
}

/**
 * The agency's "Request More Information" Google Form, embedded as on the original website.
 * The iframe is cross-origin and can't report its height, so it gets fixed heights per
 * breakpoint (measured, with room for validation messages).
 *
 * The iframe (and Google's scripts) is only created once the form is about to scroll into
 * view, so it never competes with the page's own loading. `formLabels` (service slug → exact
 * checkbox label) is passed in as plain data so the service copy stays out of the client bundle.
 */
export function GoogleForm({ formLabels }: { formLabels: Record<string, string> }) {
  const ref = useRef<HTMLDivElement>(null);
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setSrc(embedUrl(formLabels));
        io.disconnect();
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [formLabels]);

  return (
    <div ref={ref} className="card overflow-hidden">
      <div className="relative bg-white">
        {/* Sits behind the iframe until the form paints over it (load events aren't reliable for embeds). */}
        <div className="absolute inset-x-0 top-0 grid h-64 place-items-center text-plum-400" aria-hidden>
          <LoaderCircle className="size-8 animate-spin" />
        </div>
        {src ? (
          <iframe
            src={src}
            title="Request More Information form"
            className="relative block h-[1660px] w-full min-[420px]:h-[1520px] sm:h-[1420px]"
          >
            Loading…
          </iframe>
        ) : (
          <div className="h-[1660px] min-[420px]:h-[1520px] sm:h-[1420px]" />
        )}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-plum-50 px-5 py-4 text-sm">
        <a href={site.inquiryForm.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-plum-700 hover:underline">
          Open the form in a new tab <ArrowUpRight className="size-4" />
        </a>
        <a href={site.phone.href} className="inline-flex items-center gap-1.5 font-semibold text-plum-700 hover:underline">
          <Phone className="size-4" /> {site.phone.display}
        </a>
      </div>
    </div>
  );
}
