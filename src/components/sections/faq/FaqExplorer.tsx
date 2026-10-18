"use client";

import { AnimatePresence, motion } from "motion/react";
import { Phone, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { faqCategories, faqs, type FaqCategory } from "@/lib/faqs";
import { site } from "@/lib/site";
import { Accordion } from "../../ui/Accordion";
import { EASE } from "../../ui/motion";

/** Sticky filter sidebar + live search over animated accordions. */
export function FaqExplorer() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<FaqCategory | "All">("All");

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return faqs.filter(
      (f) =>
        (cat === "All" || f.category === cat) &&
        (!needle || f.q.toLowerCase().includes(needle) || f.a.toLowerCase().includes(needle)),
    );
  }, [q, cat]);

  const grouped = faqCategories
    .map((c) => ({ c, items: results.filter((r) => r.category === c) }))
    .filter((g) => g.items.length);

  return (
    <section className="relative py-16 sm:py-24">
      <div className="container-x grid gap-12 lg:grid-cols-[300px_1fr] lg:gap-16">
        <aside>
          <div className="glass space-y-6 rounded-[2rem] p-5 lg:sticky lg:top-32">
            <label className="relative block">
              <span className="sr-only">Search questions</span>
              <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-iris-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search questions…"
                className="w-full rounded-full border border-iris-100 bg-white py-3 pr-10 pl-11 text-sm focus:border-iris-400 focus:ring-4 focus:ring-iris-100 focus:outline-none"
              />
              {q && (
                <button
                  type="button"
                  onClick={() => setQ("")}
                  aria-label="Clear search"
                  className="absolute top-1/2 right-3 grid size-6 -translate-y-1/2 place-items-center rounded-full bg-iris-50 text-iris-700"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </label>
            <div className="flex flex-wrap gap-2 lg:flex-col">
              {(["All", ...faqCategories] as const).map((c) => {
                const on = cat === c;
                const count = c === "All" ? faqs.length : faqs.filter((f) => f.category === c).length;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCat(c)}
                    className={`relative flex items-center justify-between gap-3 rounded-full px-4 py-2.5 text-left text-sm font-semibold transition-colors lg:rounded-2xl ${
                      on ? "text-white" : "text-iris-900 hover:bg-iris-50"
                    }`}
                  >
                    {on && (
                      <motion.span
                        layoutId="faq-cat"
                        className="absolute inset-0 rounded-full bg-linear-to-r from-iris-700 to-iris-500 lg:rounded-2xl"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{c}</span>
                    <span className={`relative rounded-full px-2 text-xs ${on ? "bg-white/20" : "bg-iris-50 text-iris-600"}`}>{count}</span>
                  </button>
                );
              })}
            </div>
            <div className="hidden rounded-2xl bg-iris-950 p-5 text-white lg:block">
              <p className="font-display text-xl">Still have questions?</p>
              <a href={site.phone.href} className="mt-3 inline-flex items-center gap-2 font-semibold text-blush-200 hover:text-white">
                <Phone className="size-4" /> {site.phone.display}
              </a>
            </div>
          </div>
        </aside>

        <div className="min-h-[50vh]">
          <AnimatePresence mode="popLayout">
            {grouped.length === 0 ? (
              <motion.div
                key="none"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-[2rem] border border-dashed border-iris-200 p-10 text-center"
              >
                <p className="font-display text-2xl text-iris-950">No matches for &ldquo;{q}&rdquo;</p>
                <p className="mt-2 text-ink-soft">
                  Try another word — or just call us at{" "}
                  <a href={site.phone.href} className="font-semibold text-iris-700 underline">
                    {site.phone.display}
                  </a>
                  .
                </p>
              </motion.div>
            ) : (
              grouped.map((g) => (
                <motion.div
                  key={`${g.c}-${q}-${cat}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="mb-12 last:mb-0"
                >
                  <h2 className="mb-5 flex items-center gap-3 text-2xl font-medium">
                    <span className="h-px w-8 bg-blush-400" /> {g.c}
                  </h2>
                  <Accordion items={g.items} defaultOpen={null} />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
