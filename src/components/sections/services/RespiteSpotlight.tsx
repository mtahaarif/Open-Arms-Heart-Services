"use client";

import { Photo } from "@/components/ui/Photo";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Baby, Heart, Puzzle, Users } from "lucide-react";
import { useRef } from "react";
import { SectionIntro } from "../../ui/SectionIntro";
import { Reveal, Stagger, StaggerItem } from "../../ui/motion";
import { CareLink } from "@/components/forms/CareLink";

const points = [
  { icon: Baby, title: "Children & youth", text: "Pediatric personal care and foster care respite for children with special needs." },
  { icon: Puzzle, title: "Developmental disabilities", text: "APD respite and personal supports for people with developmental disabilities." },
  { icon: Users, title: "Adults & seniors", text: "Relief for families caring for an aging loved one — and for veterans' families." },
  { icon: Heart, title: "You, the caregiver", text: "Time to rest, work, run errands or simply breathe." },
];

/** Overlapping parallax photo stack + glass benefit cards. */
export function RespiteSpotlight() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 60]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-6, 4]);

  return (
    <section ref={ref} className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        <div className="relative h-[520px]">
          <motion.div style={{ y: y1 }} className="absolute top-0 left-0 h-[78%] w-[70%] overflow-hidden rounded-[2.5rem] shadow-2xl">
            <Photo src="/images/respite-child.jpg" alt="Caregiver sitting with a young child on a sofa" sizes="(min-width: 1024px) 420px, 70vw" className="object-cover" />
          </motion.div>
          <motion.div
            style={{ y: y2, rotate }}
            className="absolute right-0 bottom-0 h-[55%] w-[55%] overflow-hidden rounded-[2.5rem] border-8 border-paper shadow-2xl"
          >
            <Photo src="/images/pediatric-walker.jpg" alt="Clinician supporting a young girl using a walker" sizes="(min-width: 1024px) 330px, 55vw" className="object-cover" />
          </motion.div>
          <Reveal delay={0.3} className="glass absolute bottom-10 left-4 max-w-[15rem] rounded-2xl p-4">
            <p className="font-display text-lg text-iris-950">Family-oriented care</p>
            <p className="mt-1 text-xs text-ink-soft">has been at our heart since day one.</p>
          </Reveal>
        </div>

        <div>
          <SectionIntro
            eyebrow="Respite care spotlight"
            title="Caregivers need care, *too.*"
            text="Caring for someone you love is a full-time job. Our respite caregivers step in so you can step back — for an afternoon, a weekend or on a regular schedule."
          />
          <Stagger className="mt-10 grid gap-3 sm:grid-cols-2" stagger={0.1}>
            {points.map((p) => (
              <StaggerItem key={p.title}>
                <div className="group h-full rounded-[1.5rem] border border-iris-100 bg-white p-5 transition duration-500 hover:-translate-y-1 hover:border-blush-200 hover:shadow-[0_24px_50px_-28px_rgb(234_106_156/0.6)]">
                  <span className="grid size-11 place-items-center rounded-xl bg-blush-50 text-blush-700 transition group-hover:bg-blush-500 group-hover:text-white">
                    <p.icon className="size-5" />
                  </span>
                  <h3 className="mt-4 font-display text-xl">{p.title}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{p.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.2} className="mt-8">
            <CareLink care="home-care" className="btn-primary">
              Ask about respite care <ArrowRight className="size-4" />
            </CareLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
