import { ArrowUpRight, BadgeCheck, ShieldCheck } from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { insuranceNote, insurances, resources, screening } from "@/lib/content";
import { licenseLine } from "@/lib/site";
import { rich } from "@/lib/rich";

/** Two-letter monogram for an insurance tile. */
const monogram = (name: string) =>
  name
    .replace(/[()’']/g, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

/** "Answers for your family." — insurance tiles with monograms, a deep-plum screening card, resources. */
export function Coverage({ withResources = true }: { withResources?: boolean }) {
  return (
    <section className="section relative overflow-hidden">
      <div className="wrap">
        <SectionHeading eyebrow="Coverage & helpful information" title="Answers for *your family*." />
        <div className="mt-12 grid gap-5 lg:grid-cols-[1.35fr_1fr]">
          <div data-reveal className="card p-7 sm:p-9">
            <h3 className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-linear-to-br from-plum-600 to-blush-500 text-white">
                <BadgeCheck className="size-5" aria-hidden />
              </span>
              Insurance &amp; program inquiries
            </h3>
            <p className="mt-4">Contact us about coverage through:</p>
            <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {insurances.map((i) => (
                <GlowCard key={i} as="li" className="flex items-center gap-3 rounded-2xl border border-plum-100 bg-white p-3">
                  <span className="relative z-[4] grid size-9 shrink-0 place-items-center rounded-xl bg-plum-50 font-display text-sm text-plum-700">{monogram(i)}</span>
                  <span className="relative z-[4] text-sm leading-tight font-semibold text-ink">{i}</span>
                </GlowCard>
              ))}
            </ul>
            <p className="mt-6 text-sm">{insuranceNote}</p>
          </div>
          <div data-reveal className="rounded-[1.75rem] bg-rose p-7 ring-1 ring-rose-200 [--d:120ms] sm:p-9">
            <h3 className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-white text-plum-700 ring-1 ring-rose-200">
                <ShieldCheck className="size-5" aria-hidden />
              </span>
              Care you can feel confident about
            </h3>
            <p className="mt-5">{rich(screening)}</p>
            <p className="mt-8 inline-flex rounded-full border border-plum-200 bg-white px-4 py-2 text-sm font-semibold text-plum-700">
              {licenseLine}
            </p>
          </div>
        </div>
        {withResources && (
          <div data-reveal className="mt-12">
            <h3 className="text-base">Community resources</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {resources.map((r) => (
                <li key={r.name}>
                  <GlowCard as="a" href={r.href} target="_blank" rel="noopener noreferrer" className="group card flex h-full items-start justify-between gap-3 rounded-2xl p-5">
                    <span className="relative z-[4]">
                      <span className="font-semibold text-ink group-hover:text-plum-700">{r.name}</span>
                      {r.text && <span className="mt-1 block text-sm">{r.text}</span>}
                    </span>
                    <ArrowUpRight className="relative z-[4] size-4 shrink-0 text-plum-400 group-hover:text-plum-700" aria-hidden />
                  </GlowCard>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
