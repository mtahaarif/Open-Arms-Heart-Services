import type { LucideIcon } from "lucide-react";
import {
  Armchair,
  Car,
  Footprints,
  HandHelping,
  HeartHandshake,
  House,
  HouseHeart,
  MessageCircleHeart,
  Puzzle,
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
      points: [
        "Fall prevention",
        "Strength & mobility",
        "Post-surgical rehabilitation",
        "Gait & balance training",
      ],
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
      points: [
        "Activities of daily living (ADLs)",
        "Home safety evaluations",
        "Adaptive techniques & tools",
      ],
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
      points: [
        "Speech & language restoration",
        "Swallowing assessments (dysphagia)",
        "Cognitive-communication strategies",
      ],
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
      points: [
        "Emotional & psychosocial support",
        "Community resource navigation",
        "Long-term care planning",
      ],
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
      points: [
        "Bathing, grooming & dressing",
        "Mobility assistance",
        "Light homemaking tasks",
      ],
      helps:
        "Clients receiving skilled home health who also need help with personal care while they recover.",
    },
  ],
};

export const homeCare: Pillar = {
  slug: "home-care",
  name: "Home Care",
  level: "Non-Skilled",
  href: "/services/home-care",
  headline: "Everyday help, with heart.",
  intro:
    "Trusted caregivers who help with the routines that make a house a home — personal care, meals, company, rides and a well-earned break for family caregivers. **No doctor's order needed.**",
  image: "/images/companion-care.jpg",
  services: [
    {
      slug: "personal-care",
      name: "Personal Care",
      icon: ShowerHead,
      image: "/images/personal-care.jpg",
      imageAlt: "Caregiver kneeling to hold hands with a smiling older woman in an armchair",
      summary:
        "Respectful, unhurried help with the most personal parts of the day — always with dignity and privacy in mind.",
      points: [
        "Bathing & hygiene",
        "Dressing & grooming",
        "Toileting & continence care",
        "Safe transfers & mobility",
      ],
      helps: "Seniors and adults who need a steady hand to stay clean, comfortable and safe at home.",
    },
    {
      slug: "companion-services",
      name: "Companion Services",
      icon: Armchair,
      image: "/images/companion-care.jpg",
      imageAlt: "Caregiver in green scrubs leaning in to chat with an older woman",
      summary:
        "Genuine company and conversation that brighten the day and keep loneliness at bay.",
      points: [
        "Conversation & friendship",
        "Games, hobbies & walks",
        "Accompaniment to outings",
        "Supervision for safety",
      ],
      helps: "Anyone who spends long hours alone, or families who want someone kind checking in.",
    },
    {
      slug: "homemaker-services",
      name: "Homemaker Services",
      icon: House,
      image: "/images/homemaker.jpg",
      imageAlt: "Older woman rinsing fresh vegetables at her kitchen sink",
      summary: "A tidy, well-stocked home without the strain — we take the chores off your list.",
      points: [
        "Light housekeeping",
        "Laundry & linens",
        "Meal planning & preparation",
        "Grocery shopping",
        "Medication reminders",
      ],
      helps: "Clients who can manage personal care but find cooking, cleaning or shopping tiring.",
    },
    {
      slug: "respite-care",
      name: "Respite Care",
      icon: Sun,
      image: "/images/respite-child.jpg",
      imageAlt: "Caregiver sitting with a young child on a sofa, reading together",
      summary:
        "Short-term relief so family caregivers can rest, work or recharge — knowing their loved one is in good hands.",
      points: [
        "In-home relief visits",
        "Care for children & adults",
        "Developmental & physical disabilities",
        "Planned or as-needed",
      ],
      helps:
        "Parents and family caregivers of children, youth and adults — including those with autism, intellectual, developmental or physical disabilities.",
    },
    {
      slug: "personal-supports",
      name: "Personal Supports",
      icon: Puzzle,
      image: "/images/personal-supports.jpg",
      imageAlt: "Caregiver talking with a smiling young man who uses a wheelchair",
      summary:
        "Support that helps individuals with developmental disabilities live, learn and take part in their community.",
      points: [
        "Daily living skills",
        "Household routines",
        "Community participation",
        "Building independence",
      ],
      helps:
        "Teens and adults with developmental disabilities who want more independence at home and out in the community.",
    },
    {
      slug: "transportation",
      name: "Transportation & Errands",
      icon: Car,
      image: "/images/transportation.jpg",
      imageAlt: "Older man stepping carefully into a car",
      summary: "Safe, friendly rides and errand help that keep life — and appointments — on track.",
      points: [
        "Medical appointments",
        "Pharmacy pick-ups",
        "Grocery & errands",
        "Community outings",
      ],
      helps: "Clients who no longer drive, or families who can't always make the trip.",
    },
    {
      slug: "residential-habilitation",
      name: "Residential Habilitation",
      icon: HouseHeart,
      image: "/images/residential-habilitation.jpg",
      imageAlt: "Caregiver guiding a young man in a wheelchair through a bright room",
      summary:
        "Skill-building and day-to-day support for individuals with developmental disabilities in a residential setting.",
      points: [
        "Self-care & life skills",
        "Social & communication skills",
        "Health & safety routines",
        "Community integration",
      ],
      helps:
        "Adults with intellectual or developmental disabilities working toward greater independence where they live.",
    },
  ],
};

export const pillars = [homeHealth, homeCare] as const;
export const allServices = [...homeHealth.services, ...homeCare.services];
