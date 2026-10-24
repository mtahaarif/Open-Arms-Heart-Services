import type { LucideIcon } from "lucide-react";
import { Accessibility, Baby, FingerprintPattern, HeartHandshake, Medal, ShieldCheck } from "lucide-react";

/* ───────────────────────── Our services ─────────────────────────
 * The six services. Descriptions and lists come from the agency's original website
 * (docs/original-site-content.md); taglines and the changes the owner made in her
 * mock-up come from docs/client-mockup-content.md, which takes precedence.
 */

export type ProgramSlug = "home-care" | "apd" | "dcf" | "cbc" | "va" | "live-scan";

export type Program = {
  slug: ProgramSlug;
  /** Full name, as published. */
  name: string;
  /** Short name used on cards and in menus. */
  short: string;
  /** One-line promise from the owner's mock-up. */
  tagline: string;
  icon: LucideIcon;
  image: string;
  imageAlt: string;
  /** Published description. */
  intro: string;
  /** A named program within the service (CBC Summer Respite). */
  feature?: { title: string; text: string };
  /** "Services and support" list. */
  points: string[];
  /** Closing note. */
  note: string;
  /** Exact option label on the agency's "Request More Information" Google Form. */
  formLabel: string;
};

export const programs: Program[] = [
  {
    slug: "home-care",
    name: "Non-Skilled Home Health Services",
    short: "Non-Skilled Home Health",
    tagline: "Everyday help. Greater peace of mind.",
    icon: HeartHandshake,
    image: "/images/service-home-care.jpg",
    imageAlt: "A caregiver bringing a cup of tea to a woman resting at home with her crutches nearby",
    intro:
      "Open Arms & Heart Services, Inc. is a Florida-licensed home health agency offering non-medical support to children, adults, seniors, and people with disabilities. Our caregivers help individuals remain comfortable and supported in their homes.",
    points: [
      "Personal care, bathing, dressing, grooming and hygiene assistance",
      "Mobility and transfer assistance",
      "Homemaker services, light housekeeping and meal preparation",
      "Companionship, socialization and respite care",
      "Assistance with activities of daily living",
      "Pediatric personal care and support for people with disabilities",
    ],
    note: "Our caregivers complete applicable background screening and role-appropriate training. Serving Polk, Highlands, Hardee, Hillsborough and Manatee Counties.",
    formLabel: "Non-Skilled Home Health Services",
  },
  {
    slug: "apd",
    name: "Agency for Persons with Disabilities (APD) Services",
    short: "APD Services",
    tagline: "Support for a more independent life.",
    icon: Accessibility,
    image: "/images/service-apd.jpg",
    imageAlt: "A young man who uses a wheelchair relaxing in his kitchen while a support worker prepares a meal",
    intro:
      "As an APD provider, Open Arms offers person-centered supports designed to strengthen daily living skills, increase independence, and encourage community inclusion.",
    points: [
      "Personal Supports",
      "Life Skills Development Level 1 (Companion)",
      "Supported Living Coaching",
      "Supported Employment",
      "Residential Habilitation (Group Home)",
      "Respite Care",
      "Community integration and daily living skill development",
    ],
    note: "Working with individuals, families and Waiver Support Coordinators throughout all of APD’s Central Region.",
    formLabel: "Agency for Persons with Disabilities (APD)",
  },
  {
    slug: "dcf",
    name: "Vulnerable Adult Support Services",
    short: "Vulnerable Adult Support",
    tagline: "Dignity, safety and connection.",
    icon: ShieldCheck,
    image: "/images/service-vulnerable-adult.jpg",
    imageAlt: "A woman and an older woman laughing together while gardening outdoors",
    intro:
      "Open Arms supports adults who need assistance maintaining dignity, safety, and independence. We coordinate with families, social workers, case managers and referral partners.",
    points: [
      "Personal care and homemaker assistance",
      "Companion services and social support",
      "Activities of daily living assistance",
      "Caregiver respite",
      "Support for older adults and adults with disabilities",
      "Referrals and coordination for eligible home-based support",
    ],
    note: "Open Arms does not conduct DCF Adult Protective Services investigations. Services depend on eligibility, authorization and agency capacity.",
    formLabel: "Vulnerable Adult Support Services/DCF Referrals",
  },
  {
    slug: "cbc",
    name: "Children & Family Support Services (CBC)",
    short: "Children & Family Support",
    tagline: "Inclusive respite and meaningful experiences for ages 0–17.",
    icon: Baby,
    image: "/images/service-cbc.jpg",
    imageAlt: "A group of children laughing and running together outdoors",
    intro:
      "Open Arms has experience working with community-based care organizations and foster families to provide supportive, compassionate services.",
    feature: {
      title: "CBC Summer Respite Program",
      text: "A safe, supportive and inclusive program exclusively for CBC agency-referred children and youth ages 0–17. Designed to support children with behavioral challenges, autism, developmental disabilities, trauma-related needs and additional personal care needs, including those who may not thrive in a traditional summer camp setting.",
    },
    points: [
      "Caregiver respite, relief and family support",
      "Individualized personal care assistance and community-based supervision",
      "Fun-filled community outings and outdoor adventures",
      "Park adventures and recreation",
      "Water play days",
      "Picnics and outdoor eating",
      "Nature walks and discovery",
      "Sensory-friendly activities",
      "Fun and movement",
      "Meaningful social experiences and connections",
      "Coordination with case managers and child welfare professionals",
    ],
    note: "Activities and support are tailored to each child’s age and individual needs. Contact our team about seasonal availability, CBC referrals and required authorizations. Current availability depends on active referral and contracting arrangements.",
    formLabel: "Children & Family Support Services (CBC)",
  },
  {
    slug: "va",
    name: "Veterans Home Care & Respite Services (VA)",
    short: "Veterans Home Care & Respite",
    tagline: "Care that honors your everyday needs.",
    icon: Medal,
    image: "/images/service-veterans.jpg",
    imageAlt: "A smiling older veteran wearing a Vietnam veteran cap, talking with a friend at home",
    intro:
      "Open Arms is proud to support eligible veterans and their families through respectful, individualized home and community-based assistance.",
    points: [
      "Personal care and homemaker assistance",
      "Companion services and social support",
      "Activities of daily living assistance",
      "Caregiver respite",
      "Support for older adults and adults with disabilities",
      "Referrals and coordination for eligible home-based support",
    ],
    note: "Services for eligible veterans are subject to applicable VA Community Care referrals and authorizations. Veterans and family members may contact Open Arms to discuss available services.",
    formLabel: "Veterans Home Care & Respite Services (VA)",
  },
  {
    slug: "live-scan",
    name: "Live Scan Fingerprinting & Background Screening",
    short: "Live Scan Fingerprinting",
    tagline: "A convenient next step for screening.",
    icon: FingerprintPattern,
    image: "/images/live-scan.jpg",
    imageAlt: "Close-up of a fingerprint on a glowing scanner",
    intro:
      "Open Arms offers Live Scan fingerprinting services to assist with applicable Florida background screening and licensing requirements.",
    points: [
      "Electronic Live Scan fingerprint capture",
      "Florida Level 2 screening submissions, where authorized",
      "Healthcare, childcare, education and professional licensing requests, where supported",
      "Employer and organizational screening requests, where supported",
    ],
    note: "Contact us for appointments, fees, identification requirements and confirmation that we can process your specific agency or ORI submission.",
    formLabel: "Live Scan Fingerprinting & Background Screening",
  },
];

export const programBySlug = (slug: string) => programs.find((p) => p.slug === slug);
export const programHref = (p: Program) => `/services#${p.slug}`;

/** "More ways to care. Coming soon." — programs in development (owner's mock-up). */
export const comingSoon = {
  intro: "We are working to expand the support available to children and families.",
  items: [
    {
      title: "Skilled Home Health Services",
      text: "Planned services include skilled nursing, private duty nursing through RNs and LPNs, medical social services, and physical, occupational and speech therapy.",
    },
    {
      title: "Prescribed Pediatric Extended Care (PPEC)",
      text: "Planned pediatric day services for children with complex medical needs.",
    },
  ],
  note: "These programs are in development. Availability will depend on applicable licensure, approvals and program readiness.",
};
