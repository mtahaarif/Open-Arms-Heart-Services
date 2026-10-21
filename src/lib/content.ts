import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  Baby,
  BadgeCheck,
  ClipboardList,
  DoorOpen,
  FileText,
  HandHeart,
  Heart,
  HeartPulse,
  HouseHeart,
  Medal,
  MessagesSquare,
  PhoneCall,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { ProgramSlug } from "./services";
import { allCounties, site } from "./site";

/* ───────────────────────── How care begins ───────────────────────── */

export const steps: {
  title: string;
  text: string;
  details: string[];
  icon: LucideIcon;
  image: string;
}[] = [
  {
    title: "Reach out",
    text: "Call our office or request more information online. Our staff will reach out to discuss how we can help your family.",
    details: ["Call our office", "Request info online", "Referrals welcome"],
    icon: PhoneCall,
    image: "/images/friends-talking.jpg",
  },
  {
    title: "We talk through eligibility",
    text: "Services depend on eligibility, authorization, and agency capacity. We coordinate with families, social workers, case managers, Waiver Support Coordinators, and VA Community Care as needed.",
    details: ["Eligibility & authorization", "Insurance verification", "Referral coordination"],
    icon: ClipboardList,
    image: "/images/social-work.jpg",
  },
  {
    title: "A person-centered plan",
    text: "Together we build support around each person's goals and support plan — designed to promote independence, safety, and overall well-being.",
    details: ["Built around your goals", "Independence & safety", "Family involvement"],
    icon: FileText,
    image: "/images/breakfast-family.jpg",
  },
  {
    title: "Care from the heart begins",
    text: "Trained, Level 2 background-screened caregivers provide dedicated, family-oriented care — treating every person with the attention and dignity of family.",
    details: ["Level 2 screened caregivers", "Role-appropriate training", "Family-oriented care"],
    icon: HandHeart,
    image: "/images/celebration.jpg",
  },
];

/* ───────────────────────── Who we care for ───────────────────────── */

export const audiences: { title: string; text: string; image: string; alt: string; icon: LucideIcon }[] = [
  {
    title: "Seniors & aging loved ones",
    text: "Personal care, homemaking, and companionship so home stays home.",
    image: "/images/senior-portrait.jpg",
    alt: "Smiling older woman with short grey hair",
    icon: HandHeart,
  },
  {
    title: "Veterans & their families",
    text: "Home care and respite through VA Community Care referrals.",
    image: "/images/veteran.jpg",
    alt: "Older veteran wearing an Army cap",
    icon: Medal,
  },
  {
    title: "People with developmental disabilities",
    text: "APD supports that build skills, independence, and community inclusion.",
    image: "/images/personal-supports.jpg",
    alt: "Caregiver talking with a young man who uses a wheelchair",
    icon: Accessibility,
  },
  {
    title: "Children & foster families",
    text: "Pediatric personal care, foster care respite, and family support.",
    image: "/images/child-smiling.jpg",
    alt: "Smiling young boy looking at the camera",
    icon: Baby,
  },
  {
    title: "Family caregivers",
    text: "Respite and relief for the people who give so much of themselves.",
    image: "/images/family-baking.jpg",
    alt: "Grandmother and granddaughter baking together in a kitchen",
    icon: Heart,
  },
];

/* ───────────────────────── Brand promises ───────────────────────── */

export const promises: { word: string; title: string; text: string; icon: LucideIcon }[] = [
  {
    word: "arms",
    title: "Open arms",
    text: "Children, adults, seniors, veterans, and people with disabilities — everyone is welcomed as family.",
    icon: HandHeart,
  },
  {
    word: "heart",
    title: "Open heart",
    text: "Dedicated, family-oriented care that comes from the heart, with compassion and respect in every visit.",
    icon: HeartPulse,
  },
  {
    word: "lines",
    title: "Open lines",
    text: "We work hand in hand with families, case managers, and Waiver Support Coordinators.",
    icon: MessagesSquare,
  },
  {
    word: "door",
    title: "Open door",
    text: "Open Arms & Heart Services is only a call away — questions are always welcome.",
    icon: DoorOpen,
  },
];

