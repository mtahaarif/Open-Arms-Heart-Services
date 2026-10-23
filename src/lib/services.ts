import type { LucideIcon } from "lucide-react";
import { Accessibility, Armchair, Baby, FingerprintPattern, HandHelping, HeartHandshake, HouseHeart, Medal, ShieldCheck } from "lucide-react";

/* ───────────────────────── Types of care ─────────────────────────
 * The six types of care on the agency's original website, with verbatim copy
 * (see docs/original-site-content.md). Only spelling typos are corrected.
 */

export type ProgramSlug = "home-care" | "apd" | "dcf" | "cbc" | "va" | "live-scan";

export type Program = {
  slug: ProgramSlug;
  /** Heading as published. */
  name: string;
  /** Short label for navigation and chips. */
  short: string;
  tag: string;
  icon: LucideIcon;
  image: string;
  imageAlt: string;
  /** First sentence of the published description. */
  summary: string;
  /** Full published description. */
  intro: string;
  /** "Services and Support" list, as published. */
  points: string[];
  /** Closing note, as published. */
  note: string;
  /** Exact option label on the agency's "Request More Information" Google Form. */
  formLabel: string;
};

export const programs: Program[] = [
  {
    slug: "home-care",
    name: "Non-Skilled Home Health Services",
    short: "Non-Skilled Home Health",
    tag: "Non-medical support",
    icon: HeartHandshake,
    image: "/images/companion-care.jpg",
    imageAlt: "Caregiver in green scrubs leaning in to chat with an older woman",
    summary:
      "Open Arms & Heart Services, Inc. is a Florida-licensed home health agency offering non-medical support to children, adults, seniors, and people with disabilities.",
    intro:
      "Open Arms & Heart Services, Inc. is a Florida-licensed home health agency offering non-medical support to children, adults, seniors, and people with disabilities. Our caregivers help individuals remain comfortable and supported in their homes.",
    points: [
      "Personal Care, bathing, dressing, grooming, and hygiene assistance",
      "Mobility and transfer assistance",
      "Homemaker services, light housekeeping, and meal preparation",
      "Companionship, socialization, and respite care",
      "Assistance with activities of daily living",
      "Pediatric personal care and support for people with disabilities",
    ],
    note: "Our caregivers complete applicable background screening and role-appropriate training. Service areas: Polk, Highlands, Hardee, Hillsborough, and Manatee Counties.",
    formLabel: "Non-Skilled Home Health Services",
  },
  {
    slug: "apd",
    name: "Agency for Persons with Disabilities (APD)",
    short: "APD Services",
    tag: "APD Central Region",
    icon: Accessibility,
    image: "/images/personal-supports.jpg",
    imageAlt: "Caregiver talking with a smiling young man who uses a wheelchair",
    summary:
      "As an APD provider, Open Arms offers person-centered supports designed to strengthen daily living skills, increase independence, and encourage community inclusion.",
    intro:
      "As an APD provider, Open Arms offers person-centered supports designed to strengthen daily living skills, increase independence, and encourage community inclusion.",
    points: [
      "Personal Supports",
      "Life Skills Development Level 1 (Companion)",
      "Supported Living Coach",
      "Supported Employment",
      "Residential Habilitation (Group Home)",
      "Respite Care",
      "Community integration and daily living skill development",
    ],
    note: "We collaborate with individuals, families, and Waiver Support Coordinators to support each person's goals and support plan. APD Central Region counties: Orange, Brevard, Sumter, Lake, Polk, and Highlands.",
    formLabel: "Agency for Persons with Disabilities (APD)",
  },
  {
    slug: "dcf",
    name: "Vulnerable Adult Support Services / DCF Referrals",
    short: "Vulnerable Adult Support",
    tag: "DCF referrals",
    icon: ShieldCheck,
    image: "/images/social-work.jpg",
    imageAlt: "Caregiver sitting with an older man on a sofa, talking together",
    summary: "Open Arms supports adults who need assistance maintaining dignity, safety, and independence.",
    intro:
      "Open Arms supports adults who need assistance maintaining dignity, safety, and independence. We may coordinate appropriate services with families, social workers, case managers, and community referral partners.",
    points: [
      "Personal care and homemaker assistance",
      "Companion services and social support",
      "Activities of daily living assistance",
      "Caregiver respite",
      "Support for older adults and adults with disabilities",
      "Referrals and coordination for eligible home-based support",
    ],
    note: "Open Arms does not conduct DCF Adult Protective Services investigations or represent itself as the state protective services agency. Services depend on eligibility, authorization, and agency capacity.",
    formLabel: "Vulnerable Adult Support Services/DCF Referrals",
  },
  {
    slug: "cbc",
    name: "Children & Family Support Services (CBC)",
    short: "Children & Family Support",
    tag: "Community-based care",
    icon: Baby,
    image: "/images/therapy-play.jpg",
    imageAlt: "Caregiver playing with a young child at a table of toys",
    summary:
      "Open Arms has experience working with community-based care organizations and foster families to provide supportive, compassionate services.",
    intro:
      "Open Arms has experience working with community-based care organizations and foster families to provide supportive, compassionate services. Current availability depends on active referral and contracting arrangements.",
    points: [
      "Foster care respite experience",
      "Caregiver relief and family support",
      "Support for children with special needs or developmental disabilities",
      "Individualized personal care assistance",
      "Community-based support and supervision",
      "Coordination with case managers and child welfare professionals",
    ],
    note: "We welcome conversations with CBC organizations and community partners about appropriate service opportunities.",
    formLabel: "Children & Family Support Services (CBC)",
  },
  {
    slug: "va",
    name: "Veterans Home Care & Respite Services (VA)",
    short: "Veterans Home Care",
    tag: "VA Community Care",
    icon: Medal,
    image: "/images/veteran.jpg",
    imageAlt: "Older veteran wearing an Army cap",
    summary:
      "Open Arms is proud to support eligible veterans and their families through respectful, individualized home and community-based assistance.",
    intro:
      "Open Arms is proud to support eligible veterans and their families through respectful, individualized home and community-based assistance, subject to applicable VA Community Care referral and authorization requirements.",
    points: [
      "Personal care and homemaker assistance",
      "Companion services and social support",
      "Activities of daily living assistance",
      "Caregiver respite",
      "Support for older adults and adults with disabilities",
      "Referrals and coordination for eligible home-based support",
    ],
    note: "Veterans and family members may contact Open Arms to discuss available services and required referrals or authorizations.",
    formLabel: "Veterans Home Care & Respite Services (VA)",
  },
  {
    slug: "live-scan",
    name: "Live Scan Fingerprinting & Background Screening",
    short: "Live Scan Fingerprinting",
    tag: "Background screening",
    icon: FingerprintPattern,
    image: "/images/live-scan.jpg",
    imageAlt: "Close-up of a fingerprint on a scanner",
    summary:
      "Open Arms offers Live Scan fingerprinting services to assist with applicable Florida background screening and licensing requirements.",
    intro:
      "Open Arms offers Live Scan fingerprinting services to assist with applicable Florida background screening and licensing requirements.",
    points: [
      "Electronic Live Scan fingerprint capture",
      "Florida Level 2 screening submissions, where authorized",
      "Healthcare, childcare, education, and professional licensing fingerprinting requests, where supported",
      "Employer and organizational screening requests, where supported",
    ],
    note: "Contact our office for appointments, fees, identification requirements, and confirmation that we can process your specific agency or ORI submission.",
    formLabel: "Live Scan Fingerprinting & Background Screening",
  },
];

export const programBySlug = (slug: string) => programs.find((p) => p.slug === slug);
export const programHref = (p: Program) => `/services#${p.slug}`;

/**
 * The three highlights on the original home page. Their details are the matching
 * items from the published "Services and Support" lists.
 */
export const highlights = [
  {
    slug: "companion-care",
    name: "Companion Care",
    image: "/images/aide-smiling-patient.jpg",
    href: "/services#home-care",
    tags: ["Companionship, socialization, and respite care", "Life Skills Development Level 1 (Companion)", "Companion services and social support"],
    icon: Armchair,
  },
  {
    slug: "residential",
    name: "Residential",
    image: "/images/residential-habilitation.jpg",
    href: "/services#apd",
    tags: ["Residential Habilitation (Group Home)", "Supported Living Coach", "Community integration and daily living skill development"],
    icon: HouseHeart,
  },
  {
    slug: "personal-support",
    name: "Personal Support",
    image: "/images/personal-care.jpg",
    href: "/services#home-care",
    tags: ["Personal Supports", "Personal Care, bathing, dressing, grooming, and hygiene assistance", "Mobility and transfer assistance"],
    icon: HandHelping,
  },
];
