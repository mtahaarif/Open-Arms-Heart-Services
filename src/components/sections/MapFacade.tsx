"use client";

import { ExternalLink, MapPin, MousePointerClick } from "lucide-react";
import { useState } from "react";
import { fullAddress, site } from "@/lib/site";

/**
 * Click-to-load Google Map. The embed pulls in ~1 MB of third-party script and was
 * blocking the main thread on page load; the facade costs nothing until a visitor asks for it.
 */
export function MapFacade() {
  const [load, setLoad] = useState(false);

  if (load) {
    return (
      <iframe
        title={`Map to ${fullAddress}`}
        src={site.mapsEmbed}
        referrerPolicy="no-referrer-when-downgrade"
        className="size-full"
      />
    );
  }

  return (
    <div className="relative grid size-full place-items-center overflow-hidden bg-iris-50 [background-image:radial-gradient(rgb(116_70_189/0.16)_1px,transparent_1px)] [background-size:18px_18px]">
      {/* Stylised streets */}
      <svg className="absolute inset-0 size-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path d="M-10 210 C 90 190, 160 230, 410 150" stroke="#e1d2f8" strokeWidth="14" fill="none" />
        <path d="M120 -10 C 140 90, 110 200, 160 310" stroke="#e1d2f8" strokeWidth="10" fill="none" />
        <path d="M-10 80 L 410 110" stroke="#f0e9fc" strokeWidth="8" fill="none" />
        <path d="M290 -10 L 260 310" stroke="#f0e9fc" strokeWidth="8" fill="none" />
      </svg>
      <span className="absolute top-[42%] left-1/2 grid size-12 -translate-x-1/2 -translate-y-full place-items-center rounded-full rounded-br-none bg-blush-500 text-white shadow-lg [rotate:45deg]">
        <MapPin className="size-5 [rotate:-45deg]" />
      </span>
      <div className="glass relative mt-24 flex flex-wrap items-center justify-center gap-2 rounded-2xl p-2">
        <button
          type="button"
          onClick={() => setLoad(true)}
          className="flex items-center gap-2 rounded-xl bg-iris-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-iris-900"
        >
          <MousePointerClick className="size-4" /> Load interactive map
        </button>
        <a
          href={site.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-iris-800 transition hover:bg-white"
        >
          Open in Google Maps <ExternalLink className="size-3.5" />
        </a>
      </div>
    </div>
  );
}
