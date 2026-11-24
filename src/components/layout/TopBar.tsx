import { HeartHandshake, Phone } from "lucide-react";
import { sinceLine, site } from "@/lib/site";

/** Slim utility line above the floating header: since-line and the office phone number. */
export function TopBar() {
  return (
    <div className="relative z-40 border-b border-sand-200/70 bg-sand text-[0.8rem] text-ink">
      <div className="wrap flex items-center justify-center gap-6 py-2 sm:justify-between">
        <span className="hidden items-center gap-2 sm:inline-flex">
          <HeartHandshake className="size-3.5 text-blush-500" aria-hidden /> {sinceLine}
        </span>
        <a href={site.phone.href} className="inline-flex items-center gap-2 font-semibold hover:text-blush-600">
          <Phone className="size-3.5 text-blush-500" aria-hidden /> Call our team: {site.phone.display}
        </a>
      </div>
    </div>
  );
}