/* ───────────────────────── Care finder ───────────────────────── */

export type Need = { id: string; label: string; programs: ProgramSlug[] };

export const needs: Need[] = [
  { id: "bathing", label: "Bathing, dressing, grooming or hygiene", programs: ["home-care"] },
  { id: "mobility", label: "Mobility and transfers at home", programs: ["home-care"] },
  { id: "chores", label: "Light housekeeping & meal preparation", programs: ["home-care"] },
  { id: "company", label: "Companionship & socialization", programs: ["home-care"] },
  { id: "respite", label: "A break for the family caregiver", programs: ["home-care", "apd"] },
  { id: "idd", label: "Support for a loved one with a developmental disability", programs: ["apd"] },
  { id: "skills", label: "Life skills, supported living or supported employment", programs: ["apd"] },
  { id: "group-home", label: "A group home (residential habilitation)", programs: ["apd"] },
  { id: "vulnerable", label: "Help for a vulnerable adult (DCF referral)", programs: ["dcf"] },
  { id: "foster", label: "Support for a foster family or child with special needs", programs: ["cbc"] },
  { id: "veteran", label: "Home care or respite for a veteran", programs: ["va"] },
  { id: "clinical", label: "Nursing or therapy after a hospital stay", programs: ["home-health"] },
  { id: "fingerprint", label: "Live Scan fingerprinting / background screening", programs: ["live-scan"] },
];

/* ───────────────────────── Insurance ───────────────────────── */

/** "Insurances we accept", as published by the agency. */
export const insurances = [
  "Sunshine Health",
  "Aetna",
  "Florida Blue",
  "Humana",
  "Children's Medical Services",
  "Molina",
  "Integrated Simply",
  "Optum (VA)",
  "UnitedHealthcare",
  "Florida Community Care",
];

export const fundingNotes: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: "APD Medicaid Waiver",
    text: "As an APD Central Region provider, we work with Waiver Support Coordinators on each person's support plan.",
    icon: Accessibility,
  },
  {
    title: "VA Community Care",
    text: "Veteran services are subject to applicable VA Community Care referral and authorization requirements.",
    icon: Medal,
  },
  {
    title: "Coverage questions?",
    text: "Services depend on eligibility, authorization, and agency capacity. Call our office and we'll help you check.",
    icon: ShieldCheck,
  },
];

/* ───────────────────────── Getting started checklist ───────────────────────── */

export const checklist = [
  "Insurance or Medicaid card",
  "Waiver Support Coordinator's contact (APD services)",
  "VA Community Care referral or authorization (veterans)",
  "Case manager or social worker's contact (DCF / CBC referrals)",
  "Your loved one's daily routine and preferences",
  "Photo ID (for Live Scan fingerprinting appointments)",
];

/* ───────────────────────── A day of home care ───────────────────────── */

export const dayTimeline = [
  { time: "8:00 AM", title: "A gentle start", text: "Help with bathing, dressing, grooming, and hygiene — at a calm, unhurried pace.", service: "Personal Care" },
  { time: "10:00 AM", title: "Moving safely", text: "A steady hand for transfers and getting around the home, so the day can begin with confidence.", service: "Mobility & Transfers" },
  { time: "12:00 PM", title: "Lunch together", text: "A fresh meal prepared at home, and a tidy kitchen afterwards.", service: "Homemaker Services" },
  { time: "2:00 PM", title: "Company & conversation", text: "Games, stories, music, or a favourite show — real companionship and socialization.", service: "Companionship" },
  { time: "5:00 PM", title: "Evening routine", text: "Help with the activities of daily living that close out the day comfortably.", service: "Daily Living Assistance" },
  { time: "Evening", title: "Family gets a break", text: "When family caregivers need rest, respite care keeps the evening calm and covered.", service: "Respite Care" },
];

