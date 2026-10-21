import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  Armchair,
  Baby,
  FingerprintPattern,
  Footprints,
  HandHelping,
  HeartHandshake,
  House,
  HouseHeart,
  Medal,
  MessageCircleHeart,
  ShieldCheck,
  ShowerHead,
  Speech,
  Stethoscope,
  Sun,
} from "lucide-react";

export type PillarSlug = "home-health" | "home-care";

export type Service = {
  slug: string;
  name: string;
  icon: LucideIcon;
  image: string;
  imageAlt: string;
  summary: string;
  points: string[];
  helps: string;
};

export type Pillar = {
  slug: PillarSlug;
  name: string;
  level: "Skilled" | "Non-Skilled";
  href: string;
  headline: string;
  intro: string;
  image: string;
  services: Service[];
};

export const homeHealth: Pillar = {
  slug: "home-health",
  name: "Home Health",
  level: "Skilled",
  href: "/services/home-health",
  headline: "Clinical care, brought home.",
  intro:
    "**Physician-ordered nursing and therapy** delivered by licensed professionals in the place you feel most like yourself — so recovery, rehabilitation and chronic-condition care happen around your life, not a waiting room.",
  image: "/images/skilled-nursing.jpg",
  services: [
    {
      slug: "skilled-nursing",
      name: "Skilled Nursing",
      icon: Stethoscope,
      image: "/images/skilled-nursing.jpg",
      imageAlt: "Nurse checking an older man's blood pressure at his kitchen table",
      summary:
        "Licensed nurses provide hands-on clinical care at home, watching closely for changes and keeping your physician in the loop.",
      points: [
        "Wound care & dressing changes",
        "IV therapy & injections",
        "Medication management & teaching",
        "Chronic disease management",
        "Pain & symptom monitoring",
      ],
      helps:
        "Anyone coming home from a hospital stay or surgery, or living with a condition such as diabetes, heart failure or COPD that needs regular clinical attention.",
    },
    {
      slug: "physical-therapy",
      name: "Physical Therapy",
      icon: Footprints,
      image: "/images/physical-therapy.jpg",
      imageAlt: "Older woman walking outdoors with a rollator, supported by two companions",
      summary:
        "Rebuild strength, balance and confidence on the floors, steps and hallways you actually use every day.",
      points: ["Fall prevention", "Strength & mobility", "Post-surgical rehabilitation", "Gait & balance training"],
      helps:
        "People recovering from joint replacement, a fall, a stroke or a long illness — and anyone who wants to move around home more safely.",
    },
    {
      slug: "occupational-therapy",
      name: "Occupational Therapy",
      icon: HandHelping,
      image: "/images/occupational-therapy.jpg",
      imageAlt: "Caregiver helping two older women with a knitting activity",
      summary:
        "Practical strategies and tools that make dressing, bathing, cooking and other daily tasks safer and more independent.",
      points: ["Activities of daily living (ADLs)", "Home safety evaluations", "Adaptive techniques & tools"],
      helps:
        "Clients adjusting to new physical limits, arthritis, neurological conditions or cognitive changes who want to keep doing things for themselves.",
    },
    {
      slug: "speech-therapy",
      name: "Speech Therapy",
      icon: Speech,
      image: "/images/speech-therapy.jpg",
      imageAlt: "Older woman smiling and talking with a companion at a table",
      summary:
        "Support for communicating, thinking clearly and swallowing safely — practised in real conversations at home.",
      points: ["Speech & language restoration", "Swallowing assessments (dysphagia)", "Cognitive-communication strategies"],
      helps:
        "People recovering from a stroke or brain injury, or living with Parkinson's, dementia or other conditions that affect speech and swallowing.",
    },
    {
      slug: "medical-social-work",
      name: "Medical Social Work",
      icon: MessageCircleHeart,
      image: "/images/social-work.jpg",
      imageAlt: "Clinician sitting with an older man on a sofa, talking together",
      summary:
        "A caring professional to help with the emotional, practical and financial side of a health change.",
      points: ["Emotional & psychosocial support", "Community resource navigation", "Long-term care planning"],
      helps:
        "Clients and families facing a new diagnosis, caregiver stress, or difficult decisions about benefits, housing and future care.",
    },
    {
      slug: "home-health-aide",
      name: "Home Health Aide Services",
      icon: HeartHandshake,
      image: "/images/aide-smiling-patient.jpg",
      imageAlt: "Smiling home health aide sitting close to an older woman",
      summary:
        "Hands-on personal care that supports your skilled plan of care, provided by trained home health aides.",
      points: ["Bathing, grooming & dressing", "Mobility assistance", "Light homemaking tasks"],
      helps: "Clients receiving skilled home health who also need help with personal care while they recover.",
    },
  ],
};

