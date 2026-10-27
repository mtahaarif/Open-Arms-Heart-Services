import Link from "@/components/ui/Link";
import { Phone } from "lucide-react";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="bg-cream">
      <div className="wrap grid min-h-[60svh] place-items-center py-20 text-center">
        <div>
          {/* This boundary ships in every page's payload; loading="lazy" stops React from
              auto-preloading the image on pages that never show it. */}
          {/* eslint-disable-next-line @next/next/no-img-element -- tiny static PNG */}
          <img src="/brand/logo-mark.png" alt="" width={200} height={154} loading="lazy" className="mx-auto h-20 w-auto" />
          <p className="eyebrow mt-8">Page not found</p>
          <h1 className="mt-3">We couldn&apos;t find that page</h1>
          <p className="lead mx-auto mt-4 max-w-md">Our arms are still open. Let&apos;s get you back on track.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/" className="btn-primary">
              Back to home
            </Link>
            <a href={site.phone.href} className="btn-outline">
              <Phone className="size-4" /> {site.phone.display}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
