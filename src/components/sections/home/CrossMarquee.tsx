import { Heart, Sparkle } from "lucide-react";
import { allServices } from "@/lib/services";
import { Marquee } from "../../ui/Marquee";

const values = ["Compassion", "Dignity", "Independence", "Family-oriented", "Comfort of home", "Trust", "Respect", "Peace of mind"];

/** Two infinite ribbons crossing at opposing angles. */
export function CrossMarquee() {
  return (
    <section aria-label="Our services and values" className="relative z-10 -my-6 overflow-hidden py-16">
      <div className="-rotate-[2.5deg] bg-linear-to-r from-iris-800 via-iris-700 to-iris-800 py-4 shadow-[0_20px_50px_-20px_rgb(51_27_88/0.6)]">
        <Marquee duration={55} gap="2.5rem">
          {allServices.map((s) => (
            <span key={s.slug} className="flex items-center gap-10 font-display text-2xl whitespace-nowrap text-white sm:text-3xl">
              {s.name}
              <Heart className="size-5 fill-blush-400 text-blush-400" />
            </span>
          ))}
        </Marquee>
      </div>
      <div className="relative -mt-3 rotate-[1.8deg] bg-blush-100/95 py-3.5 backdrop-blur">
        <Marquee duration={40} reverse gap="2.5rem">
          {values.map((v) => (
            <span
              key={v}
              className="flex items-center gap-10 text-lg font-semibold tracking-[0.14em] whitespace-nowrap text-iris-800 uppercase"
            >
              {v}
              <Sparkle className="size-4 fill-iris-500 text-iris-500" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
