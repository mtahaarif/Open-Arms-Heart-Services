# Open Arms & Heart Services Inc. — Website

> Production marketing website for **Open Arms & Heart Services Inc.**, a Florida-licensed home health agency and APD Central Region provider serving Central Florida since 2017.
>
> **Design direction (October 2026):** a clean, polished, professional site with easy navigation, a professional typeface and welcoming photography of the people the agency serves. It is based on the owner's own mock-up, with Mind & Mobility as a reference (see §1.2).
>
> **Content policy:** every fact on the site comes from the owner's mock-up ([`docs/client-mockup-content.md`](docs/client-mockup-content.md)) or the agency's original website ([`docs/original-site-content.md`](docs/original-site-content.md)). Where they differ, the mock-up wins. See §16.

| | |
| --- | --- |
| **Live (preview)** | https://open-arms-heart-services.vercel.app |
| **Repository** | https://github.com/mtahaarif/Open-Arms-Heart-Services |
| **Framework** | Next.js 16 (App Router, Turbopack) · React 19 · TypeScript 5 (strict) |
| **Styling** | Tailwind CSS v4 (CSS-first `@theme` / `@utility` config) |
| **Fonts** | League Spartan → Manrope fallback (headings, in capitals) · Source Sans 3 (body), all self-hosted with `next/font` |
| **Hosting** | Vercel. Every page is pre-rendered as static HTML. |
| **Inquiries** | The agency's own "Request More Information" Google Form, embedded |

---

## Table of contents

