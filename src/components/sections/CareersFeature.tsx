import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { careersIntro, roles } from "@/lib/content";

/** "Great Careers Change Lives." — photo + copy band linking to /careers. */
export function CareersFeature() {
  return (
    <section className="bg-plum-100">
      <div className="mx-auto grid max-w-[1240px] lg:grid-cols-2">
        <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[460px]">
          <Photo src="/images/careers-caregivers.jpg" alt="Two smiling caregivers in scrubs standing arm in arm with an older woman they care for" sizes="(min-width: 1024px) 620px, 100vw" />
        </div>
        <div className="px-4 py-12 sm:px-12 sm:py-16">
          <p className="eyebrow">Find purpose in what you do</p>
          <h2 className="mt-3">
            Great Careers <span className="text-plum-700">Change Lives.</span>
          </h2>
          {careersIntro.map((t) => (
            <p key={t} className="mt-4">
              {t}
            </p>
          ))}
          <Link href="/careers" className="btn-primary mt-8">
            Explore career opportunities <span aria-hidden>→</span>
          </Link>
          <p className="mt-6 border-t border-plum-200 pt-5 text-sm text-plum-800">
            Open positions: {roles.join(" · ")}. Contact our office about current openings and role requirements.
          </p>
        </div>
      </div>
    </section>
  );
}
