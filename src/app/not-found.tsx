import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { LogoMark } from "@/components/brand/Logo";
import { Aurora } from "@/components/brand/Ribbons";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="relative isolate grid min-h-[100svh] place-items-center overflow-hidden px-4 pt-28 pb-20 text-center">
      <Aurora />
      <div>
        <LogoMark className="animate-float mx-auto h-28 w-auto" />
        <p className="mt-8 font-display text-[7rem] leading-none text-gradient italic sm:text-[10rem]">404</p>
        <h1 className="mt-2 text-4xl font-medium sm:text-5xl">This page wandered off.</h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-ink-soft">
          Don&apos;t worry — our arms are still open. Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            Back to home <ArrowRight className="size-4" />
          </Link>
          <a href={site.phone.href} className="btn-ghost">
            <Phone className="size-4 text-blush-600" /> {site.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
