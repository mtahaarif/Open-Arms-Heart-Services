import Link from "@/components/ui/Link";
import { ChevronRight, House } from "lucide-react";
import type { ReactNode } from "react";
import { BannerOverlay } from "./BannerOverlay";
import { Photo } from "./Photo";
import { Lines } from "./SectionHeading";

/**
 * Page banner (every inner page): a full-bleed photo under a dark plum treatment (<BannerOverlay>),
 * running up behind the floating header, with everything centred on top — breadcrumb, an eyebrow
 * led by a short rule, the H1 in white and the intro. `focus` is a static Tailwind object-position
 * class that keeps the people in frame (mostly matters on phones, where the crop is narrow).
 * Entrances are CSS so the headline and photo paint at first render.
 */
export function PageHeader({
  eyebrow,
  title,
  text,
  crumb,
  image,
  imageAlt = "",
  focus = "object-center",
  preload = true,
  children,
}: {
  eyebrow: string;
  title: string;
  text?: ReactNode;
  crumb: string;
  image?: string;
  imageAlt?: string;
  focus?: string;
  /** Off for the 404 page, whose markup ships with every route. */
  preload?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate -mt-[5.25rem] flex min-h-[31rem] items-center overflow-hidden bg-plum-700 pt-[8.25rem] [text-shadow:0_2px_18px_rgb(43_17_64/0.5)] pb-16 text-white lg:-mt-[5.75rem] lg:min-h-[35rem] lg:pt-[9.5rem] lg:pb-20">
      <div className="absolute inset-0 -z-10">
        {image && <Photo src={image} alt={imageAlt} preload={preload} sizes="2200px" className={focus} />}
        <BannerOverlay />
      </div>

      <div className="wrap relative text-center">
        <nav aria-label="Breadcrumb" className="enter text-[0.82rem]">
          <ol className="flex flex-wrap items-center justify-center gap-1.5 text-white/70">
            <li>
              <Link href="/" className="grid size-6 place-items-center rounded-full transition-colors hover:text-white">
                <House className="size-3.5" aria-hidden />
                <span className="sr-only">Home page</span>
              </Link>
            </li>
            <li aria-hidden>
              <ChevronRight className="size-3.5 opacity-50" />
            </li>
            <li aria-current="page" className="font-semibold text-white">
              {crumb}
            </li>
          </ol>
        </nav>

        <p className="enter mt-6 inline-flex items-center gap-3 text-xs font-bold tracking-[0.22em] text-blush-200 uppercase [--d:60ms]">
          <span aria-hidden className="h-px w-8 bg-blush-300/70" />
          {eyebrow}
        </p>
        <h1 className="enter mx-auto mt-5 max-w-4xl text-white [--d:120ms] [--enter:rise]">
          <Lines text={title} light />
        </h1>
        {text && (
          <div className="enter mx-auto mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-white/80 [--d:240ms] sm:text-lg [&_strong]:text-white">
            {text}
          </div>
        )}
        {children && <div className="enter mt-8 flex flex-wrap items-center justify-center gap-3 [--d:360ms]">{children}</div>}
      </div>
    </section>
  );
}
