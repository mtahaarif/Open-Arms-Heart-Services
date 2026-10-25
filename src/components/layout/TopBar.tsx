import { sinceLine, site } from "@/lib/site";

/** Navy strip above the header: since-line and the office phone number. */
export function TopBar() {
  return (
    <div className="bg-navy-900 text-[0.8rem] text-white">
      <div className="wrap flex items-center justify-center gap-6 py-2 sm:justify-between">
        <span className="hidden sm:block">{sinceLine}</span>
        <a href={site.phone.href} className="font-semibold hover:underline">
          Call our team: {site.phone.display}
        </a>
      </div>
    </div>
  );
}
