import { site } from "./site";

/*
 * Site copy. Sources, newest first: the owner's mock-up (docs/client-mockup-content.md)
 * and the agency's original website (docs/original-site-content.md).
 * Do not add claims that are in neither record.
 */

/* ───────────────────────── About ───────────────────────── */

export const mission =
  "To work in partnership with our consumers to help them achieve their goals of independence, productivity, and meaningful integration within their communities. We are committed to fulfilling the needs of our consumers with excellence and care.";

/** The four paragraphs of the original About Us page. */
export const story = [
  `${site.owner.name} is the proud owner of Open Arms & Heart Services Inc., where her passion for delivering **high-quality, person-centered care** is rooted in deeply personal experiences since ${site.since}.`,
  "Shantana was inspired by her grandmother, who devoted herself to caring for both her mother, who was living with Alzheimer’s disease, and her son with developmental disabilities. Witnessing her grandmother’s selfless dedication and compassion left a lasting impression and inspired Shantana to pursue a life of service to others.",
  "Although her grandmother has since passed, the patience, love, and exceptional caregiving she demonstrated continue to guide Shantana’s work every day. She carries on that legacy not only through her professional mission but also by continuing to provide care and support to her own uncle.",
  "Through Open Arms & Heart Services Inc., Shantana and her staff are committed to ensuring that every individual and family served receives compassionate, respectful, and personalized care. The organization strives to treat every person with the same attention and dignity as family, supporting their independence, well-being, and quality of life.",
];

/** "A personal approach" — the mock-up's home-page about section. */
export const approach = [
  "Finding support for someone you love is personal. At Open Arms & Heart Services Inc., we take time to understand each individual’s routines, preferences and goals.",
  `**Since ${site.since}**, we have helped Central Florida families navigate home and community-based care with compassion, dignity and a commitment to independence.`,
];

/* ───────────────────────── Who we serve ───────────────────────── */

export const audiences: { title: string; text: string; image: string; alt: string; href: string }[] = [
  {
    title: "Children & families",
    text: "Support for children with special needs or developmental disabilities, foster families and the caregivers beside them.",
    image: "/images/family-game-night.jpg",
    alt: "A family playing a board game together in their living room",
    href: "/services#cbc",
  },
  {
    title: "Adults with disabilities",
    text: "Person-centered supports designed to strengthen daily living skills, increase independence, and encourage community inclusion.",
    image: "/images/adult-wheelchair-community.jpg",
    alt: "A smiling woman who uses a wheelchair chatting with a support worker at a community centre",
    href: "/services#apd",
  },
  {
    title: "Seniors",
    text: "Everyday help at home — personal care, homemaking, companionship and respite for family caregivers.",
    image: "/images/senior-conversation.jpg",
    alt: "A smiling older man talking with a caregiver on his sofa",
    href: "/services#home-care",
  },
  {
    title: "Veterans",
    text: "Respectful, individualized home and community-based assistance for eligible veterans and their families.",
    image: "/images/service-veterans.jpg",
    alt: "A smiling older veteran wearing a Vietnam veteran cap",
    href: "/services#va",
  },
];

/* ───────────────────────── Coverage ───────────────────────── */

export const insurances = [
  "Sunshine Health",
  "Aetna",
  "Florida Blue",
  "Humana",
  "Children’s Medical Services",
  "Molina",
  "Simply Healthcare",
  "OPTUM (VA)",
  "UnitedHealthcare",
  "Florida Community Care",
];

export const insuranceNote =
  "Participation and coverage vary by plan, product and service. Call us to confirm current acceptance and required authorizations before arranging care.";

export const screening =
  "All direct care personnel undergo **Level 2 background screening** in accordance with Florida requirements. We are a licensed Florida home health agency and an APD Central Region provider.";

/* ───────────────────────── Next steps ───────────────────────── */

export const steps = [
  { title: "Connect with us", text: "Share the kind of support you or your loved one is looking for." },
  { title: "Explore your options", text: "Discuss service availability, coverage, referrals and required authorizations." },
  { title: "Plan the next step", text: "Work with our team to identify appropriate services and coordinate the process." },
];

/* ───────────────────────── Careers ───────────────────────── */

export const careersIntro = [
  "**Make a difference in someone’s day—and in your own.** Bring your compassion, dedication and skills to Open Arms & Heart Services Inc.",
  "Help children, adults, seniors and people with disabilities feel supported, respected and connected.",
];

/** Positions on the agency's online employment application. */
export const roles = ["Home Health Aide", "Group Home Staff"];

export const requirements = [
  "High School Diploma or GED",
  "CNA, HHA or CPR certification",
  "Background investigation",
  "Drug & alcohol screening",
  "Three personal references",
  "90-day probationary period",
];

export const applicationChecklist = [
  "Position applying for",
  "Caregiving experience",
  "Certifications (CNA, HHA, CPR)",
  "Resume & certificate uploads",
  "Education and employment history",
  "Three personal references",
  "Emergency contact & e-signature",
];

/* ───────────────────────── Community resources ───────────────────────── */

export const resources: { name: string; href: string; text?: string }[] = [
  {
    name: "Florida 211",
    href: "https://fl211.org/",
    text: "Food, housing utility assistance, transportation, healthcare, childcare, mental health support",
  },
  { name: "Agency for Persons with Disabilities", href: "https://apd.myflorida.com/" },
  { name: "Florida Department of Elder Affairs", href: "https://elderaffairs.org/" },
  { name: "FloridaHealthFinder", href: "https://quality.healthfinder.fl.gov/" },
  {
    name: "Florida SHINE",
    href: "https://www.floridashine.org/",
    text: "Free, unbiased health insurance counseling for Medicare beneficiaries",
  },
];
