# Open Arms & Heart Services Inc. — Website

> Production marketing website for **Open Arms & Heart Services Inc.**, a family-oriented Central Florida agency — a **Licensed Florida Home Health Agency** and **APD Central Region Provider** offering non-skilled home care, APD services, skilled home health, DCF/CBC referral support, veterans respite and Live Scan fingerprinting.
>
> **Content** comes from the agency's original website (openarmsandheart.org); **design and interactions** are this project's. See §21.

| | |
| --- | --- |
| **Live (preview)** | https://open-arms-heart-services.vercel.app |
| **Repository** | https://github.com/mtahaarif/Open-Arms-Heart-Services |
| **Framework** | Next.js 16 (App Router, Turbopack) · React 19 · TypeScript 5 |
| **Styling** | Tailwind CSS v4 (CSS-first `@theme` config) |
| **Motion** | Motion (Framer Motion successor) v14 · Lenis smooth scroll |
| **Hosting** | Vercel (static pre-rendering + one serverless function) |
| **Email delivery** | Resend (HTTP API, no SDK) |

---

## Table of contents

1. [Project overview](#1-project-overview)
2. [Technology stack](#2-technology-stack)
3. [Getting started](#3-getting-started)
4. [Environment variables](#4-environment-variables)
5. [Project structure](#5-project-structure)
6. [Architecture](#6-architecture)
7. [Routes & pages — section by section](#7-routes--pages--section-by-section)
8. [Component reference](#8-component-reference)
9. [Content & data layer](#9-content--data-layer)
10. [Design system](#10-design-system)
11. [Motion & interaction catalogue](#11-motion--interaction-catalogue)
12. [Responsive behaviour](#12-responsive-behaviour)
13. [Forms & the contact pipeline](#13-forms--the-contact-pipeline)
14. [SEO & AI discoverability](#14-seo--ai-discoverability)
15. [Performance](#15-performance)
16. [Accessibility](#16-accessibility)
17. [Security](#17-security)
18. [How-to guides (editing the site)](#18-how-to-guides-editing-the-site)
19. [Deployment](#19-deployment)
20. [Conventions & gotchas](#20-conventions--gotchas)
21. [Content sources & pre-launch verification](#21-content-sources--pre-launch-verification)
22. [Known limitations & future work](#22-known-limitations--future-work)
23. [Project history](#23-project-history)
24. [Photo credits](#24-photo-credits)

---

## 1. Project overview

### 1.1 The client

**Open Arms & Heart Services Inc.** has served Central Florida since **2017**. It is owned by **Shantana Johnson** and is a **Licensed Florida Home Health Agency** (Lic# 2999995365 · Lic# 235855) and an **APD Central Region Provider**. Its motto: *"Home Is Where The Heart Is — Where There Is Love, There Is Life."*

**Mission:** *To work in partnership with our consumers to help them achieve their goals of independence, productivity, and meaningful integration within their communities. We are committed to fulfilling the needs of our consumers with excellence and care.*

The office is at 1920 Verano Dr, Suite 105, Haines City, FL. The agency serves **9 counties**: Polk, Highlands, Hardee, Hillsborough and Manatee (home care), plus Orange, Brevard, Sumter, Lake, Polk and Highlands (APD Central Region).

### 1.2 What the site has to do

| Goal | How the site delivers it |
| --- | --- |
| Explain the types of care clearly | Seven programs presented with the agency's own wording, two dedicated pages (home care, skilled home health), and an interactive care finder |
| Generate enquiries | A phone CTA on every screen, a floating mobile call bar, care-request and job-application forms, and a referral panel for physicians |
| Recruit caregivers | A dedicated Careers page with six role descriptions and an application form |
| Build trust | Founder story and photo, mission, licenses, insurance accepted, background screening, service areas and FAQs |
| Rank in search and AI answers | Unique metadata, structured data (JSON-LD), sitemap, `llms.txt`, server-rendered content |
| Feel premium, not "template-like" | A distinct interaction pattern for almost every section (see §11) |

### 1.3 Types of care offered

The site is organised around **seven types of care** (`programs` in `src/lib/services.ts`). Six come word-for-word from the agency's original "Types of Care" page; Skilled Home Health comes from the client's service brief.

| # | Type of care | Where it lives |
| --- | --- | --- |
| 1 | Non-Skilled Home Health Services | `/services/home-care` (own page) + `/services#home-care` |
| 2 | Agency for Persons with Disabilities (APD) | `/services#apd` |
| 3 | Skilled Home Health | `/services/home-health` (own page) + `/services#home-health` |
| 4 | Vulnerable Adult Support Services / DCF Referrals | `/services#dcf` |
| 5 | Children & Family Support Services (CBC) | `/services#cbc` |
| 6 | Veterans Home Care & Respite Services (VA) | `/services#va` |
| 7 | Live Scan Fingerprinting & Background Screening | `/services#live-scan` |

The two dedicated pages break their program into individual services:

| Home Care — *Non-Skilled* (6) | Home Health — *Skilled* (6) |
| --- | --- |
| Personal Care | Skilled Nursing |
| Mobility & Transfer Assistance | Physical Therapy |
| Homemaker Services | Occupational Therapy |
| Companionship & Socialization | Speech Therapy |
| Respite Care | Medical Social Work |
| Pediatric & Disability Support | Home Health Aide Services |

The agency accepts **10 insurance plans**: Sunshine Health, Aetna, Florida Blue, Humana, Children's Medical Services, Molina, Integrated Simply, Optum (VA), UnitedHealthcare and Florida Community Care.

### 1.4 Brand

The colour palette, script wordmark and "hands holding a heart" mark come from the client's logo and Facebook banner: purple hands, a pink heart, and flowing purple-to-pink ribbons. The logo mark is redrawn as an SVG (`src/components/brand/Logo.tsx`), and the banner's swooshes appear as the animated `Ribbons` component.

---

## 2. Technology stack

| Package | Version | Role |
| --- | --- | --- |
| `next` | ^16.4.2 | App Router, static pre-rendering, Route Handlers, `next/image`, `next/font`, metadata API, `ImageResponse` |
| `react` / `react-dom` | ^19.3.1 | UI runtime |
| `typescript` | ^5.9.3 | Type checking (`strict: true`) |
| `tailwindcss` + `@tailwindcss/postcss` | ^4.3.3 | Utility CSS. Configuration lives **in CSS** (`@theme`, `@utility`) — there is no `tailwind.config.js` |
| `motion` | ^14.3.0 | Scroll-linked animation, layout animation, gestures, `AnimatePresence` |
| `lenis` | ^1.3.27 | Inertial smooth scrolling (`lenis/react`) |
| `lucide-react` | ^1.59.0 | Icon set (tree-shaken per icon) |

There are **no other runtime dependencies**. Email is sent with a plain `fetch` to the Resend REST API, and the Facebook and LinkedIn icons are inline SVG components.

**Fonts** (self-hosted at build time via `next/font/google`, so there are no runtime requests to Google):

| Font | CSS variable / utility | Used for |
| --- | --- | --- |
| Fraunces (normal + italic, variable weight) | `--font-display` / `font-display` | Headings, display numerals |
| Figtree | `--font-sans` / `font-sans` | Body copy, UI |
| Courgette (400) | `--font-script` / `font-script` | "Open Arms" logo wordmark |
| Quicksand (500, not preloaded) | `--font-tag` / `font-tag` | "& Heart Services Inc" logo tagline |

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

The project folder is called `Open Arms & Heart Services Inc`. On Windows, the `&` breaks the `node_modules/.bin/*.cmd` shims that `npx` and the default npm scripts rely on. The npm scripts therefore call Next's binary **directly**:

```json
"dev":   "node node_modules/next/dist/bin/next dev",
"build": "node node_modules/next/dist/bin/next build",
"start": "node node_modules/next/dist/bin/next start"
```

This works on every OS, including Vercel's Linux builders. **Don't use `npx next …` in this folder.** To run Next with extra flags, call it the same way, e.g. `node node_modules/next/dist/bin/next start -p 4000`.

---

## 4. Environment variables

Copy `.env.example` to `.env.local` for local work, or set the variables in **Vercel → Project → Settings → Environment Variables**.

| Variable | Required | Exposed to browser | Purpose |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Yes | Canonical base URL for canonicals, `og:url`, the sitemap, `robots.txt`, JSON-LD and `llms.txt`. If unset, falls back to `VERCEL_PROJECT_PRODUCTION_URL` (set automatically by Vercel), then `http://localhost:3000`. |
| `RESEND_API_KEY` | Optional | No | API key from [resend.com](https://resend.com). Adds an email copy of each inquiry (the Google Form channel works without it). |
| `CONTACT_TO_EMAIL` | Optional | No | Recipient(s) of the email copy. Separate several addresses with commas. |
| `GOOGLE_FORM_DISABLED` | Optional | No | Set to `true` to stop forwarding inquiries to the agency's Google Form (e.g. for local testing). |
| `CONTACT_FROM_EMAIL` | Optional | No | Verified sender, e.g. `Open Arms Website <website@yourdomain.com>`. Defaults to Resend's `onboarding@resend.dev` test sender. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional | Yes | Google Search Console HTML-tag verification code (just the `content` value). Adds `<meta name="google-site-verification">`. |
| `NEXT_PUBLIC_GTM_ID` | Optional | Yes | Google Tag Manager container ID (`GTM-XXXXXXX`). When set, GTM loads lazily *and* the Content-Security-Policy opens up for GTM / Google Analytics domains. When unset, no tracking code exists on the site at all. |

> **Inquiries work out of the box.** Every submission is forwarded to the agency's existing Google Form, so it lands in the same response sheet the old website used. Resend is an optional second channel. See §13.

---

## 5. Project structure

```
.
├── public/
│   └── images/                     31 optimised stock photos (Unsplash licence, ≈8.8 MB source)
├── src/
│   ├── app/                        ── Next.js App Router ──
│   │   ├── layout.tsx              Root layout: fonts, global metadata, MedicalBusiness JSON-LD,
│   │   │                           shared logo SVG defs, providers, header/footer, optional GTM
│   │   ├── template.tsx            Route-transition "curtain" (re-mounts on every navigation)
│   │   ├── globals.css             Tailwind v4 theme, design tokens, utilities, keyframes
│   │   ├── page.tsx                Home  (/)
│   │   ├── about/page.tsx          /about
│   │   ├── services/page.tsx       /services
│   │   ├── services/home-health/   /services/home-health
│   │   ├── services/home-care/     /services/home-care
│   │   ├── getting-started/        /getting-started
│   │   ├── careers/                /careers
│   │   ├── faq/                    /faq   (+ FAQPage JSON-LD)
│   │   ├── contact/                /contact
│   │   ├── thank-you/              /thank-you  (no-JS form landing page, noindex)
│   │   ├── not-found.tsx           Branded 404
│   │   ├── api/contact/route.ts    POST endpoint → Resend email
│   │   ├── llms.txt/route.ts       /llms.txt for AI answer engines
│   │   ├── sitemap.ts              /sitemap.xml
│   │   ├── robots.ts               /robots.txt
│   │   ├── opengraph-image.tsx     Generated 1200×630 social-share image
│   │   └── icon.svg                Favicon (logo mark on a rounded tile)
│   ├── components/
│   │   ├── brand/                  Logo (wordmark + SVG mark + shared defs), Ribbons, Aurora
│   │   ├── forms/                  InquiryForm, CareLink
│   │   ├── layout/                 Header, Footer, Providers, SmoothScroll, Chrome
│   │   │                           (ScrollProgress + MobileCallBar), BackToTop
│   │   ├── sections/               Page sections (shared ones at the root of this folder)
│   │   │   ├── home/               Hero, CrossMarquee, PillarsReveal, Manifesto, AudienceBento
│   │   │   ├── services/           ConnectedSteps,
│   │   │   │                       ServiceScrollspy, HoverRevealGrid, DayTimeline, RespiteSpotlight
│   │   │   ├── about/              AboutSections (StoryChapters, NameMeaning, FounderSpotlight,
│   │   │   │                       FlipPromises, PhotoMarquee)
│   │   │   ├── started/            StartedSections (StoryStepper, ReadyChecklist, ReferralPanel)
│   │   │   ├── careers/            CareersClient
│   │   │   └── faq/                FaqExplorer
│   │   └── ui/                     Primitives: motion helpers, PageHero, SectionIntro, Photo,
│   │                               GlowCard, Marquee, Accordion, CssSplitHeading, SocialIcons
│   └── lib/                        ── Content & helpers (no UI) ──
│       ├── site.ts                 Company facts, nav, service areas
│       ├── services.ts             Seven programs, two pillars (12 services), home highlights
│       ├── content.ts              Steps, audiences, promises, care-finder needs, insurances,
│       │                           checklist, day timeline, job roles, requirements
│       ├── faqs.ts                 13 FAQs in 4 categories
│       ├── photos.ts               Generated: intrinsic size + average colour per photo
│       ├── seo.ts                  pageMetadata() helper
│       └── rich.tsx                **bold** → <strong> renderer
├── next.config.ts                  Image config + security headers / CSP
├── postcss.config.mjs              Tailwind v4 PostCSS plugin
├── tsconfig.json                   Strict TS, "@/*" → "./src/*"
├── .env.example                    Documented environment variables
└── package.json
```

Around 6,700 lines of TypeScript/CSS across 75 source files.

---

## 6. Architecture

### 6.1 Rendering model

All content pages are **statically pre-rendered at build time** (○ in the build output). Only two routes run on demand (ƒ):

| Route | Type | Why |
| --- | --- | --- |
| `/`, `/about`, `/services`, `/services/home-health`, `/services/home-care`, `/getting-started`, `/careers`, `/faq`, `/contact` | Static | Served from the CDN edge cache; full HTML for crawlers |
| `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/opengraph-image`, `/icon.svg` | Static | Generated once at build time |
| `/api/contact` | Dynamic (serverless) | Handles form submissions |
| `/thank-you` | Dynamic | Reads `?status=` to show success or error |

**Server vs client components.** Page files (`app/**/page.tsx`) are Server Components. They export metadata and compose sections. Interactive sections are Client Components (`"use client"`), but they are still **server-rendered to HTML first**, so every word of copy is in the initial response. This was verified by an SEO audit that reported "11 of 11 pages readable without JavaScript". Purely presentational components with no hooks stay as Server Components: `Marquee`, `CrossMarquee`, `AudienceBento`, `AreasServed`, `FaqPreview`, `InsuranceSection`, `ResourcesSection`, `Photo`, `SocialIcons`, `Footer` and `not-found`.

**Data across the server/client boundary.** Service objects carry Lucide icon components, and components can't be serialised as props. Client components therefore take a **slug** (`<HorizontalServices slug="home-health" />`) and import the data themselves, rather than receiving the object from a server page.

### 6.2 Request lifecycle of a page

```
Browser ──► Vercel CDN (static HTML, fonts, /_next/image AVIF/WebP)
             │
             ├─ HTML paints immediately: hero text + lead image animate in with pure CSS
             │
             └─ JS hydrates ─► Providers
                               ├─ MotionConfig reducedMotion="user"
                               └─ SmoothScroll (Lenis, unless reduced motion)
                                    ├─ ScrollProgress  (top bar)
                                    ├─ Header          (glass nav, mega menu, mobile menu)
                                    ├─ <main> ─► template.tsx (route curtain) ─► page sections
                                    ├─ Footer
                                    └─ MobileCallBar   (phones only)
```

### 6.3 Root layout (`src/app/layout.tsx`)

* Loads the four fonts with `display: "swap"`; Quicksand is not preloaded because it only renders a small tagline.
* Global `metadata`: `metadataBase`, title template `%s | Open Arms & Heart Services`, default title and description, Open Graph site name and locale, Twitter card, and optional Google verification.
* `viewport.themeColor = #60349f` (iris-700), which tints the mobile browser chrome.
* Renders **`<LogoDefs />`** once: a hidden SVG holding the logo's gradients and finger-gap mask. Every `<LogoMark>` references these shared IDs, so logos cloned inside marquees never create duplicate HTML `id`s.
* Injects **`MedicalBusiness` JSON-LD**: name, URL, description, phone, fax, founding date, founder, postal address, email, slogan, `areaServed` (9 counties), `sameAs` (Facebook, LinkedIn), identifiers (NPI + both Florida license numbers), and an `OfferCatalog` of the seven types of care.
* Optionally injects **Google Tag Manager** (`strategy="lazyOnload"`) plus its `<noscript>` iframe, but only when `NEXT_PUBLIC_GTM_ID` is set.
* Includes a skip link target: `<main id="main">`.

### 6.4 Route transitions (`src/app/template.tsx`)

`template.tsx` re-mounts on every navigation (unlike `layout.tsx`). On **client-side navigations only**, an iris-to-blush gradient curtain carrying the logo covers the screen. It then wipes upward with `clip-path: inset(0 0 100% 0)` over 0.85s, while the new page content rises 40px and fades in. The first page load and the server render skip the curtain: a module-level `hasNavigated` flag is set in `useEffect`, so the curtain never delays the initial paint or causes a hydration mismatch.

### 6.5 Smooth scrolling (`src/components/layout/SmoothScroll.tsx`)

* `ReactLenis root` with `lerp: 0.1`, `smoothWheel`, and anchor-link handling offset by **−110px** so the fixed header never covers a target.
* `ResetOnRouteChange` jumps to the top on each pathname change, unless the URL has a `#hash`.
* **Disabled entirely** when the user prefers reduced motion (native scrolling is used).
* Elements marked `data-lenis-prevent` (mobile menu) or `data-lenis-prevent-horizontal` (comparison table) scroll natively.
* The header calls `lenis.stop()` / `start()` to lock scrolling while the mobile menu is open. Careers uses `lenis.scrollTo()` to glide to the application form, and BackToTop uses it to return to the top.

### 6.6 Global chrome

| Component | File | Behaviour |
| --- | --- | --- |
| `ScrollProgress` | `layout/Chrome.tsx` | 3px gradient reading-progress bar fixed to the top. `scaleX` follows `scrollYProgress` through a spring. |
| `MobileCallBar` | `layout/Chrome.tsx` | Phones and tablets (`< lg`). A glass pill with **Call** and **Request care** buttons that springs up from the bottom once the page has scrolled past 520px. |
| `Header` | `layout/Header.tsx` | See §8.3. |
| `Footer` | `layout/Footer.tsx` | See §8.3. |

---

## 7. Routes & pages — section by section

Every inner page opens with the shared **`PageHero`** (breadcrumb, eyebrow, word-split headline, lead paragraph, CTAs and a two-photo parallax collage) and most end with **`CtaBand`**. The **pattern** column links each section to the interaction catalogue in §11.

### 7.1 Home — `/`

| # | Section | Component | Content (source) & pattern |
| --- | --- | --- | --- |
| 1 | Hero | `home/Hero.tsx` | "**Home is where the heart is.** *Where there is love, there is life.*" plus the original home-page paragraph ("Caring for a developmentally disabled family member or senior…"), from the old site. CSS-first entrance, mouse parallax, arch photo, floating glass cards (Non-Skilled Services, APD Central Region), rotating text badge, and credential ticks. |
| 2 | Crossing marquees | `home/CrossMarquee.tsx` | Type-of-care and service names, plus brand values. Infinite crossing ribbons. |
| 3 | What we provide | `home/PillarsReveal.tsx` | The old home page's three highlights — **Companion Care, Residential, Personal Support** — as expanding hover panels on desktop and a snap carousel on mobile. |
| 4 | Our mission | `home/Manifesto.tsx` | The agency's **mission statement**, scroll-scrubbed word by word. Count-up stats: since 2017, 7 types of care, 9 counties, 10 insurance plans. |
| 5 | Types of care | `sections/HorizontalServices.tsx` | All seven programs on a **pinned horizontal scroll**. |
| 6 | Questions families ask first | `sections/StackingCards.tsx` | The old home page's four Q&As (types of care, background checks, insurance with plan chips, licensing with license numbers) as **sticky stacking cards**. |
| 7 | Care finder | `sections/CareChooser.tsx` | 13 needs mapped to the seven programs. Its CTA pre-ticks the matching services in the form. |
| 8 | How care begins | `sections/StickySteps.tsx` | Reach out → eligibility → person-centered plan → care begins (grounded in the old site's wording). Sticky tracker, with a pinned progress bar on mobile. |
| 9 | Who we care for | `home/AudienceBento.tsx` | Seniors, veterans, people with developmental disabilities, children & foster families, family caregivers. Bento grid. |
| 10 | Where we serve | `sections/AreasServed.tsx` | The two published county groups (home care · APD Central Region). |
| 11 | FAQ preview | `sections/FaqPreview.tsx` | FAQs not already covered by the stacking cards. |
| 12 | CTA | `sections/CtaBand.tsx` | "Open Arms & Heart Services is **only a call away!**", from the old site. |

### 7.2 About — `/about`

| Section | Component | Details |
| --- | --- | --- |
| Hero | `PageHero` | "Care rooted in *family.*" The inset photo is the **real photo of Shantana Johnson** from the old site. |
| Story | `StoryChapters` | Sticky image story. Four chapters adapted from the founder's story on the original About page: her grandmother's devotion, a living legacy, person-centered care since 2017, and every person treated like family. |
| Mission | `NameMeaning` | Sliding "Open Arms / & Heart" typography, now captioned with the agency's **Our Mission** statement. |
| Founder | `FounderSpotlight` | The founder photo in a rotating gradient border, plus a bio from the old site and credential chips. |
| Promises | `FlipPromises` | Four 3D flip cards. |
| Gallery | `PhotoMarquee` | Two opposite-direction photo rows. |

### 7.3 Services overview — `/services`

Named **"Types of Care"** in the navigation, matching the original site.

| Section | Component | Details |
| --- | --- | --- |
| Hero | `PageHero` | The original Types of Care intro ("Providing care for a family member with developmental disabilities…"). |
| Credentials strip | inline | Licensed FL Home Health Agency · APD Central Region Provider · since 2017 · license numbers. |
| Programs | `ServiceScrollspy source="programs"` | All seven programs with the old site's full copy (intro, "Services and support" list, fine print). A scroll-spy sidebar and parallax images; each has an "Ask about …" CareLink, and dedicated pages are linked. |
| Care finder | `CareChooser` | |
| Insurance | `InsuranceSection` | "Do you accept insurance? *Yes.*" Ten plan tiles (glow + tilt), funding notes (APD waiver, VA Community Care, coverage questions) and a plan marquee. |
| Request form | `InquiryForm` | Anchor `#request`, mirroring the old page's form at the bottom. |

### 7.4 Home Health — `/services/home-health`

| Section | Component | Details |
| --- | --- | --- |
| Hero | `PageHero` | "Clinical care, *brought home.*" `CareLink` pre-selects "Home Health" in the form. |
| How skilled care works | `services/ConnectedSteps.tsx` | Four numbered circles (Physician order → Clinical assessment → Plan of care → Visits & updates) joined by a gradient SVG line that **draws itself** (`pathLength` 0 → 1) while the steps pop in one after another. |
| Services | `services/ServiceScrollspy.tsx` | A **scroll-spy sticky sidebar** (desktop) lists the six services. The active one gets a sliding white highlight (`layoutId`) and a progress rail fills as you read; a "Have questions?" card sits below. Each service is a full article (`id` = slug, so footer and mega-menu deep links work): a parallax photo with icon and number, title, summary, a "What's included" list with staggered checkmarks, a dark "Who it helps" card, and an "Ask about …" `CareLink`. |
| CTA | `CtaBand` | "Coming home from the hospital? *We can help.*" |

### 7.5 Home Care — `/services/home-care`

| Section | Component | Details |
| --- | --- | --- |
| Hero | `PageHero` | "Everyday help, *with heart.*" with the original Non-Skilled Home Health Services intro. |
| Service cards | `services/HoverRevealGrid.tsx` | Six services from the original listing, as hover-reveal photo cards, plus a full-width CTA band listing the service counties. |
| A day of home care | `services/DayTimeline.tsx` | A scroll-drawn timeline using the same services. |
| Respite spotlight | `services/RespiteSpotlight.tsx` | Layered parallax photos and four benefit cards (children & foster families, APD respite, families & veterans, the caregiver). |
| CTA | `CtaBand` | |

### 7.6 Getting Started — `/getting-started`

| Section | Component | Details |
| --- | --- | --- |
| Hero | `PageHero` | "Starting care, *without the stress.*" |
| Four steps | `StoryStepper` | Auto-advancing story stepper. |
| What to have ready | `ReadyChecklist` | Program-aware checklist: insurance card, Waiver Support Coordinator, VA referral, case manager, routines, photo ID for Live Scan. |
| Insurance | `InsuranceSection` | |
| Referral partners | `ReferralPanel` | Case managers, social workers, Waiver Support Coordinators, CBC organisations and VA Community Care. |
| Resources | `ResourcesSection` | The old site's **community resources** (Florida 211, Dept. of Elder Affairs, APD, FloridaHealthFinder, Florida SHINE) as tilt + glow link cards. |
| Request form | `InquiryForm` | |

### 7.7 Careers — `/careers`

| Section | Component | Details |
| --- | --- | --- |
| Hero | `PageHero` | "Quality care. *Brighter tomorrows.*" — the original careers headline. **Apply now** opens the agency's online application. |
| Perks bento | `CareersClient` | "Join our care team!" photo card and four perk cards. |
| Requirements ticker | `CareersClient` | From the employment application: certifications, diploma/GED, Level 2 screening, drug & alcohol screening, references, 90-day introductory period. |
| Open positions | `CareersClient` | **Home Health Aide** and **Group Home Staff** (the positions on the agency's application). Accordion; content stays in the DOM. |
| Application | `CareersClient` | A dark panel listing what the application asks for, with a button to the agency's **JotForm employment application** (`site.applicationUrl`). That form collects the resume, certificates, education, employment history, references and e-signature, which a simple site form couldn't replace. |

### 7.8 FAQ — `/faq`

| Section | Component | Details |
| --- | --- | --- |
| Hero | `PageHero` | "Questions families *ask us most.*" |
| Explorer | `faq/FaqExplorer.tsx` | A **sticky glass sidebar** with live search (matches questions *and* answers, with a clear button) and category filters (All, Getting started, Services, Paying for care, Our caregivers) showing counts. The active filter pill slides between options. Results are grouped by category with animated enter and exit, and there's an empty state with the phone number. |
| CTA | `CtaBand` | "Didn't find your answer? *Just ask.*" |
| Structured data | — | `FAQPage` JSON-LD containing all 13 Q&As. |

### 7.9 Contact — `/contact`

| Section | Details |
| --- | --- |
| Hero | `PageHero` with photos — "We're here, *with open arms.*" |
| Contact cards | Glow cards for **Office** phone (large display number), **Email**, **Fax / referrals** and **Visit our office** (opens Google Maps), plus a **Licensed & trusted** card with credentials and license numbers. |
| Map | `MapFacade` — a lightweight illustrated placeholder (dotted grid, stylised streets, pin) with **Load interactive map** and **Open in Google Maps** buttons. The real Google Maps iframe (~1 MB of third-party script) only loads on click. |
| Social | Facebook and LinkedIn buttons. |
| Form | `InquiryForm` (sticky on desktop). Pre-selects the care type when the visitor arrived via a `CareLink`. |
| What happens next | Three numbered glow cards: We talk it through → We visit your home → Care gets started. |
| Quick answers | An accordion of four key FAQs, plus a "Communities we serve" panel listing every town as a chip. |

### 7.10 Utility routes

| Route | Details |
| --- | --- |
| `/thank-you` | Landing page for **form posts made without JavaScript**. `?status=error` shows an apology and the phone number. `robots: noindex, follow`. |
| 404 (`not-found.tsx`) | Branded page: a floating logo, a gradient italic "404", "This page wandered off.", a home link and the phone number. |
| `/sitemap.xml` | The nine public pages with priorities (home 1.0 · services 0.9 · getting-started/contact 0.8 · about 0.7 · careers/faq 0.6), `changeFrequency: monthly`. |
| `/robots.txt` | Allows everything except `/api/`, and points to the sitemap. |
| `/llms.txt` | See §14.6. |
| `/opengraph-image` | A 1200×630 PNG generated at build time with `ImageResponse`: dark iris → blush gradient, "Open Arms / & Heart Services Inc.", a tagline and the phone number. |
| `/icon.svg` | The favicon: the logo mark on a rounded paper-coloured tile. |

---

## 8. Component reference

### 8.1 UI primitives — `src/components/ui/`

| Component | Type | Purpose & API |
| --- | --- | --- |
| `Reveal` (`motion.tsx`) | client | Fade/rise into view once. Props: `delay`, `y`, `x`, `blur` (default **false**, for performance), `as` (`div`/`li`/`section`/`article`/`span`). Viewport margin −10%. |
| `Stagger` + `StaggerItem` | client | Container that staggers its children's entrances (`stagger`, `delay`). |
| `SplitHeading` | client | Below-the-fold headings: each word rises out of a mask with a slight rotation. Wrap a phrase in `*asterisks*` to give it the gradient italic accent. Sets `aria-label` to the full text and hides the word spans from screen readers. |
| `CssSplitHeading` | server | **Above-the-fold** version of the same effect using the CSS `word-rise` keyframe. Words stay painted while they move, so the H1 counts toward LCP immediately. |
| `Counter` | client | Counts from `from` to `to` when scrolled into view; renders the final value in the HTML. |
| `Magnetic` | client | Wrapper that pulls its child toward the cursor (spring, strength 0.35); mouse pointers only. |
| `EASE` | const | Shared easing curve `[0.16, 1, 0.3, 1]` (expo-out). |
| `PageHero` | client | Shared inner-page hero (see §7). Props: `eyebrow`, `title` (`*accent*`), `text` (`**bold**`), `crumbs`, `images` (`[lead, inset?]`), `children` (CTAs). The lead image gets `priority`. |
| `SectionIntro` | server | Eyebrow + `SplitHeading` + paragraph. Props: `align`, `dark`, `text` (string with `**bold**`, or a node). |
| `Photo` | server | Wrapper around `next/image` for cover-fit photos inside a positioned parent. Looks up intrinsic width/height and average colour in `lib/photos.ts`, emits real `width`/`height` attributes, and paints the colour as a placeholder. `sizes` is **required**. Falls back to `fill` for unknown images. |
| `GlowCard` | client | Polymorphic (`as` = any element or component, e.g. `Link`). Tracks the pointer into `--mx`/`--my` CSS variables to drive a radial gradient **border glow** plus an inner spotlight (see `.glow-card`). With `tilt`, the card rotates up to ±3° in 3D toward the cursor. |
| `Marquee` | server | Seamless infinite CSS marquee. Duplicates its children once (the second copy is `aria-hidden`) and translates by exactly half. Props: `duration`, `reverse`, `vertical`, `gap`, `pauseOnHover`. Edges fade out with a mask. |
| `Accordion` | client | Animated FAQ accordion. Each question is an `<h3><button aria-expanded aria-controls>`. **Every answer is always in the DOM**, collapsed with CSS grid rows and `inert` when closed. The plus icon rotates 135° into a ×. Props: `items`, `defaultOpen`, `dark`. |
| `SocialIcons` | server | Inline-SVG `FacebookIcon` and `LinkedInIcon` (brand icons aren't in Lucide). |

### 8.2 Brand — `src/components/brand/`

| Component | Purpose |
| --- | --- |
| `LogoDefs` | Hidden SVG with the shared gradients (`oa-logo-brand`, `oa-logo-light`) and the finger-gap mask (`oa-logo-gaps`). Rendered once in the root layout. |
| `LogoMark` | The hands-holding-heart mark: one hand path mirrored, a mask that cuts the finger gaps, and a stroked heart. `tone="brand"` (purple/pink) or `"light"` (white/pale pink) for dark backgrounds. |
| `Logo` | Mark + "Open Arms" (Courgette script) + "& Heart Services Inc" (Quicksand). Links home. The mark tilts and scales on hover. `compact` hides the tagline. |
| `Ribbons` | Four flowing SVG strokes in iris and blush gradients (echoing the Facebook banner) that **draw themselves** in when scrolled into view. Gradient IDs come from `useId` per instance. |
| `Aurora` | Three slowly drifting colour blobs behind heroes and dark sections, drawn with **radial gradients** rather than blur filters (much cheaper to paint). `dark` variant available. |

### 8.3 Layout — `src/components/layout/`

**`Header`**

* **Skip to content** link (visible on keyboard focus).
* **Utility bar** (desktop): credentials, "Serving Central Florida since 2017", email, phone and social links. It collapses away once the page is scrolled more than 30px.
* **Floating glass pill nav.** Transparent at the top, switching to glass when scrolled or when the mega menu is open. It **hides on scroll down** (after 380px) and returns on scroll up.
* **Desktop links.** A hover highlight slides between links (`layoutId="nav-hover"`), and the active page shows a pink dot (`layoutId="nav-active"`).
* **Services mega menu** (hover or focus "Services"). It has a column of service links for each pillar (with icons, linking to deep anchors) and a photo card promoting the care finder. It animates in with scale and blur, and the header won't hide while it's open.
* **Actions.** A phone button with a pulsing ring, and a "Request care" primary button, both magnetic.
* **Mobile menu.** A full-screen dark overlay that opens with a **circular `clip-path` reveal** from the hamburger. Numbered links stagger in from the right, with a phone button at the bottom. It locks Lenis and the page scroll, and closes on navigation. `role="dialog"`, `aria-modal`.

**`Footer`**

* A giant **outlined text marquee** ("Open arms · Open heart · Open lines · Open door", with logo marks between).
* Four columns, following the original site's footer: logo + credentials + license numbers + socials · Types of care · **Resources** (Florida 211, Elder Affairs, APD, FloridaHealthFinder, Florida SHINE) · Contact (office phone, fax, address → Maps, email).
* A descriptive link row ("About our agency", "All home care services", "How to start care", …), deliberately different wording from the header's short labels for SEO.
* Copyright with the current year, the NPI number, and **BackToTop** (a Lenis glide).
* Extra bottom padding on mobile so the floating call bar never covers the footer.

**`Providers`**: `MotionConfig reducedMotion="user"` + `SmoothScroll`.

### 8.4 Forms — `src/components/forms/`

| Component | Purpose |
| --- | --- |
| `InquiryForm` | One form, two variants (`care` / `careers`). See §13. |
| `CareLink` | `<Link href="/contact">` that saves the chosen care type (`home-health` / `home-care` / `both` / `unsure`) in `sessionStorage` (`oa-care-type`) on click. This keeps `/contact` a single indexable URL instead of `/contact?care=…` duplicates. Fails silently if storage is unavailable. |

### 8.5 Other shared sections

`CareChooser`, `CtaBand`, `FaqPreview`, `InsuranceSection`, `ResourcesSection`, `AreasServed`, `StickySteps`, `StackingCards`, `HorizontalServices` and `MapFacade` (described in §7).

---

## 9. Content & data layer

All copy and business facts live in **typed TypeScript modules in `src/lib/`**, not in components. Changing content never requires touching UI code, and everything is type-checked at build time.

### 9.1 `site.ts` — company facts

| Key | Value (source: original website unless noted) |
| --- | --- |
| `name` / `shortName` | "Open Arms & Heart Services Inc." / "Open Arms & Heart Services" |
| `tagline` / `motto` | "Home Is Where The Heart Is" / "Where There Is Love, There Is Life" |
| `founded`, `founder` | 2017 · Shantana Johnson, Owner & Founder |
| `credentials`, `licenses` | Licensed Florida Home Health Agency, APD Central Region Provider · 2999995365, 235855 |
| `phone`, `fax`, `email` | (321) 217-2409 · (855) 257-1340 · openarmsandheartservices@gmail.com |
| `address` | 1920 Verano Dr, Suite 105, Haines City, FL 33844 (city/ZIP from the NPI registry — see §21) |
| `applicationUrl` | The agency's JotForm employment application |
| `areas` | Two county groups: home care (5) and APD Central Region (6) |
| `npi` | 1144748922 (NPI registry) |

It also exports `allCounties` (9, de-duplicated), `fullAddress`, `licenseLine` and `nav`.

### 9.2 `services.ts` — programs, pillars & highlights

* **`programs`** — the seven types of care (`Program`: slug, name, short, tag, icon, image, summary, intro, points, note, optional dedicated `href`, and `formLabel` — the exact option text on the agency's Google Form). `programHref(p)` returns the program's page or its `/services#slug` anchor.
* **`homeHealth`** / **`homeCare`** — the two pillars with their individual services, used on the dedicated pages (`Service`: slug, name, icon, image, summary, points, helps).
* **`highlights`** — the three home-page highlights (Companion Care, Residential, Personal Support).
* `allServices`, `pillars`, `programBySlug`.

### 9.3 `content.ts`

| Export | Used by |
| --- | --- |
| `steps` (4) | `StickySteps`, `StoryStepper` |
| `audiences` (5) | `AudienceBento` |
| `promises` (4) | `FlipPromises` |
| `needs` (13, mapped to program slugs) | `CareChooser` |
| `insurances` (10), `fundingNotes` (3) | `InsuranceSection`, home stacking cards, FAQs, `llms.txt` |
| `checklist` (6) | `ReadyChecklist` |
| `dayTimeline` (6) | `DayTimeline` |
| `roles` (2), `applicationChecklist`, `requirements` | Careers |
| `trustQAs` (4) | Home `StackingCards` (the original home-page Q&As) |
| `resources` (5) | Footer, `ResourcesSection`, `llms.txt` |

### 9.4 `faqs.ts`

Thirteen FAQs in four categories: **Getting started**, **Types of care**, **Insurance & licensing** and **Our caregivers**. The four original home-page questions are included near-verbatim. The others are written strictly from the original program descriptions (APD, veterans, children, DCF, Live Scan, service areas). Answers that list insurances, counties or license numbers are generated from the data, so they can't drift out of sync.

### 9.5 `photos.ts` (generated)

`photoMeta["/images/x.jpg"] = [width, height, "#averageColour"]` for all 31 photos. **Regenerate this file whenever photos are added or replaced** (see §18.4).

### 9.6 Helpers

* **`seo.ts` → `pageMetadata({ path, title, description, absoluteTitle? })`.** Returns Next `Metadata` with a self-referencing canonical, a page-specific Open Graph `url`/`title`/`description`, and a Twitter card. In development it **warns** when a full title exceeds 60 characters or a description exceeds 160.
* **`rich.tsx` → `rich(text)`** turns `**phrase**` into `<strong>`; **`plain(text)`** strips the markers (used in `llms.txt`).

---

## 10. Design system

Defined entirely in `src/app/globals.css` (Tailwind v4, CSS-first).

### 10.1 Colour tokens (`@theme`)

| Token | Scale | Notes |
| --- | --- | --- |
| `iris-*` | 50 · 100 · 200 · 300 · 400 · 500 `#8b60d3` · 600 `#7446bd` · 700 `#60349f` · 800 · 900 · 950 `#1d0f35` | Brand purple (the logo's hands) |
| `blush-*` | 50 · 100 · 200 · 300 · 400 `#f48bb5` · 500 `#ea6a9c` · 600 · 700 `#b03567` · 800 | Brand pink (the logo's heart). Small pink text uses **700** to pass WCAG contrast |
| `ink` / `ink-soft` | `#24173a` / `#5e5373` | Body text / secondary text |
| `paper` | `#fdfbff` | Page background (a hint of lavender) |

**Easings:** `--ease-out-expo` (`0.16, 1, 0.3, 1`) and `--ease-spring` (`0.34, 1.56, 0.64, 1`).

### 10.2 Typography

Headings (`h1–h4`) use Fraunces with −0.02em tracking in `iris-950`. Body text uses Figtree. Accent phrases in headings use `.text-gradient` (iris → blush) italic, or `.text-gradient-light` on dark backgrounds.

### 10.3 Custom utilities (`@utility`)

| Utility | Effect |
| --- | --- |
| `glass` | Light glassmorphism: white gradient, 18px backdrop blur + saturate, inner highlight, soft shadow |
| `glass-dark` | Dark-surface glass |
| `btn` | Base pill button (layout, padding, weight, transition) |
| `tick` | Checkmark bullet drawn with a CSS-mask pseudo-element (colour via `--tick`). Replaces per-item SVG icons to keep the DOM small |
| `tick-circle` | Checkmark in a filled circle (`--tick`, `--tick-bg`) |
| `enter` | CSS entrance animation; choose it with `--enter` (`enter-up` default, `enter-left`, `enter-right`, `enter-pop`) and delay it with `--d` |

### 10.4 Component classes (`@layer components`)

`container-x` (max-w-7xl + responsive gutters) · `eyebrow` / `eyebrow-dark` (pill labels) · `text-gradient` / `text-gradient-light` · `btn-primary` (gradient whose position shifts on hover) · `btn-ghost` (glass) · `btn-light` · `btn-outline-light` · `glow-card` (cursor-tracking border and spotlight) · `mask-fade-x` / `mask-fade-y` · `noise` (SVG fractal-noise overlay) · `flip-scene` / `flip-inner` / `flip-face` / `flip-back` (3D flip cards) · `hairline-grid` (64px grid background).

### 10.5 Keyframes

| Keyframe / animation | Used by |
| --- | --- |
| `marquee`, `marquee-y` (+ `animate-marquee`, `-reverse`, `-y`) | `Marquee` |
| `float` (`animate-float`, `animate-float-slow`; rotation via `--r`) | Hero glass cards, 404 logo |
| `spin` (`animate-spin-slow`, 22s) | Hero rotating badge, founder ring |
| `blob` (`animate-blob`) | `Aurora` |
| `pulse-ring` (`animate-pulse-ring`) | Header phone button, office pin |
| `shimmer` | Available utility |
| `enter-up`, `enter-left`, `enter-right`, `enter-pop` | `enter` utility (hero / page hero) |
| `word-rise` | `CssSplitHeading` |
| `arch-reveal` | Hero and page-hero lead photo clip-path reveal |

### 10.6 Global base rules

`overflow-x: clip` on `html` and `body` (prevents sideways scroll from rotated and translated elements without breaking `position: sticky`) · `scroll-padding-top: 7rem` · branded `::selection` · visible `:focus-visible` outline · Lenis helper classes · a **`prefers-reduced-motion` override** that neutralises all CSS animations and transitions.

---

## 11. Motion & interaction catalogue

| Pattern | Technique | Where | File |
| --- | --- | --- | --- |
| Route transition curtain | `template.tsx`, clip-path wipe | Every client navigation | `app/template.tsx` |
| Inertial smooth scroll | Lenis | Global | `layout/SmoothScroll.tsx` |
| Reading progress bar | `useScroll` + `useSpring` → `scaleX` | Global | `layout/Chrome.tsx` |
| Hide-on-scroll glass nav | `useMotionValueEvent` on `scrollY` | Header | `layout/Header.tsx` |
| Sliding nav highlight / active dot | Shared `layoutId` | Header | `layout/Header.tsx` |
| Mega menu | `AnimatePresence`, scale + blur | Header | `layout/Header.tsx` |
| Circular reveal mobile menu | `clip-path: circle()` animation | Header (mobile) | `layout/Header.tsx` |
| Floating call bar | Spring slide-up past 520px | Mobile, all pages | `layout/Chrome.tsx` |
| CSS-first hero entrance | `enter`, `word-rise`, `arch-reveal` keyframes | Home hero, `PageHero` | `globals.css`, `ui/CssSplitHeading.tsx` |
| Mouse parallax + 3D tilt | Pointer → springs → two depth layers | Home hero | `home/Hero.tsx` |
| Scroll parallax / fade | `useScroll` + `useTransform` | Heroes, CTA band, respite photos, service images | various |
| Rotating text badge | SVG `<textPath>` + CSS spin | Home hero | `home/Hero.tsx` |
| Floating glass cards | CSS `float` keyframe | Home hero | `home/Hero.tsx` |
| Magnetic buttons | Pointer offset → spring | CTAs | `ui/motion.tsx` |
| Split-word headline reveal | Variants with stagger, masked words | Every section title | `ui/motion.tsx` |
| Crossing infinite marquees | CSS translate loop, rotated bands | Home | `home/CrossMarquee.tsx` |
| Expanding hover-reveal panels / snap carousel | `flexGrow` animation, staggered reveal | Home | `home/PillarsReveal.tsx` |
| Scroll-scrubbed text | Per-word opacity/translate from scroll progress | Home manifesto | `home/Manifesto.tsx` |
| Count-up stats | `animate()` writing `textContent` | Home manifesto | `ui/motion.tsx` |
| Pinned horizontal scroll | Sticky viewport + scroll-driven `x` | Home (skilled) | `sections/HorizontalServices.tsx` |
| Sticky stacking cards | Sticky offsets + scale/dim from progress | Home (non-skilled) | `sections/StackingCards.tsx` |
| Interactive recommender | `LayoutGroup`, `layout`, `AnimatePresence` | Home, Services | `sections/CareChooser.tsx` |
| Sticky sidebar step tracker | `useInView` active step, rail fill, number roll | Home | `sections/StickySteps.tsx` |
| Bento with spotlight glow + 3D tilt | CSS vars from pointer | Home, Careers, Insurance, Resources, Contact | `ui/GlowCard.tsx` |
| Self-drawing SVG ribbons | `pathLength` 0 → 1 | Heroes, CTA band | `brand/Ribbons.tsx` |
| Insurance tiles with monograms | Glow + tilt cards, marquee | Types of Care, Getting Started | `sections/InsuranceSection.tsx` |
| Resource link cards | Glow + tilt, external links | Getting Started | `sections/ResourcesSection.tsx` |
| Rotating gradient photo border | Spinning conic gradient behind an inset photo | About (founder) | `about/AboutSections.tsx` |
| Self-drawing connector line | SVG `pathLength` + staggered nodes | Home Health | `services/ConnectedSteps.tsx` |
| Scroll-spy sticky sidebar | `useInView` + `layoutId` + progress rail | Home Health | `services/ServiceScrollspy.tsx` |
| Hover-reveal photo cards | CSS grid-rows, `@media (hover: hover)` | Home Care | `services/HoverRevealGrid.tsx` |
| Scroll-drawn timeline | `scaleY` from scroll progress | Home Care | `services/DayTimeline.tsx` |
| Layered parallax photo stack | Two speeds + rotation | Home Care | `services/RespiteSpotlight.tsx` |
| Sticky image story | Clip-path wipes keyed to chapters | About | `about/AboutSections.tsx` |
| Sliding name typography | Opposite-direction `x` + rotating logo | About | `about/AboutSections.tsx` |
| 3D flip cards | CSS `preserve-3d` + `backface-visibility` | About | `globals.css`, `AboutSections.tsx` |
| Photo marquee | Two opposite rows | About | `about/AboutSections.tsx` |
| Auto-advancing story stepper | Timers + progress bars, pause when off-screen | Getting Started | `started/StartedSections.tsx` |
| Checklist + progress ring | `strokeDashoffset` spring | Getting Started | `started/StartedSections.tsx` |
| Requirements ticker | `Marquee` | Careers | `careers/CareersClient.tsx` |
| Role accordion → form pre-fill | Grid-rows collapse, Lenis `scrollTo` | Careers | `careers/CareersClient.tsx` |
| Live search + filter | `useMemo` filter, `layoutId` pill, popLayout | FAQ | `faq/FaqExplorer.tsx` |
| Map facade | Click-to-load iframe | Contact | `sections/MapFacade.tsx` |
| Radio pill selection | `layoutId="care-radio"` | Contact form | `forms/InquiryForm.tsx` |
| Form success state | Spring check icon, `AnimatePresence` | Forms | `forms/InquiryForm.tsx` |

**Reduced motion.** `MotionConfig reducedMotion="user"` disables transform animations in Motion, Lenis is not mounted, and a CSS media query neutralises keyframes and transitions.

---

## 12. Responsive behaviour

The site is designed **mobile-first**. These sections adapt their *interaction pattern*, not just their layout, at the Tailwind `sm` (640px), `md` (768px) and `lg` (1024px) breakpoints:

| Section | Phones | Desktop |
| --- | --- | --- |
| Header | Hamburger → full-screen circular-reveal menu; utility bar hidden | Utility bar, inline nav, mega menu |
| Floating call bar | Shown after 520px of scroll | Hidden |
| Page heroes | Lead photo shown as a wide card under the text | Arch photo + inset photo collage |
| Home "Two levels of care" | Horizontal **snap carousel**, all details visible | Expanding hover panels |
| Home skilled services | Pinned horizontal scroll with 82vw cards | Same, 400px cards |
| Home non-skilled services | Sticky stacking cards (compact; "Who it helps" hidden) | Sticky stacking cards beside a sticky intro column |
| Home "How care begins" | **Pinned top progress bar** (step number, title, 4 segments) | Sticky left column with big number and rail |
| Home audience bento | Same 6-column bento; compact padding; descriptions hidden | Bento with hover-reveal descriptions |
| Home "Where we serve" | 3 compact columns; county names shortened; towns stacked | 3 columns with wrapped town chips |
| Home Care cards | Details always visible (no hover on touch) | Details revealed on hover/focus |
| Day timeline | Single left-hand line | Alternating left/right around a centre line |
| Service scroll-spy | Sidebar hidden; long-form articles only | Sticky sidebar |
| About story | Image inline in each chapter | Sticky image panel |
| Footer | Stacked columns + extra bottom padding for the call bar | 4 columns |

---

## 13. Forms & the contact pipeline

### 13.1 `InquiryForm` — "Request More Information"

The form mirrors the agency's original Google Form: **First and last name\*, Email\*, Phone number\*, Services you are interested in** (checkbox chips for the seven programs), plus an optional **"Anything else we should know?"** note. It's used on Contact, Types of Care and Getting Started.

A `CareLink` (or the care finder) pre-ticks programs via `sessionStorage` (`oa-care-programs`).

### 13.2 Delivery — `POST /api/contact`

```
InquiryForm ──JSON──► /api/contact ──┬─► Google Form "Request More Information"   (always, no setup)
no-JS <form> ──POST─►                └─► Resend email                              (when configured)
```

1. **Input:** JSON (enhanced form) or form-encoded (no-JS fallback, which redirects `303` to `/thank-you`).
2. **Honeypot:** a filled hidden `company` field gets a fake success.
3. **Validation:** name, email and phone are required, email format is checked, and at least one service *or* a note is needed. All values are trimmed and length-capped.
4. **Google Form channel.** The handler posts to the agency's existing form (`…/formResponse`) using its field IDs. Programs are sent with their **exact option labels** (`formLabel`). Programs without a form option (Skilled Home Health) and the free-text note go into the form's **"Other"** answer. Responses land in the same Google Forms inbox the agency used with its old site. Disable with `GOOGLE_FORM_DISABLED=true`.
5. **Email channel** (optional): a Resend email with HTML-escaped fields and `reply_to` set to the visitor.
6. The request succeeds if **either** channel accepts it. Otherwise it returns `502`, and the UI shows the phone number and email address.

> **Verification:** the endpoint and field format were checked against Google with deliberately incomplete submissions, which Google rejects without recording. Only the omitted required field was flagged, so every other field and the option labels were accepted. Send one real test inquiry after deploying and confirm it appears in the agency's Google Form responses.

> If the agency edits the Google Form's questions or options, update `GOOGLE_FORM` in `src/app/api/contact/route.ts` and the `formLabel` values in `src/lib/services.ts`.

## 14. SEO & AI discoverability

### 14.1 Metadata per page

Every page uses `pageMetadata()`, which gives it a unique title, description, self-referencing canonical, `og:url`, `og:title`, `og:description` and Twitter card. Titles are ≤ 60 characters and descriptions ≤ 155:

| Path | Title |
| --- | --- |
| `/` | Open Arms & Heart Services \| Home Health & Home Care in FL |
| `/services` | Home Health & Home Care \| Open Arms & Heart Services |
| `/services/home-health` | Home Health (Skilled Care) \| … |
| `/services/home-care` | Home Care (Non-Skilled) \| … |
| `/about` | About Our Home Care Agency \| … |
| `/getting-started` | How to Start Home Care \| … |
| `/careers` | Caregiver & Nursing Jobs \| … |
| `/faq` | Home Health & Home Care FAQs \| … |
| `/contact` | Contact Us in Haines City, FL \| … |

### 14.2 Structured data

* **`MedicalBusiness`** (every page, from the root layout): address, phone, fax, founder, founding date, `areaServed`, `sameAs`, NPI and an `OfferCatalog` of all services.
* **`FAQPage`** (`/faq`): all 13 questions and answers.

### 14.3 Crawlability

* Pages are statically rendered with all copy in the HTML.
* **Collapsed content is still in the DOM.** FAQ answers and careers role details are hidden with CSS and `inert`, not removed, so crawlers index them.
* **One URL per page.** `CareLink` replaces `?care=` links, which previously created three duplicate copies of `/contact`.
* `/thank-you` is `noindex`; `/api/` is disallowed in `robots.txt`.

### 14.4 On-page signals

* Exactly one `<h1>` per page and **no skipped heading levels**. The footer column titles are `h2`, accordion questions `h3`, and form titles `h2`.
* **Descriptive link text.** "Learn more" links carry screen-reader text naming the service; buttons read "Ask about respite care" etc.; footer links use distinct descriptive anchors.
* **`<strong>` emphasis** on key phrases via `**bold**` in content strings.
* Descriptive `alt` text on content images; decorative images use `alt=""`.

### 14.5 Social sharing

A generated Open Graph image (`/opengraph-image`, 1200×630) with page-specific OG titles, descriptions and URLs.

### 14.6 `/llms.txt`

A plain-text Markdown map of the site for AI answer engines (ChatGPT, Claude, Perplexity, Gemini), following the [llmstxt.org](https://llmstxt.org) convention. It is **generated from the content modules**: company summary, credentials, mission, contact details, service-area counties, all seven types of care with their service lists, accepted insurances, a page directory, community resources and all FAQs. It is statically built with a one-hour cache header.

### 14.7 Search Console & analytics

Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` to verify the domain in Google Search Console, then submit `/sitemap.xml`. Set `NEXT_PUBLIC_GTM_ID` to enable Tag Manager, and see the HIPAA note in §22 first.

---

## 15. Performance

The site was optimised against a third-party technical SEO audit (SiteChecker, initial score 37/100, with critical LCP, duplicate-content and duplicate-ID findings). Every critical finding was resolved.

### 15.1 Techniques

| Technique | Detail |
| --- | --- |
| **CSS-first above-the-fold animation** | Hero text, CTAs and lead images animate with CSS keyframes, so they paint at first render instead of waiting for hydration. The H1 words stay painted while rising, so they count toward LCP immediately. |
| **Correctly prioritised LCP image** | Each page's first hero photo uses `priority` (preload + `fetchpriority="high"`); every other image is lazy. |
| **Responsive images** | `next/image` serves **AVIF/WebP**. `deviceSizes` is capped at 1920px (no 2048/3840 variants). Every `<Photo>` has a hand-tuned `sizes`. The cache TTL is 31 days. |
| **No layout shift** | Real `width`/`height` attributes on every photo, plus an average-colour placeholder (lab CLS ≈ 0.000). |
| **Font payload** | Fraunces loads only the weight axis (dropping SOFT/WONK/opsz cut preloaded fonts from ~326 KB to ~115 KB). Quicksand is a single weight and isn't preloaded. All fonts are self-hosted with `display: swap`. |
| **Third-party facade** | The Google Map iframe (~1 MB of script) only loads on click. |
| **Cheap visual effects** | Aurora blobs use radial gradients, not 64px blur filters. Scroll reveals no longer animate `filter: blur()`. |
| **Smaller DOM** | CSS-mask `tick` bullets instead of per-item SVGs, and a redundant town marquee removed (home ≈ 2,016 → ≈ 1,700 nodes). |
| **Static delivery** | All content pages are pre-rendered and served from Vercel's CDN (live TTFB ≈ 0.4s, `x-vercel-cache: HIT`). |

### 15.2 Measured results

Lighthouse mobile lab runs on a local production build (October 2026), before and after optimisation:

| Page | Performance | LCP | Total blocking time | SEO | Best practices |
| --- | --- | --- | --- | --- | --- |
| Home | 57 → **87–91** | 5.7s → 3.4–4.0s | 865 → **57ms** | 92 → **100** | **100** |
| Services | 67 → **97** | 5.3s → 2.2s | 487 → 75ms | **100** | **100** |
| Contact | 68 → **88** | 5.1s → 3.9s | 476 → **29ms** | **100** | **100** |
| FAQ | 67 → **88** | 5.2s → 3.9s | 527 → **30ms** | **100** | **100** |

> Lab numbers vary between runs and machines. Re-run Lighthouse or PageSpeed Insights against the live domain after each deploy.

---

## 16. Accessibility

* **Skip to content** link, landmark elements (`header`, `nav` with labels, `main`, `footer`, `aside`) and a breadcrumb `nav` with `aria-current="page"`.
* **Reduced motion** respected in three layers: Motion (`reducedMotion="user"`), Lenis (not mounted) and CSS (animations neutralised).
* **Keyboard support.** Visible `:focus-visible` rings; the mega menu opens on focus; flip cards flip on focus; Home Care card details reveal on `focus-within`; the hero pillar panels activate on focus.
* **ARIA.**
  * Accordions use `aria-expanded`/`aria-controls`/`role="region"`.
  * The switcher and stepper use `role="tablist"`/`role="tab"`/`aria-selected`.
  * Toggles use `aria-pressed`, the mobile menu is `role="dialog"` + `aria-modal`, and form errors use `role="alert"`.
  * Decorative SVGs and duplicated marquee content are `aria-hidden`.
* **`inert`** on collapsed accordion panels, so hidden links aren't tabbable.
* **Screen-reader text.** Split-word headings expose the full sentence through `aria-label`; "Learn more" links include `sr-only` service names; icon-only buttons have labels.
* **Colour contrast.** Small pink text uses `blush-700` (raised from `blush-600` after Lighthouse flagged contrast). The one known exception is the home manifesto's intentionally faded scroll-reveal words, which brighten as they're read.
* **Forms.** Every input is wrapped in a `<label>`, radios sit in a `fieldset`/`legend`, and fields have the right `autoComplete`.

Lighthouse accessibility: **100** on Services, Contact, FAQ, Careers and About; **96** on Home (because of the manifesto effect above).

---

## 17. Security

### 17.1 HTTP response headers (`next.config.ts`, all routes)

| Header | Value / purpose |
| --- | --- |
| `Content-Security-Policy` | See below |
| `X-Frame-Options` | `SAMEORIGIN` (click-jacking protection) |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), browsing-topics=()` |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `Cross-Origin-Opener-Policy` | `same-origin` |
| `X-Powered-By` | Removed (`poweredByHeader: false`) |

**Content-Security-Policy** (built programmatically):

* `default-src 'self'`; `object-src 'none'`; `base-uri 'self'`; `form-action 'self'`; `frame-ancestors 'self'`; `upgrade-insecure-requests` (production).
* `script-src 'self' 'unsafe-inline'`. Inline scripts are needed for Next's bootstrap and the JSON-LD; nonces would force every page to render dynamically and lose static caching. It also allows `vercel.live` (preview toolbar), adds `'unsafe-eval'` in development only, and allows GTM only when configured.
* `frame-src` allows Google Maps (the contact map) and `vercel.live`.
* `img-src`, `connect-src` and `font-src` allow `self`, `data:`/`blob:` where needed, and the Vercel toolbar. GTM and Google Analytics domains are added only when `NEXT_PUBLIC_GTM_ID` is set.

> **Adding any new third-party service (chat widget, booking tool, analytics) requires adding its domains to the CSP in `next.config.ts`.** Otherwise the browser will block it.

### 17.2 Application security

* Secrets (`RESEND_API_KEY`) are server-only (no `NEXT_PUBLIC_` prefix).
* Form input is trimmed, length-limited and **HTML-escaped** before it goes into the email.
* There's a honeypot field for basic bot protection.
* `/api/` is disallowed in `robots.txt`.
* External links use `rel="noreferrer"`.

---

## 18. How-to guides (editing the site)

### 18.1 Change the phone number, address, hours or service areas

Edit `src/lib/site.ts`. These values flow into the header, footer, every CTA, the contact page, the mobile call bar, FAQ answers, JSON-LD, `llms.txt` and the Open Graph image. Office hours aren't published, because the original site didn't list any. Add an `hours` field and render it if the client wants them shown.

### 18.2 Add the client's email address

Already done: `site.email` is the agency's address from its original website. It appears in the header utility bar, footer, CTA band, contact cards and form error messages.

### 18.3 Add or edit a service

Add or edit an entry in `homeHealth.services` or `homeCare.services` in `src/lib/services.ts`. Give it a unique kebab-case `slug` (it becomes the anchor ID), a Lucide icon, a photo, alt text, a summary, bullet points and a "who it helps" line. The service then automatically appears in:

* the header mega menu, footer and crossing marquee
* the home sections, Services switcher and its pillar page
* the JSON-LD offer catalogue and `llms.txt`

Programs are edited in `programs`. If a program is added, give it a `formLabel` only if the agency's Google Form has a matching option; otherwise it is submitted as "Other".

### 18.4 Add or replace a photo

1. Put an optimised JPG (~1600px wide) in `public/images/`.
2. Regenerate `src/lib/photos.ts` (Python + Pillow):

   ```bash
   python - <<'EOF'
   import os
   from PIL import Image
   d = "public/images"; rows = []
   for f in sorted(os.listdir(d)):
       if not f.endswith(".jpg"): continue
       im = Image.open(os.path.join(d, f)).convert("RGB"); w, h = im.size
       r, g, b = im.resize((1, 1), Image.LANCZOS).getpixel((0, 0))
       rows.append(f'  "/images/{f}": [{w}, {h}, "#{r:02x}{g:02x}{b:02x}"],')
   body = "\n".join(rows)
   open("src/lib/photos.ts", "w").write(
       "/** Generated: intrinsic size + average colour per photo. Regenerate when photos change. */\n"
       "export const photoMeta: Record<string, readonly [width: number, height: number, color: string]> = {\n"
       + body + "\n};\n")
   EOF
   ```

3. Use it with `<Photo src="/images/new.jpg" alt="…" sizes="…" />` inside a positioned parent that has a size.
4. Add its source to the credits table in §24.

### 18.5 Add an FAQ

Append to `faqs` in `src/lib/faqs.ts` with one of the four categories. It appears on `/faq` (with search and filter), in the FAQPage JSON-LD and in `llms.txt`. The home page shows the first five.

### 18.6 Add a job role or requirement

Edit `roles` / `requirements` in `src/lib/content.ts`. The role is added to the careers accordion and the form's Position dropdown.

### 18.7 Add a new page

1. Create `src/app/<route>/page.tsx` (a Server Component).
2. Export `metadata = pageMetadata({ path: "/<route>", title: "≤31 chars", description: "≤155 chars" })`.
3. Start with `<PageHero … images={[...]} />` so the page gets a prioritised LCP image, and end with `<CtaBand />`.
4. Add it to `nav` in `site.ts` (header), `footerLinks` in `Footer.tsx`, `routes` in `sitemap.ts`, and the page list in `llms.txt/route.ts`.

### 18.8 Link to the contact form with a care type

```tsx
import { CareLink } from "@/components/forms/CareLink";
<CareLink care="home-health" className="btn-primary">Request skilled care</CareLink>
```

Never link to `/contact?care=…`.

---

## 19. Deployment

The project is configured for **Vercel**, with no extra configuration file.

1. Import the GitHub repository into Vercel. The framework is auto-detected as Next.js; the build command is `npm run build`.
2. Set the environment variables (§4), at minimum `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY` and `CONTACT_TO_EMAIL`.
3. In Resend, verify the sending domain and set `CONTACT_FROM_EMAIL`. Until then mail comes from `onboarding@resend.dev`, which Resend restricts to test recipients.
4. Add the custom domain in Vercel, then update `NEXT_PUBLIC_SITE_URL` to match and redeploy.
5. Verify the domain in Google Search Console (`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`) and submit `https://<domain>/sitemap.xml`.
6. After deploying, run PageSpeed Insights and the SEO audit against the live domain.

Any other Node host works as well (`npm run build && npm start`); the security headers come from `next.config.ts`, not a platform file.

---

## 20. Conventions & gotchas

* **Content lives in `src/lib/`.** Don't hard-code business facts in components.
* **Metadata:** always use `pageMetadata()`. The page `title` must be ≤ 31 characters (the suffix adds 29); watch for the dev-mode warnings.
* **Images:** always use `<Photo>` with an accurate `sizes`. Never use raw `<img>` or a bare `next/image fill` without `sizes`. Only the first above-the-fold image per page gets `priority`.
* **Above the fold:** don't wrap hero content in Motion `initial={{ opacity: 0 }}`, which delays LCP until hydration. Use the `enter` utility or `CssSplitHeading`.
* **Collapsible content** must stay in the DOM (CSS + `inert`), not be conditionally rendered.
* **Headings:** one `h1` per page (from `PageHero` or the home `Hero`), and don't skip levels.
* **Accent markup:** `*text*` in headings gives the gradient accent; `**text**` in body strings gives `<strong>`.
* **Client components** receive slugs or plain data, never objects containing icon components, from Server Components.
* **IDs:** don't add per-instance `useId` SVG IDs to anything rendered inside a `Marquee` (the content is cloned). Use shared defs, as `LogoDefs` does.
* **Sticky positioning** depends on `overflow-x: clip` (not `hidden`) on `html`/`body`. Don't change it.
* **Windows:** see §3.3. Don't use `npx next`.
* **No linting or test tooling** is configured. `npm run build` (TypeScript strict + pre-rendering) is the quality gate.

---

## 21. Content sources & pre-launch verification

**Primary source:** the agency's original website, **openarmsandheart.org** (Google Sites): its Home, Types of Care, About Us, Careers and Contact pages, its "Request More Information" Google Form, and its JotForm employment application. Supplementary sources: the NPPES NPI registry and the Facebook and LinkedIn pages.

What came from where:

| Content | Source |
| --- | --- |
| Tagline, motto, home intro, home Q&As, insurance list, licenses, credentials | Original home page |
| Seven types of care: copy, service lists, fine print, service-area counties | Original Types of Care page (Skilled Home Health from the client brief) |
| Mission, founder story, **founder photo** | Original About Us page |
| "Quality care. Brighter tomorrows.", positions, requirements, application link | Original Careers page + JotForm application |
| Office phone, fax, email | Original footer / Contact page |
| Community resources | Original footer |
| Design, motion, structure, extra pages (Getting Started, FAQ, Skilled Home Health) | This project |

**Please confirm with the client:**

- [ ] **Address.** The old site lists *"1920 Verano Dr., Ste 105, Ocala, FL 2345"*, which has an incomplete ZIP, and Ocala is outside the published service counties. The NPI registry places this address in **Haines City, FL 33844**, which the site uses.
- [ ] **Phone.** The old home page shows **407-222-2222** (placeholder-looking) in its call-to-action band, while its footer and Contact page show **321-217-2409**. The site uses 321-217-2409.
- [ ] **Skilled Home Health.** Not listed on the old site. It's included from the client's original service brief. Remove the `home-health` program and `/services/home-health` if it isn't offered.
- [ ] **Dept. of Elder Affairs link.** On the old site it pointed to the APD resources page by mistake. The new site links to elderaffairs.org.
- [ ] **"Integrated Simply"** is listed exactly as on the old site. Confirm the plan's preferred name.
- [ ] **Office hours.** Not published (the old site had none).
- [ ] **Testimonials.** None included. Add only real reviews, with permission.
- [ ] **Photography.** The founder photo is the client's own. Other images are licensed stock (§24). The old site's own highlight photos were too low-resolution (~350px) for the large panels.
- [ ] **Google Form delivery.** Send one real test inquiry after deploying and confirm it arrives.

## 22. Known limitations & future work

* **Forms need Resend credentials** to deliver email. There is no database or CRM integration, and submissions aren't stored.
* **No CMS.** Content is edited in TypeScript files and needs a redeploy. A headless CMS (Sanity, Contentful, etc.) could be added later; the `src/lib` modules are the natural seam.
* **No automated tests, ESLint or CI pipeline.** The production build is the only gate.
* **CSP uses `'unsafe-inline'` for scripts.** This is a deliberate trade-off to keep pages static; nonce-based CSP would need dynamic rendering.
* **Analytics and HIPAA.** Home-health agencies are typically HIPAA-covered entities. Review with the client before enabling GTM, Google Analytics or any tracking on pages that collect health-related enquiries.
* **The email address isn't displayed** anywhere until the client provides one (§18.2).
* **Bot protection** is a honeypot only. Consider Cloudflare Turnstile or rate limiting if spam appears, and add its domains to the CSP.
* **Lighthouse figures are lab measurements.** Field data (CrUX) will only exist once the site has real traffic.

---

## 23. Project history

| Commit | Summary |
| --- | --- |
| `97b655c` / `e993448` — *first commit* | Initial build: brand research, design system, all 9 pages, motion system, forms and API, SEO basics (sitemap, robots, OG image, JSON-LD) |
| `ac9f6ac` — *SEO Optimization* | Resolved the technical SEO audit: CSS-first hero entrances, `Photo` component and image sizing, font trimming, shared logo defs (duplicate IDs), `CareLink` (duplicate contact URLs), `pageMetadata` (titles, descriptions, `og:url`), security headers and CSP, crawlable accordions, contact page content and map facade, heading hierarchy, descriptive links, `<strong>` emphasis, `llms.txt`, no-JS form fallback and `/thank-you`, contrast fixes |
| `310b2b7` — *Mobile version fixes* | Mobile adaptations: pillar snap carousel (no cropped service pills), stacking cards on mobile, pinned step progress bar, bento layout on all sizes, three-column service areas |
| *(next)* — *Content from original website* | Rebuilt the content around the agency's original site: seven types of care, insurance list, licenses, mission, founder story + photo, office phone & email, published counties, careers via the agency's JotForm, community resources; inquiries delivered to the agency's Google Form; new `InsuranceSection` and `ResourcesSection`; removed `PillarSwitcher`, `ComparisonTable`, `PaymentGrid` |

---

## 24. Photo credits

All photos are from [Unsplash](https://unsplash.com) under the [Unsplash License](https://unsplash.com/license) (free for commercial use; no attribution required). They are self-hosted in `public/images/` and should be replaced with client photography when available.

<details><summary>Source of each image (34)</summary>

| File | Source |
| --- | --- |
| `hero-caregiver-laughing.jpg` | https://images.unsplash.com/photo-1765896387377-e293914d1e69 |
| `aide-smiling-patient.jpg` | https://images.unsplash.com/photo-1765896387387-0538bc9f997e |
| `companion-care.jpg` | https://images.unsplash.com/photo-1765896387398-1e1ae8d2eb85 |
| `activities-coloring.jpg` | https://images.unsplash.com/photo-1762955911431-4c44c7c3f408 |
| `skilled-nursing.jpg` | https://images.unsplash.com/photo-1666887360680-9dc27a1d2753 |
| `nurse-blood-pressure.jpg` | https://images.unsplash.com/photo-1631815590058-860e4f83c1e8 |
| `physical-therapy.jpg` | https://images.unsplash.com/photo-1772790969968-ae5d2976601f |
| `walker-autumn.jpg` | https://images.unsplash.com/photo-1763631007426-5869ece08264 |
| `occupational-therapy.jpg` | https://images.unsplash.com/photo-1762955911769-d652ceaa94bb |
| `speech-therapy.jpg` | https://images.unsplash.com/photo-1685608625845-184d982f3f69 |
| `social-work.jpg` | https://images.unsplash.com/photo-1758691462321-9b6c98c40f7e |
| `personal-care.jpg` | https://images.unsplash.com/photo-1773227055624-07b515ba87c5 |
| `homemaker.jpg` | https://images.unsplash.com/photo-1575467678930-c7acd65d6470 |
| `respite-child.jpg` | https://images.unsplash.com/photo-1761234852163-23f2ededd04e |
| `personal-supports.jpg` | https://images.unsplash.com/photo-1709127347874-3f4674be5bc8 |
| `transportation.jpg` | https://images.unsplash.com/photo-1764173039712-da4632d1fa9d |
| `residential-habilitation.jpg` | https://images.unsplash.com/photo-1709127347878-bd27e64d1e3e |
| `family-baking.jpg` | https://images.unsplash.com/photo-1758874960394-afd9ead46eba |
| `child-smiling.jpg` | https://images.unsplash.com/photo-1646250852980-e2beba095e97 |
| `senior-portrait.jpg` | https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8 |
| `pediatric-walker.jpg` | https://images.unsplash.com/photo-1709879747841-c341b45044a0 |
| `caregiver-portrait.jpg` | https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2 |
| `friends-talking.jpg` | https://images.unsplash.com/photo-1773227059784-c1e36cc8c8c9 |
| `celebration.jpg` | https://images.unsplash.com/photo-1773227060313-7623fd5bfa64 |
| `seniors-smiling.jpg` | https://images.unsplash.com/photo-1764173039543-f9f197744e1b |
| `bench-sea.jpg` | https://images.unsplash.com/photo-1508963493744-76fce69379c0 |
| `breakfast-family.jpg` | https://images.unsplash.com/photo-1758874959821-5484186a8d21 |
| `grandpa-granddaughter.jpg` | https://images.unsplash.com/photo-1609113006359-1e9c378ab54d |
| `therapy-play.jpg` | https://images.unsplash.com/photo-1708686816818-2b018e0c1296 |
| `hands.jpg` | https://images.unsplash.com/photo-1454875392665-2ac2c85e8d3e |
| `nurses-team.jpg` | https://unsplash.com/photos/AZq99Wqunjs |
| `veteran.jpg` | https://images.unsplash.com/photo-1698671114507-6ae8567cb895 |
| `live-scan.jpg` | https://images.unsplash.com/photo-1585079374502-415f8516dcc3 |
| `founder-shantana-johnson.jpg` | **Client-owned** — from the agency's original website (About Us) |

</details>

---

© Open Arms & Heart Services Inc. All rights reserved. Website code prepared for the client; brand assets, names and business information belong to Open Arms & Heart Services Inc.