1. [Project overview](#1-project-overview)
2. [Technology stack](#2-technology-stack)
3. [Getting started](#3-getting-started)
4. [Environment variables](#4-environment-variables)
5. [Project structure](#5-project-structure)
6. [Architecture](#6-architecture)
7. [Design system](#7-design-system)
8. [Pages — section by section](#8-pages--section-by-section)
9. [Component reference](#9-component-reference)
10. [Content & data layer](#10-content--data-layer)
11. [The inquiry form](#11-the-inquiry-form)
12. [SEO & AI discoverability](#12-seo--ai-discoverability)
13. [Performance & accessibility](#13-performance--accessibility)
14. [Security](#14-security)
15. [How-to guides](#15-how-to-guides)
16. [Content sources & pre-launch checklist](#16-content-sources--pre-launch-checklist)
17. [Deployment](#17-deployment)
18. [Conventions & gotchas](#18-conventions--gotchas)
19. [Project history](#19-project-history)
20. [Photo credits](#20-photo-credits)

---

## 1. Project overview

### 1.1 The client

**Open Arms & Heart Services Inc.** — *"Care that comes from the heart." · "Where there is love, there is life."*

- **Owner:** Shantana Johnson. The agency has served Central Florida since **2017**.
- **Credentials:** Florida-licensed home health agency · APD Central Region provider · VA Community Care Provider · Community-Based Care (CBC) Provider · Level 2 Live Scan Provider (BGS).
- **Licenses:** Lic# 2999995365 · Lic# 235855.
- **Office:** 1920 Verano Dr., Ste 105, Haines City, FL 33844.
- **Contact:** phone 321-217-2409 · fax 855-257-1340 · openarmsandheartservices@gmail.com.

**Mission:** *To work in partnership with our consumers to help them achieve their goals of independence, productivity, and meaningful integration within their communities. We are committed to fulfilling the needs of our consumers with excellence and care.*

**Services:**

| # | Service | Anchor |
| --- | --- | --- |
| 01 | Non-Skilled Home Health Services | `/services#home-care` |
| 02 | Agency for Persons with Disabilities (APD) Services | `/services#apd` |
| 03 | Vulnerable Adult Support Services | `/services#dcf` |
| 04 | Children & Family Support Services (CBC), including the CBC Summer Respite Program | `/services#cbc` |
| 05 | Veterans Home Care & Respite Services (VA) | `/services#va` |
| 06 | Live Scan Fingerprinting & Background Screening | `/services#live-scan` |

*Coming soon:* Skilled Home Health Services and Prescribed Pediatric Extended Care (PPEC).

### 1.2 Design brief (owner's feedback, 2026-10-24)

> "The current design feels a little too busy for my taste … I would like a cleaner, more polished design with easy navigation, a more professional font, and welcoming pictures that reflect the people we serve." The owner also provided her own ChatGPT mock-up ("more of my idea of my site", with different pictures and font) and pointed to the Mind & Mobility and Ms. Lynn's websites for inspiration.

| Request | What changed |
| --- | --- |
| **Cleaner, less busy** | Every scroll-driven and decorative effect was removed: marquees, stacking and pinned horizontal scroll, glow and tilt cards, glassmorphism, Lenis smooth-scroll hijacking, page-transition curtains, the scroll-progress bar and floating badges. Sections are calm and alternate white, cream, lavender and navy, following the mock-up. |
| **Polished, professional** | Small corner radii (4–8 px), thin borders, soft shadows, generous spacing, one container width (1180 px) and a consistent heading / eyebrow / body hierarchy. The client's real logo replaces the redrawn SVG mark. |
| **Easy navigation** | A top bar with the phone number on every page. A sticky header with five plain links, an "Our services" dropdown listing all six services, and a "Let's talk" button. A phone button and a simple menu on mobile. Breadcrumbs on inner pages. A "Jump to a service" menu on `/services`. Topic links on `/faq`. A footer that lists every page and service. |
| **More professional font** | **League Spartan** (falling back to Manrope) for headings, set in **capitals**, and **Source Sans 3** for everything else. The client chose this stack on 2026-10-27, after rejecting Source Serif 4 and then trying Varela, all-caps headings, Helvetica/Arial and Geist. These replace the earlier Fraunces, Figtree, Courgette script and Quicksand mix, and the mock-up's Manrope. |
| **Welcoming pictures** | New photography that reflects the people served: Black, Latina and white families, seniors, a veteran, adults with disabilities, children and diverse caregivers. Several photos are in home and garden settings. See §20. |
| **"More of my idea of my site"** | The home page follows the mock-up's section order and wording (§8.1), and the mock-up's new content is used site-wide (§16). |

**References:** Mind & Mobility (mindandmobility.com) showed the polish to aim for: purple branding, mostly white, a single photo hero, a clear top menu and the phone number always visible. "Ms. Lynn's website" couldn't be identified from the name alone. It can be reviewed once the client shares the link.

---

## 2. Technology stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 App Router, Turbopack, React 19, Server Components by default |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 with `@theme` tokens and `@utility` classes in `src/app/globals.css` |
| Icons | `lucide-react` |
| Images | `<Photo>`, built on `next/image`'s `getImageProps` (AVIF/WebP `srcset`, quality 60, mid-size fallback `src`, no inline styles) |
| Fonts | `next/font/google`, self-hosted at build time with `display: swap` |
| Forms | Embedded Google Form (no backend) |
| Runtime dependencies | `next`, `react`, `react-dom`, `lucide-react` — nothing else |

The only client-side JavaScript is the header's mobile menu and active-link state, `CareLink` and the `GoogleForm` embed. There are no animation or smooth-scroll libraries.

---

## 3. Getting started

### 3.1 Requirements

* **Node.js 20.9 or newer** (developed on Node 24) and npm.

### 3.2 Commands

```bash
npm install
npm run dev        # development server  → http://localhost:3000
npm run build      # production build (type-checks + pre-renders every page)
npm start          # serve the production build
```

### 3.3 ⚠️ Windows note — the `&` in the folder name

The project folder is called `Open Arms & Heart Services Inc`. On Windows, the `&` breaks the `node_modules/.bin/*.cmd` shims that `npx` and the default npm scripts use. The npm scripts therefore call Next's binary **directly**:

```json
"dev":   "node node_modules/next/dist/bin/next dev",
"build": "node node_modules/next/dist/bin/next build",
"start": "node node_modules/next/dist/bin/next start"
```

This works on every OS, including Vercel's Linux builders. **Don't use `npx next …` in this folder.** To pass extra flags, call the binary the same way, e.g. `node node_modules/next/dist/bin/next start -p 4000`.

---

## 4. Environment variables

Copy `.env.example` to `.env.local` for local work, or set the variables in **Vercel → Project → Settings → Environment Variables**. All of them are optional.

| Variable | Exposed to browser | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes | Base URL for canonicals, `og:url`, the sitemap, `robots.txt`, JSON-LD and `llms.txt`. Falls back to `VERCEL_PROJECT_PRODUCTION_URL` (set by Vercel), then `http://localhost:3000`. **Set it to the custom domain once there is one.** |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Yes | Google Search Console HTML-tag verification code (just the `content` value). |
| `NEXT_PUBLIC_GTM_ID` | Yes | Google Tag Manager container (`GTM-XXXXXXX`). When set, GTM loads lazily and the CSP opens for GTM / Google Analytics. When unset, the site has no tracking code at all. |

Inquiries need no configuration: they go through the embedded Google Form (§11).

---

## 5. Project structure

```
├── docs/
│   ├── client-mockup-content.md    Owner's mock-up + feedback (2026-10-24) — newest content source
│   └── original-site-content.md    Verbatim record of openarmsandheart.org
├── public/
│   ├── brand/                      logo.png (240px, ~8 KB, UI), logo-640.png (social card/JSON-LD), logo-mark.png
│   └── images/                     15 licensed photos + the owner's portrait
├── src/
│   ├── app/
│   │   ├── layout.tsx              Fonts, metadata defaults, JSON-LD, skip link, TopBar/Header/Footer
│   │   ├── globals.css             Design tokens, base typography, utilities
│   │   ├── page.tsx                /            Home (mock-up structure)
│   │   ├── services/page.tsx       /services    All six services + coming soon + coverage + form
│   │   ├── about/page.tsx          /about       Story, mission, who we serve, credentials
│   │   ├── careers/page.tsx        /careers     Positions, requirements, application
│   │   ├── faq/page.tsx            /faq         Grouped FAQs + FAQPage JSON-LD
│   │   ├── contact/page.tsx        /contact     Contact details + Google Form + steps + areas
│   │   ├── not-found.tsx           404
│   │   ├── opengraph-image.tsx     1200×630 social card (generated)
│   │   ├── icon.png, apple-icon.png  Favicons (from the logo mark)
│   │   ├── sitemap.ts, robots.ts   SEO files
│   │   └── llms.txt/route.ts       Plain-text site summary for AI answer engines
│   ├── components/
│   │   ├── brand/Logo.tsx          The client's logo (image) linking home
│   │   ├── layout/TopBar.tsx       Navy phone strip (server)
│   │   ├── layout/Header.tsx       Sticky header: dropdown, mobile menu (client, plain-data props)
│   │   ├── layout/Footer.tsx       Footer columns, resources, copyright bar
│   │   ├── forms/GoogleForm.tsx    Embedded Google Form with prefill
│   │   ├── forms/CareLink.tsx      Link that pre-ticks services in the form
│   │   ├── sections/               TrustStrip, ServiceCards, AreasBand, ComingSoon,
│   │   │                           CareersFeature, Coverage, Steps, ContactBand
│   │   └── ui/                     Photo, Link (no-prefetch next/link), PageHeader, SectionHeading (+ Lines)
│   └── lib/
│       ├── site.ts                 Company facts, address, areas, nav
│       ├── services.ts             The six services + coming-soon programs
│       ├── content.ts              Mission, story, audiences, insurance, steps, careers, resources
│       ├── faqs.ts                 13 FAQs in 4 categories
│       ├── photos.ts               Generated image sizes + average colours
│       └── seo.ts                  pageMetadata() helper
└── next.config.ts                  Images, security headers / CSP, redirects for retired URLs
```

---

## 6. Architecture

### 6.1 Rendering

| Route | Type |
| --- | --- |
| `/`, `/about`, `/services`, `/careers`, `/faq`, `/contact` | Static (pre-rendered HTML, served from the CDN) |
| `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/opengraph-image`, `/icon.png`, `/apple-icon.png` | Static, generated at build time |

Pages and sections are **Server Components**. Only three small Client Components exist:
- `Header`, for the mobile-menu state and the active link;
- `CareLink`, for its `sessionStorage` hand-off;
- `GoogleForm`, which builds the iframe URL with the prefill parameters.

All copy is in the initial HTML.

### 6.2 Root layout (`src/app/layout.tsx`)

* Loads **League Spartan**, **Manrope** (fallback only, `preload: false`) and **Source Sans 3** as CSS variables (`--font-league-spartan`, `--font-manrope`, `--font-source-sans`). Headings use `--font-display: var(--font-league-spartan), var(--font-manrope), ui-sans-serif, sans-serif`.
* Sets default metadata ("Open Arms & Heart Services | Care that comes from the heart"; a `%s | Open Arms & Heart Services` template), `themeColor` and optional Search Console verification.
* Injects **`MedicalBusiness` JSON-LD** with these fields:
  - name, URL, logo and description;
  - phone, fax and email;
  - founding year;
  - full postal address (Haines City, FL 33844);
  - `areaServed` (five counties plus Central Florida);
  - license identifiers;
  - an `OfferCatalog` of the six services.
* Renders a "Skip to content" link, `TopBar`, `Header`, `<main id="main">` and `Footer`, plus optional lazy GTM.

### 6.3 Redirects (`next.config.ts`)

Retired URLs redirect permanently (308): `/services/home-care` → `/services#home-care`, `/services/home-health` → `/services`, `/getting-started` → `/contact` and `/thank-you` → `/contact`.

---

## 7. Design system

### 7.1 Colour tokens (`@theme` in `globals.css`)

| Token | Value | Use |
| --- | --- | --- |
| `navy-900` / `ink` | `#172b48` | Headings, top bar, navy bands |
| `navy-950` | `#112039` | Copyright bar |
| `body` | `#435167` | Body text |
| `plum-700` | `#65318b` | Logo purple — buttons, links, eyebrows, accents |
| `plum-800` | `#522772` | Button hover |
| `plum-50` / `plum-100` | `#f8f5fb` / `#f0eaf5` | Lavender section backgrounds, trust strip |
| `blush-400` | `#ef8ab5` | Logo pink — accents on dark bands, "coming soon" rules |
| `cream` | `#faf8f5` | Hero and page-header backgrounds |
| `line` | `#e6e3eb` | Borders and dividers |

There are full `navy`, `plum` and `blush` scales for tints. Text on every background meets WCAG AA contrast.

### 7.2 Typography

| Element | Style |
| --- | --- |
| `h1` | League Spartan medium (500), UPPERCASE, 0.01 em tracking, 2 rem → 3 rem (home hero 3.3 rem), `text-balance` |
| `h2` | League Spartan medium, UPPERCASE, 1.65 rem → 2.05 rem |
| `h3` | Source Sans 3 bold, 1.25 rem |
| Body | Source Sans 3, 17 px / 1.7 line height |
| `.eyebrow` | 12 px, bold, uppercase, 0.18 em tracking, plum |
| `.lead` | 18–19 px intro paragraphs |
| Display accents | `font-display` (League Spartan) for the motto, service taglines, mission quote, step numbers and the owner's name |

### 7.3 Utilities (`@utility`)

| Class | Purpose |
| --- | --- |
| `wrap` | Centred container: max-width 1180 px, 16 px gutter on phones (28 px from `sm`) |
| `section` | Vertical section padding (64 px → 96 px) |
| `eyebrow`, `lead` | Text styles above |
| `btn`, `btn-primary`, `btn-outline`, `btn-light` | Buttons: 6 px radius, solid purple / outlined / white |
| `link-arrow` | Underlined purple text link (used with "→") |
| `card` | White, 1 px border, 8 px radius, soft shadow |
| `check-list` | List with CSS tick marks. Spacing is set where it's used (`space-y-*` or a grid gap). |

### 7.4 Interaction

Only quiet states: colour changes on links and buttons, a slight shadow and image zoom (3%) on service cards, a fading "Our services" dropdown, and native `<details>` accordions. `scroll-behavior: smooth` is disabled when the visitor has reduced motion turned on. Focus rings are a 3 px pink outline.

---

## 8. Pages — section by section

### 8.1 Home — `/` (mirrors the owner's mock-up)

| # | Section | Notes |
| --- | --- | --- |
| 1 | Top bar + header | "Compassionate care across Central Florida since 2017" · "Call our team: 321-217-2409" |
| 2 | Hero | "Care that comes from the heart." and the lead text, with the buttons "Find your care" (→ `/services`) and "Connect with our team →". Tagline: "Where there is love, there is life." The photo fills the right 60% on desktop and fades into cream; on phones it sits below the text. |
| 3 | Trust strip | The five credentials |
| 4 | Welcome | "At home. In the community. By your side." with three audience ticks, beside the "Finding care should feel less overwhelming." call panel |
| 5 | A personal approach | Photo, "Your family. Your goals. Our heart.", and links to the story and to contact |
| 6 | Our services | Six photo cards (number, name, tagline, "Explore services →") linking to `/services#slug` |
| 7 | Service areas | Navy band: Home Health counties and "all of APD's Central Region" |
| 8 | Coming soon | Skilled Home Health and PPEC |
| 9 | Careers | "Great Careers Change Lives." with a photo, linking to `/careers` |
| 10 | Coverage | Insurance list and note, screening and licenses, community resources |
| 11 | Next steps | "A simple path to support." — three steps |
| 12 | Contact band | Navy: "Let's find the support that feels right." with phone, form link and office details |

### 8.2 Our services — `/services`

- **Page header:** "Jump to a service" grid of the six services.
- **One section per service:** alternating backgrounds, and a photo that stays in view (sticky) on desktop. Each section has:
  - name, tagline and description;
  - the CBC Summer Respite Program block, for CBC only;
  - a "Services and support" tick list;
  - a closing note;
  - "Discuss your needs →" (`CareLink`, which pre-ticks that service in the form) and the phone number.
- **Then:** Coming soon, Coverage, and **Request more information** (`#request`) with the three steps beside the Google Form.

### 8.3 About us — `/about`

- **Page header:** "Your family. Your goals. Our heart."
- **Our story:** the owner's portrait with the four original About Us paragraphs.
- **Mission:** set as a pull quote.
- **Who we serve:** four photo cards (Children & families, Adults with disabilities, Seniors, Veterans), each linking to the matching service.
- **Licensed & trusted:** credentials and licenses.
- **Contact band.**

### 8.4 Careers — `/careers`

- **Page header:** "Great Careers Change Lives.", with "Apply online" (the agency's JotForm) and "Ask about current openings" (phone).
- **Positions:** Home Health Aide and Group Home Staff, each with an Apply button.
- **Requirements** and **The application asks for** cards, with the EEO/ADA note.
- **Contact band.**

### 8.5 FAQ — `/faq`

- **Page header.**
- **Topic sidebar** (sticky on desktop) with a "Still have questions?" call card.
- **13 questions** in four groups (Getting started, Our services, Coverage & licensing, Our caregivers), as native `<details>` accordions.
- **`FAQPage` JSON-LD.**
- **Contact band.**

### 8.6 Contact — `/contact`

- **Page header:** "Let's find the support that feels right."
- **Contact details:** cards for Call our team, Email, Fax, and Visit our office with "Get directions" (Google Maps search link), plus the licenses. The **Google Form** sits beside them (`#request`).
- **Next steps** and **service areas.**

### 8.7 404

The logo mark, "We couldn't find that page.", a link home and the phone number.

---

## 9. Component reference

| Component | Kind | Purpose |
| --- | --- | --- |
| `brand/Logo` | server | The client's logo (`/brand/logo.png`, 240×188) linking home. It's served through the image optimiser as AVIF/WebP at 1×/2× of its ~102px display width (`getImageProps`, no inline style). With `withName` the company name labels the link (visible from `xl`, screen-reader text below); otherwise the image alt does. |
| `layout/TopBar` | server | Navy strip with the since-line and phone number |
| `layout/Header` | client | Sticky header with a CSS hover/focus dropdown for services; mobile phone button and menu (closes on route change); active-link highlighting. The service list arrives as plain `{ href, label }` props from the root layout, so `lib/services.ts` never ships to the browser. |
| `layout/Footer` | server | Logo, description and licenses · Our services · Company (+ Apply online) · Visit or call (phone, fax, email, address, directions) · resources row · navy copyright bar with "With compassion. With dignity. With open arms." |
| `ui/Photo` | server | Photo built on `getImageProps`. It uses real width/height from `lib/photos.ts` and requires `sizes`. It outputs AVIF/WebP `srcset` at quality 60; the fallback `src` is the 828px variant (what crawlers download), not the largest. It adds no inline styles (a `bg-plum-100` placeholder). `preload` (LCP image only) adds a high-priority `<link rel=preload>` plus `fetchpriority="high"` and eager loading. Everything else is lazy. |
| `ui/Link` | server | `next/link` with `prefetch={false}` by default. Use it for every internal link (§18). |
| `ui/PageHeader` | server | Inner-page header: breadcrumb, eyebrow, H1, lead, optional actions, optional photo |
| `ui/SectionHeading` (+ `Lines`) | server | Eyebrow, heading and lead text. A `\n` in the title becomes a line break on desktop only. Takes `tone="light"` on dark bands and `as="h1"` where needed. |
| `sections/TrustStrip` | server | Five credentials with ticks on lavender |
| `sections/ServiceCards` | server | Six service photo cards |
| `sections/AreasBand` | server | Navy service-areas band |
| `sections/ComingSoon` | server | Skilled Home Health and PPEC |
| `sections/CareersFeature` | server | Photo and careers copy band |
| `sections/Coverage` | server | Insurance, screening and licensing, resources (`withResources`) |
| `sections/Steps` | server | Three steps (`className` sets the background) |
| `sections/ContactBand` | server | Navy contact band |
| `forms/GoogleForm` | client | Embedded Google Form (§11). Takes `formLabels` (slug → checkbox label) as a prop. |
| `forms/CareLink` | client | `<Link href="/contact#request">` that stores service slugs for prefill |

---

## 10. Content & data layer

All copy and facts live in `src/lib/`, never in components.

| File | Exports |
| --- | --- |
| `site.ts` | Everything below, plus derived helpers `addressLines`, `fullAddress`, `mapsUrl`, `licenseLine`, `sinceLine` and `nav`. |
| `services.ts` | `programs` (`slug`, `name`, `short`, `tagline`, `icon`, `image`, `imageAlt`, `intro`, optional `feature`, `points`, `note`, `formLabel`), `programBySlug`, `programHref`, `comingSoon` |
| `content.ts` | `mission`, `story` (4 paragraphs), `approach`, `audiences`, `insurances`, `insuranceNote`, `screening`, `steps`, `careersIntro`, `roles`, `requirements`, `applicationChecklist`, `resources` |
| `faqs.ts` | `faqs` (13), `faqCategories` (4). Answers are built from the published text above. |
| `photos.ts` | Generated `[width, height, averageColour]` for each file in `public/images` (§15.3) |
| `seo.ts` | `pageMetadata({ title, description, path, absoluteTitle? })`, which always includes the `/opengraph-image` card as `og:image` and `twitter:image` |
| `rich.tsx` | `rich(text)` renders `**phrase**` as `<strong>`; `plain(text)` strips the markers for JSON-LD, meta tags and `llms.txt` |

`site` itself holds:
- name, short name and description;
- tagline, motto and closing line;
- year founded and owner;
- the five credentials and the license numbers;
- phone, fax and email;
- the structured address;
- the JotForm application URL;
- the Google Form URL and services entry;
- the service areas and the areas note.

---

## 11. The inquiry form

The Contact and Services pages embed the agency's own **"Request More Information" Google Form** (`site.inquiryForm`), as the original website did. It asks for:
- First and Last Name\*
- Email\*
- Phone Number\*
- Services you are interested in\* (the six services, plus "Other")

Google handles validation, submission, the thank-you message and response storage. There is no server code.

* **Embed:** `…/viewform?embedded=true` in an iframe inside a `card`. An `IntersectionObserver` creates the iframe only when the form comes within 400px of the viewport, so Google's scripts (several MB) never compete with the page's own loading. A spinner sits underneath until the form paints. Below the form are "Open the form in a new tab" and the phone number.
* **Height:** a cross-origin iframe can't report its height, so it has fixed heights per breakpoint: `1660px`, then `1520px` from 420 px wide and `1420px` from 640 px. These leave room for Google's validation messages. Re-measure them if questions are added.
* **Pre-ticking:**
  - `CareLink` ("Discuss your needs →" on each service) saves service slugs in `sessionStorage` (`oa-care-programs`) and opens `/contact#request`.
  - `GoogleForm` reads them once and adds Google's prefill parameters (`usp=pp_url&entry.499657858=<formLabel>`).
* **CSP:** `frame-src` allows `https://docs.google.com`.
* **Notifications:** in Google Forms → Responses, turn on "Get email notifications for new responses".

> If the agency renames the form's checkbox options, update `formLabel` in `src/lib/services.ts` (prefill needs an exact match). If the Services question is recreated, update `site.inquiryForm.servicesEntry`.

---

## 12. SEO & AI discoverability

* **Per-page metadata:** every page uses `pageMetadata()`, which sets a unique title and description, a self-referencing canonical, and Open Graph / Twitter tags. The page `title` must be ≤ 31 characters, because the suffix adds 29. The home page uses an absolute title.
* **Structured data:** `MedicalBusiness` on every page (§6.2) and `FAQPage` on `/faq`.
* **Headings:** one `h1` per page (the hero or `PageHeader`), with no skipped levels.
* **Crawlable FAQ answers:** they live in native `<details>`, so the text is in the HTML.
* **One URL per page:** `CareLink` uses `sessionStorage` instead of query strings, so there are no duplicate URLs.
* **Sitemap and robots:** `/sitemap.xml` lists the six pages with priorities. `robots.txt` allows everything except `/api/`.
* **Social card:** `/opengraph-image` is generated at build time on a cream background. It shows "Care that comes from the heart.", the logo, the name and the phone number. `pageMetadata()` lists it explicitly on every page, because a page-level `openGraph` object replaces the parent's.
* **Emphasis:** each page marks its key terms with `<strong>` via `rich()` (e.g. *non-medical support*, *ages 0–17*, *Level 2 background screening*, the "**Yes.**"/"**No.**" that open FAQ answers).
* **Anchors:** descriptive link text ("Ask about APD Services", "How to apply as a Home Health Aide", "Careers & open positions"). No two links on a page share the same anchor text, and every image-only link has alt text.
* **`/llms.txt`:** a plain-text summary for AI answer engines. It includes the credentials, mission, contact details, every service with its full copy, coming-soon programs, coverage, next steps, pages, resources and all FAQs.
* **Images:** descriptive `alt` text on every content photo; decorative images use `alt=""`.

---

## 13. Performance & accessibility

**Performance**
* Every page is static and cached on the CDN.
* Very little client JavaScript (§2), and no animation libraries. Client components receive plain-data props, so no content modules end up in the bundle.
* **No automatic link prefetching** (`ui/Link`). This avoids a background `?_rsc=` request for every link in view. Navigation between the small static pages is still instant.
* **Images:**
  - AVIF/WebP at quality 60;
  - a short width ladder (`deviceSizes` 640/828/1080/1280/1600, `imageSizes` 384);
  - exact `sizes` on every photo;
  - a fallback `src` at 828px;
  - lazy loading everywhere except the LCP image.

  The LCP image (home hero or page-header photo) is preloaded at high priority.
* **Logo and icons:** the logo source is a pre-compressed 8 KB PNG served as AVIF/WebP by the optimiser; the favicon is a 4 KB PNG. The 404 page's logo is `loading="lazy"`, so React doesn't preload it on every page.
* **Fonts:** League Spartan and Source Sans 3 are preloaded with `display: swap`; Manrope is declared but never downloaded unless League Spartan fails.
* **Google Form:** the iframe is created only when it scrolls near the viewport (§11).
* **Tailwind** scans only `src/` (`@import "tailwindcss" source("../")`), so class names mentioned in the docs don't generate CSS.

**SiteChecker audit (2026-10-25) — what was fixed**

| Finding | Fix |
| --- | --- |
| LCP (critical) / images over 100 KB | Lean `<Photo>` pipeline (above). Mobile Lighthouse A/B on the same machine: page weight −20–25% on every page (Contact 4.9 MB → 0.26 MB); LCP About 2.46 s → 1.88 s, Home 2.79 s → 2.55 s |
| JS console errors (`net::ERR_FAILED`) | Normal page loads produce **zero** console errors. The crawler blocks heavy resources (images, fonts, media) to crawl faster, and every blocked request logs `net::ERR_FAILED`. Reproduced exactly with request blocking in headless Chrome. The site keeps the count low by requesting as little as possible: no `?_rsc=` prefetches (`ui/Link`), and no auto-preload of the 404 page's logo (React preloads any non-lazy `<img>`, and the 404 boundary ships in every page's payload) |
| TBT / INP, JS over 25 KB | Header no longer bundles the services data; the Google Form loads on demand. The remaining >25 KB scripts are the Next.js/React framework chunks |
| Internal link with no anchor text / image link with no alt | Mobile call button has screen-reader text; footer logo has an alt |
| og:image missing on inner pages | Added to `pageMetadata()` |
| Identical headings | "Services and support" labels are no longer headings; ContactBand and footer headings renamed |
| No `<strong>` | `rich()` emphasis on every page |
| Inline style attributes | None in the site's markup (they came from `next/image`). The one left in the hydrated DOM is `<next-route-announcer style="position:absolute">`, Next.js's built-in screen-reader route announcer, injected at runtime |
| More than 2 links with the same anchor; one-word anchors; more than 10 external links | Unique "Ask about …" anchors; "Contact us"; home Coverage no longer repeats the footer's resource links; career role buttons link within the page. The one-word nav labels "Careers" and "FAQ" and the breadcrumb "Home" carry visually hidden context ("Careers and open positions", "FAQ — frequently asked questions", "Home page") via `nav[].hint` / `sr-only` |
| Raw `<img>` bypasses the optimizer / legacy-format images (2nd audit) | Both were the logo PNG. `Logo` now goes through the optimizer (`getImageProps`, AVIF/WebP at 1×/2× via `imageSizes` 128/256), still with no inline style |
| Likely LCP image lazy-loaded on `/services` (2nd audit) | The first service photo is `preload`ed (high priority, eager) |
| LCP / INP still flagged in the 2nd audit | That audit's Core Web Vitals block is cached ("7 measurements · cached") and repeats the first audit's numbers. Fresh mobile Lighthouse on the deployed site after the fixes: LCP 1.5–1.9 s on every page (Home 1.54 s, Contact 1.49 s, Services 1.77 s, About 1.80 s, FAQ 1.94 s), TBT 23–159 ms, performance 96–100 |
| Text-to-code ratio < 10% | HTML trimmed 8–17% per page (shorter `srcset`s, CSS ticks instead of inline SVG, slimmer JSON-LD). The rest is Next.js's inline RSC payload, which can't be turned off; it isn't padded with filler text, as the audit itself advises |
| CSS over 15 KB | 42 KB raw / ~8 KB gzipped, made up entirely of used utilities. Lighthouse reports no render-blocking cost |
| No GTM, GA4 / Search Console not connected, no social links | Need the client's accounts: set `NEXT_PUBLIC_GTM_ID` (§4) and connect Search Console. Social links were removed because they aren't in either content source (§16); re-add them once the client confirms the profiles |
| Mailto/tel links, fewer than 10 internal backlinks | Intentional / structural (six-page site) |

**Accessibility**
* Skip link, semantic landmarks (`header`, `nav`, `main`, `footer`, `address`) and breadcrumbs marked with `aria-current`.
* Keyboard-reachable dropdown (`:focus-within`). The mobile menu button has `aria-expanded` and `aria-controls`.
* Visible 3 px focus rings, AA contrast throughout, 44 px minimum tap targets on mobile controls.
* Reduced motion: smooth scrolling and transitions are switched off when the visitor asks for less motion.
* The layout works from 320 px wide with no horizontal scrolling. This was checked at 390 px and 1440 px.

---

## 14. Security

HTTP headers from `next.config.ts`, applied to every route:

| Header | Value |
| --- | --- |
| `Content-Security-Policy` | `default-src 'self'`; `script-src 'self' 'unsafe-inline'` (Next bootstrap + JSON-LD; nonces would force dynamic rendering) + `vercel.live` (+ GTM when set; `'unsafe-eval'` in dev only); `frame-src https://docs.google.com https://vercel.live`; `form-action 'self'`; `frame-ancestors 'self'`; `object-src 'none'`; `base-uri 'self'`; `upgrade-insecure-requests` (production) |
| `X-Frame-Options` | `SAMEORIGIN` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), browsing-topics=()` |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `Cross-Origin-Opener-Policy` | `same-origin` |

`X-Powered-By` is removed. There are no API routes and no server secrets. External links use `rel="noopener noreferrer"`.

> **Any new third-party service (chat widget, booking tool, analytics, map embed) must be added to the CSP in `next.config.ts`,** or the browser will block it.

---

## 15. How-to guides

### 15.1 Change contact details, address or service areas
Edit `src/lib/site.ts`. The values flow into:
- the top bar, header, footer and contact band;
- the Contact page and FAQs;
- the JSON-LD, `llms.txt` and the social image.

Record where any new fact came from in `docs/` (§16).

### 15.2 Edit a service
Edit its entry in `programs` (`src/lib/services.ts`). A service there automatically appears in:
- the header dropdown and mobile menu;
- the footer;
- the home cards and the Services page;
- the form pre-ticking;
- the JSON-LD and `llms.txt`.

To add a seventh service, also add its slug to `ProgramSlug` and add a matching option to the Google Form.

### 15.3 Add or replace a photo
1. Put a JPG (about 1600 px wide, around 250 KB) in `public/images/`.
2. Regenerate `src/lib/photos.ts`, which stores each image's width, height and average colour. Any small script that reads them works; Python/Pillow was used:
   ```python
   from PIL import Image; im = Image.open(path).convert("RGB")
   w, h = im.size; r, g, b = im.resize((1, 1), Image.LANCZOS).getpixel((0, 0))
   ```
3. Use `<Photo src="/images/name.jpg" alt="…" sizes="…" />` inside a positioned parent with a size or aspect ratio. Add `preload` only if it's the page's largest above-the-fold image.
4. When *replacing* a photo, use a **new file name**, so CDN and image-optimiser caches can't serve the old one.
5. Add the source to §20.

### 15.4 Add an FAQ
Append to `faqs` in `src/lib/faqs.ts`, using approved wording. It appears on `/faq`, in the FAQ JSON-LD and in `llms.txt`.

### 15.5 Change careers content
Edit `careersIntro`, `roles`, `requirements` and `applicationChecklist` in `src/lib/content.ts`. Applications go to `site.applicationUrl` (the JotForm).

### 15.6 Add a page
1. Create `src/app/<route>/page.tsx` and export `metadata = pageMetadata({...})`.
2. Start the page with `<PageHeader>`.
3. Add the route to `nav` in `site.ts` if it belongs in the menu, to `sitemap.ts`, and to the Pages list in `llms.txt/route.ts`.

---

## 16. Content sources & pre-launch checklist

**Sources, in priority order:**
1. **The owner's mock-up and feedback** (2026-10-24) — [`docs/client-mockup-content.md`](docs/client-mockup-content.md). This provided:
   - the Haines City address;
   - the five credentials;
   - the service taglines;
   - the CBC Summer Respite Program;
   - "Coming soon" (Skilled Home Health and PPEC);
   - the corrected insurance names;
   - "all of APD's Central Region";
   - the next steps;
   - the careers copy.
2. **The agency's original website**, openarmsandheart.org, plus the forms it links to — [`docs/original-site-content.md`](docs/original-site-content.md). This provided:
   - the full service descriptions and lists;
   - the owner's story and the mission;
   - the licenses and email;
   - the JotForm positions and requirements;
   - the resources.

Section headings and button labels are UI framing; they add no new claims. **Don't add facts, statistics, testimonials, hours or services that aren't in these records.** When the client approves new content, record it in `docs/` first.

**Confirm with the client before launch:**
- [ ] **Ms. Lynn's website** — get the link so its style can be reviewed.
- [ ] **Photos** — all are licensed stock except the owner's portrait. Real photos of the team (with permission) would make the site even more personal.
- [ ] **APD areas** — the site says "Serving all of APD's Central Region", as the mock-up does. The original site listed Orange, Brevard, Sumter, Lake, Polk and Highlands.
- [ ] **Careers** — the mock-up asks people to contact the office about openings. The site also keeps the online JotForm application from the original site.
- [ ] **Email address** — openarmsandheartservices@gmail.com, from the original site. It wasn't in the mock-up.
- [ ] **Google Form** — submit one test inquiry on the live site and confirm it arrives.

---

## 17. Deployment

The project deploys to **Vercel** with no extra configuration.

1. Import the GitHub repository into Vercel. The framework is detected as Next.js; the build command is `npm run build`.
2. Push to `main` to deploy.
3. Add the custom domain, set `NEXT_PUBLIC_SITE_URL` to it, and redeploy.
4. Verify the domain in Google Search Console (`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`) and submit `https://<domain>/sitemap.xml`.
5. Run PageSpeed Insights against the live domain.

Any Node host works too (`npm run build && npm start`); the security headers come from `next.config.ts`.

---

## 18. Conventions & gotchas

* **Keep it calm.** The client asked for a less busy site. Don't reintroduce scroll-driven animation, marquees, parallax, glow or tilt effects, or smooth-scroll libraries. Use hover colour changes and a simple layout instead.
* **Content lives in `src/lib/`** and must trace to `docs/` (§16).
* **Metadata:** always use `pageMetadata()`. Keep `title` ≤ 31 characters and descriptions ≤ 155.
* **Images:** always use `<Photo>` with an accurate `sizes`. Use `preload` only for the LCP image. Give replacement images new file names. If you add another quality value, also add it to `images.qualities` in `next.config.ts`.
* **Links:** import `Link` from `@/components/ui/Link` (no prefetch), never `next/link` directly.
* **Emphasis:** wrap a passage's key term in `**…**` in `src/lib/` and render it with `rich()`. Use `plain()` anywhere the text leaves HTML (JSON-LD, metadata, `llms.txt`).
* **Client components** get plain data via props. Don't import `lib/services.ts` or `lib/content.ts` into a `"use client"` file.
* **Headings:** one `h1` per page. Section titles use `SectionHeading`; put `\n` in a title for a desktop-only line break.
* **Client components** must not receive icon components or functions from Server Components. Client components import data from `src/lib/` themselves, as `Header` does.
* **`check-list`** has no built-in spacing. Pair it with `space-y-*` or a grid gap.
* **Windows:** see §3.3. Don't use `npx next`.
* **Quality gate:** `npm run build` (strict TypeScript and pre-rendering). There is no lint or test tooling.

---

## 19. Project history

| Milestone | Summary |
| --- | --- |
| *first commit* | Initial build: brand research, all pages, motion-heavy design system, forms, SEO basics |
| *SEO Optimization* | Technical SEO audit fixes (metadata, CSP, image sizing, `llms.txt`, contrast, crawlable accordions) |
| *Mobile version fixes* | Mobile adaptations of the interactive sections |
| *Content from original website* | Content rebuilt around openarmsandheart.org; agency's Google Form, JotForm, insurances, licenses, owner story |
| *Verified content only* | Original site captured in `docs/original-site-content.md`; all unverified facts and pages removed; redirects added |
| *Embedded Google Form* | Agency's own Google Form embedded with prefill; custom form, `/api/contact` and `/thank-you` removed; fully static |
| *Clean redesign* | Per the owner's feedback and mock-up: calm, professional layout and navigation; Source Serif 4 + Source Sans 3 (headings later changed to Varela); the client's real logo and favicons; 15 new photos reflecting the people served; mock-up content (Haines City address, credentials, taglines, CBC Summer Respite, coming-soon programs, corrected insurance names, steps, careers copy); every motion effect, Lenis and the `motion` dependency removed; new `docs/client-mockup-content.md` |
| *Site-Optimization part ii* | SiteChecker audit of 2026-10-25: lean `<Photo>` pipeline and LCP preload, no-prefetch `Link`, on-demand Google Form, plain-data Header, static compressed logo and favicons, og:image on every page, unique headings and anchors, `<strong>` emphasis, no inline styles, fewer duplicate external links, Tailwind source scoping (§13) |
| *Second audit fixes* | Follow-up SiteChecker audit (71/100): logo through the image optimiser (AVIF/WebP), `/services` first photo preloaded, 404 logo no longer auto-preloaded on every page, screen-reader context for one-word nav and breadcrumb links; console errors and the route-announcer style identified as crawler / framework artefacts (§13) |
| **Heading font (this version)** | Client disliked the Source Serif headings. After trying Varela, all-caps headings, Helvetica/Arial and Geist, headings and other display text now use League Spartan with a Manrope fallback (medium weight); h1/h2 are in capitals |

---

## 20. Photo credits

The stock photos are from [Unsplash](https://unsplash.com) under the [Unsplash License](https://unsplash.com/license): free for commercial use, no attribution required. They are self-hosted in `public/images/` and should be replaced with the agency's own photography when it's available.

<details><summary>Source of each image (16 photos + logo)</summary>

| File | Source |
| --- | --- |
| `adult-wheelchair-community.jpg` | https://unsplash.com/photos/two-women-talking-in-a-gymnasium-c-LWLkJIV6Q |
| `careers-caregivers.jpg` | https://unsplash.com/photos/a-group-of-women-standing-next-to-each-other-ykiy5Zyv7k0 |
| `caregiver-companion.jpg` | https://unsplash.com/photos/a-man-and-woman-sitting-on-a-bench-9__g_UfBXOA |
| `family-game-night.jpg` | https://unsplash.com/photos/family-playing-board-games-VJVsEnR_vNE |
| `friends-smiling.jpg` | https://unsplash.com/photos/two-women-pose-arm-in-arm-smiling-LTgaxUAGNUk |
| `grandmother-granddaughter.jpg` | https://unsplash.com/photos/woman-in-blue-tank-top-wearing-eyeglasses-smiling-Ig4-rFIl7as |
| `hero-home.jpg` | https://unsplash.com/photos/a-man-and-woman-sitting-on-a-couch-looking-at-a-tablet-UWZNnNQjraI |
| `nurse-home-visit.jpg` | https://unsplash.com/photos/a-doctor-checking-a-patients-blood-pressure-dcBO4nt4MRE |
| `senior-conversation.jpg` | https://unsplash.com/photos/a-man-sitting-on-a-couch-talking-to-another-man-N5GljcLSmK4 |
| `service-apd.jpg` | https://unsplash.com/photos/a-man-in-a-wheel-chair-in-a-kitchen-75xbITy2szk |
| `service-cbc.jpg` | https://unsplash.com/photos/girl-running-while-laughing-xtd3zYWxEs4 |
| `service-home-care.jpg` | https://unsplash.com/photos/a-man-and-a-woman-in-a-living-room-HscUZd52tQk |
| `service-veterans.jpg` | https://unsplash.com/photos/two-men-talking-one-wears-a-veteran-hat-ydAyN8eRIDw |
| `service-vulnerable-adult.jpg` | https://unsplash.com/photos/an-old-man-and-a-young-woman-are-smiling-c4Fl1BKDJLQ |
| `live-scan.jpg` | https://images.unsplash.com/photo-1585079374502-415f8516dcc3 |
| `founder-shantana-johnson.jpg` | **Client-owned** — from the agency's original website (About Us) |
| `public/brand/logo.png`, `logo-640.png`, `logo-mark.png`, `src/app/icon.png`, `apple-icon.png` | **Client-owned** — the agency's logo (from the owner's mock-up files) |

</details>

---

© Open Arms & Heart Services Inc. All rights reserved. Website code prepared for the client; brand assets, names and business information belong to Open Arms & Heart Services Inc.
