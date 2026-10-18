"use client";

import { useLenis } from "lenis/react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const lenis = useLenis();
  return (
    <button
      type="button"
      onClick={() => (lenis ? lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: "smooth" }))}
      className="group inline-flex items-center gap-2 self-start rounded-full border border-white/15 px-4 py-2 font-semibold text-iris-100/80 transition hover:border-blush-300 hover:text-white"
    >
      Back to top
      <ArrowUp className="size-3.5 transition group-hover:-translate-y-0.5" />
    </button>
  );
}
