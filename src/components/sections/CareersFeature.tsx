import Link from "@/components/ui/Link";
import { ArrowRight, BriefcaseMedical } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { careersIntro, roles } from "@/lib/content";
import { rich } from "@/lib/rich";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** "Great Careers Change Lives." — rounded lavender panel: tall photo with floating role chips + copy. */
export function CareersFeature() {
  return (
    <section className="py-10 sm:py-14">
      <div className="wrap">
        <div className="relative isolate grid overflow-hidden rounded-[2.5rem] bg-linear-to-br from-plum-100 via-white to-blush-50 ring-1 ring-plum-100 lg:grid-cols-2">
          <div className="relative min-h-[22rem] lg:min-h-[34rem]">
            <Photo
              src="/images/careers-caregivers.webp"
              alt="Two smiling caregivers in scrubs standing arm in arm with an older woman they care for"
              sizes="(min-width: 1024px) 600px, 100vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-plum-900/50 via-transparent to-transparent" />
            <ul className="absolute right-5 bottom-5 left-5 flex flex-wrap gap-2">
              {roles.map((r) => (
                <li key={r} className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-plum-900">
                  <BriefcaseMedical className="size-4 text-blush-600" aria-hidden /> {r}
                </li>
              ))}
            </ul>
          </div>
          <div className="px-6 py-12 sm:px-12 sm:py-16">
            <SectionHeading eyebrow="Find purpose in what you do" title="Great Careers *Change Lives*.">
              {careersIntro.map((t) => (
                <p key={t} className="mt-4">
                  {rich(t)}
                </p>
              ))}
            </SectionHeading>
            <div data-reveal className="[--d:120ms]">
              <Link href="/careers" className="btn-primary mt-8">
                Explore career opportunities <ArrowRight className="size-4" />
              </Link>
              <p className="mt-6 border-t border-plum-200 pt-5 text-sm text-plum-800">
                Open positions: {roles.join(" · ")}. Contact our office about current openings and role requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
