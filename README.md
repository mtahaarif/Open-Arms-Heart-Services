# Open Arms & Heart Services Inc. — Website

> Production marketing website for **Open Arms & Heart Services Inc.** — an **APD Central Region Provider** and **Licensed Florida Home Health Agency** serving Central Florida since 2017.
>
> **Content policy:** every fact and every piece of copy on the site is taken from the agency's original website (openarmsandheart.org) and the two forms it links to. The complete verified record is [`docs/original-site-content.md`](docs/original-site-content.md). **Design and interactions** are this project's. See §21.

| | |
| --- | --- |
| **Live (preview)** | https://open-arms-heart-services.vercel.app |
| **Repository** | https://github.com/mtahaarif/Open-Arms-Heart-Services |
| **Framework** | Next.js 16 (App Router, Turbopack) · React 19 · TypeScript 5 |
| **Styling** | Tailwind CSS v4 (CSS-first `@theme` config) |
| **Motion** | Motion (Framer Motion successor) v14 · Lenis smooth scroll |
| **Hosting** | Vercel (fully static pre-rendering) |
| **Inquiries** | The agency's own Google Form, embedded |

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

**Open Arms & Heart Services Inc.** — *"Home Is Where The Heart Is · Where There Is Love, There Is Life."* An **APD Central Region Provider** and **Licensed Florida Home Health Agency** (Lic# 2999995365 · Lic# 235855), serving Central Florida since **2017**. **Shantana Johnson** is the proud owner.

**Our Mission:** *To work in partnership with our consumers to help them achieve their goals of independence, productivity, and meaningful integration within their communities. We are committed to fulfilling the needs of our consumers with excellence and care.*

Contact, as published: Office 321-217-2409 · Fax 855-257-1340 · openarmsandheartservices@gmail.com · 1920 Verano Dr., Ste 105, Ocala, FL 2345 *(see §21 — the published ZIP is incomplete)*.

### 1.2 What the site has to do

| Goal | How the site delivers it |
| --- | --- |
| Present the six types of care | The agency's own descriptions, service lists and notes, verbatim, plus an interactive care finder |
| Generate inquiries | Phone CTAs, a floating mobile call bar, and the agency's own "Request More Information" Google Form, embedded as on the original site |
| Recruit caregivers | A Careers page linking to the agency's online employment application |
| Build trust | Mission, owner story and photo, licenses, insurances accepted, Level 2 background screening, service areas and FAQs |
| Rank in search and AI answers | Unique metadata, structured data (JSON-LD), sitemap, `llms.txt`, server-rendered content |
| Feel premium, not "template-like" | A distinct interaction pattern for almost every section (see §11) |

### 1.3 Types of care offered

The six types of care published on the original website (`programs` in `src/lib/services.ts`), all presented on `/services` ("Types of Care"):

| # | Type of care | Anchor |
| --- | --- | --- |
| 1 | Non-Skilled Home Health Services | `/services#home-care` |
| 2 | Agency for Persons with Disabilities (APD) | `/services#apd` |
| 3 | Vulnerable Adult Support Services / DCF Referrals | `/services#dcf` |
| 4 | Children & Family Support Services (CBC) | `/services#cbc` |
| 5 | Veterans Home Care & Respite Services (VA) | `/services#va` |
| 6 | Live Scan Fingerprinting & Background Screening | `/services#live-scan` |

**Insurances we accept** (as published): Sunshine Health, Aetna, Florida Blue, Humana, Children Medical Services, Molina, Integrated Simply, OPTUM (VA), United Healthcare, Florida Community Care.

### 1.4 Brand

The colour palette, script wordmark and "hands holding a heart" mark come from the client's logo and banner artwork: purple hands, a pink heart, and flowing purple-to-pink ribbons. The logo mark is redrawn as an SVG (`src/components/brand/Logo.tsx`), and the banner's swooshes appear as the animated `Ribbons` component.

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

There are **no other runtime dependencies**, and no server-side code: inquiries go through the embedded Google Form.

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
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional | Yes | Google Search Console HTML-tag verification code (just the `content` value). Adds `<meta name="google-site-verification">`. |
| `NEXT_PUBLIC_GTM_ID` | Optional | Yes | Google Tag Manager container ID (`GTM-XXXXXXX`). When set, GTM loads lazily *and* the Content-Security-Policy opens up for GTM / Google Analytics domains. When unset, no tracking code exists on the site at all. |

> **Inquiries need no configuration.** The contact and Types of Care pages embed the agency's existing Google Form, so responses land in the same place as with the old website. See §13.

---

## 5. Project structure

```
.
├── public/
│   └── images/                     25 stock photos (Unsplash licence) + the owner's photo from the original site
├── src/
│   ├── app/                        ── Next.js App Router ──
│   │   ├── layout.tsx              Root layout: fonts, global metadata, MedicalBusiness JSON-LD,
│   │   │                           shared logo SVG defs, providers, header/footer, optional GTM
│   │   ├── template.tsx            Route-transition "curtain" (re-mounts on every navigation)
│   │   ├── globals.css             Tailwind v4 theme, design tokens, utilities, keyframes
│   │   ├── page.tsx                Home  (/)
│   │   ├── about/page.tsx          /about
│   │   ├── services/page.tsx       /services  ("Types of Care")
│   │   ├── careers/                /careers
│   │   ├── faq/                    /faq   (+ FAQPage JSON-LD)
│   │   ├── contact/                /contact
│   │   ├── not-found.tsx           Branded 404
│   │   ├── llms.txt/route.ts       /llms.txt for AI answer engines
│   │   ├── sitemap.ts              /sitemap.xml
│   │   ├── robots.ts               /robots.txt
│   │   ├── opengraph-image.tsx     Generated 1200×630 social-share image
│   │   └── icon.svg                Favicon (logo mark on a rounded tile)
│   ├── components/
│   │   ├── brand/                  Logo (wordmark + SVG mark + shared defs), Ribbons, Aurora
│   │   ├── forms/                  GoogleForm (embed), CareLink
│   │   ├── layout/                 Header, Footer, Providers, SmoothScroll, Chrome
│   │   │                           (ScrollProgress + MobileCallBar), BackToTop
│   │   ├── sections/               Page sections (shared ones at the root of this folder)
│   │   │   ├── home/               Hero, CrossMarquee, PillarsReveal, Manifesto, AudienceBento
│   │   │   ├── services/           ServiceScrollspy (the six types of care)
│   │   │   ├── about/              AboutSections (StoryChapters, NameMeaning, FounderSpotlight,
│   │   │   │                       PhotoMarquee)
│   │   │   ├── careers/            CareersClient
│   │   │   └── faq/                FaqExplorer
│   │   └── ui/                     Primitives: motion helpers, PageHero, SectionIntro, Photo,
│   │                               GlowCard, Marquee, Accordion, CssSplitHeading
│   └── lib/                        ── Content & helpers (no UI) ──
│       ├── site.ts                 Company facts, nav, service areas
│       ├── services.ts             The six types of care + three home highlights
│       ├── content.ts              Audiences, care-finder needs, insurances, careers facts,
│       │                           home Q&As, resources
│       ├── faqs.ts                 12 FAQs (verbatim answers) in 4 categories
│       ├── photos.ts               Generated: intrinsic size + average colour per photo
│       ├── seo.ts                  pageMetadata() helper
│       └── rich.tsx                **bold** → <strong> renderer
├── docs/original-site-content.md   Verified record of the original website (source of truth)
├── next.config.ts                  Image config, security headers / CSP, redirects for removed pages
├── postcss.config.mjs              Tailwind v4 PostCSS plugin
├── tsconfig.json                   Strict TS, "@/*" → "./src/*"
├── .env.example                    Documented environment variables
└── package.json
```



---

## 6. Architecture

### 6.1 Rendering model

All content pages are **statically pre-rendered at build time** (○ in the build output). Only two routes run on demand (ƒ):

| Route | Type | Why |
| --- | --- | --- |
| `/`, `/about`, `/services`, `/careers`, `/faq`, `/contact` | Static | Served from the CDN edge cache; full HTML for crawlers |
| `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/opengraph-image`, `/icon.svg` | Static | Generated once at build time |

**Server vs client components.** Page files (`app/**/page.tsx`) are Server Components. They export metadata and compose sections. Interactive sections are Client Components (`"use client"`), but they are still **server-rendered to HTML first**, so every word of copy is in the initial response. This was verified by an SEO audit that reported "11 of 11 pages readable without JavaScript". Purely presentational components with no hooks stay as Server Components: `Marquee`, `CrossMarquee`, `AudienceBento`, `AreasServed`, `FaqPreview`, `InsuranceSection`, `ResourcesSection`, `Photo`, `Footer` and `not-found`.

**Data across the server/client boundary.** Service objects carry Lucide icon components, and components can't be serialised as props. Client components therefore import the data themselves rather than receiving those objects from a server page.

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
* Injects **`MedicalBusiness` JSON-LD** built only from verified data: name, URL, description, phone, fax, email, the published street address (no ZIP — see §21), slogan, `areaServed` (9 counties), both license numbers, and an `OfferCatalog` of the six types of care.
* Optionally injects **Google Tag Manager** (`strategy="lazyOnload"`) plus its `<noscript>` iframe, but only when `NEXT_PUBLIC_GTM_ID` is set.
* Includes a skip link target: `<main id="main">`.

### 6.4 Route transitions (`src/app/template.tsx`)

`template.tsx` re-mounts on every navigation (unlike `layout.tsx`). On **client-side navigations only**, an iris-to-blush gradient curtain carrying the logo covers the screen. It then wipes upward with `clip-path: inset(0 0 100% 0)` over 0.85s, while the new page content rises 40px and fades in. The first page load and the server render skip the curtain: a module-level `hasNavigated` flag is set in `useEffect`, so the curtain never delays the initial paint or causes a hydration mismatch.

### 6.5 Smooth scrolling (`src/components/layout/SmoothScroll.tsx`)

* `ReactLenis root` with `lerp: 0.1`, `smoothWheel`, and anchor-link handling offset by **−110px** so the fixed header never covers a target.
* `ResetOnRouteChange` jumps to the top on each pathname change, unless the URL has a `#hash`.
* **Disabled entirely** when the user prefers reduced motion (native scrolling is used).
* Elements marked `data-lenis-prevent` (mobile menu) scroll natively.
* The header calls `lenis.stop()` / `start()` to lock scrolling while the mobile menu is open, and BackToTop uses `lenis.scrollTo()` to return to the top.

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

| # | Section | Component | Content (verified source) & pattern |
| --- | --- | --- | --- |
| 1 | Hero | `home/Hero.tsx` | "**Home is where the heart is.** *Where there is love, there is life.*" + the original home paragraph. CSS-first entrance, mouse parallax, arch photo, floating glass cards (Non-Skilled Home Health Services; APD Central Region Provider), rotating text badge, credential ticks. |
| 2 | Crossing marquees | `home/CrossMarquee.tsx` | Type-of-care names, the three home highlights and published APD services; values drawn from the original copy. |
| 3 | What we provide | `home/PillarsReveal.tsx` | The original home page's three highlights — **Companion Care, Residential, Personal Support** — each showing matching items from the published service lists. Expanding panels (desktop) / snap carousel (mobile). |
| 4 | Our mission | `home/Manifesto.tsx` | The **mission statement**, scroll-scrubbed. Count-up stats derived from the published data: since 2017, 6 types of care, 9 counties, 10 insurances. |
| 5 | Types of care | `sections/HorizontalServices.tsx` | The six types of care on a **pinned horizontal scroll**, with the original intro. |
| 6 | Questions & answers | `sections/StackingCards.tsx` | The original home page's **four Q&As**, verbatim, as sticky stacking cards (insurance and license chips). |
| 7 | Care finder | `sections/CareChooser.tsx` | 13 needs, each a published service item, mapped to the matching types of care; the CTA pre-ticks them in the form. |
| 8 | Who we care for | `home/AudienceBento.tsx` | Seniors, veterans & families, people with disabilities, children & foster families, family caregivers — captions quoted from the original copy. Bento grid. |
| 9 | Where we serve | `sections/AreasServed.tsx` | "Proudly serving counties in Central Florida" — the two published county lists and the published address. |
| 10 | FAQ preview | `sections/FaqPreview.tsx` | FAQs not already shown in the stacking cards. |
| 11 | CTA | `sections/CtaBand.tsx` | "Open Arms & Heart Services is **only a call away!**" |

### 7.2 About — `/about`

| Section | Component | Details |
| --- | --- | --- |
| Hero | `PageHero` | "Care rooted in *family.*" + the owner's opening paragraph; the inset photo is the owner's photo from the original site. |
| Story | `StoryChapters` | Sticky image story — the **four paragraphs of the original About Us page, verbatim**. |
| Mission | `NameMeaning` | Sliding "Open Arms / & Heart" typography captioned with **Our Mission**. |
| Owner | `FounderSpotlight` | Shantana Johnson (Owner): photo in a rotating gradient border, verbatim bio, credential chips. |
| Gallery | `PhotoMarquee` | Two opposite-direction photo rows. |

### 7.3 Services overview — `/services`

Named **"Types of Care"**, as on the original site.

| Section | Component | Details |
| --- | --- | --- |
| Hero | `PageHero` | The original Types of Care intro, verbatim. |
| Credentials strip | inline | APD Central Region Provider · Licensed Florida Home Health Agency · since 2017 · license numbers. |
| Types of care | `ServiceScrollspy` | All six with their full published copy (description, "Services and Support", closing note). Scroll-spy sidebar, parallax images, "Ask about …" CareLinks. |
| Care finder | `CareChooser` | |
| Insurance | `InsuranceSection` | "Insurances we accept:" — ten tiles (glow + tilt) and a marquee. |
| Request form | `GoogleForm` | The agency's Google Form, embedded; anchor `#request`, as on the original page. |

### 7.7 Careers — `/careers`

| Section | Component | Details |
| --- | --- | --- |
| Hero | `PageHero` | "Quality care. *Brighter tomorrows.*" · "Make a difference and build a meaningful career. Join Our Care Team!" **Apply now** opens the agency's online application. |
| Positions | `CareersClient` | The two positions on the agency's employment application — **Home Health Aide** and **Group Home Staff** — as tilt + glow cards. |
| Requirements ticker | `CareersClient` | From the application: diploma/GED, CNA/HHA/CPR certification, background investigation, drug & alcohol screening, three references, 90-day probationary period. |
| Application | `CareersClient` | What the application asks for, the EEO/ADA note, and a link to the agency's **JotForm employment application** (`site.applicationUrl`). |

### 7.8 FAQ — `/faq`

| Section | Component | Details |
| --- | --- | --- |
| Hero | `PageHero` | "Questions families *ask us most.*" |
| Explorer | `faq/FaqExplorer.tsx` | Sticky glass sidebar with live search and category filters (Getting started, Types of care, Insurance & licensing, Our caregivers). |
| CTA | `CtaBand` | |
| Structured data | — | `FAQPage` JSON-LD with all 12 Q&As. |

### 7.9 Contact — `/contact`

Mirrors the original Contact page.

| Section | Details |
| --- | --- |
| Hero | "We're here, *with open arms.*" · "Proudly serving counties in Central Florida since 2017." |
| Contact cards | **Office** 321-217-2409, **Email**, **Fax**, **Address** (as published) and a **Licensed** card with both credentials and license numbers. |
| Form | `GoogleForm` — the agency's Google Form, embedded as on the original Contact page. |
| Types of Care Offered | The six types of care as glow link cards (the original Contact page lists them). |
| Quick answers | Four verified FAQs + the published county lists. |
| Resources | `ResourcesSection` — the original footer's resources. |

### 7.10 Utility routes

| Route | Details |
| --- | --- |
| 404 (`not-found.tsx`) | Branded page: a floating logo, a gradient italic "404", "This page wandered off.", a home link and the phone number. |
| `/sitemap.xml` | The six public pages with priorities (home 1.0 · services 0.9 · contact 0.8 · about 0.7 · careers/faq 0.6), `changeFrequency: monthly`. |
| Redirects | `/services/home-care` → `/services#home-care`, `/services/home-health` → `/services`, `/getting-started` → `/contact` (308, in `next.config.ts`) — pages removed because their content wasn't verified. |
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

### 8.2 Brand — `src/components/brand/`

| Component | Purpose |
| --- | --- |
| `LogoDefs` | Hidden SVG with the shared gradients (`oa-logo-brand`, `oa-logo-light`) and the finger-gap mask (`oa-logo-gaps`). Rendered once in the root layout. |
| `LogoMark` | The hands-holding-heart mark: one hand path mirrored, a mask that cuts the finger gaps, and a stroked heart. `tone="brand"` (purple/pink) or `"light"` (white/pale pink) for dark backgrounds. |
| `Logo` | Mark + "Open Arms" (Courgette script) + "& Heart Services Inc" (Quicksand). Links home. The mark tilts and scales on hover. `compact` hides the tagline. |
| `Ribbons` | Four flowing SVG strokes in iris and blush gradients (echoing the brand banner artwork) that **draw themselves** in when scrolled into view. Gradient IDs come from `useId` per instance. |
| `Aurora` | Three slowly drifting colour blobs behind heroes and dark sections, drawn with **radial gradients** rather than blur filters (much cheaper to paint). `dark` variant available. |

### 8.3 Layout — `src/components/layout/`

**`Header`**

* **Skip to content** link (visible on keyboard focus).
* **Utility bar** (desktop): credentials, "Serving Central Florida since 2017", email and office phone. It collapses away once the page is scrolled more than 30px.
* **Floating glass pill nav.** Transparent at the top, switching to glass when scrolled or when the mega menu is open. It **hides on scroll down** (after 380px) and returns on scroll up.
* **Desktop links.** A hover highlight slides between links (`layoutId="nav-hover"`), and the active page shows a pink dot (`layoutId="nav-active"`).
* **Types of Care mega menu** (hover or focus). The six types of care (icons, deep anchors) and a photo card promoting the care finder. It animates in with scale and blur, and the header won't hide while it's open.
* **Actions.** A phone button with a pulsing ring, and a "Request care" primary button, both magnetic.
* **Mobile menu.** A full-screen dark overlay that opens with a **circular `clip-path` reveal** from the hamburger. Numbered links stagger in from the right, with a phone button at the bottom. It locks Lenis and the page scroll, and closes on navigation. `role="dialog"`, `aria-modal`.

**`Footer`**

* A giant **outlined text marquee** ("Open arms · Open heart · Home is where the heart is · Where there is love, there is life").
* Four columns, following the original site's footer: logo + credentials + license numbers · Types of care · **Resources** (Florida 211, Elder Affairs, APD, FloridaHealthFinder, Florida SHINE) · Contact (office phone, fax, address as published, email).
* A descriptive link row, deliberately different wording from the header's short labels for SEO.
* Copyright with the current year, the license numbers, and **BackToTop** (a Lenis glide).
* Extra bottom padding on mobile so the floating call bar never covers the footer.

**`Providers`**: `MotionConfig reducedMotion="user"` + `SmoothScroll`.

### 8.4 Forms — `src/components/forms/`

| Component | Purpose |
| --- | --- |
| `GoogleForm` | Embeds the agency's "Request More Information" Google Form. See §13. |
| `CareLink` | `<Link href="/contact">` that saves one or more type-of-care slugs in `sessionStorage` (`oa-care-programs`) on click, so the form pre-ticks them. This keeps `/contact` a single indexable URL instead of `/contact?care=…` duplicates. Fails silently if storage is unavailable. |

### 8.5 Other shared sections

`CareChooser`, `CtaBand`, `FaqPreview`, `InsuranceSection`, `ResourcesSection`, `AreasServed`, `StackingCards` and `HorizontalServices` (described in §7).

---

## 9. Content & data layer

All copy and business facts live in **typed TypeScript modules in `src/lib/`**, not in components. **Every value must trace to [`docs/original-site-content.md`](docs/original-site-content.md).**

### 9.1 `site.ts` — company facts

| Key | Value (all from the original website) |
| --- | --- |
| `name` / `shortName` | "Open Arms & Heart Services Inc." / "Open Arms & Heart Services" |
| `tagline` / `motto` | "Home Is Where The Heart Is" / "Where There Is Love, There Is Life" |
| `since`, `owner` | 2017 · Shantana Johnson, Owner |
| `credentials`, `licenses` | APD Central Region Provider, Licensed Florida Home Health Agency · 2999995365, 235855 |
| `phone`, `fax`, `email` | 321-217-2409 · 855-257-1340 · openarmsandheartservices@gmail.com |
| `address` | "1920 Verano Dr., Ste 105" / "Ocala, FL 2345" — exactly as published |
| `applicationUrl` | The JotForm employment application linked from the original Careers page |
| `areas` | Non-Skilled Home Health Services counties (5) and APD Central Region counties (6) |

It also exports `allCounties` (9), `fullAddress`, `licenseLine`, `sinceLine` and `nav`.

### 9.2 `services.ts` — programs, pillars & highlights

* **`programs`** — the six types of care (`Program`: slug, name, short, tag, icon, image, summary, intro, points, note, `formLabel` = the exact checkbox option on the agency's Google Form, used to pre-tick it). Copy is verbatim; only the spelling typos "Habitation" and "Healtchare" are corrected. `programHref(p)` → `/services#slug`.
* **`highlights`** — the original home page's three highlights (Companion Care, Residential, Personal Support), each tagged with matching published service items.
* `programBySlug`.

### 9.3 `content.ts`

| Export | Source | Used by |
| --- | --- | --- |
| `audiences` (5) | Phrases from the original copy | `AudienceBento` |
| `needs` (13) | Published "Services and Support" items | `CareChooser` |
| `insurances` (10) | Home page Q&A | `InsuranceSection`, stacking cards, FAQs, `llms.txt` |
| `roles`, `applicationChecklist`, `requirements` | The linked employment application | Careers |
| `trustQAs` (4) | Home page Q&As, verbatim | `StackingCards` |
| `resources` (5) | Original footer | Footer, `ResourcesSection`, `llms.txt` |

### 9.4 `faqs.ts`

Twelve FAQs in four categories. **Every answer is verbatim text from the original website**; the four home-page Q&As are included as published, and the rest reuse the published program descriptions and notes. Lists (insurances, counties, licenses) are generated from the data.

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
| `spin` (`animate-spin-slow`, 22s) | Hero rotating badge, owner photo ring |
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
| Scroll parallax / fade | `useScroll` + `useTransform` | Heroes, CTA band, type-of-care images | various |
| Rotating text badge | SVG `<textPath>` + CSS spin | Home hero | `home/Hero.tsx` |
| Floating glass cards | CSS `float` keyframe | Home hero | `home/Hero.tsx` |
| Magnetic buttons | Pointer offset → spring | CTAs | `ui/motion.tsx` |
| Split-word headline reveal | Variants with stagger, masked words | Every section title | `ui/motion.tsx` |
| Crossing infinite marquees | CSS translate loop, rotated bands | Home | `home/CrossMarquee.tsx` |
| Expanding hover-reveal panels / snap carousel | `flexGrow` animation, staggered reveal | Home | `home/PillarsReveal.tsx` |
| Scroll-scrubbed text | Per-word opacity/translate from scroll progress | Home manifesto | `home/Manifesto.tsx` |
| Count-up stats | `animate()` writing `textContent` | Home manifesto | `ui/motion.tsx` |
| Pinned horizontal scroll | Sticky viewport + scroll-driven `x` | Home (types of care) | `sections/HorizontalServices.tsx` |
| Sticky stacking cards | Sticky offsets + scale/dim from progress | Home (Q&As) | `sections/StackingCards.tsx` |
| Interactive recommender | `LayoutGroup`, `layout`, `AnimatePresence` | Home, Services | `sections/CareChooser.tsx` |
| Bento with spotlight glow + 3D tilt | CSS vars from pointer | Home, Careers, Insurance, Resources, Contact | `ui/GlowCard.tsx` |
| Self-drawing SVG ribbons | `pathLength` 0 → 1 | Heroes, CTA band | `brand/Ribbons.tsx` |
| Insurance tiles with monograms | Glow + tilt cards, marquee | Types of Care | `sections/InsuranceSection.tsx` |
| Resource link cards | Glow + tilt, external links | Contact | `sections/ResourcesSection.tsx` |
| Rotating gradient photo border | Spinning conic gradient behind an inset photo | About (owner) | `about/AboutSections.tsx` |
| Scroll-spy sticky sidebar | `useInView` + `layoutId` + progress rail | Types of Care | `services/ServiceScrollspy.tsx` |
| Sticky image story | Clip-path wipes keyed to chapters | About | `about/AboutSections.tsx` |
| Sliding name typography | Opposite-direction `x` + rotating logo | About | `about/AboutSections.tsx` |
| Photo marquee | Two opposite rows | About | `about/AboutSections.tsx` |
| Requirements ticker | `Marquee` | Careers | `careers/CareersClient.tsx` |
| Live search + filter | `useMemo` filter, `layoutId` pill, popLayout | FAQ | `faq/FaqExplorer.tsx` |

**Reduced motion.** `MotionConfig reducedMotion="user"` disables transform animations in Motion, Lenis is not mounted, and a CSS media query neutralises keyframes and transitions.

---

## 12. Responsive behaviour

The site is designed **mobile-first**. These sections adapt their *interaction pattern*, not just their layout, at the Tailwind `sm` (640px), `md` (768px) and `lg` (1024px) breakpoints:

| Section | Phones | Desktop |
| --- | --- | --- |
| Header | Hamburger → full-screen circular-reveal menu; utility bar hidden | Utility bar, inline nav, mega menu |
| Floating call bar | Shown after 520px of scroll | Hidden |
| Page heroes | Lead photo shown as a wide card under the text | Arch photo + inset photo collage |
| Home "What we provide" | Horizontal **snap carousel**, all details visible | Expanding hover panels |
| Home types of care | Pinned horizontal scroll with 82vw cards | Same, 400px cards |
| Home Q&As | Sticky stacking cards | Sticky stacking cards beside a sticky intro column |
| Home audience bento | Same 6-column bento; compact padding; descriptions hidden | Bento with hover-reveal descriptions |
| Home "Where we serve" | 2 compact columns of county chips | 2 columns |
| Service scroll-spy | Sidebar hidden; long-form articles only | Sticky sidebar |
| About story | Image inline in each chapter | Sticky image panel |
| Footer | Stacked columns + extra bottom padding for the call bar | 4 columns |

---

## 13. Forms & the contact pipeline

### 13.1 `GoogleForm` — "Request More Information"

The Contact and Types of Care pages embed the agency's own Google Form (`site.inquiryForm` in `src/lib/site.ts`), the same form the original website embedded. It asks for **First and Last Name\*, Email\*, Phone Number\*, Services you are interested in\*** (the six types of care, plus "Other"). Google handles validation, submission, the confirmation message and response storage, so responses arrive exactly where they did before. There is no server code, API route or email setup.

* **Embed:** `…/viewform?embedded=true` in a lazy-loaded iframe inside a glass card, with a spinner underneath until the form paints. Below it: "Open the form in a new tab" and the office phone.
* **Height:** a cross-origin iframe can't report its height, so the iframe has fixed heights per breakpoint (`1660px` / `1520px` from 420px / `1420px` from 640px). These were measured with room for Google's validation messages. Re-measure if questions are added to the form.
* **Pre-ticking:** `CareLink` (and the care finder) store type-of-care slugs in `sessionStorage` (`oa-care-programs`). `GoogleForm` reads them once and uses Google's prefill parameters (`usp=pp_url&entry.499657858=<formLabel>`), so the chosen types of care arrive already ticked.
* **CSP:** `frame-src` allows `https://docs.google.com`.

> If the agency renames the form's checkbox options, update `formLabel` in `src/lib/services.ts` (prefill matches the labels exactly). If the "Services" question is recreated, update `site.inquiryForm.servicesEntry`.

## 14. SEO & AI discoverability

### 14.1 Metadata per page

Every page uses `pageMetadata()` (unique title, description, self-referencing canonical, `og:*`, Twitter card). Titles ≤ 60 characters, descriptions ≤ 155, all built from verified content:

| Path | Title |
| --- | --- |
| `/` | Open Arms & Heart Services \| Home Is Where The Heart Is |
| `/services` | Types of Care & Services \| Open Arms & Heart Services |
| `/about` | About Us & Our Mission \| … |
| `/careers` | Careers — Join Our Care Team \| … |
| `/faq` | Frequently Asked Questions \| … |
| `/contact` | Contact Us & Request Info \| … |

### 14.2 Structured data

* **`MedicalBusiness`** (every page): verified fields only — see §6.3.
* **`FAQPage`** (`/faq`): all 12 questions and answers.

### 14.3 Crawlability

* Pages are statically rendered with all copy in the HTML.
* **Collapsed content is still in the DOM.** FAQ answers are hidden with CSS and `inert`, not removed, so crawlers index them.
* **One URL per page.** `CareLink` replaces `?care=` links, which previously created three duplicate copies of `/contact`.
* `/api/` is disallowed in `robots.txt` (there are no API routes today).

### 14.4 On-page signals

* Exactly one `<h1>` per page and **no skipped heading levels**. The footer column titles are `h2`, accordion questions `h3`, and form titles `h2`.
* **Descriptive link text.** "Learn more" links carry screen-reader text naming the service; buttons read "Ask about APD services" etc.; footer links use distinct descriptive anchors.
* **`<strong>` emphasis** on key phrases via `**bold**` in content strings.
* Descriptive `alt` text on content images; decorative images use `alt=""`.

### 14.5 Social sharing

A generated Open Graph image (`/opengraph-image`, 1200×630) with page-specific OG titles, descriptions and URLs.

### 14.6 `/llms.txt`

A plain-text Markdown map of the site for AI answer engines (ChatGPT, Claude, Perplexity, Gemini), following the [llmstxt.org](https://llmstxt.org) convention. It is **generated from the content modules**: credentials, licenses, mission, contact details, service-area counties, the six types of care with their published copy, accepted insurances, a page directory, resources and all FAQs — verified content only. It is statically built with a one-hour cache header.

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
* `frame-src` allows `docs.google.com` (the embedded Google Form) and `vercel.live` (and GTM when enabled).
* `img-src`, `connect-src` and `font-src` allow `self`, `data:`/`blob:` where needed, and the Vercel toolbar. GTM and Google Analytics domains are added only when `NEXT_PUBLIC_GTM_ID` is set.

> **Adding any new third-party service (chat widget, booking tool, analytics) requires adding its domains to the CSP in `next.config.ts`.** Otherwise the browser will block it.

### 17.2 Application security

* There are no server secrets and no API routes. Form data goes directly from the visitor's browser to Google Forms, which handles validation and spam protection.
* `/api/` is disallowed in `robots.txt`.
* External links use `rel="noreferrer"`.

---

## 18. How-to guides (editing the site)

### 18.1 Change the phone number, address, hours or service areas

Edit `src/lib/site.ts` — but **only with information the client has confirmed or published**, and record it in `docs/original-site-content.md` (or a successor source note). Values flow into the header, footer, CTAs, contact page, FAQ answers, JSON-LD, `llms.txt` and the Open Graph image.

### 18.2 Add the client's email address

Already present — `site.email` is the address published on the original Contact page.

### 18.3 Add or edit a service

Types of care live in `programs` in `src/lib/services.ts`. Use the client's own wording, set `formLabel` to the exact option on the agency's Google Form (if one exists), and pick an image. A new type of care automatically appears in the mega menu, footer, marquee, home scroller, Types of Care page, care finder (add matching `needs`), inquiry form, JSON-LD and `llms.txt`.

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

Append to `faqs` in `src/lib/faqs.ts` — the **answer must be text the client has published or approved**. It appears on `/faq`, in the FAQPage JSON-LD and in `llms.txt`; the home page shows FAQs not already in the stacking cards.

### 18.6 Add a job role or requirement

Edit `roles` / `requirements` in `src/lib/content.ts` to match the agency's employment application.

### 18.7 Add a new page

1. Create `src/app/<route>/page.tsx` (a Server Component).
2. Export `metadata = pageMetadata({ path: "/<route>", title: "≤31 chars", description: "≤155 chars" })`.
3. Start with `<PageHero … images={[...]} />` so the page gets a prioritised LCP image, and end with `<CtaBand />`.
4. Add it to `nav` in `site.ts` (header), `footerLinks` in `Footer.tsx`, `routes` in `sitemap.ts`, and the page list in `llms.txt/route.ts`.

### 18.8 Link to the contact form with a care type

```tsx
import { CareLink } from "@/components/forms/CareLink";
<CareLink care="apd" className="btn-primary">Ask about APD services</CareLink>
<CareLink care={["home-care", "va"]}>…</CareLink>
```

Never link to `/contact?care=…`.

## 19. Deployment

The project is configured for **Vercel**, with no extra configuration file.

1. Import the GitHub repository into Vercel. The framework is auto-detected as Next.js; the build command is `npm run build`.
2. Set `NEXT_PUBLIC_SITE_URL` (§4).
3. Inquiries need no setup — they go through the embedded Google Form.
4. Add the custom domain in Vercel, then update `NEXT_PUBLIC_SITE_URL` to match and redeploy.
5. Verify the domain in Google Search Console (`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`) and submit `https://<domain>/sitemap.xml`.
6. After deploying, run PageSpeed Insights and the SEO audit against the live domain.

Any other Node host works as well (`npm run build && npm start`); the security headers come from `next.config.ts`, not a platform file.

---

## 20. Conventions & gotchas

* **Verified content only.** Every fact and piece of copy must trace to `docs/original-site-content.md` (or newer client-approved material, recorded there). Don't invent services, claims, statistics, hours, testimonials or contact details.
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

**Single source of truth:** the agency's original website, **openarmsandheart.org** (Home, Types of Care, About Us, Careers, Contact), plus the two forms it links to (the "Request More Information" Google Form and the JotForm employment application). Everything is captured verbatim in [`docs/original-site-content.md`](docs/original-site-content.md).

**Removed in the verification pass** (not supported by the original website): the Skilled Home Health program and page, the separate Home Care page (its service descriptions, day timeline and respite cards), the Getting Started page (process steps, checklist, referral panel), the home "How care begins" steps, the "Open arms/heart/lines/door" promise cards, funding notes, invented role descriptions and perks, Facebook/LinkedIn links, the NPI number, maps and city/ZIP data from directories, office hours, and all derived resource descriptions. Old URLs redirect (§7.10).

**Please confirm with the client:**

- [ ] **Address.** Published as *"1920 Verano Dr., Ste 105, Ocala, FL 2345"* — the ZIP is incomplete. The site shows it exactly as published, with no map link. Get the correct city and ZIP.
- [ ] **Phone.** The original home page's call band shows **407-222-2222**; everywhere else shows **321-217-2409** (labelled "Office"). The site uses 321-217-2409.
- [ ] **Typos corrected:** "Residential Habitation" → **Habilitation**; "Healtchare" → **Healthcare**.
- [ ] **Dept. of Elder Affairs link.** The original linked it to the APD page; the site links to elderaffairs.org.
- [ ] **"Integrated Simply"**, "Children Medical Services", "OPTUM (VA)", "United Healthcare" are shown exactly as published.
- [ ] **Skilled home health** — not on the original site, so not shown. Add back only if the client confirms it.
- [ ] **Photography.** The owner's photo is the client's own; all other images are licensed stock (§24).
- [ ] **Google Form.** Submit one test inquiry on the live site and confirm it appears in the form's responses.

## 22. Known limitations & future work

* Inquiries go to the agency's Google Form, which can notify by email (Google Forms → Responses → "Get email notifications"). There is no database or CRM integration.
* **No CMS.** Content is edited in TypeScript files and needs a redeploy. A headless CMS (Sanity, Contentful, etc.) could be added later; the `src/lib` modules are the natural seam.
* **No automated tests, ESLint or CI pipeline.** The production build is the only gate.
* **CSP uses `'unsafe-inline'` for scripts.** This is a deliberate trade-off to keep pages static; nonce-based CSP would need dynamic rendering.
* **Analytics and HIPAA.** Home-health agencies are typically HIPAA-covered entities. Review with the client before enabling GTM, Google Analytics or any tracking on pages that collect health-related enquiries.
* **Lighthouse figures are lab measurements.** Field data (CrUX) will only exist once the site has real traffic.

---

## 23. Project history

| Commit | Summary |
| --- | --- |
| `97b655c` / `e993448` — *first commit* | Initial build: brand research, design system, all 9 pages, motion system, forms and API, SEO basics (sitemap, robots, OG image, JSON-LD) |
| `ac9f6ac` — *SEO Optimization* | Resolved the technical SEO audit: CSS-first hero entrances, `Photo` component and image sizing, font trimming, shared logo defs (duplicate IDs), `CareLink` (duplicate contact URLs), `pageMetadata` (titles, descriptions, `og:url`), security headers and CSP, crawlable accordions, contact page content and map facade, heading hierarchy, descriptive links, `<strong>` emphasis, `llms.txt`, no-JS form fallback and `/thank-you`, contrast fixes |
| `310b2b7` — *Mobile version fixes* | Mobile adaptations: pillar snap carousel (no cropped service pills), stacking cards on mobile, pinned step progress bar, bento layout on all sizes, three-column service areas |
| *Content from original website* | Rebuilt the content around the agency's original site: seven types of care, insurance list, licenses, mission, founder story + photo, office phone & email, published counties, careers via the agency's JotForm, community resources; inquiries delivered to the agency's Google Form; new `InsuranceSection` and `ResourcesSection`; removed `PillarSwitcher`, `ComparisonTable`, `PaymentGrid` |
| *Verified content only* | Captured the original site verbatim in `docs/original-site-content.md` and removed every unverified fact and page: Skilled Home Health, Home Care and Getting Started pages, process steps, promises, funding notes, social links, NPI, maps/directory address data; FAQs, careers, audiences, highlights, insurance and resources rewritten to verbatim content; redirects for removed URLs |
| *(next)* — *Embedded Google Form* | Contact and Types of Care now embed the agency's own "Request More Information" Google Form (as the original site did), with type-of-care pre-ticking via Google's prefill parameters; removed `InquiryForm`, `/api/contact`, `/thank-you` (redirects to `/contact`) and the Resend setup; the site is now fully static |

---

## 24. Photo credits

All photos are from [Unsplash](https://unsplash.com) under the [Unsplash License](https://unsplash.com/license) (free for commercial use; no attribution required). They are self-hosted in `public/images/` and should be replaced with client photography when available.

<details><summary>Source of each image (26)</summary>

| File | Source |
| --- | --- |
| `hero-caregiver-laughing.jpg` | https://images.unsplash.com/photo-1765896387377-e293914d1e69 |
| `aide-smiling-patient.jpg` | https://images.unsplash.com/photo-1765896387387-0538bc9f997e |
| `companion-care.jpg` | https://images.unsplash.com/photo-1765896387398-1e1ae8d2eb85 |
| `activities-coloring.jpg` | https://images.unsplash.com/photo-1762955911431-4c44c7c3f408 |
| `occupational-therapy.jpg` | https://images.unsplash.com/photo-1762955911769-d652ceaa94bb |
| `speech-therapy.jpg` | https://images.unsplash.com/photo-1685608625845-184d982f3f69 |
| `social-work.jpg` | https://images.unsplash.com/photo-1758691462321-9b6c98c40f7e |
| `personal-care.jpg` | https://images.unsplash.com/photo-1773227055624-07b515ba87c5 |
| `personal-supports.jpg` | https://images.unsplash.com/photo-1709127347874-3f4674be5bc8 |
| `residential-habilitation.jpg` | https://images.unsplash.com/photo-1709127347878-bd27e64d1e3e |
| `family-baking.jpg` | https://images.unsplash.com/photo-1758874960394-afd9ead46eba |
| `child-smiling.jpg` | https://images.unsplash.com/photo-1646250852980-e2beba095e97 |
| `senior-portrait.jpg` | https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8 |
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
