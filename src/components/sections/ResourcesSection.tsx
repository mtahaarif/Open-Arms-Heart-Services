import { ArrowUpRight, LifeBuoy } from "lucide-react";
import { resources } from "@/lib/content";
import { GlowCard } from "../ui/GlowCard";
import { SectionIntro } from "../ui/SectionIntro";
import { Stagger, StaggerItem } from "../ui/motion";

/** Florida community resources the agency recommends to families. */
export function ResourcesSection() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="container-x">
        <SectionIntro
          eyebrow="Helpful resources"
          title="Support beyond *our front door.*"
          text="Trusted Florida programs for food, housing, healthcare, disability services, elder care, and insurance counseling."
        />
        <Stagger className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5" stagger={0.07}>
          {resources.map((r) => (
            <StaggerItem key={r.name}>
              <GlowCard
                as="a"
                href={r.href}
                target="_blank"
                rel="noreferrer"
                tilt
                className="group flex h-full flex-col rounded-[1.6rem] border border-iris-100 bg-white p-5"
              >
                <div className="relative z-10 flex items-start justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-iris-50 text-iris-600 transition group-hover:bg-iris-700 group-hover:text-white">
                    <LifeBuoy className="size-5" />
                  </span>
                  <ArrowUpRight className="size-4 text-iris-300 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-iris-700" />
                </div>
                <h3 className="relative z-10 mt-4 font-display text-lg leading-snug">{r.name}</h3>
                <p className="relative z-10 mt-1.5 text-sm text-ink-soft">{r.text}</p>
              </GlowCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
