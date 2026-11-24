import { Sparkles } from "lucide-react";
import { GlowCard } from "@/components/ui/GlowCard";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { comingSoon } from "@/lib/services";

/** "More ways to care. Coming soon." — arch photo with glass programme cards. */
export function ComingSoon() {
  return (
    <section className="section relative overflow-hidden">
      <div className="wrap grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading eyebrow="Growing with our community" title={"More ways to care.\n*Coming soon*."} text={comingSoon.intro} />
          <div data-reveal className="relative mt-10 h-72 max-w-md overflow-hidden rounded-t-full rounded-b-[2.5rem] shadow-[0_40px_90px_-35px_rgb(51_27_88/0.55)] sm:h-80">
            <Photo
              src="/images/nurse-home-visit.webp"
              alt="A nurse checking an older man's blood pressure at his dining table"
              sizes="(min-width: 1024px) 640px, 115vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-plum-900/35 to-transparent" />
          </div>
        </div>
        <div className="space-y-5">
          {comingSoon.items.map((item, i) => (
            <GlowCard key={item.title} className={`card p-7 sm:p-9 ${i ? "[--d:120ms]" : ""}`} data-reveal>
              <div className="relative z-[4]">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-plum-600 to-blush-500 px-3.5 py-1.5 text-[0.7rem] font-bold tracking-[0.14em] text-white uppercase shadow-md shadow-blush-500/25">
                  <Sparkles className="size-3.5" aria-hidden /> Coming soon
                </span>
                <h3 className="mt-5 font-display text-2xl font-bold">{item.title}</h3>
                <p className="mt-3">{item.text}</p>
              </div>
            </GlowCard>
          ))}
          <p data-reveal className="px-2 text-sm">
            {comingSoon.note}
          </p>
        </div>
      </div>
    </section>
  );
}
