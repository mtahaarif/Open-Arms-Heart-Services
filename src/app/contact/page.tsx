import type { Metadata } from "next";
import { Clock, MapPin, Navigation, Phone, Printer } from "lucide-react";
import { Suspense } from "react";
import { ContactFormWithParams } from "@/components/forms/ContactFormWithParams";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { GlowCard } from "@/components/ui/GlowCard";
import { PageHero } from "@/components/ui/PageHero";
import { FacebookIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { fullAddress, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Call ${site.phone.display} or send a message to request home health or home care from Open Arms & Heart Services in ${site.address.city}, FL.`,
  alternates: { canonical: "/contact" },
};

const cards = [
  { icon: Phone, label: "Call us", value: site.phone.display, href: site.phone.href, accent: true },
  { icon: Printer, label: "Fax / referrals", value: site.fax.display },
  { icon: MapPin, label: "Visit our office", value: fullAddress, href: site.mapsUrl, external: true },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We're here, *with open arms.*"
        text="Call, send a message or stop by our Haines City office. Whether you have one quick question or you're ready to start care, we'd love to hear from you."
        crumbs={[{ label: "Contact" }]}
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
                      <span className="block text-xs font-bold tracking-[0.16em] text-blush-600 uppercase">{c.label}</span>
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
                      <span className="block text-xs font-bold tracking-[0.16em] text-blush-600 uppercase">Office hours</span>
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
              <iframe
                title={`Map to ${fullAddress}`}
                src={site.mapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="size-full grayscale-[0.7] transition duration-700 group-hover:grayscale-0"
              />
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
            <Suspense fallback={<InquiryForm />}>
              <ContactFormWithParams />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
