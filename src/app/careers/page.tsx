import { ArrowUpRight, Phone } from "lucide-react";
import { ContactBand } from "@/components/sections/ContactBand";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { applicationChecklist, careersIntro, requirements, roles } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { rich } from "@/lib/rich";

export const metadata = pageMetadata({
  path: "/careers",
  title: "Careers — Join Our Care Team",
  description:
    "Great careers change lives. Make a difference and build a meaningful career — apply online for Home Health Aide or Group Home Staff positions.",
});

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Find purpose in what you do"
        title={"Great Careers\nChange Lives."}
        text={rich(careersIntro.join(" "))}
        crumb="Careers"
        image="/images/careers-caregivers.jpg"
        imageAlt="Two smiling caregivers in scrubs standing arm in arm with an older woman they care for"
      >
        <a href={site.applicationUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
          Apply online <ArrowUpRight className="size-4" />
        </a>
        <a href={site.phone.href} className="link-arrow">
          <Phone className="size-4" /> Ask about current openings
        </a>
      </PageHeader>

      <section className="section">
        <div className="wrap">
          <SectionHeading
            eyebrow="Join our care team"
            title="Make a difference and build a meaningful career."
            text="Contact our office about current openings and role requirements, or apply online for one of these positions."
          />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {roles.map((r) => (
              <li key={r} className="card flex flex-col justify-between gap-6 p-7 sm:flex-row sm:items-center sm:p-9">
                <div>
                  <p className="eyebrow">Position</p>
                  <h3 className="mt-2 font-display text-2xl font-normal">{r}</h3>
                </div>
                <a href="#apply" className="btn-outline shrink-0">
                  How to apply as {r === "Group Home Staff" ? "Group Home Staff" : `a ${r}`}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-plum-50">
        <div className="wrap grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="card p-7 sm:p-9">
            <h2 className="text-[1.75rem] sm:text-[2rem]">Requirements</h2>
            <ul className="check-list mt-6 space-y-3">
              {requirements.map((r) => (
                <li key={r} className="font-semibold text-ink">
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div id="apply" className="card scroll-mt-32 p-7 sm:p-9">
            <h2 className="text-[1.75rem] sm:text-[2rem]">The application asks for</h2>
            <ul className="check-list mt-6 space-y-3">
              {applicationChecklist.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <p className="mt-6 border-t border-line pt-5 text-sm">The application includes an equal-opportunity and ADA notice to applicants.</p>
            <a href={site.applicationUrl} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6">
              Start your application <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
