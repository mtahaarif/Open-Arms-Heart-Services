import { ClipboardCheck, Clock, House, MapPin, Navigation, PhoneCall, Phone, Printer } from "lucide-react";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { MapFacade } from "@/components/sections/MapFacade";
import { Accordion } from "@/components/ui/Accordion";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { faqs } from "@/lib/faqs";
import { GlowCard } from "@/components/ui/GlowCard";
import { PageHero } from "@/components/ui/PageHero";
import { FacebookIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { fullAddress, site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/contact",
  title: "Contact Us in Haines City, FL",
  description: `Call ${site.phone.display} or send a message to request home health or home care from Open Arms & Heart Services in Haines City, Florida.`,
});

const cards = [
  { icon: Phone, label: "Call us", value: site.phone.display, href: site.phone.href, accent: true },
  { icon: Printer, label: "Fax / referrals", value: site.fax.display },
  { icon: MapPin, label: "Visit our office", value: fullAddress, href: site.mapsUrl, external: true },
];

const nextSteps = [
  {
    icon: PhoneCall,
    title: "We talk it through",
    text: "Tell us what's happening and who needs care. We'll explain the difference between skilled home health and non-skilled home care, and answer questions about coverage.",
  },
  {
    icon: House,
    title: "We visit your home",
    text: "A member of our team schedules an in-home visit to understand routines, safety and goals. For skilled care, we coordinate with the physician.",
  },
  {
    icon: ClipboardCheck,
    title: "Care gets started",
    text: "We build a personal care plan, match caregivers or clinicians, and keep your family updated as visits begin and needs change.",
  },
];

const quickAnswers = faqs.filter((f) =>
  ["Do I need a doctor's order?", "How do we pay for care?", "How quickly can care begin?", "Is there a cost for the first conversation?"].includes(f.q),
);

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We're here, *with open arms.*"
        text="Call, send a message or stop by our Haines City office. Whether you have one quick question or you're ready to start **home health or home care**, we'd love to hear from you."
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
                      <span className={`mt-0.5 block text-iris-950 ${c.accent ? "font-display text-2xl whitespace-nowrap sm:text-3xl" : "text-lg font-medium"}`}>
                        {c.value}
                      </span>
                    </span>
                    {c.href && <Navigation className="ml-auto size-5 text-iris-300 transition group-hover:text-iris-700" />}
                  </div>
                );
                return (
                  <StaggerItem key={c.label}>
                    {c.href ? (
                      <GlowCard
                        as="a"
                        href={c.href}
                        target={c.external ? "_blank" : undefined}
                        rel={c.external ? "noreferrer" : undefined}
                        className="group block rounded-[1.75rem] border border-iris-100 bg-white p-6"
                      >
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
                      <Clock className="size-6" />
                    </span>
                    <div className="flex-1">
                      <span className="block text-xs font-bold tracking-[0.16em] text-blush-700 uppercase">Office hours</span>
                      <dl className="mt-2 space-y-1.5">
                        {site.hours.map((h) => (
                          <div key={h.days} className="flex justify-between gap-4 border-b border-dashed border-iris-100 pb-1.5 last:border-0">
                            <dt className="text-ink-soft">{h.days}</dt>
                            <dd className="font-semibold text-iris-950">{h.time}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                </GlowCard>
              </StaggerItem>
            </Stagger>

            <Reveal className="group relative h-72 overflow-hidden rounded-[2rem] ring-1 ring-iris-100">
              <MapFacade />
            </Reveal>

            <Reveal className="flex items-center gap-3 pt-2">
              <span className="text-sm font-semibold text-iris-900">Follow along</span>
              <a href={site.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="grid size-10 place-items-center rounded-full bg-iris-50 text-iris-700 transition hover:-translate-y-0.5 hover:bg-iris-700 hover:text-white">
                <FacebookIcon className="size-4" />
              </a>
              <a href={site.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid size-10 place-items-center rounded-full bg-iris-50 text-iris-700 transition hover:-translate-y-0.5 hover:bg-iris-700 hover:text-white">
                <LinkedInIcon className="size-4" />
              </a>
            </Reveal>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <InquiryForm />
          </div>
        </div>
      </section>

      {/* What happens next */}
      <section className="relative bg-iris-50/70 py-20 sm:py-24">
        <div className="container-x">
          <SectionIntro
            align="center"
            eyebrow="After you reach out"
            title="What happens *when you contact us.*"
            text="No call centre and no pressure — just a caring team in Haines City that answers questions about home health, home care and paying for care."
          />
          <Stagger className="mt-12 grid gap-4 md:grid-cols-3" stagger={0.1}>
            {nextSteps.map((n, i) => (
              <StaggerItem key={n.title}>
                <GlowCard className="h-full rounded-[1.75rem] border border-iris-100 bg-white p-7">
                  <div className="relative z-10">
                    <div className="flex items-center justify-between">
                      <span className="grid size-12 place-items-center rounded-2xl bg-linear-to-br from-iris-600 to-blush-500 text-white">
                        <n.icon className="size-5" />
                      </span>
                      <span className="font-display text-4xl text-iris-200">0{i + 1}</span>
                    </div>
                    <h3 className="mt-5 text-2xl font-medium">{n.title}</h3>
                    <p className="mt-2 text-ink-soft">{n.text}</p>
                  </div>
                </GlowCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Quick answers + areas */}
      <section className="relative py-20 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionIntro
              eyebrow="Before you call"
              title="Quick answers *for families.*"
              text="A few things people often ask before getting in touch with our office."
            />
            <Reveal delay={0.15} className="mt-8 rounded-[1.75rem] border border-iris-100 bg-white p-6">
              <h3 className="text-xl font-medium">Communities we serve</h3>
              <p className="mt-2 text-sm text-ink-soft">
                Our caregivers and clinicians visit homes across <strong>Polk, Lake and Orange counties</strong>, including:
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {site.areas.flatMap((a) => a.towns).map((t) => (
                  <li key={t} className="rounded-full bg-iris-50 px-3 py-1.5 text-sm text-iris-800">
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Accordion items={quickAnswers} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
