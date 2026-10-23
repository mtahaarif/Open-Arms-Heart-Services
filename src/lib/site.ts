/**
 * Company facts. Every value is taken from the agency's original website —
 * see docs/original-site-content.md. Do not add facts that are not in that record.
 */

const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined;

export const site = {
  name: "Open Arms & Heart Services Inc.",
  shortName: "Open Arms & Heart Services",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? vercelUrl ?? "http://localhost:3000",
  description:
    "APD Central Region Provider and Licensed Florida Home Health Agency. Dependable, person-centered support serving Central Florida since 2017.",
  tagline: "Home Is Where The Heart Is",
  motto: "Where There Is Love, There Is Life",
  /** "Serving Central Florida since 2017". */
  since: 2017,
  owner: { name: "Shantana Johnson", title: "Owner" },

  credentials: ["APD Central Region Provider", "Licensed Florida Home Health Agency"],
  licenses: ["2999995365", "235855"],

  phone: { display: "321-217-2409", href: "tel:+13212172409" },
  fax: { display: "855-257-1340" },
  email: "openarmsandheartservices@gmail.com",

  /** Published exactly as on the original website (its ZIP code is incomplete — confirm with the client). */
  address: { line1: "1920 Verano Dr., Ste 105", line2: "Ocala, FL 2345" },

  /** "Apply Now" on the original Careers page. */
  applicationUrl: "https://form.jotform.com/260676196988075",

  /** Service areas as published, by type of care. */
  areas: [
    {
      program: "Non-Skilled Home Health Services",
      label: "Service areas",
      href: "/services#home-care",
      counties: ["Polk", "Highlands", "Hardee", "Hillsborough", "Manatee"],
    },
    {
      program: "Agency for Persons with Disabilities (APD)",
      label: "APD Central Region counties",
      href: "/services#apd",
      counties: ["Orange", "Brevard", "Sumter", "Lake", "Polk", "Highlands"],
    },
  ],
} as const;

/** Every county named on the original website, de-duplicated. */
export const allCounties = [...new Set(site.areas.flatMap((a) => a.counties))];

export const fullAddress = `${site.address.line1}, ${site.address.line2}`;
export const licenseLine = site.licenses.map((l) => `Lic# ${l}`).join(" · ");
export const sinceLine = `Serving Central Florida since ${site.since}`;

export const nav = [
  { href: "/services", label: "Types of Care" },
  { href: "/about", label: "About Us" },
  { href: "/careers", label: "Careers" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;
