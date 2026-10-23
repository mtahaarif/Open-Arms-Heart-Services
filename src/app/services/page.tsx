import Link from "next/link";
import { ArrowRight, BadgeCheck, Phone } from "lucide-react";
import { GoogleForm } from "@/components/forms/GoogleForm";
import { CareChooser } from "@/components/sections/CareChooser";
import { InsuranceSection } from "@/components/sections/InsuranceSection";
import { ServiceScrollspy } from "@/components/sections/services/ServiceScrollspy";
import { PageHero } from "@/components/ui/PageHero";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Reveal } from "@/components/ui/motion";
import { pageMetadata } from "@/lib/seo";
import { licenseLine, sinceLine, site } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/services",
  title: "Types of Care & Services",
  description:
    "Non-skilled home health services, APD services, vulnerable adult support, children & family support, veterans home care and Live Scan fingerprinting.",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Types of care"
        title="Dependable, *person-centered* support."
        text="Providing care for a family member with developmental disabilities or an aging loved one can present many challenges. Open Arms & Heart Services Inc. offers **dependable, person-centered support** designed to meet the unique needs of each individual. Our trained caregivers are committed to delivering compassionate care that promotes **independence, safety, and overall well-being.**"
        crumbs={[{ label: "Types of Care" }]}
        images={["/images/aide-smiling-patient.jpg", "/images/therapy-play.jpg"]}
      >
        <Link href="#request" className="btn-primary">
          Request more information <ArrowRight className="size-4" />
        </Link>
        <a href={site.phone.href} className="btn-ghost">
          <Phone className="size-4 text-blush-700" /> {site.phone.display}
        </a>
      </PageHero>

      {/* Credentials strip */}
      <section aria-label="Credentials" className="border-y border-iris-100 bg-white/70 py-5">
        <div className="container-x flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm font-semibold text-iris-900">
          {site.credentials.map((c) => (
            <span key={c} className="flex items-center gap-2">
              <BadgeCheck className="size-4 text-blush-500" /> {c}
            </span>
          ))}
          <span className="text-ink-soft">{sinceLine}</span>
          <span className="text-blush-700">{licenseLine}</span>
        </div>
      </section>

      <ServiceScrollspy />
        {/*<CareChooser />
    <InsuranceSection />*/}

      <section id="request" className="scroll-mt-28 bg-iris-50/60 py-24 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionIntro
              eyebrow="Request more information"
              title="Let's talk about *your loved one.*"
              text="If you would like to learn more about our services or discuss how we can support your loved one, please complete the form and a member of our team will contact you."
            />
            <Reveal delay={0.2} className="mt-8 space-y-2 text-ink-soft">
              <p>
                Prefer to call? <a href={site.phone.href} className="font-semibold text-iris-800 underline">{site.phone.display}</a>
              </p>
              <p>
                Email: <a href={`mailto:${site.email}`} className="font-semibold text-iris-800 underline">{site.email}</a>
              </p>
            </Reveal>
          </div>
          <GoogleForm />
        </div>
      </section>
    </>
  );
}
