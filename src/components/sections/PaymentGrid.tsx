import { payment } from "@/lib/content";
import { GlowCard } from "../ui/GlowCard";
import { SectionIntro } from "../ui/SectionIntro";
import { Stagger, StaggerItem } from "../ui/motion";

export function PaymentGrid({ eyebrow = "Paying for care" }: { eyebrow?: string }) {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionIntro
          eyebrow={eyebrow}
          title="Ways to pay, *made simpler.*"
          text="Figuring out coverage can feel like a maze. We'll help you understand your options and verify benefits before care begins."
        />
        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5" stagger={0.08}>
          {payment.map((p, i) => (
            <StaggerItem key={p.title} className={i < 2 ? "lg:col-span-1" : ""}>
              <GlowCard
                tilt
                className="group h-full rounded-[1.75rem] border border-iris-100 bg-linear-to-b from-white to-iris-50/60 p-6"
              >
                <div className="relative z-10">
                  <span className="grid size-12 place-items-center rounded-2xl bg-white text-iris-600 shadow-sm ring-1 ring-iris-100 transition duration-500 group-hover:-rotate-6 group-hover:bg-iris-700 group-hover:text-white">
                    <p.icon className="size-5" />
                  </span>
                  <h3 className="mt-5 font-display text-xl">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.text}</p>
                </div>
              </GlowCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
