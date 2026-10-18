import type { Metadata, Viewport } from "next";
import { Courgette, Figtree, Fraunces, Quicksand } from "next/font/google";
import { MobileCallBar, ScrollProgress } from "@/components/layout/Chrome";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Providers } from "@/components/layout/Providers";
import { allServices } from "@/lib/services";
import { site } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
  style: ["normal", "italic"],
  display: "swap",
});
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree", display: "swap" });
const courgette = Courgette({ subsets: ["latin"], weight: "400", variable: "--font-courgette", display: "swap" });
const quicksand = Quicksand({ subsets: ["latin"], variable: "--font-quicksand", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.shortName} | Home Health & Home Care in Central Florida`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  applicationName: site.shortName,
  keywords: [
    "home health care Central Florida",
    "home care Haines City",
    "skilled nursing at home",
    "respite care Florida",
    "companion care",
    "Medicaid home care provider",
    "Polk County home care",
    "Lake County home care",
    "Orange County home care",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    title: `${site.shortName} | Home Health & Home Care`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#60349f",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: site.name,
  url: site.url,
  telephone: "+1-321-430-8194",
  faxNumber: "+1-855-257-1340",
  foundingDate: String(site.founded),
  founder: { "@type": "Person", name: site.founder.name, jobTitle: site.founder.title },
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip,
    addressCountry: "US",
  },
  areaServed: site.areas.map((a) => ({ "@type": "AdministrativeArea", name: `${a.county}, Florida` })),
  sameAs: [site.social.facebook, site.social.linkedin],
  identifier: { "@type": "PropertyValue", propertyID: "NPI", value: site.npi },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Home health & home care services",
    itemListElement: allServices.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.name } })),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${figtree.variable} ${courgette.variable} ${quicksand.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Providers>
          <ScrollProgress />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <MobileCallBar />
        </Providers>
      </body>
    </html>
  );
}