/** Non-skilled services — from the agency's "Non-Skilled Home Health Services" listing. */
export const homeCare: Pillar = {
  slug: "home-care",
  name: "Home Care",
  level: "Non-Skilled",
  href: "/services/home-care",
  headline: "Everyday help, with heart.",
  intro:
    "Open Arms & Heart Services, Inc. is a **Florida-licensed home health agency** offering non-medical support to children, adults, seniors, and people with disabilities. Our caregivers help individuals remain **comfortable and supported in their homes.**",
  image: "/images/companion-care.jpg",
  services: [
    {
      slug: "personal-care",
      name: "Personal Care",
      icon: ShowerHead,
      image: "/images/personal-care.jpg",
      imageAlt: "Caregiver kneeling to hold hands with a smiling older woman in an armchair",
      summary: "Respectful help with bathing, dressing, grooming, and hygiene — always with dignity and privacy in mind.",
      points: ["Bathing assistance", "Dressing & grooming", "Hygiene assistance", "Activities of daily living"],
      helps: "Seniors, adults and children who need a steady, caring hand with their daily personal care.",
    },
    {
      slug: "mobility-transfers",
      name: "Mobility & Transfer Assistance",
      icon: Footprints,
      image: "/images/walker-autumn.jpg",
      imageAlt: "Older woman walking along an autumn path with a rollator",
      summary: "Safe, steady support moving around the home — from bed to chair, room to room, and in and out.",
      points: ["Mobility assistance", "Safe transfers", "Support moving around the home", "Help staying active"],
      helps: "Anyone who needs help moving safely at home, including people living with physical disabilities.",
    },
    {
      slug: "homemaker-services",
      name: "Homemaker Services",
      icon: House,
      image: "/images/homemaker.jpg",
      imageAlt: "Older woman rinsing fresh vegetables at her kitchen sink",
      summary: "Light housekeeping and meal preparation that keep the home comfortable, clean, and running smoothly.",
      points: ["Light housekeeping", "Meal preparation", "Tidy, comfortable living spaces", "Help with household routines"],
      helps: "Clients who want to stay at home but find cooking and cleaning harder than they used to.",
    },
    {
      slug: "companionship",
      name: "Companionship & Socialization",
      icon: Armchair,
      image: "/images/companion-care.jpg",
      imageAlt: "Caregiver in green scrubs leaning in to chat with an older woman",
      summary: "Genuine company and social connection that brighten the day and keep loneliness at bay.",
      points: ["Companionship", "Socialization", "Conversation & activities", "Friendly, consistent faces"],
      helps: "Seniors and adults who spend long hours alone, and families who want someone kind checking in.",
    },
    {
      slug: "respite-care",
      name: "Respite Care",
      icon: Sun,
      image: "/images/respite-child.jpg",
      imageAlt: "Caregiver sitting with a young child on a sofa, reading together",
      summary: "Short-term relief so family caregivers can rest and recharge — knowing their loved one is in good hands.",
      points: ["Caregiver relief", "Care for children & adults", "Planned or as-needed", "Support for families"],
      helps: "Parents and family caregivers of children, adults and seniors — including people with disabilities.",
    },
    {
      slug: "pediatric-disability-support",
      name: "Pediatric & Disability Support",
      icon: Accessibility,
      image: "/images/pediatric-walker.jpg",
      imageAlt: "Clinician supporting a young girl using a walker",
      summary: "Pediatric personal care and support for people with disabilities, tailored to each person's needs.",
      points: [
        "Pediatric personal care",
        "Support for people with disabilities",
        "Individualized assistance",
        "Help building independence",
      ],
      helps: "Children and adults with developmental, intellectual, or physical disabilities, and their families.",
    },
  ],
};

export const pillars = [homeHealth, homeCare] as const;
export const allServices = [...homeHealth.services, ...homeCare.services];

/* ───────────────────────── Types of care (programs) ─────────────────────────
 * The agency's programs, with copy taken from its original "Types of Care" page.
 * Skilled Home Health is included from the client's service brief.
 */

export type ProgramSlug = "home-care" | "home-health" | "apd" | "dcf" | "cbc" | "va" | "live-scan";

export type Program = {
  slug: ProgramSlug;
  /** Full name as published by the agency. */
  name: string;
  short: string;
  tag: string;
  icon: LucideIcon;
  image: string;
  imageAlt: string;
  summary: string;
  intro: string;
  points: string[];
  /** Fine print / eligibility note. */
  note: string;
  /** Dedicated page, when one exists. */
  href?: string;
  /** Exact option label on the agency's Google Form (omitted → submitted as "Other"). */
  formLabel?: string;
};

