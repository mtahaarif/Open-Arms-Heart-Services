import { GlowCard } from "@/components/ui/GlowCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { steps } from "@/lib/content";

/** "A simple path to support." — three glass step cards joined by a gradient line. */
export function Steps({ className = "" }: { className?: string }) {
  return (
    <section className={`section relative overflow-hidden ${className}`}>
      <div className="wrap">
        <SectionHeading eyebrow="Your next step" title="A simple path to *support*." align="center" />
        <ol className="relative mt-14 grid gap-5 sm:grid-cols-3">
          <span className="absolute top-12 right-[16%] left-[16%] hidden h-0.5 bg-linear-to-r from-plum-300 via-blush-300 to-plum-300 sm:block" aria-hidden />
          {steps.map((s, i) => (
            <GlowCard key={s.title} as="li" className={`glass rounded-[2rem] p-7 text-center sm:p-8 ${i === 1 ? "[--d:120ms]" : i === 2 ? "[--d:240ms]" : ""}`} data-reveal>
              <div className="relative z-[4]">
                <span className="mx-auto grid size-[4.5rem] place-items-center rounded-full bg-linear-to-br from-plum-600 to-blush-500 font-display text-2xl text-white shadow-lg shadow-blush-500/30 ring-8 ring-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6">{s.title}</h3>
                <p className="mt-2">{s.text}</p>
              </div>
            </GlowCard>
          ))}
        </ol>
      </div>
    </section>
  );
}
