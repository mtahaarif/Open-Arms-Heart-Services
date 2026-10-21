import { insurances } from "./content";
import { site } from "./site";

export type Faq = { q: string; a: string; category: FaqCategory };
export type FaqCategory = "Getting started" | "Types of care" | "Insurance & licensing" | "Our caregivers";

export const faqCategories: FaqCategory[] = ["Getting started", "Types of care", "Insurance & licensing", "Our caregivers"];

const list = (items: readonly string[]) => items.slice(0, -1).join(", ") + " and " + items[items.length - 1];

export const faqs: Faq[] = [
  {
    category: "Types of care",
    q: "What types of care do you provide?",
    a: "Caring for a developmentally disabled family member or senior can be extremely challenging, and we are here to help. We provide dedicated, family-oriented care that comes from the heart — including non-skilled home health services, Agency for Persons with Disabilities (APD) services, skilled home health, vulnerable adult support (DCF referrals), children and family support (CBC), veterans home care and respite (VA), and Live Scan fingerprinting.",
  },
  {
    category: "Our caregivers",
    q: "Are care providers background checked?",
    a: "Yes. At Open Arms & Heart Services, Inc., your safety, trust, and peace of mind are our highest priorities. All direct care personnel undergo comprehensive Level 2 background screening in accordance with Florida state requirements. Our compassionate caregivers are committed to providing safe, dependable, and high-quality care to children, seniors, and individuals with disabilities — because your family deserves care you can trust.",
  },
  {
    category: "Insurance & licensing",
    q: "Do you accept insurance?",
    a: `Yes. Insurances we accept: ${list(insurances)}. Coverage depends on your plan, eligibility, and authorization — call our office at ${site.phone.display} and we'll help you check.`,
  },
  {
    category: "Insurance & licensing",
    q: "Are you licensed?",
    a: `Yes. Open Arms & Heart Services is an APD Central Region provider and a licensed Florida Home Health Agency that has served Central Florida since ${site.founded}. License numbers: ${site.licenses.join(" and ")}.`,
  },
  {
    category: "Getting started",
    q: "How do I get started?",
    a: `Call our office at ${site.phone.display} or complete the Request More Information form on our website, and a member of our team will contact you to discuss how we can help your family.`,
  },
  {
    category: "Getting started",
    q: "What areas do you serve?",
    a: `Our non-skilled home health services are available in ${list(site.areas[0].counties)} Counties. As an APD Central Region provider, we serve ${list(site.areas[1].counties)} Counties. If you're not sure whether we can help, give us a call.`,
  },
  {
    category: "Getting started",
    q: "How quickly can services begin?",
    a: "Services depend on eligibility, authorization, and agency capacity. Once we understand your needs and any referral or authorization requirements, we'll give you a realistic start date.",
  },
  {
    category: "Types of care",
    q: "Do you work with APD Waiver Support Coordinators?",
    a: "Yes. As an APD provider, we offer Personal Supports, Life Skills Development Level 1 (Companion), Supported Living Coach, Supported Employment, Residential Habilitation (Group Home), and Respite Care. We collaborate with individuals, families, and Waiver Support Coordinators to support each person's goals and support plan.",
  },
  {
    category: "Types of care",
    q: "Do you serve veterans?",
    a: "Yes. Open Arms is proud to support eligible veterans and their families through respectful, individualized home and community-based assistance, subject to applicable VA Community Care referral and authorization requirements. Veterans and family members may contact us to discuss available services and required referrals or authorizations.",
  },
  {
    category: "Types of care",
    q: "Do you care for children?",
    a: "Yes. We provide pediatric personal care and support for children with special needs or developmental disabilities, and we have experience providing foster care respite and family support alongside community-based care (CBC) organizations.",
  },
  {
    category: "Types of care",
    q: "Do you conduct DCF Adult Protective Services investigations?",
    a: "No. Open Arms supports vulnerable adults with home-based services and may coordinate with families, social workers, case managers, and community referral partners, but we do not conduct DCF Adult Protective Services investigations or represent ourselves as the state protective services agency.",
  },
  {
    category: "Types of care",
    q: "Do you offer Live Scan fingerprinting?",
    a: "Yes. We offer electronic Live Scan fingerprinting to assist with applicable Florida background screening and licensing requirements. Contact our office for appointments, fees, identification requirements, and confirmation that we can process your specific agency or ORI submission.",
  },
  {
    category: "Our caregivers",
    q: "How are your caregivers trained?",
    a: "Our caregivers complete applicable background screening and role-appropriate training before working with clients, and our trained caregivers are committed to delivering compassionate care that promotes independence, safety, and overall well-being.",
  },
];
