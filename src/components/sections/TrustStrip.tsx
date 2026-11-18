import { Heart } from "lucide-react";
import { Fragment } from "react";
import { Marquee } from "@/components/ui/Marquee";
import { site } from "@/lib/site";

/**
 * Credentials ticker under the banner — a straight, full-width deep-purple band with white display
 * type and pink hearts between the items, in a single row (the loop copy is aria-hidden by <Marquee>).
 */
export function TrustStrip() {
  return (
    <section aria-label="Credentials" className="enter relative overflow-clip py-6 sm:py-8 [--d:800ms]">
      <div className="bg-linear-to-r from-plum-800 via-plum-700 to-plum-800 py-4 shadow-[0_20px_45px_-25px_rgb(51_27_88/0.6)] sm:py-5">
        <Marquee duration={42} gap="2rem" pauseOnHover={false}>
          {site.credentials.map((c) => (
            <Fragment key={c}>
              <span className="font-display text-xl whitespace-nowrap text-white sm:text-2xl">{c}</span>
              <Heart className="size-4 shrink-0 fill-blush-400 text-blush-400" aria-hidden />
            </Fragment>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
