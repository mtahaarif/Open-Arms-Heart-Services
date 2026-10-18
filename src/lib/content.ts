import type { LucideIcon } from "lucide-react";
import {
  Baby,
  BadgeCheck,
  CalendarHeart,
  ClipboardList,
  DoorOpen,
  FileText,
  HandCoins,
  HandHeart,
  Heart,
  HeartPulse,
  Hospital,
  Landmark,
  MessagesSquare,
  PhoneCall,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";
import type { PillarSlug } from "./services";

export const steps: {
  title: string;
  text: string;
  details: string[];
  icon: LucideIcon;
  image: string;
}[] = [
  {
    title: "Reach out",
    text: "Call us or send a request. We'll listen, answer your questions and help you work out whether skilled home health, non-skilled home care, or a mix of both fits best.",
    details: ["No-pressure conversation", "Questions about coverage welcome", "Referrals from doctors & case managers"],
    icon: PhoneCall,
    image: "/images/friends-talking.jpg",
  },
  {
    title: "We visit & assess",
    text: "A member of our team meets you at home to understand health needs, daily routines, safety concerns and personal goals. For skilled care, we coordinate with your physician.",
    details: ["In-home visit", "Safety walk-through", "Family welcome to join"],
    icon: ClipboardList,
    image: "/images/social-work.jpg",
  },
  {
    title: "Your personal care plan",
    text: "We put together a written plan around your schedule, preferences and goals — then match caregivers and clinicians whose skills fit.",
    details: ["Built around your routines", "Clear schedule & tasks", "Caregiver matching"],
    icon: FileText,
    image: "/images/breakfast-family.jpg",
  },
  {
    title: "Care begins — and adapts",
    text: "Visits start, and we stay in touch with you and your family. As needs change, the plan changes with them.",
    details: ["Regular check-ins", "Family updates", "Plan adjusts over time"],
    icon: CalendarHeart,
    image: "/images/celebration.jpg",
  },
];

export const audiences: { title: string; text: string; image: string; alt: string; icon: LucideIcon }[] = [
  {
    title: "Seniors aging in place",
    text: "Help with daily routines, health and companionship so home stays home.",
    image: "/images/senior-portrait.jpg",
    alt: "Smiling older woman with short grey hair",
    icon: HandHeart,
  },
  {
    title: "Recovering after a hospital stay",
    text: "Nursing and therapy that bridge the gap between hospital and full strength.",
    image: "/images/walker-autumn.jpg",
    alt: "Older woman walking along an autumn path with a rollator",
    icon: Hospital,
  },
  {
    title: "Adults with disabilities",
    text: "Personal supports and habilitation that build skills and independence.",
    image: "/images/personal-supports.jpg",
    alt: "Caregiver talking with a young man who uses a wheelchair",
    icon: Users,
  },
  {
    title: "Children & youth",
    text: "Respite and support for kids with autism, developmental or physical disabilities.",
    image: "/images/child-smiling.jpg",
    alt: "Smiling young boy looking at the camera",
    icon: Baby,
  },
  {
    title: "Family caregivers",
    text: "A trusted break for the people who give so much of themselves.",
    image: "/images/family-baking.jpg",
    alt: "Grandmother and granddaughter baking together in a kitchen",
    icon: Heart,
  },
];

export const promises: { word: string; title: string; text: string; icon: LucideIcon }[] = [
  {
    word: "arms",
    title: "Open arms",
    text: "Everyone is welcomed exactly as they are — every age, ability, culture and background.",
    icon: HandHeart,
  },
  {
    word: "heart",
    title: "Open heart",
    text: "Patience, dignity and genuine warmth in every visit. We care for people, not tasks.",
    icon: HeartPulse,
  },
  {
    word: "lines",
    title: "Open lines",
    text: "Families stay in the loop with clear, honest updates — and we always pick up the phone.",
    icon: MessagesSquare,
  },
  {
    word: "door",
    title: "Open door",
    text: "Questions are always welcome, before care starts and every day after.",
    icon: DoorOpen,
  },
];

export type Need = { id: string; label: string; pillar: PillarSlug; services: string[] };

export const needs: Need[] = [
  { id: "hospital", label: "Coming home after surgery or a hospital stay", pillar: "home-health", services: ["skilled-nursing", "physical-therapy"] },
  { id: "wound", label: "Wound care, injections or IV therapy", pillar: "home-health", services: ["skilled-nursing"] },
  { id: "chronic", label: "Managing a chronic condition", pillar: "home-health", services: ["skilled-nursing"] },
  { id: "falls", label: "Getting stronger or preventing falls", pillar: "home-health", services: ["physical-therapy"] },
  { id: "tasks", label: "Relearning everyday tasks safely", pillar: "home-health", services: ["occupational-therapy"] },
  { id: "speech", label: "Speech, swallowing or communication", pillar: "home-health", services: ["speech-therapy"] },
  { id: "planning", label: "Planning, paperwork & community resources", pillar: "home-health", services: ["medical-social-work"] },
  { id: "bathing", label: "Bathing, dressing or grooming", pillar: "home-care", services: ["personal-care"] },
  { id: "company", label: "Company, conversation & activities", pillar: "home-care", services: ["companion-services"] },
  { id: "chores", label: "Meals, laundry & light housekeeping", pillar: "home-care", services: ["homemaker-services"] },
  { id: "rides", label: "Rides to appointments & errands", pillar: "home-care", services: ["transportation"] },
  { id: "break", label: "A break for the family caregiver", pillar: "home-care", services: ["respite-care"] },
  { id: "idd", label: "Support for a loved one with a developmental disability", pillar: "home-care", services: ["personal-supports", "respite-care", "residential-habilitation"] },
];

export const payment: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: "Florida Medicaid",
    text: "We're an enrolled Florida Medicaid provider. Tell us about your plan and we'll check which services it covers.",
    icon: Landmark,
  },
  {
    title: "Medicaid waiver programs",
    text: "If your loved one receives services through a Medicaid waiver, ask us how we can be part of their support plan.",
    icon: BadgeCheck,
  },
  {
    title: "Private health insurance",
    text: "Some plans cover skilled home health when it's ordered by a physician. We'll help you verify benefits.",
    icon: ShieldCheck,
  },
  {
    title: "Long-term care insurance",
    text: "Many long-term care policies help pay for in-home care. We can provide the documentation insurers ask for.",
    icon: Wallet,
  },
  {
    title: "Private pay",
    text: "Flexible private-pay options for families who want to arrange care directly. Ask us about rates.",
    icon: HandCoins,
  },
];

