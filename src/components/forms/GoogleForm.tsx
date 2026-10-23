"use client";

import { ArrowUpRight, LoaderCircle, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { programs } from "@/lib/services";
import { site } from "@/lib/site";
import { CARE_KEY } from "./CareLink";

/** Embed URL, pre-ticking any types of care chosen through <CareLink> (Google Forms "pp_url" prefill). */
function embedUrl() {
  const params = new URLSearchParams({ embedded: "true" });
  try {
    const raw = sessionStorage.getItem(CARE_KEY);
    sessionStorage.removeItem(CARE_KEY);
    const picked = raw ? (JSON.parse(raw) as string[]) : [];
    const labels = programs.filter((p) => picked.includes(p.slug)).map((p) => p.formLabel);
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
 */
export function GoogleForm() {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => setSrc(embedUrl()), []);

  return (
    <div className="glass relative overflow-hidden rounded-[2rem] p-2 sm:p-3">
      <div className="relative overflow-hidden rounded-[1.6rem] bg-white">
        {/* Sits behind the iframe until the form paints over it (load events aren't reliable for embeds). */}
        <div className="absolute inset-x-0 top-0 grid h-64 place-items-center text-iris-400" aria-hidden>
          <LoaderCircle className="size-8 animate-spin" />
        </div>
        {src ? (
          <iframe
            src={src}
            title="Request More Information form"
            loading="lazy"
            className="relative block h-[1660px] w-full min-[420px]:h-[1520px] sm:h-[1420px]"
          >
            Loading…
          </iframe>
        ) : (
          <div className="h-[1660px] min-[420px]:h-[1520px] sm:h-[1420px]" />
        )}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 pt-4 pb-2 text-sm text-ink-soft">
        <a href={site.inquiryForm.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-iris-800 hover:text-iris-950">
          Open the form in a new tab <ArrowUpRight className="size-4" />
        </a>
        <a href={site.phone.href} className="inline-flex items-center gap-1.5 font-semibold text-iris-800 hover:text-iris-950">
          <Phone className="size-4" /> Office {site.phone.display}
        </a>
      </div>
    </div>
  );
}
