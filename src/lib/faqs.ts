import { insurances } from "./content";
import { programBySlug } from "./services";
import { site } from "./site";

/*
 * Every answer below is verbatim text from the agency's original website
 * (docs/original-site-content.md). Questions frame that text; they add no new claims.
 */

export type Faq = { q: string; a: string; category: FaqCategory };
export type FaqCategory = "Getting started" | "Types of care" | "Insurance & licensing" | "Our caregivers";

export const faqCategories: FaqCategory[] = ["Getting started", "Types of care", "Insurance & licensing", "Our caregivers"];

const p = (slug: string) => programBySlug(slug)!;

export const faqs: Faq[] = [
  {
    category: "Types of care",
    q: "What types of care do you provide?",
    a: "Caring for a developmentally disabled family member or senior can be extremely challenging, and we are here to help. We provide dedicated, family-oriented care that comes from the heart.",
  },
  {
    category: "Our caregivers",
    q: "Are care providers background checked?",
    a: "At Open Arms & Heart Services, Inc., your safety, trust, and peace of mind are our highest priorities. All direct care personnel undergo comprehensive Level 2 background screening in accordance with Florida state requirements. Our compassionate caregivers are committed to providing safe, dependable, and high-quality care to children, seniors, and individuals with disabilities because your family deserves care you can trust.",
  },
  {
    category: "Insurance & licensing",
    q: "Do you accept insurance?",
    a: `Insurances we accept: ${insurances.join(", ")}.`,
  },
  {
    category: "Insurance & licensing",
    q: "Are you licensed?",
    a: `Yes, Open Arms & Hearts is an APD Central Region provider and a licensed Florida Home Health Agency that has served Central Florida since ${site.since}. Lic# ${site.licenses.join(", Lic# ")}.`,
  },
  {
    category: "Getting started",
    q: "How can I learn more about your services?",
    a: `If you would like to learn more about our services or discuss how we can support your loved one, please complete the Request More Information form and a member of our team will contact you. Open Arms & Heart Services is only a call away — Office: ${site.phone.display}.`,
  },
  {
    category: "Getting started",
    q: "What areas do you serve?",
    a: `Non-Skilled Home Health Services service areas: ${site.areas[0].counties.join(", ")} Counties. APD Central Region counties: ${site.areas[1].counties.join(", ")}.`,
  },
  {
    category: "Types of care",
    q: "Do you work with Waiver Support Coordinators?",
    a: `${p("apd").intro} ${p("apd").note}`,
  },
  {
    category: "Types of care",
    q: "Do you support veterans?",
    a: `${p("va").intro} ${p("va").note}`,
  },
  {
    category: "Types of care",
    q: "Do you work with foster families and CBC organizations?",
    a: `${p("cbc").intro} ${p("cbc").note}`,
  },
  {
    category: "Types of care",
    q: "Do you conduct DCF Adult Protective Services investigations?",
    a: p("dcf").note,
  },
  {
    category: "Types of care",
    q: "Do you offer Live Scan fingerprinting?",
    a: `${p("live-scan").intro} ${p("live-scan").note}`,
  },
  {
    category: "Our caregivers",
    q: "Are your caregivers trained?",
    a: "Our trained caregivers are committed to delivering compassionate care that promotes independence, safety, and overall well-being. Our caregivers complete applicable background screening and role-appropriate training.",
  },
];
