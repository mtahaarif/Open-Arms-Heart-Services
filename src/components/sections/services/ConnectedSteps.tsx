"use client";

import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { ClipboardCheck, FileSignature, House, MessagesSquare } from "lucide-react";
import { SectionIntro } from "../../ui/SectionIntro";
import { EASE } from "../../ui/motion";

const skilledSteps: { title: string; text: string; icon: LucideIcon }[] = [
  { title: "Physician order", text: "Your doctor orders home health — or we can reach out to them for you.", icon: FileSignature },
  { title: "Clinical assessment", text: "A clinician visits to assess needs, safety and goals at home.", icon: ClipboardCheck },
  { title: "Plan of care", text: "A care plan is created with your physician and shared with your family.", icon: House },
  { title: "Visits & updates", text: "Scheduled visits begin, with progress shared with you and your doctor.", icon: MessagesSquare },
];

/** Horizontal step strip with a line that draws itself across on scroll. */
export function ConnectedSteps() {
  return (
    <section className="relative overflow-hidden bg-iris-50/70 py-24 sm:py-28">
      <div className="container-x">
        <SectionIntro
          align="center"
          eyebrow="How skilled care works"
          title="Four steps from *order to recovery.*"
        />
        <div className="relative mt-16 grid gap-6 md:grid-cols-4">
          <svg className="absolute top-8 right-[12%] left-[12%] hidden h-2 md:block" preserveAspectRatio="none" viewBox="0 0 100 2" aria-hidden="true">
            <line x1="0" y1="1" x2="100" y2="1" stroke="#e1d2f8" strokeWidth="2" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />
            <motion.line
              x1="0"
              y1="1"
              x2="100"
              y2="1"
              stroke="url(#steps-grad)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: EASE }}
            />
            <defs>
              <linearGradient id="steps-grad">
                <stop offset="0" stopColor="#8b60d3" />
                <stop offset="1" stopColor="#ea6a9c" />
              </linearGradient>
            </defs>
          </svg>
          {skilledSteps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25 + i * 0.25, ease: EASE }}
              className="relative text-center"
            >
              <span className="relative mx-auto grid size-16 place-items-center rounded-full bg-white text-iris-700 shadow-[0_14px_30px_-12px_rgb(96_52_159/0.5)] ring-4 ring-iris-50">
                <s.icon className="size-6" />
                <span className="absolute -top-1 -right-1 grid size-6 place-items-center rounded-full bg-blush-500 text-xs font-bold text-white">
                  {i + 1}
                </span>
              </span>
              <h3 className="mt-5 font-display text-xl">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-[16rem] text-sm text-ink-soft">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
