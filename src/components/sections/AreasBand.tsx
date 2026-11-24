import Link from "@/components/ui/Link";
import { ArrowRight, MapPin } from "lucide-react";
import { Ribbons } from "@/components/brand/Ribbons";
import { GlowCard } from "@/components/ui/GlowCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

/** "Proudly serving the Central Region." — rounded deep-plum band with ribbons and glass area cards. */
export function AreasBand() {
  return (
    <section className="py-10 sm:py-14">
      <div className="wrap">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-sage px-6 py-14 ring-1 ring-sage-200 sm:px-12 sm:py-20 lg:px-16">
          <Ribbons className="absolute -right-20 -bottom-10 -z-10 h-full w-[80%] opacity-20" />
          <SectionHeading eyebrow="Close to home" title="Proudly serving *the Central Region*." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {site.areas.map((a, i) => (
              <GlowCard key={a.label} className={`rounded-[1.75rem] bg-white p-7 ring-1 ring-sage-200 sm:p-8 ${i ? "[--d:120ms]" : ""}`} data-reveal>
                <div className="relative z-[4]">
                  <span className="grid size-12 place-items-center rounded-2xl bg-linear-to-br from-plum-500 to-blush-500 text-white shadow-lg shadow-blush-500/25">
                    <MapPin className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-bold">{a.label}</h3>
                  <p className="mt-2 text-lg">{a.text}</p>
                  <Link href={a.href} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-plum-700 hover:text-blush-600">
                    About this service <ArrowRight className="size-4" />
                  </Link>
                </div>
              </GlowCard>
            ))}
          </div>
          <p className="mt-10 border-t border-sage-200 pt-6 text-sm">{site.areaNote}</p>
        </div>
      </div>
    </section>
  );
}
