import Link from "@/components/ui/Link";
import { ArrowRight, Phone } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { trustQAs } from "@/lib/content";
import { site } from "@/lib/site";

/*
 * Per-card classes (static strings so Tailwind generates them). Card i sticks a little lower than
 * the one before it, and — where scroll-driven animations are supported — shrinks to
 * 1 − (n − i) × 0.035 and dims from its own start (i / n) to the end of the stack. See `.qa-*`
 * in globals.css. Four cards.
 */
const tints = ["from-white to-plum-50", "from-white to-blush-50", "from-plum-50 to-white", "from-blush-50 to-white"];
const stick = ["top-[7rem]", "top-[calc(7rem+14px)]", "top-[calc(7rem+28px)]", "top-[calc(7rem+42px)]"];
const shrink = [
  "[--qa-s:0.86] [animation-range:contain_0%_contain_100%]",
  "[--qa-s:0.895] [animation-range:contain_25%_contain_100%]",
  "[--qa-s:0.93] [animation-range:contain_50%_contain_100%]",
  "[--qa-s:0.965] [animation-range:contain_75%_contain_100%]",
];
const dim = [
  "[--qa-dim:0.18] [animation-range:contain_0%_contain_25%]",
  "[--qa-dim:0.18] [animation-range:contain_25%_contain_50%]",
  "[--qa-dim:0.18] [animation-range:contain_50%_contain_75%]",
  "[--qa-dim:0]",
];

/** "Questions & answers" — the home-page Q&As as sticky stacking cards beside a sticky intro column. */
export function StackingCards() {
  const total = trustQAs.length;

  return (
    <section className="relative py-24 sm:py-32" aria-label="Questions families ask first">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeading eyebrow="Peace of mind" title="Questions & *answers*." text="Your safety, trust, and peace of mind are our highest priorities." />
            <div data-reveal className="mt-8 flex flex-wrap gap-3 [--d:200ms]">
              <a href={site.phone.href} className="btn-primary">
                <Phone className="size-4" /> {site.phone.display}
              </a>
              <Link href="/faq" className="btn-outline">
                All FAQs <ArrowRight className="size-4 text-blush-600" />
              </Link>
            </div>
          </div>
        </div>

        <div className="qa-stack relative lg:col-span-8">
          {trustQAs.map((item, i) => (
            <div key={item.q} className={`sticky h-[calc(min(28rem,calc(100svh-9rem))+4rem)] md:h-[calc(clamp(22rem,calc(100svh-12rem),31rem)+5rem)] ${stick[i]}`}>
              <article
                className={`qa-card relative grid h-[min(28rem,calc(100svh-9rem))] overflow-hidden rounded-[2rem] border border-white bg-linear-to-br shadow-[0_30px_80px_-40px_rgb(51_27_88/0.45)] md:h-[clamp(22rem,calc(100svh-12rem),31rem)] md:grid-cols-[1.45fr_1fr] ${tints[i % tints.length]} ${shrink[i]}`}
              >
                <div className="flex flex-col justify-center p-6 sm:p-8 xl:p-9 [@media(max-height:720px)]:py-6">
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-xl bg-linear-to-br from-plum-600 to-blush-500 text-white shadow-lg shadow-plum-600/25">
                      <item.icon className="size-5" aria-hidden />
                    </span>
                    <span className="font-display text-sm text-plum-400">
                      {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-[clamp(1.35rem,1.05rem+1.1vw,1.85rem)] leading-[1.12] font-medium text-balance uppercase [@media(max-height:720px)]:mt-4 [@media(max-height:720px)]:text-[1.35rem]">
                    {item.q}
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed xl:text-base [@media(max-height:720px)]:text-sm">{item.a}</p>
                  {item.chips && (
                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {item.chips.map((c) => (
                        <li key={c} className="rounded-full bg-white/85 px-2.5 py-1 text-xs font-medium text-plum-900 ring-1 ring-plum-100 sm:text-[0.8rem]">
                          {c}
                        </li>
                      ))}
                    </ul>
                  )}
                  {item.link && (
                    <Link href={item.link.href} className="group mt-5 inline-flex items-center gap-2 text-[0.95rem] font-semibold text-plum-700">
                      {item.link.label} <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                    </Link>
                  )}
                </div>
                <div className="relative hidden md:block">
                  <Photo src={item.image} alt={item.imageAlt} sizes="(min-width: 1280px) 400px, 45vw" className={item.imagePosition} />
                  <div className="absolute inset-0 bg-linear-to-r from-white/30 to-transparent" />
                </div>
                <div className={`qa-dim pointer-events-none absolute inset-0 bg-plum-950 opacity-0 ${dim[i]}`} />
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
