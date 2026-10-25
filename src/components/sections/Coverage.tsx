import { ArrowUpRight, BadgeCheck, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { insuranceNote, insurances, resources, screening } from "@/lib/content";
import { licenseLine } from "@/lib/site";
import { rich } from "@/lib/rich";

/** "Answers for your family." — insurance, screening & licensing, and community resources. */
export function Coverage({ withResources = true }: { withResources?: boolean }) {
  return (
    <section className="section bg-cream">
      <div className="wrap">
        <SectionHeading eyebrow="Coverage & helpful information" title="Answers for your family." />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="card p-7 sm:p-9">
            <h3 className="flex items-center gap-3">
              <BadgeCheck className="size-6 text-plum-700" aria-hidden /> Insurance &amp; program inquiries
            </h3>
            <p className="mt-3">Contact us about coverage through:</p>
            <ul className="check-list mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {insurances.map((i) => (
                <li key={i} className="font-semibold text-ink">
                  {i}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm">{insuranceNote}</p>
          </div>
          <div className="card p-7 sm:p-9">
            <h3 className="flex items-center gap-3">
              <ShieldCheck className="size-6 text-plum-700" aria-hidden /> Care you can feel confident about
            </h3>
            <p className="mt-3">{rich(screening)}</p>
            <p className="mt-5 text-sm font-semibold text-ink">License numbers: {licenseLine}</p>
          </div>
        </div>
        {withResources && (
          <div className="mt-10 border-t border-line pt-8">
            <h3 className="text-base">Community resources</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {resources.map((r) => (
                <li key={r.name}>
                  <a href={r.href} target="_blank" rel="noopener noreferrer" className="group flex h-full items-start justify-between gap-3 rounded-md border border-line bg-white p-4 hover:border-plum-300">
                    <span>
                      <span className="font-semibold text-ink group-hover:text-plum-700">{r.name}</span>
                      {r.text && <span className="mt-1 block text-sm">{r.text}</span>}
                    </span>
                    <ArrowUpRight className="size-4 shrink-0 text-plum-400 group-hover:text-plum-700" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
