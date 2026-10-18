/**
 * Single source of truth for company facts.
 * Sources: NPPES NPI registry (NPI 1144748922), LinkedIn company page, Facebook @OAAHServices.
 * Items marked VERIFY were inferred from directory listings — confirm with the client before launch.
 */

const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined;

export const site = {
  name: "Open Arms & Heart Services Inc.",
  shortName: "Open Arms & Heart Services",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? vercelUrl ?? "http://localhost:3000",
  description:
    "Skilled home health and non-skilled home care in Polk, Lake and Orange counties, FL: nursing, therapy, personal care, companionship and respite.",
  founded: 2017,
  founder: { name: "Shantana Johnson", title: "Founder & President" },
  npi: "1144748922",

  phone: { display: "(321) 430-8194", href: "tel:+13214308194" },
  fax: { display: "(855) 257-1340", href: "fax:+18552571340" },
  /** VERIFY: no public email found — add one to show it across the site. */
  email: "",

  address: {
    street: "1920 Verano Dr, Suite 105",
    city: "Haines City",
    state: "FL",
    zip: "33844",
  },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=1920+Verano+Dr+Suite+105+Haines+City+FL+33844",
  mapsEmbed: "https://www.google.com/maps?q=1920+Verano+Dr+Suite+105,+Haines+City,+FL+33844&output=embed",

  /** VERIFY: hours come from a single directory listing. */
  hours: [
    { days: "Monday – Friday", time: "9:00 AM – 6:00 PM" },
    { days: "Saturday – Sunday", time: "10:00 AM – 4:00 PM" },
  ],

  social: {
    facebook: "https://www.facebook.com/OAAHServices/",
    linkedin: "https://www.linkedin.com/company/open-arms-heart-services-inc",
  },

  /** VERIFY: counties inferred from the agency's Haines City, Minneola, Ocoee & Apopka addresses. */
  areas: [
    {
      county: "Polk County",
      towns: ["Haines City", "Davenport", "Lake Wales", "Winter Haven", "Auburndale", "Lakeland"],
    },
    {
      county: "Lake County",
      towns: ["Minneola", "Clermont", "Groveland", "Montverde", "Mascotte", "Leesburg"],
    },
    {
      county: "Orange County",
      towns: ["Ocoee", "Apopka", "Winter Garden", "Windermere", "Orlando"],
    },
  ],
} as const;

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`;

export const nav = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/getting-started", label: "Getting Started" },
  { href: "/careers", label: "Careers" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;
