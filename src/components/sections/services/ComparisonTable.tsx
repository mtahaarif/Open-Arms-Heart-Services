"use client";

import { motion } from "motion/react";
import { HandHeart, Stethoscope } from "lucide-react";
import { SectionIntro } from "../../ui/SectionIntro";
import { EASE } from "../../ui/motion";

const rows = [
  {
    label: "Who provides it",
    skilled: "Licensed nurses, therapists & medical social workers — plus home health aides",
    nonSkilled: "Trained caregivers, companions, homemakers & direct support staff",
  },
  {
    label: "Doctor's order",
    skilled: "Yes — care follows a physician-approved plan",
    nonSkilled: "Not required — you choose the support you want",
  },
  {
    label: "Typical goals",
    skilled: "Recovery, rehabilitation & managing health conditions",
    nonSkilled: "Daily living, safety, independence & companionship",
  },
  {
    label: "What it looks like",
    skilled: "Scheduled clinical visits focused on a treatment plan",
    nonSkilled: "Regular visits built around your routines",
  },
  {
    label: "Examples",
    skilled: "Wound care, IV therapy, PT / OT / speech, symptom monitoring",
    nonSkilled: "Bathing, meals, housekeeping, rides, respite & companionship",
  },
  {
    label: "Paying for it",
    skilled: "Often Medicaid or health insurance — we'll help verify",
    nonSkilled: "Medicaid waiver, long-term care insurance or private pay",
  },
];

export function ComparisonTable() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-iris-50 to-paper py-24 sm:py-32">
      <div className="container-x">
        <SectionIntro
          align="center"
          eyebrow="At a glance"
          title="Skilled vs. non-skilled — *what's the difference?*"
          text="Both happen at home. The difference is who provides the care and why."
        />

        <div className="mt-14 overflow-x-auto pb-4" data-lenis-prevent-horizontal>
          <div className="min-w-[720px]">
            <div className="grid grid-cols-[0.8fr_1fr_1fr] gap-3">
              <div />
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE }}
                className="flex items-center gap-3 rounded-t-[1.75rem] bg-iris-800 p-6 text-white"
              >
                <Stethoscope className="size-6 text-blush-200" />
                <div>
                  <p className="font-display text-2xl">Home Health</p>
                  <p className="text-xs font-semibold tracking-[0.16em] text-iris-200 uppercase">Skilled</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                className="flex items-center gap-3 rounded-t-[1.75rem] bg-blush-500 p-6 text-white"
              >
                <HandHeart className="size-6 text-white" />
                <div>
                  <p className="font-display text-2xl">Home Care</p>
                  <p className="text-xs font-semibold tracking-[0.16em] text-blush-100 uppercase">Non-skilled</p>
                </div>
              </motion.div>
            </div>
            {rows.map((r, i) => (
              <motion.div
                key={r.label}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "0px 0px -5% 0px" }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
                className="group mt-3 grid grid-cols-[0.8fr_1fr_1fr] gap-3"
              >
                <div className="flex items-center rounded-2xl px-2 font-semibold text-iris-950">{r.label}</div>
                <div className="rounded-2xl border border-iris-100 bg-white p-5 text-ink-soft transition duration-500 group-hover:border-iris-300 group-hover:shadow-[0_20px_40px_-25px_rgb(96_52_159/0.5)]">
                  {r.skilled}
                </div>
                <div className="rounded-2xl border border-blush-100 bg-white p-5 text-ink-soft transition duration-500 group-hover:border-blush-300 group-hover:shadow-[0_20px_40px_-25px_rgb(234_106_156/0.5)]">
                  {r.nonSkilled}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-ink-soft">
          Coverage varies by plan and situation. We&apos;ll walk you through your options before care begins.
        </p>
      </div>
    </section>
  );
}
