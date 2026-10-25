import Link from "@/components/ui/Link";
import { MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

/** "Proudly serving Central Florida." — navy band with the two service-area statements. */
export function AreasBand() {
  return (
    <section className="section bg-navy-900 text-navy-100">
      <div className="wrap">
        <SectionHeading eyebrow="Close to home" title="Proudly serving Central Florida." tone="light" />
        <div className="mt-10 grid gap-8 sm:grid-cols-2 sm:gap-12">
          {site.areas.map((a) => (
            <div key={a.label} className="border-t border-navy-600 pt-6">
              <h3 className="flex items-center gap-2.5 text-white">
                <MapPin className="size-5 text-blush-300" aria-hidden /> {a.label}
              </h3>
              <p className="mt-3 text-lg">{a.text}</p>
              <Link href={a.href} className="mt-4 inline-block text-sm font-semibold text-blush-200 underline underline-offset-4 hover:text-white">
                About this service
              </Link>
            </div>
          ))}
        </div>
        <p className="mt-10 border-t border-navy-600 pt-6 text-sm">{site.areaNote}</p>
      </div>
    </section>
  );
}
