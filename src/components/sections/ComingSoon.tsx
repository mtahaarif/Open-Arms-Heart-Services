import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { comingSoon } from "@/lib/services";

/** "More ways to care. Coming soon." — programs in development. */
export function ComingSoon() {
  return (
    <section className="section">
      <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading eyebrow="Growing with our community" title={"More ways to care.\nComing soon."} text={comingSoon.intro} />
        <div>
          <div className="relative mb-8 aspect-[16/7] overflow-hidden rounded-lg">
            <Photo
              src="/images/nurse-home-visit.jpg"
              alt="A nurse checking an older man's blood pressure at his dining table"
              sizes="(min-width: 1024px) 640px, 100vw"
            />
          </div>
          <div className="space-y-8">
            {comingSoon.items.map((item) => (
              <div key={item.title} className="border-l-[3px] border-blush-400 pl-6">
                <span className="inline-block rounded-full bg-plum-100 px-3 py-1 text-[0.7rem] font-bold tracking-[0.12em] text-plum-700 uppercase">
                  Coming soon
                </span>
                <h3 className="mt-3">{item.title}</h3>
                <p className="mt-2">{item.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm">{comingSoon.note}</p>
        </div>
      </div>
    </section>
  );
}