/* ───────────────────────── Careers ───────────────────────── */

/** Positions offered on the agency's employment application. */
export const roles = [
  {
    title: "Home Health Aide",
    type: "Non-skilled · In-home care",
    text: "Provide personal care, homemaker assistance, companionship, and respite to children, adults, seniors, and people with disabilities in their homes.",
    needs: ["CNA, HHA, or CPR certification", "High school diploma or GED", "Florida Level 2 background screening"],
  },
  {
    title: "Group Home Staff",
    type: "APD · Residential Habilitation",
    text: "Support adults with developmental disabilities in our group home — building daily living skills, independence, and community inclusion.",
    needs: ["Caregiving experience preferred", "High school diploma or GED", "Florida Level 2 background screening"],
  },
];

/** What the online employment application asks for. */
export const applicationChecklist = [
  "Contact details & position",
  "Caregiving experience",
  "Certifications (CNA, HHA, CPR)",
  "Resume & certificate uploads",
  "Education history",
  "Employment history",
  "Three personal references",
  "Emergency contact & e-signature",
];

export const requirements = [
  "CNA, HHA or CPR certification",
  "High school diploma or GED",
  "Florida Level 2 background screening",
  "Drug & alcohol screening",
  "Three personal references",
  "90-day introductory period",
  "A genuinely kind heart",
];

/* ───────────────────────── Home page Q&As (from the agency's home page) ───────────────────────── */

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
    chips: ["Non-skilled home care", "APD services", "Skilled home health", "DCF & CBC referrals", "Veterans (VA)", "Live Scan"],
    link: { href: "/services", label: "See all types of care" },
  },
  {
    q: "Are care providers background checked?",
    a: "Your safety, trust, and peace of mind are our highest priorities. All direct care personnel undergo comprehensive Level 2 background screening in accordance with Florida state requirements. Our compassionate caregivers are committed to providing safe, dependable, and high-quality care to children, seniors, and individuals with disabilities — because your family deserves care you can trust.",
    icon: ShieldCheck,
    image: "/images/aide-smiling-patient.jpg",
    imageAlt: "Smiling caregiver sitting close to an older woman",
  },
  {
    q: "Do you accept insurance?",
    a: "Yes. We accept a range of health plans — call our office to confirm coverage for your plan and the services you need.",
    icon: BadgeCheck,
    image: "/images/breakfast-family.jpg",
    imageAlt: "Grandmother and granddaughter sharing breakfast at home",
    chips: insurances,
  },
  {
    q: "Are you licensed?",
    a: `Yes. Open Arms & Heart Services is an APD Central Region provider and a licensed Florida Home Health Agency that has served Central Florida since ${site.founded}.`,
    icon: Users,
    image: "/images/celebration.jpg",
    imageAlt: "Caregiver celebrating with a group of older adults",
    chips: site.licenses.map((l) => `Lic# ${l}`),
  },
];

/* ───────────────────────── Community resources (from the agency's footer) ───────────────────────── */

export const resources = [
  {
    name: "Florida 211",
    href: "https://fl211.org/",
    text: "Food, housing, utility assistance, transportation, healthcare, childcare, and mental health support.",
  },
  {
    name: "Florida Dept. of Elder Affairs",
    href: "https://elderaffairs.org/",
    text: "Programs and services for older Floridians and their caregivers.",
  },
  {
    name: "Florida Agency for Persons with Disabilities",
    href: "https://apd.myflorida.com/resources.htm",
    text: "Resources for people with developmental disabilities and their families.",
  },
  {
    name: "FloridaHealthFinder",
    href: "https://quality.healthfinder.fl.gov/",
    text: "Compare and look up licensed health care providers in Florida.",
  },
  {
    name: "Florida SHINE",
    href: "https://www.floridashine.org/",
    text: "Free, unbiased health insurance counseling for Medicare beneficiaries.",
  },
];

/** Headline numbers used across the site. */
export const stats = {
  counties: allCounties.length,
  insurances: insurances.length,
};
