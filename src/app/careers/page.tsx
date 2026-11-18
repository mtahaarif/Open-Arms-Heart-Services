import { ArrowRight, ArrowUpRight, BriefcaseMedical, ClipboardList, Phone } from "lucide-react";
import { Ribbons } from "@/components/brand/Ribbons";
import { ContactBand } from "@/components/sections/ContactBand";
import { GlowCard } from "@/components/ui/GlowCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { Photo } from "@/components/ui/Photo";
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
        title={"Great Careers\n*Change Lives*."}
        text={rich(careersIntro.join(" "))}
        crumb="Careers"
        image="/images/banners/careers.webp"
        imageAlt="Two caregivers in scrubs smiling at each other on their way to a client's home"
        focus="object-[34%_30%]"
      >
        <a href={site.applicationUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
          Apply online <ArrowUpRight className="size-4" />
        </a>
        <a href={site.phone.href} className="btn-outline-light">
          <Phone className="size-4 text-blush-300" /> Ask about current openings
        </a>
      </PageHeader>

      {/* Positions — bento: photo card + one glow card per role */}
      <section className="section">
        <div className="wrap">
          <SectionHeading
            eyebrow="Join our care team"
            title="Make a difference and build a *meaningful career*."
            text="Contact our office about current openings and role requirements, or apply online for one of these positions."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-[1.1fr_1fr_1fr]">
            <div data-reveal className="relative min-h-[20rem] overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-35px_rgb(51_27_88/0.7)]">
              <Photo src="/images/caregiver-companion.webp" alt="A caregiver chatting with an older man in his backyard garden" sizes="(min-width: 1024px) 640px, 125vw" />
              <div className="absolute inset-0 bg-linear-to-t from-plum-950/80 via-plum-900/20 to-transparent" />
            </div>
            {roles.map((r, i) => (
              <GlowCard key={r} as="article" className={`glass flex flex-col justify-between rounded-[2rem] p-7 sm:p-8 ${i ? "[--d:200ms]" : "[--d:100ms]"}`} data-reveal>
                <div className="relative z-[4]">
                  <span className="grid size-14 place-items-center rounded-2xl bg-linear-to-br from-plum-600 to-blush-500 text-white shadow-lg shadow-blush-500/30">
                    <BriefcaseMedical className="size-6" aria-hidden />
                  </span>
                  <p className="eyebrow mt-6">Position</p>
                  <h3 className="mt-4 font-display text-3xl font-medium uppercase">{r}</h3>
                </div>
                <a href="#apply" className="link-arrow relative z-[4] mt-8">
                  How to apply as {r === "Group Home Staff" ? "Group Home Staff" : `a ${r}`} <ArrowRight className="size-4" />
                </a>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements + the application (deep-plum panel) */}
      <section className="pb-10">
        <div className="wrap grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <div data-reveal className="glass rounded-[2rem] p-7 sm:p-9">
            <h2 className="text-[1.6rem] sm:text-[1.9rem]">Requirements</h2>
            <ul className="check-list mt-7 space-y-3.5">
              {requirements.map((r) => (
                <li key={r} className="font-semibold text-ink">
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div id="apply" data-reveal className="band-dark scroll-mt-32 rounded-[2rem] p-7 [--d:120ms] sm:p-10">
            <Ribbons className="absolute -right-24 -bottom-16 -z-10 h-full w-[85%] opacity-50" />
            <span className="eyebrow-dark">
              <ClipboardList className="size-3.5" aria-hidden /> Employment application
            </span>
            <h2 className="mt-5 text-[1.6rem] text-white sm:text-[1.9rem]">The application asks for</h2>
            <ul className="check-list mt-7 grid gap-x-8 gap-y-3.5 text-navy-100 sm:grid-cols-2">
              {applicationChecklist.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <p className="mt-8 border-t border-white/10 pt-6 text-sm text-navy-100/70">
              The application includes an equal-opportunity and ADA notice to applicants.
            </p>
            <a href={site.applicationUrl} target="_blank" rel="noopener noreferrer" className="btn-light mt-6">
              Start your application <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
