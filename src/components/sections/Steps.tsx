import { SectionHeading } from "@/components/ui/SectionHeading";
import { steps } from "@/lib/content";

/** "A simple path to support." — three numbered steps. */
export function Steps({ className = "bg-plum-50" }: { className?: string }) {
  return (
    <section className={`section ${className}`}>
      <div className="wrap">
        <SectionHeading eyebrow="Your next step" title="A simple path to support." />
        <ol className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-10">
          {steps.map((s, i) => (
            <li key={s.title} className="border-t-2 border-plum-200 pt-6">
              <span className="font-display text-4xl text-plum-400">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3">{s.title}</h3>
              <p className="mt-2">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
