import { Phone } from "lucide-react";
import { CareLink } from "@/components/forms/CareLink";
import { GoogleForm } from "@/components/forms/GoogleForm";
import { ComingSoon } from "@/components/sections/ComingSoon";
import { Coverage } from "@/components/sections/Coverage";
import { PageHeader } from "@/components/ui/PageHeader";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { steps } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { programs } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/services",
  title: "Our Services",
  description:
    "Non-skilled home health, APD services, vulnerable adult support, children & family support (CBC), veterans home care & respite, and Live Scan fingerprinting.",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our services"
        title={"Care for everyday needs.\nSupport for individual goals."}
        text="Explore each service to see how we can help. Our team can discuss availability, referrals and authorization requirements with you."
        crumb="Our services"
      >
        <nav aria-label="Services on this page" className="w-full">
          <p className="text-sm font-semibold text-ink">Jump to a service</p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((p, i) => (
              <li key={p.slug}>
                <a
                  href={`#${p.slug}`}
                  className="flex h-full items-center gap-3 rounded-md border border-line bg-white px-4 py-3 text-[0.95rem] font-semibold text-ink hover:border-plum-300 hover:text-plum-700"
                >
                  <span className="text-xs font-bold text-plum-400">{String(i + 1).padStart(2, "0")}</span>
                  {p.short}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>

      {programs.map((p, i) => (
        <section key={p.slug} id={p.slug} className={`section scroll-mt-24 ${i % 2 ? "bg-plum-50" : ""}`}>
          <div className="wrap grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <div className={`relative aspect-[4/3] overflow-hidden rounded-lg lg:sticky lg:top-32 ${i % 2 ? "lg:order-2" : ""}`}>
              <Photo src={p.image} alt={p.imageAlt} sizes="(min-width: 1024px) 560px, 100vw" />
            </div>
            <div>
              <p className="eyebrow">
                {String(i + 1).padStart(2, "0")} · Our services
              </p>
              <h2 className="mt-3">{p.name}</h2>
              <p className="mt-3 font-serif text-xl text-plum-700 italic">{p.tagline}</p>
              <p className="mt-5">{p.intro}</p>

              {p.feature && (
                <div className="mt-6 rounded-md border-l-[3px] border-blush-400 bg-white p-5 shadow-[0_6px_20px_-14px_rgb(23_43_72/0.25)]">
                  <h3>{p.feature.title}</h3>
                  <p className="mt-2">{p.feature.text}</p>
                </div>
              )}

              <h3 className="mt-8 text-base tracking-[0.12em] text-plum-700 uppercase">Services and support</h3>
              <ul className={`check-list mt-4 grid gap-x-8 gap-y-2.5 ${p.points.length > 7 ? "sm:grid-cols-2" : ""}`}>
                {p.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>

              <p className="mt-7 border-t border-line pt-5 text-[0.95rem]">{p.note}</p>

              <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
                <CareLink care={p.slug} className="btn-primary">
                  Discuss your needs <span aria-hidden>→</span>
                </CareLink>
                <a href={site.phone.href} className="link-arrow">
                  <Phone className="size-4" /> {site.phone.display}
                </a>
              </div>
            </div>
          </div>
        </section>
      ))}

      <ComingSoon />
      <Coverage withResources={false} />

      <section id="request" className="section scroll-mt-24">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow="Request more information"
              title="Let's talk about the support you need."
              text="Complete the form and a member of our team will contact you. Prefer to talk now? Call our office."
            />
            <a href={site.phone.href} className="btn-primary mt-7">
              <Phone className="size-4" /> Call {site.phone.display}
            </a>
            <ol className="mt-10 space-y-5 border-t border-line pt-8">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="font-serif text-2xl text-plum-400">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-bold text-ink">{s.title}</span>
                    {s.text}
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <GoogleForm />
        </div>
      </section>
    </>
  );
}
