import type { LucideIcon } from "lucide-react";
import { Accessibility, Baby, BadgeCheck, HandHeart, Heart, HouseHeart, Medal, ShieldCheck } from "lucide-react";
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
  `**Since ${site.since}**, we have helped Central Region families navigate home and community-based care with compassion, dignity and a commitment to independence.`,
];

/* ───────────────────────── Who we serve ───────────────────────── */

export const audiences: { title: string; text: string; image: string; alt: string; href: string; icon: LucideIcon }[] = [
  // Same cards, order, photos and copy as the home "Who we care for" bento of the earlier design (git 1732445).
  {
    title: "Seniors",
    text: "Caring for a developmentally disabled family member or senior can be extremely challenging, and we are here to help.",
    image: "/images/senior-portrait.webp",
    alt: "A smiling older woman with short grey hair",
    href: "/services/home-care",
    icon: HandHeart,
  },
  {
    title: "Veterans & their families",
    text: "Respectful, individualized home and community-based assistance.",
    image: "/images/veteran.webp",
    alt: "An older veteran wearing an Army cap",
    href: "/services/va",
    icon: Medal,
  },
  {
    title: "People with disabilities",
    text: "Person-centered supports designed to strengthen daily living skills, increase independence, and encourage community inclusion.",
    image: "/images/personal-supports.webp",
    alt: "A caregiver talking with a young man who uses a wheelchair",
    href: "/services/apd",
    icon: Accessibility,
  },
  {
    title: "Children & foster families",
    text: "Support for children with special needs or developmental disabilities.",
    image: "/images/child-smiling.webp",
    alt: "A smiling young boy looking at the camera",
    href: "/services/cbc",
    icon: Baby,
  },
  {
    title: "Family caregivers",
    text: "Caregiver relief and family support.",
    image: "/images/family-baking.webp",
    alt: "A grandmother and her granddaughter baking together in the kitchen",
    href: "/services/home-care",
    icon: Heart,
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

/* ───────────────────────── Home page Q&As ─────────────────────────
 * The "Questions & answers" stacking cards, copied from the earlier design (git 1732445) with
 * the original website's wording. The insurance chips use `insurances` above (the owner's
 * corrected plan names take precedence over the original site's spelling).
 */

export const trustQAs: {
  q: string;
  a: string;
  icon: LucideIcon;
  image: string;
  imageAlt: string;
  /** Static Tailwind object-position class for the card's tall photo crop. */
  imagePosition?: string;
  chips?: string[];
  link?: { href: string; label: string };
}[] = [
  {
    q: "What types of care do you provide?",
    a: "Caring for a developmentally disabled family member or senior can be extremely challenging, and we are here to help. We provide dedicated, family-oriented care that comes from the heart.",
    icon: HouseHeart,
    image: "/images/activities-coloring.webp",
    imageAlt: "A caregiver leaning in to help an older woman with a colouring activity",
    imagePosition: "object-[55%_center]",
    link: { href: "/#services", label: "Learn more about the types of care we provide" },
  },
  {
    q: "Are care providers background checked?",
    a: "At Open Arms & Heart Services Inc., your safety, trust, and peace of mind are our highest priorities. All direct care personnel undergo comprehensive Level 2 background screening in accordance with Florida state requirements. Our compassionate caregivers are committed to providing safe, dependable, and high-quality care to children, seniors, and individuals with disabilities because your family deserves care you can trust.",
    icon: ShieldCheck,
    image: "/images/caregiver-portrait.webp",
    imageAlt: "A smiling caregiver with a stethoscope",
    imagePosition: "object-[30%_center]",
  },
  {
    q: "Do you accept insurance?",
    a: "Insurances we accept:",
    icon: BadgeCheck,
    image: "/images/nurse-blood-pressure.webp",
    imageAlt: "A nurse checking a smiling woman's blood pressure",
    chips: insurances,
  },
  {
    q: "Are you licensed?",
    a: `Yes, Open Arms & Heart Services Inc. is an APD Central Region provider and a licensed Florida Home Health Agency that has served the Central Region since ${site.since}.`,
    icon: BadgeCheck,
    image: "/images/nurses-team.webp",
    imageAlt: "Two smiling healthcare professionals in scrubs and white coats",
    imagePosition: "object-top",
    chips: site.licenses.map((l) => `${l.short} ${l.number}`),
  },
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