export const programs: Program[] = [
  {
    slug: "home-care",
    name: "Non-Skilled Home Health Services",
    short: "Non-Skilled Home Care",
    tag: "Home care",
    icon: HeartHandshake,
    image: "/images/companion-care.jpg",
    imageAlt: "Caregiver in green scrubs leaning in to chat with an older woman",
    summary: "Non-medical support for children, adults, seniors, and people with disabilities — at home.",
    intro:
      "Open Arms & Heart Services, Inc. is a Florida-licensed home health agency offering non-medical support to children, adults, seniors, and people with disabilities. Our caregivers help individuals remain comfortable and supported in their homes.",
    points: [
      "Personal care, bathing, dressing, grooming, and hygiene assistance",
      "Mobility and transfer assistance",
      "Homemaker services, light housekeeping, and meal preparation",
      "Companionship, socialization, and respite care",
      "Assistance with activities of daily living",
      "Pediatric personal care and support for people with disabilities",
    ],
    note: "Our caregivers complete applicable background screening and role-appropriate training. Service areas: Polk, Highlands, Hardee, Hillsborough, and Manatee Counties.",
    href: "/services/home-care",
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
    summary: "Person-centered supports that build daily living skills, independence, and community inclusion.",
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
    slug: "home-health",
    name: "Skilled Home Health",
    short: "Skilled Home Health",
    tag: "Skilled care",
    icon: Stethoscope,
    image: "/images/skilled-nursing.jpg",
    imageAlt: "Nurse checking an older man's blood pressure at his kitchen table",
    summary: "Physician-ordered nursing and therapy delivered by licensed professionals at home.",
    intro:
      "Physician-ordered nursing and therapy delivered by licensed professionals in the place you feel most like yourself — so recovery, rehabilitation, and chronic-condition care happen around your life.",
    points: [
      "Skilled nursing",
      "Physical therapy",
      "Occupational therapy",
      "Speech therapy",
      "Medical social work",
      "Home health aide services",
    ],
    note: "Skilled services follow a plan of care approved by your physician. We're happy to coordinate with your doctor's office.",
    href: "/services/home-health",
  },
  {
    slug: "dcf",
    name: "Vulnerable Adult Support Services / DCF Referrals",
    short: "Vulnerable Adult Support",
    tag: "DCF referrals",
    icon: ShieldCheck,
    image: "/images/social-work.jpg",
    imageAlt: "Clinician sitting with an older man on a sofa, talking together",
    summary: "Support that helps adults maintain dignity, safety, and independence at home.",
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
    summary: "Compassionate support for foster families and children with special needs.",
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
    imageAlt: "Older veteran smiling at home",
    summary: "Respectful, individualized home and community-based help for veterans and their families.",
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
    imageAlt: "Close-up of a fingertip on a fingerprint scanner",
    summary: "Electronic Live Scan fingerprinting for Florida background screening and licensing.",
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

/** Where a program's details live: its own page, or its section on /services. */
export const programHref = (p: Program) => p.href ?? `/services#${p.slug}`;

/** The three highlights featured on the agency's original home page. */
export const highlights = [
  {
    slug: "companion-care",
    name: "Companion Care",
    headline: "Company that comes from the heart.",
    intro:
      "Companionship, socialization, and respite care — plus **Life Skills Development Level 1 (Companion)** for people served through APD.",
    image: "/images/aide-smiling-patient.jpg",
    href: "/services/home-care#companionship",
    tags: ["Companionship & socialization", "Life Skills Development (Companion)", "Respite care"],
    icon: Armchair,
  },
  {
    slug: "residential",
    name: "Residential",
    headline: "A home, not a facility.",
    intro:
      "**Residential Habilitation (Group Home)** for adults with developmental disabilities — strengthening daily living skills, independence, and community inclusion.",
    image: "/images/residential-habilitation.jpg",
    href: "/services#apd",
    tags: ["Residential Habilitation (Group Home)", "Supported Living Coach", "Community integration"],
    icon: HouseHeart,
  },
  {
    slug: "personal-support",
    name: "Personal Support",
    headline: "Help with everyday life.",
    intro:
      "**Personal Supports** and personal care — bathing, dressing, grooming, hygiene, mobility, and help with activities of daily living.",
    image: "/images/personal-care.jpg",
    href: "/services/home-care#personal-care",
    tags: ["Personal Supports (APD)", "Personal care", "Mobility & transfers"],
    icon: HandHelping,
  },
];
