import { site } from "./site";

export type Faq = { q: string; a: string; category: FaqCategory };
export type FaqCategory = "Getting started" | "Services" | "Paying for care" | "Our caregivers";

export const faqCategories: FaqCategory[] = ["Getting started", "Services", "Paying for care", "Our caregivers"];

export const faqs: Faq[] = [
  {
    category: "Services",
    q: "What's the difference between home health and home care?",
    a: "Home health is skilled, clinical care — nursing, physical, occupational and speech therapy, medical social work and home health aide services — usually ordered by a physician. Home care is non-skilled support with daily life: personal care, companionship, homemaking, respite and transportation. Many families use a combination of both, and we offer each under one roof.",
  },
  {
    category: "Getting started",
    q: "Do I need a doctor's order?",
    a: "For skilled home health services, yes — care follows a plan approved by your physician, and we're happy to coordinate with your doctor's office. Non-skilled home care doesn't require a doctor's order; you can call us directly to get started.",
  },
  {
    category: "Getting started",
    q: "How quickly can care begin?",
    a: "It depends on the type of care and any insurance authorization that's needed. Once we've talked through your needs, we'll give you a realistic start date — and we'll move as quickly as we safely can.",
  },
  {
    category: "Getting started",
    q: "What areas do you serve?",
    a: `We serve families across Central Florida, including communities in ${site.areas.map((a) => a.county).join(", ").replace(/, ([^,]*)$/, " and $1")}. If you don't see your town listed, call us at ${site.phone.display} — we'll let you know if we can help.`,
  },
  {
    category: "Services",
    q: "Do you care for children?",
    a: "Yes. We provide respite care for children and youth, including kids with autism and other intellectual, developmental or physical disabilities, so parents and family caregivers can take a well-earned break.",
  },
  {
    category: "Services",
    q: "Can you drive my loved one to appointments?",
    a: "Yes. Our transportation and errand services cover rides to medical appointments, pharmacy pick-ups, grocery runs and community outings.",
  },
  {
    category: "Services",
    q: "Can the care plan change over time?",
    a: "Absolutely. Needs change — after a recovery, as a condition progresses, or when family schedules shift. We check in regularly and adjust visits, tasks and services to match.",
  },
  {
    category: "Paying for care",
    q: "How do we pay for care?",
    a: "We're an enrolled Florida Medicaid provider and also work with private health insurance, long-term care insurance and private pay. Coverage depends on your plan and the services needed, so we'll help you verify benefits before care begins.",
  },
  {
    category: "Paying for care",
    q: "Do you accept Medicaid waiver programs?",
    a: "If your loved one receives services through a Florida Medicaid waiver, call us to talk through their support plan and which of our services can be included.",
  },
  {
    category: "Paying for care",
    q: "Is there a cost for the first conversation?",
    a: "No. Talking with us about your situation and options is free and there's no obligation.",
  },
  {
    category: "Our caregivers",
    q: "Are your caregivers screened?",
    a: "Yes. Every caregiver completes Florida's Level 2 background screening and the training required for their role before they work with clients. Skilled services are provided by appropriately licensed clinicians.",
  },
  {
    category: "Our caregivers",
    q: "Can we meet or request a particular caregiver?",
    a: "We match caregivers based on skills, schedule and personality, and we welcome your input. If a match doesn't feel right, tell us and we'll make a change.",
  },
  {
    category: "Our caregivers",
    q: "How do I stay updated on my loved one's care?",
    a: "Families are part of the team. We share updates, invite you to care-plan conversations, and you can always call our office with questions.",
  },
];
