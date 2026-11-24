import { Heart } from "lucide-react";
import { Fragment } from "react";
import { Marquee } from "@/components/ui/Marquee";
import { site } from "@/lib/site";

/**
 * Credentials ticker under the banner — a straight, full-width bright band (the logo's violet into its pink)
 * with white display type and light-pink hearts between the items, in a single row (the loop copy is aria-hidden by <Marquee>).
 */
export function TrustStrip() {
  return (
    <section aria-label="Credentials" className="enter relative overflow-clip py-6 sm:py-8 [--d:800ms]">
      <div className="border-y border-sage-200 bg-sage py-4 sm:py-5">
        <Marquee duration={42} gap="2rem" pauseOnHover={false}>
          {site.credentials.map((c) => (
            <Fragment key={c}>
              <span className="font-display text-xl font-bold whitespace-nowrap text-plum-700 sm:text-2xl">{c}</span>
              <Heart className="size-4 shrink-0 fill-blush-500 text-blush-500" aria-hidden />
            </Fragment>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
