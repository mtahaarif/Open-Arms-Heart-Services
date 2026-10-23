import { ArrowUpRight, BadgeCheck, Mail, MapPin, Phone, Printer } from "lucide-react";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { ResourcesSection } from "@/components/sections/ResourcesSection";
import { Accordion } from "@/components/ui/Accordion";
import { GlowCard } from "@/components/ui/GlowCard";
import { PageHero } from "@/components/ui/PageHero";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { faqs } from "@/lib/faqs";
import { pageMetadata } from "@/lib/seo";
import { programHref, programs } from "@/lib/services";
import { licenseLine, site } from "@/lib/site";

export const metadata = pageMetadata({
  path: "/contact",
  title: "Contact Us & Request Info",
  description: `Office ${site.phone.display} · Fax ${site.fax.display} · ${site.email}. Request more information and a member of our team will contact you.`,
});

const cards = [
  { icon: Phone, label: "Office", value: site.phone.display, href: site.phone.href, accent: true },
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: Printer, label: "Fax", value: site.fax.display },
  { icon: MapPin, label: "Address", value: `${site.address.line1}\n${site.address.line2}` },
];

const quickAnswers = faqs.filter((f) =>
  ["Do you accept insurance?", "What areas do you serve?", "Are you licensed?", "Do you offer Live Scan fingerprinting?"].includes(f.q),
);

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="We're here, *with open arms.*"
        text="Proudly serving counties in Central Florida since 2017. **Open Arms & Heart Services is only a call away!**"
        crumbs={[{ label: "Contact" }]}
        images={["/images/aide-smiling-patient.jpg", "/images/friends-talking.jpg"]}
      />

      <section className="relative pb-24 sm:pb-32">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.15fr]">
          <div className="space-y-4">
            <Stagger className="grid gap-4" stagger={0.08}>
              {cards.map((c) => {
                const body = (
                  <div className="relative z-10 flex items-center gap-5">
                    <span
                      className={`grid size-14 shrink-0 place-items-center rounded-2xl transition duration-500 group-hover:-rotate-6 ${
                        c.accent ? "bg-linear-to-br from-iris-600 to-blush-500 text-white" : "bg-iris-50 text-iris-600"
                      }`}
                    >
                      <c.icon className="size-6" />
                    </span>
                    <span>
                      <span className="block text-xs font-bold tracking-[0.16em] text-blush-700 uppercase">{c.label}</span>
                      <span
                        className={`mt-0.5 block whitespace-pre-line text-iris-950 ${
                          c.accent ? "font-display text-2xl whitespace-nowrap sm:text-3xl" : "text-lg font-medium [overflow-wrap:anywhere]"
                        }`}
                      >
                        {c.value}
                      </span>
                    </span>
                  </div>
                );
                return (
                  <StaggerItem key={c.label}>
                    {c.href ? (
                      <GlowCard as="a" href={c.href} className="group block rounded-[1.75rem] border border-iris-100 bg-white p-6">
                        {body}
                      </GlowCard>
                    ) : (
                      <GlowCard className="group rounded-[1.75rem] border border-iris-100 bg-white p-6">{body}</GlowCard>
                    )}
                  </StaggerItem>
                );
              })}
              <StaggerItem>
                <GlowCard className="group rounded-[1.75rem] border border-iris-100 bg-white p-6">
                  <div className="relative z-10 flex gap-5">
                    <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-iris-50 text-iris-600">
                      <BadgeCheck className="size-6" />
                    </span>
                    <div className="flex-1">
                      <span className="block text-xs font-bold tracking-[0.16em] text-blush-700 uppercase">Licensed</span>
                      <ul className="mt-2 space-y-1">
                        {site.credentials.map((c) => (
                          <li key={c} className="font-semibold text-iris-950">
                            {c}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-1.5 text-sm text-ink-soft">{licenseLine}</p>
                    </div>
                  </div>
                </GlowCard>
              </StaggerItem>
            </Stagger>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <InquiryForm />
          </div>
        </div>
      </section>

      {/* Types of Care Offered — as listed on the original Contact page */}
      <section className="relative bg-iris-50/70 py-20 sm:py-24">
        <div className="container-x">
          <SectionIntro align="center" eyebrow="Types of care offered" title="How we can *help your family.*" />
          <Stagger className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
            {programs.map((p) => (
              <StaggerItem key={p.slug}>
                <GlowCard
                  as="a"
                  href={programHref(p)}
                  tilt
                  className="group flex h-full items-center gap-4 rounded-[1.6rem] border border-iris-100 bg-white p-5"
                >
                  <span className="relative z-10 grid size-12 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-iris-600 to-blush-500 text-white">
                    <p.icon className="size-5" />
                  </span>
                  <span className="relative z-10 flex-1 font-display text-lg leading-snug text-iris-950">{p.name}</span>
                  <ArrowUpRight className="relative z-10 size-4 shrink-0 text-iris-300 transition group-hover:text-iris-700" />
                </GlowCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Quick answers + counties */}
      <section className="relative py-20 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionIntro eyebrow="Quick answers" title="Before you *call.*" />
            <Reveal delay={0.15} className="mt-8 rounded-[1.75rem] border border-iris-100 bg-white p-6">
              <h3 className="text-xl font-medium">Proudly serving counties in Central Florida</h3>
              {site.areas.map((a) => (
                <div key={a.program} className="mt-4">
                  <p className="text-sm font-semibold text-iris-900">{a.label}</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {a.counties.map((c) => (
                      <li key={c} className="rounded-full bg-iris-50 px-3 py-1.5 text-sm text-iris-800">
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Accordion items={quickAnswers} />
          </Reveal>
        </div>
      </section>

      <ResourcesSection />
    </>
  );
}
