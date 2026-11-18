import Link from "@/components/ui/Link";
import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import { Photo } from "@/components/ui/Photo";
import { insurances, mission } from "@/lib/content";
import { programs } from "@/lib/services";
import { site } from "@/lib/site";

/** Words drawn in the brand gradient. */
const highlight = /^(independence|productivity|meaningful|integration|excellence|care\.)/i;

/**
 * "Our mission" — copied from the earlier design's home-page manifesto: the mission statement in
 * large display type, the words brightening one after another in reading order as the paragraph
 * scrolls up the screen (CSS scroll-driven, `.mission-text` / `.mission-word` in globals.css), beside a "since 2017" photo card and three stat cards.
 */
export function MissionStatement() {
  const stats = [
    { n: programs.length, label: "Types of care offered" },
    { n: site.areas[0].counties.length, label: "Home health counties served" },
    { n: insurances.length, label: "Insurances we accept" },
  ];
  const words = mission.split(" ");

  return (
    <section aria-labelledby="mission-title" className="relative overflow-clip py-20 sm:py-28">
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-8">
          <p id="mission-title" data-reveal className="eyebrow">
            Our mission
          </p>
          <p
            className="mission-text mt-8 font-display text-[1.9rem] leading-[1.2] text-ink sm:text-[2.7rem] sm:leading-[1.15]"
            style={{ "--n": words.length } as CSSProperties}
          >
            {words.map((w, i) => (
              <span
                key={i}
                className={`mission-word mr-[0.25em] inline-block ${highlight.test(w) ? "text-gradient" : ""}`}
                style={{ "--i": i } as CSSProperties}
              >
                {w}
              </span>
            ))}
          </p>
          <div data-reveal className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link href="#story" className="group inline-flex items-center gap-2 text-lg font-semibold text-plum-700">
              <span className="bg-linear-to-r from-plum-600 to-blush-500 bg-[length:0%_2px] bg-bottom-left bg-no-repeat pb-1 transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">
                Read our story
              </span>
              <ArrowRight className="size-5 transition group-hover:translate-x-1" aria-hidden />
            </Link>
            <span className="font-display text-xl text-blush-700">{site.motto}</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:col-span-4 lg:pt-16">
          <div data-reveal className="relative isolate overflow-hidden rounded-[2rem] bg-plum-900 p-7 text-white">
            <Photo src="/images/hands-mission.webp" alt="" sizes="720px" className="-z-10 opacity-25" />
            <p className="text-sm font-semibold tracking-[0.16em] text-blush-200 uppercase">Serving Central Florida since</p>
            <p className="mt-1 font-display text-7xl">{site.since}</p>
            <p className="mt-2 text-navy-100/80">
              {site.credentials[1]} · {site.credentials[0]}.
            </p>
          </div>
          {stats.map((s, i) => (
            <div key={s.label} data-reveal className={`glass flex items-center gap-5 rounded-[1.6rem] p-5 ${["[--d:100ms]", "[--d:200ms]", "[--d:300ms]"][i]}`}>
              <span className="font-display text-5xl text-gradient">{s.n}</span>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
