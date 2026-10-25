/**
 * Company facts. Sources, newest first: the owner's mock-up (docs/client-mockup-content.md)
 * and the agency's original website (docs/original-site-content.md). Do not add facts from elsewhere.
 */

const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined;

export const site = {
  name: "Open Arms & Heart Services Inc.",
  shortName: "Open Arms & Heart Services",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? vercelUrl ?? "http://localhost:3000",
  description:
    "Compassionate home and community support for children, adults, seniors and people with disabilities throughout Central Florida.",
  tagline: "Care that comes from the heart",
  motto: "Where there is love, there is life.",
  closing: "With compassion. With dignity. With open arms.",
  since: 2017,
  owner: { name: "Shantana Johnson", title: "Owner" },

  /** The mock-up's trust strip. */
  credentials: [
    "Florida-licensed home health agency",
    "APD Central Region provider",
    "VA Community Care Provider",
    "Community-Based Care (CBC) Provider",
    "Level 2 Live Scan Provider (BGS)",
  ],
  licenses: ["2999995365", "235855"],

  phone: { display: "321-217-2409", href: "tel:+13212172409" },
  fax: { display: "855-257-1340" },
  email: "openarmsandheartservices@gmail.com",

  address: { street: "1920 Verano Dr., Ste 105", city: "Haines City", region: "FL", zip: "33844" },

  /** "Apply Now" on the original Careers page. */
  applicationUrl: "https://form.jotform.com/260676196988075",

  /** "Request More Information" Google Form embedded on the original Contact and Types of Care pages. */
  inquiryForm: {
    url: "https://docs.google.com/forms/d/e/1FAIpQLScTQTwN2QlIn15iXq_LH065IpvekPYgO8AslI_lh0bNm-2hZQ/viewform",
    servicesEntry: "entry.499657858",
  },

  areas: [
    {
      label: "Home Health Services",
      href: "/services#home-care",
      counties: ["Polk", "Highlands", "Hardee", "Hillsborough", "Manatee"],
      text: "Polk · Highlands · Hardee · Hillsborough · Manatee",
    },
    {
      label: "APD Central Region",
      href: "/services#apd",
      counties: [],
      text: "Serving all of APD’s Central Region",
    },
  ],
  areaNote:
    "Availability varies by service, eligibility, authorization and agency capacity. Contact our team to discuss support in your area.",
} as const;

export const addressLines = [site.address.street, `${site.address.city}, ${site.address.region} ${site.address.zip}`] as const;
export const fullAddress = addressLines.join(", ");
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.name}, ${fullAddress}`)}`;
export const licenseLine = site.licenses.map((l) => `Lic# ${l}`).join(" · ");
export const sinceLine = `Compassionate care across Central Florida since ${site.since}`;

/** `hint` completes a one-word label for screen readers and crawlers (visually hidden). */
export const nav: readonly { href: string; label: string; hint?: string }[] = [
  { href: "/about", label: "About us" },
  { href: "/services", label: "Our services" },
  { href: "/careers", label: "Careers", hint: "and open positions" },
  { href: "/faq", label: "FAQ", hint: "— frequently asked questions" },
  { href: "/contact", label: "Contact us" },
];
