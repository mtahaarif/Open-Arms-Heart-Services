"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { EASE } from "./motion";

export function Accordion({
  items,
  defaultOpen = 0,
  dark = false,
}: {
  items: { q: string; a: string }[];
  defaultOpen?: number | null;
  dark?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const base = useId();

  return (
    <ul className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        const id = `${base}-${i}`;
        return (
          <motion.li
            key={item.q}
            layout
            transition={{ layout: { duration: 0.5, ease: EASE } }}
            className={`overflow-hidden rounded-3xl border transition-colors duration-500 ${
              dark
                ? isOpen
                  ? "border-white/20 bg-white/10"
                  : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                : isOpen
                  ? "border-iris-200 bg-white shadow-[0_24px_60px_-30px_rgb(96_52_159/0.35)]"
                  : "border-iris-100 bg-white/60 hover:border-iris-200 hover:bg-white"
            }`}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={id}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left sm:px-7"
            >
              <span className={`text-lg font-semibold ${dark ? "text-white" : "text-iris-950"}`}>{item.q}</span>
              <motion.span
                animate={{ rotate: isOpen ? 135 : 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className={`grid size-9 shrink-0 place-items-center rounded-full ${
                  isOpen
                    ? "bg-linear-to-br from-iris-600 to-blush-500 text-white"
                    : dark
                      ? "bg-white/10 text-blush-200"
                      : "bg-iris-50 text-iris-700"
                }`}
              >
                <Plus className="size-4" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={id}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <p className={`px-6 pb-6 leading-relaxed sm:px-7 ${dark ? "text-iris-100/80" : "text-ink-soft"}`}>
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>
        );
      })}
    </ul>
  );
}
