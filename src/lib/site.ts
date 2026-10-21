/**
 * Single source of truth for company facts.
 * Primary source: the agency's own previous website (openarmsandheart.org).
 * Supplemented by the NPPES NPI registry (NPI 1144748922). Items marked VERIFY need client confirmation.
 */

const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined;

export const site = {
  name: "Open Arms & Heart Services Inc.",
  shortName: "Open Arms & Heart Services",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? vercelUrl ?? "http://localhost:3000",
  description:
    "Family-oriented home care, APD services and veteran respite across Central Florida. Licensed Florida Home Health Agency serving families since 2017.",
  tagline: "Home Is Where The Heart Is",
  motto: "Where There Is Love, There Is Life",
  founded: 2017,
  founder: { name: "Shantana Johnson", title: "Owner & Founder" },
  npi: "1144748922",

  /** Credentials as published on the agency's own website. */
  credentials: ["Licensed Florida Home Health Agency", "APD Central Region Provider"],
  licenses: ["2999995365", "235855"],

  phone: { display: "(321) 217-2409", href: "tel:+13212172409" },
  fax: { display: "(855) 257-1340", href: "fax:+18552571340" },
  email: "openarmsandheartservices@gmail.com",

  /** VERIFY: the old website lists "Ocala, FL 2345" (an incomplete ZIP). The NPI registry places
   *  1920 Verano Dr, Ste 105 in Haines City, FL 33844, which is used here. */
  address: {
    street: "1920 Verano Dr, Suite 105",
    city: "Haines City",
    state: "FL",
    zip: "33844",
  },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=1920+Verano+Dr+Suite+105+Haines+City+FL+33844",
  mapsEmbed: "https://www.google.com/maps?q=1920+Verano+Dr+Suite+105,+Haines+City,+FL+33844&output=embed",

  social: {
    facebook: "https://www.facebook.com/OAAHServices/",
    linkedin: "https://www.linkedin.com/company/open-arms-heart-services-inc",
  },

  /** Online employment application (JotForm) used by the agency. */
  applicationUrl: "https://form.jotform.com/260676196988075",

  /** Service areas exactly as published on the agency's website, grouped by program. */
  areas: [
    {
      program: "Home care services",
      note: "Non-skilled home health services",
      href: "/services/home-care",
      counties: ["Polk", "Highlands", "Hardee", "Hillsborough", "Manatee"],
    },
    {
      program: "APD Central Region",
      note: "Agency for Persons with Disabilities services",
      href: "/services#apd",
      counties: ["Orange", "Brevard", "Sumter", "Lake", "Polk", "Highlands"],
    },
  ],
} as const;

/** Every county the agency serves, de-duplicated. */
export const allCounties = [...new Set(site.areas.flatMap((a) => a.counties))];

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`;
export const licenseLine = site.licenses.map((l) => `Lic# ${l}`).join(" · ");

export const nav = [
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Types of Care" },
  { href: "/getting-started", label: "Getting Started" },
  { href: "/careers", label: "Careers" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;
