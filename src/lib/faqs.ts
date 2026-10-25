import { comingSoon, programBySlug } from "./services";
import { insuranceNote, insurances, screening } from "./content";
import { licenseLine, site } from "./site";

/*
 * Answers reuse published text from the owner's mock-up and the original website
 * (docs/). Questions frame that text; they add no new claims.
 */

export type FaqCategory = "Getting started" | "Our services" | "Coverage & licensing" | "Our caregivers";
export type Faq = { q: string; a: string; category: FaqCategory };

export const faqCategories: FaqCategory[] = ["Getting started", "Our services", "Coverage & licensing", "Our caregivers"];

const p = (slug: string) => programBySlug(slug)!;

export const faqs: Faq[] = [
  {
    category: "Getting started",
    q: "How do I get started?",
    a: `Connect with us and share the kind of support you or your loved one is looking for. We'll discuss service availability, coverage, referrals and required authorizations, then work with you to identify appropriate services and coordinate the process. Call ${site.phone.display} or complete the Request More Information form.`,
  },
  {
    category: "Getting started",
    q: "What areas do you serve?",
    a: `Home Health Services: ${site.areas[0].counties.join(", ")} Counties. APD services: all of APD’s Central Region. ${site.areaNote}`,
  },
  {
    category: "Our services",
    q: "What types of care do you provide?",
    a: "Caring for a developmentally disabled family member or senior can be extremely challenging, and we are here to help. We offer non-skilled home health services, APD services, vulnerable adult support, children & family support (CBC), veterans home care & respite, and Live Scan fingerprinting.",
  },
  {
    category: "Our services",
    q: "Do you work with Waiver Support Coordinators?",
    a: `${p("apd").intro} ${p("apd").note}`,
  },
  {
    category: "Our services",
    q: "Do you offer a summer program for children?",
    a: `${p("cbc").feature!.text} ${p("cbc").note}`,
  },
  {
    category: "Our services",
    q: "Do you support veterans?",
    a: `${p("va").intro} ${p("va").note}`,
  },
  {
    category: "Our services",
    q: "Do you conduct DCF Adult Protective Services investigations?",
    a: `**No.** ${p("dcf").note}`,
  },
  {
    category: "Our services",
    q: "Do you offer Live Scan fingerprinting?",
    a: `${p("live-scan").intro} ${p("live-scan").note}`,
  },
  {
    category: "Our services",
    q: "Do you offer skilled nursing?",
    a: `**Not yet.** ${comingSoon.items[0].text} We are also planning Prescribed Pediatric Extended Care (PPEC). ${comingSoon.note}`,
  },
  {
    category: "Coverage & licensing",
    q: "Do you accept insurance?",
    a: `Contact us about coverage through ${insurances.slice(0, -1).join(", ")} and ${insurances.at(-1)}. ${insuranceNote}`,
  },
  {
    category: "Coverage & licensing",
    q: "Are you licensed?",
    a: `**Yes.** Open Arms & Heart Services is a licensed Florida home health agency and an APD Central Region provider, serving Central Florida since ${site.since}. ${licenseLine}.`,
  },
  {
    category: "Our caregivers",
    q: "Are care providers background checked?",
    a: `Your safety, trust, and peace of mind are our highest priorities. ${screening}`,
  },
  {
    category: "Our caregivers",
    q: "Are your caregivers trained?",
    a: "Our caregivers complete applicable background screening and role-appropriate training, and are committed to delivering compassionate care that promotes independence, safety, and overall well-being.",
  },
];