export const checklist = [
  "Insurance and/or Medicaid cards",
  "A current list of medications & doses",
  "Your doctor's name and phone number",
  "Hospital discharge papers (if any)",
  "Daily routine & preferences you'd like us to know",
  "Emergency contacts for family members",
];

export const dayTimeline = [
  { time: "8:00 AM", title: "A gentle start", text: "Help with bathing, dressing and grooming, then breakfast together at the table.", service: "Personal Care" },
  { time: "10:30 AM", title: "Out and about", text: "A ride to the doctor, a stop at the pharmacy and a few groceries on the way home.", service: "Transportation & Errands" },
  { time: "12:30 PM", title: "Lunch & a good chat", text: "A fresh meal and real conversation — the kind that makes the afternoon go by easy.", service: "Companion Services" },
  { time: "3:00 PM", title: "Time for things you love", text: "Cards, a short walk, music, gardening or a favourite show. Whatever lights you up.", service: "Companion Services" },
  { time: "5:30 PM", title: "Dinner & a tidy home", text: "Supper prepared, dishes done, laundry folded and a reminder to take evening medications.", service: "Homemaker Services" },
  { time: "Evening", title: "Family gets a night off", text: "When family caregivers need rest, respite care keeps the evening calm and covered.", service: "Respite Care" },
];

export const roles = [
  {
    title: "Registered Nurse (RN) / LPN",
    type: "Skilled · Field",
    text: "Deliver skilled nursing visits — assessments, wound care, medication management and patient teaching — and coordinate with physicians.",
    needs: ["Active Florida RN or LPN license", "Home health experience preferred", "Reliable transportation"],
  },
  {
    title: "Physical, Occupational & Speech Therapists",
    type: "Skilled · Field",
    text: "Help clients regain strength, independence and communication through therapy delivered where they live.",
    needs: ["Active Florida PT / PTA, OT / COTA or SLP license", "Home health experience a plus", "Reliable transportation"],
  },
  {
    title: "Home Health Aide (HHA) / CNA",
    type: "Skilled support · Field",
    text: "Provide personal care alongside a skilled plan of care — bathing, grooming, mobility and light homemaking.",
    needs: ["HHA certificate or CNA license", "Current CPR / First Aid", "Compassionate and dependable"],
  },
  {
    title: "Companion & Homemaker",
    type: "Non-skilled · Field",
    text: "Bring company, conversation and practical help — meals, light housekeeping, errands and outings.",
    needs: ["Caregiving experience preferred", "Valid driver's license & insurance", "Warm, patient personality"],
  },
  {
    title: "Respite Care Provider",
    type: "Non-skilled · Field",
    text: "Give families a break by caring for children, youth and adults — including those with autism and developmental disabilities.",
    needs: ["Experience with children or IDD a plus", "Current CPR / First Aid", "Calm, playful and patient"],
  },
  {
    title: "Direct Support Professional",
    type: "Non-skilled · Field & residential",
    text: "Support individuals with developmental disabilities in building life skills and community connections.",
    needs: ["Experience supporting people with IDD", "Required APD trainings (or willingness to complete)", "Valid driver's license"],
  },
];

export const requirements = [
  "Florida Level 2 background screening",
  "Current CPR & First Aid",
  "Valid Florida driver's license",
  "Proof of auto insurance",
  "Role-specific license or certificate",
  "References from past work",
  "A genuinely kind heart",
];
