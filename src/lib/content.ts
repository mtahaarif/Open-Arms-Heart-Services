import type { LucideIcon } from "lucide-react";
import { Accessibility, Baby, BadgeCheck, Heart, HandHeart, HouseHeart, Medal, ShieldCheck } from "lucide-react";
import type { ProgramSlug } from "./services";
import { site } from "./site";

/*
 * All copy in this file is taken from the agency's original website or the forms it links to
 * (docs/original-site-content.md). Do not add claims that are not in that record.
 */

/* ───────────────────────── Who we care for ───────────────────────── */

export const audiences: { title: string; text: string; image: string; alt: string; icon: LucideIcon }[] = [
  {
    title: "Seniors",
    text: "Caring for a developmentally disabled family member or senior can be extremely challenging, and we are here to help.",
    image: "/images/senior-portrait.jpg",
    alt: "Smiling older woman with short grey hair",
    icon: HandHeart,
  },
  {
    title: "Veterans & their families",
    text: "Respectful, individualized home and community-based assistance.",
    image: "/images/veteran.jpg",
    alt: "Older veteran wearing an Army cap",
    icon: Medal,
  },
  {
    title: "People with disabilities",
    text: "Person-centered supports designed to strengthen daily living skills, increase independence, and encourage community inclusion.",
    image: "/images/personal-supports.jpg",
    alt: "Caregiver talking with a young man who uses a wheelchair",
    icon: Accessibility,
  },
  {
    title: "Children & foster families",
    text: "Support for children with special needs or developmental disabilities.",
    image: "/images/child-smiling.jpg",
    alt: "Smiling young boy looking at the camera",
    icon: Baby,
  },
  {
    title: "Family caregivers",
    text: "Caregiver relief and family support.",
    image: "/images/family-baking.jpg",
    alt: "Grandmother and granddaughter baking together in a kitchen",
    icon: Heart,
  },
];

/* ───────────────────────── Care finder ───────────────────────── */

/** Each need is an item from the published "Services and Support" lists. */
export type Need = { id: string; label: string; programs: ProgramSlug[] };

export const needs: Need[] = [
  { id: "personal-care", label: "Personal care, bathing, dressing, grooming, and hygiene", programs: ["home-care"] },
  { id: "mobility", label: "Mobility and transfer assistance", programs: ["home-care"] },
  { id: "homemaker", label: "Light housekeeping and meal preparation", programs: ["home-care"] },
  { id: "companionship", label: "Companionship and socialization", programs: ["home-care", "dcf", "va"] },
  { id: "respite", label: "Respite care", programs: ["home-care", "apd", "dcf", "va"] },
  { id: "pediatric", label: "Pediatric personal care", programs: ["home-care", "cbc"] },
  { id: "personal-supports", label: "Personal Supports or Life Skills Development", programs: ["apd"] },
  { id: "supported-living", label: "Supported Living Coach or Supported Employment", programs: ["apd"] },
  { id: "group-home", label: "Residential Habilitation (Group Home)", programs: ["apd"] },
  { id: "vulnerable-adult", label: "Support for a vulnerable adult (DCF referral)", programs: ["dcf"] },
  { id: "foster", label: "Foster care respite and family support", programs: ["cbc"] },
  { id: "veteran", label: "Home care or respite for a veteran", programs: ["va"] },
  { id: "fingerprint", label: "Live Scan fingerprinting", programs: ["live-scan"] },
];

/* ───────────────────────── Insurance ───────────────────────── */

/** "Insurances we accept:" — as published. */
export const insurances = [
  "Sunshine Health",
  "Aetna",
  "Florida Blue",
  "Humana",
  "Children Medical Services",
  "Molina",
  "Integrated Simply",
  "OPTUM (VA)",
  "United Healthcare",
  "Florida Community Care",
];

/* ───────────────────────── Careers (from the linked employment application) ───────────────────────── */

export const roles = ["Home Health Aide", "Group Home Staff"];

export const applicationChecklist = [
  "Position applying for",
  "Caregiving experience",
  "Certifications (CNA, HHA, CPR)",
  "Resume & certificate uploads",
  "Education history",
  "Employment history",
  "Three personal references",
  "Emergency contact & signature",
];

export const requirements = [
  "High School Diploma or GED",
  "CNA, HHA or CPR certification",
  "Background investigation",
  "Drug & alcohol screening",
  "Three personal references",
  "90-day probationary period",
];

/* ───────────────────────── Home page Q&As (verbatim) ───────────────────────── */

export const trustQAs: {
  q: string;
  a: string;
  icon: LucideIcon;
  image: string;
  imageAlt: string;
  chips?: string[];
  link?: { href: string; label: string };
}[] = [
  {
    q: "What types of care do you provide?",
    a: "Caring for a developmentally disabled family member or senior can be extremely challenging, and we are here to help. We provide dedicated, family-oriented care that comes from the heart.",
    icon: HouseHeart,
    image: "/images/companion-care.jpg",
    imageAlt: "Caregiver in green scrubs leaning in to chat with an older woman",
    link: { href: "/services", label: "Learn more about the types of care we provide" },
  },
  {
    q: "Are care providers background checked?",
    a: "At Open Arms & Heart Services, Inc., your safety, trust, and peace of mind are our highest priorities. All direct care personnel undergo comprehensive Level 2 background screening in accordance with Florida state requirements. Our compassionate caregivers are committed to providing safe, dependable, and high-quality care to children, seniors, and individuals with disabilities because your family deserves care you can trust.",
    icon: ShieldCheck,
    image: "/images/aide-smiling-patient.jpg",
    imageAlt: "Smiling caregiver sitting close to an older woman",
  },
  {
    q: "Do you accept insurance?",
    a: "Insurances we accept:",
    icon: BadgeCheck,
    image: "/images/breakfast-family.jpg",
    imageAlt: "Grandmother and granddaughter sharing breakfast at home",
    chips: insurances,
  },
  {
    q: "Are you licensed?",
    a: `Yes, Open Arms & Hearts is an APD Central Region provider and a licensed Florida Home Health Agency that has served Central Florida since ${site.since}.`,
    icon: BadgeCheck,
    image: "/images/celebration.jpg",
    imageAlt: "Caregiver celebrating with a group of older adults",
    chips: site.licenses.map((l) => `Lic# ${l}`),
  },
];

/* ───────────────────────── Resources (from the original footer) ───────────────────────── */

export const resources: { name: string; href: string; text?: string }[] = [
  {
    name: "Florida 211",
    href: "https://fl211.org/",
    text: "Food, housing utility assistance, transportation, healthcare, childcare, mental health support",
  },
  // The original site linked this item to the APD page by mistake; this is the department's official site.
  { name: "Florida Dept of Elder Affairs", href: "https://elderaffairs.org/" },
  { name: "Florida Agency for Persons with Disabilities", href: "https://apd.myflorida.com/resources.htm" },
  { name: "FloridaHealthFinder", href: "https://quality.healthfinder.fl.gov/" },
  {
    name: "Florida SHINE",
    href: "https://www.floridashine.org/",
    text: "Free, unbiased health insurance counseling for Medicare beneficiaries",
  },
];
