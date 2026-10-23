import { Photo } from "@/components/ui/Photo";
import Link from "next/link";
import { ArrowRight, MessagesSquare } from "lucide-react";
import { trustQAs } from "@/lib/content";
import { faqs } from "@/lib/faqs";
import { site } from "@/lib/site";
import { Accordion } from "../ui/Accordion";
import { SectionIntro } from "../ui/SectionIntro";
import { Reveal } from "../ui/motion";

export function FaqPreview({ count = 5 }: { count?: number }) {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div className="lg:sticky lg:top-32">
            <SectionIntro
              eyebrow="Questions, answered"
              title="Good questions *deserve clear answers.*"
              text="Don't see your question? Open Arms & Heart Services is only a call away!"
            />
            <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-3">
              <Link href="/faq" className="btn-primary">
                All FAQs <ArrowRight className="size-4" />
              </Link>
              <a href={site.phone.href} className="btn-ghost">
                <MessagesSquare className="size-4 text-blush-700" /> Ask us directly
              </a>
            </Reveal>
            <Reveal delay={0.3} className="relative mt-10 hidden h-56 overflow-hidden rounded-[2rem] lg:block">
              <Photo src="/images/friends-talking.jpg" alt="Two older women talking together on a sofa" sizes="480px" className="object-cover" />
              <div className="absolute inset-0 bg-linear-to-tr from-iris-900/40 to-transparent" />
            </Reveal>
          </div>
        </div>
        <Reveal delay={0.1}>
          <Accordion items={faqs.filter((f) => !trustQAs.some((t) => t.q === f.q)).slice(0, count)} />
        </Reveal>
      </div>
    </section>
  );
}
