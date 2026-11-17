# Open Arms & Heart Services Inc. — Website

> Production marketing website for **Open Arms & Heart Services Inc.**, a Florida-licensed home health agency and APD Central Region provider serving Central Florida since 2017.
>
> **Design direction (November 2026):** the owner's content and page structure, presented in the project's original dynamic design language — soft lavender gradients, aurora and ribbon heroes, arch photos, glass panels, glowing cards and deep-plum bands — with the busiest effects simplified (see §1.2).
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

> **2026-10-24:** "The current design feels a little too busy for my taste … I would like a cleaner, more polished design with easy navigation, a more professional font, and welcoming pictures that reflect the people we serve." The owner also provided her own ChatGPT mock-up and pointed to the Mind & Mobility and Ms. Lynn's websites for inspiration.
>
> **2026-11 follow-up:** the content of the simplified redesign was right, but the design had become *too* simplified. Bring back the design philosophy of the earlier dynamic version, with some simplifications (e.g. the crossing infinite tickers become one simple ticker), keeping the content exactly the same.

| Request | Result |
| --- | --- |
| **Content exactly the same** | All copy, facts, page structure, the Google Form and the careers JotForm are unchanged from the October redesign (sources: §16). Only visual design changed. |
| **The earlier design philosophy** | Restored from the dynamic version (git `1732445` and earlier): iris/blush palette on lavender paper; aurora + hairline-grid + ribbon heroes; arch-shaped hero photos with floating glass cards, a circular inset and a rotating text badge; gradient accent words in headings; glass header, panels and cards; cursor-following glow cards; photo cards with deep-plum gradient overlays; deep-plum rounded bands; a dark rounded footer with a giant outlined text ticker; fade-up reveals on scroll. |
| **Simplified** | One straight credentials ticker instead of two crossing tickers. No smooth-scroll hijacking (Lenis), pinned horizontal scroll, stacking cards, scroll-scrubbed text, mouse parallax, magnetic buttons, 3D tilt or page-transition curtains. No animation library at all — CSS animations plus one tiny `IntersectionObserver`. |
| **Professional font** | Headings stay as chosen on 2026-10-27: **League Spartan** (Manrope fallback) in **capitals, without full stops**, with **Source Sans 3** for body text. |
| **Welcoming pictures** | The October photography is kept (§20). |

**References:** Mind & Mobility (mindandmobility.com) and the owner's mock-up shaped the content and navigation. "Ms. Lynn's website" couldn't be identified from the name alone.

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

Client-side JavaScript is limited to: the header (mobile menu, active link), `GlowCard` (sets two CSS variables on pointer move), `RevealObserver` (one `IntersectionObserver` for fade-up reveals), `HeroSlides` (home banner slides), `ServiceStack` (active service on `/services`), `CareLink` and the `GoogleForm` embed. There are no animation or smooth-scroll libraries — every animation is CSS.

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
│   │   ├── layout.tsx              Fonts, metadata, JSON-LD, `html.js` flag, RibbonDefs, RevealObserver, TopBar/Header/Footer
│   │   ├── globals.css             Design tokens, keyframes, base typography, reveal CSS, utilities
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
│   │   ├── brand/Ribbons.tsx       RibbonDefs, Ribbons, Aurora, RotatingBadge (CSS-animated SVG/gradients)
│   │   ├── layout/TopBar.tsx       Slim lavender utility line: since-line + phone (server)
│   │   ├── layout/Header.tsx       Floating glass pill header: dropdown, mobile menu (client, plain-data props)
│   │   ├── layout/Footer.tsx       Dark rounded footer: outlined text ticker, columns, resources
│   │   ├── forms/GoogleForm.tsx    Embedded Google Form with prefill
│   │   ├── forms/CareLink.tsx      Link that pre-ticks services in the form
│   │   ├── sections/               TrustStrip (ticker), ServiceCards, AreasBand, ComingSoon,
│   │   │                           CareersFeature, Coverage, Steps, ContactBand, HeroSlides,
│   │   │                           StackingCards, MissionStatement, ServiceStack
│   │   └── ui/                     Photo, Link, PageHeader, BannerOverlay, SectionHeading (+ Lines), GlowCard,
│   │                               Marquee, RevealObserver
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

Pages and sections are **Server Components**. The small Client Components are:
- `Header`, for the mobile-menu state and the active link;
- `GlowCard`, for the cursor-following glow;
- `RevealObserver`, which reveals `[data-reveal]` elements as they scroll into view;
- `HeroSlides`, the home banner's photo slides and controls;
- `ServiceStack`, which tracks the active service on `/services` and swaps its photo;
- `CareLink`, for its `sessionStorage` hand-off;
- `GoogleForm`, which builds the iframe URL with the prefill parameters.

Client components receive only plain data (strings, numbers) or already-rendered elements from server pages — never components or functions (e.g. `GlowCard` takes `href` and renders `Link` itself; `ServiceStack` takes each service's photo and card group as rendered JSX).

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
* Adds `class="js"` to `<html>` with a one-line inline script before any content paints. Reveal-on-scroll only hides elements under `html.js`, so crawlers and no-JS visitors always see everything.
* Renders `RibbonDefs` (the ribbon gradients, once per page), `RevealObserver`, a "Skip to content" link, `TopBar`, `Header`, `<main id="main">` and `Footer`, plus optional lazy GTM.

### 6.3 Redirects (`next.config.ts`)

Retired URLs redirect permanently (308): `/services/home-care` → `/services#home-care`, `/services/home-health` → `/services`, `/getting-started` → `/contact` and `/thank-you` → `/contact`.

---

## 7. Design system

### 7.1 Colour tokens (`@theme` in `globals.css`)

| Token | Value | Use |
| --- | --- | --- |
| `plum-50` … `plum-950` | `#f8f5fe` … `#1d0f35` | The brand iris scale. `plum-700` `#60349f` for links and eyebrows; `plum-500`/`600` in gradients |
| `blush-50` … `blush-700` | `#fff3f8` … `#b03567` | The logo pink. Gradient ends, accents on dark bands, the eyebrow dot |
| `navy-100` … `navy-950` | `#e1d2f8` … `#140a26` | Deep-plum scale for dark bands (`navy-900` `#1d0f35`) and light text on them (`navy-100`) |
| `ink` | `#24173a` | Headings |
| `body` | `#5e5373` | Body text |
| `cream` | `#fdfbff` | Page background (lavender paper) |
| `line` | `#ece4f8` | Borders and dividers |

The signature gradient runs `plum-700 → plum-500 → blush-500` (buttons, accent words, icon tiles, ticker). Text on every background meets WCAG AA contrast (Lighthouse accessibility 100).

### 7.2 Typography

| Element | Style |
| --- | --- |
| `h1` | League Spartan medium (500), UPPERCASE, 0.01 em tracking, 2.1 rem → 3.4 rem (home hero 4.1 rem), `text-balance` |
| `h2` | League Spartan medium, UPPERCASE, 1.7 rem → 2.2 rem |
| `h3` | Source Sans 3 bold, 1.25 rem (card titles use League Spartan uppercase) |
| Body | Source Sans 3, 17 px / 1.7 line height |
| `.eyebrow` / `.eyebrow-dark` | Pill label: 12 px bold uppercase, rounded-full, pink dot (`::before`) |
| `.lead` | 18–19 px intro paragraphs |
| Accent words | `*phrase*` in a `SectionHeading`/`PageHeader` title renders in the brand gradient (`text-gradient`, or `text-gradient-light` on dark bands). Put the marker inside the full stop: `"Your goals. *Our heart*."` |
| No full stops | Headings never show a full stop; each sentence starts a new line (`Lines` in `SectionHeading.tsx`) |
| Display accents | `font-display` (League Spartan) for the motto, service taglines, mission quote, numbers and the owner's name |

### 7.3 Utilities (`@utility`)

| Class | Purpose |
| --- | --- |
| `wrap` | Centred container: max-width 1200 px, 16 px gutter on phones (28 px from `sm`) |
| `section` | Vertical section padding (80 px → 112 px) |
| `eyebrow`, `eyebrow-dark`, `lead` | Text styles above |
| `text-gradient`, `text-gradient-light` | Gradient text |
| `glass`, `glass-dark` | Frosted panels (translucent gradient, `backdrop-filter`, hairline border, soft shadow) |
| `card` | Rounded 28 px white card with a soft lavender shadow |
| `band-dark` | Deep-plum surface with pink/iris corner glows (bands, footer, dark cards) |
| `glow-card` | Cursor-following gradient border + spotlight; pair with `<GlowCard>`. Put card content in `relative z-[4]` so it sits above the glow layers |
| `hairline-grid`, `mask-fade-x` | Faint grid background; edge fade for the ticker |
| `enter` | Above-the-fold entrance (`--enter` picks the keyframe: `enter-up`, `rise`, `enter-pop`; `--d` sets the delay) |
| `btn`, `btn-primary`, `btn-outline`, `btn-light`, `btn-outline-light` | Pill buttons: gradient (shifts on hover) / glass / white / outlined-on-dark |
| `link-arrow` | Underlined purple text link |
| `check-list` | Gradient-circle tick list. Spacing is set where it's used (`space-y-*` or a grid gap) |

### 7.4 Interaction

All motion is CSS and respects `prefers-reduced-motion` (animations and reveals are switched off).

* **Reveal on scroll:** add `data-reveal` to any element (optionally `[--d:120ms]` for a stagger). `RevealObserver` adds `.is-in` and the element fades up. `SectionHeading` reveals itself.
* **Above the fold:** heroes use the `enter` utility so they animate from the first paint. Headlines use `rise` (movement only, so they count as painted immediately for LCP). The arch photo settles in with a transform.
* **Horizontal track (`.hs` in `globals.css`):** `section.hs[--n:<cards>] › .hs-pin › ul.hs-track`. Everywhere it's a native scroll-snap row (hidden scrollbar). On desktop (≥1024px) in browsers with scroll-driven animations (`animation-timeline: view()`) and no reduced-motion preference, the section's height grows by the overflow width, `.hs-pin` sticks to the viewport, and the track's `transform` follows the section's view timeline (`animation-range: contain`); `.hs-bar` grows in step. Pure CSS, compositor-only. Other browsers keep the swipe row.
* **Stacking cards (`.qa-*`):** each card wrapper is `sticky` with a slightly lower `top`; with scroll-driven animation support, cards shrink (`--qa-s`) and dim (`--qa-dim`) over per-card `animation-range`s of the stack's view timeline. Otherwise they simply stack.
* **Ticker:** `Marquee` — one straight row, content duplicated once (copy `aria-hidden`), pauses on hover. Used for the credentials strip and the footer's outlined lines.
* **Ambient:** aurora blobs drift (`animate-blob`), ribbons fade in, floating hero cards bob (`animate-float`), the hero badge rotates (`animate-spin-slow`), the owner's portrait ring rotates.
* **Hover:** glow cards follow the cursor; photo cards zoom slowly; arrow buttons rotate 45°; gradient buttons shift.
* **Performance rule:** only animate `transform` and `opacity`. A stroke "draw-in" on the ribbons and a `clip-path` reveal on the arch photo were tried and removed: neither runs on the compositor, and together they added over 1 s of main-thread blocking on mobile.

## 8. Pages — section by section

### 8.0 Page banners (every page)

Modelled on the About banner of lovethyneighborhhc.com:
- A full-bleed photo under a dark plum treatment (`BannerOverlay`) that runs up behind the floating header.
- Everything centred on top: a breadcrumb (home icon › page), an eyebrow led by a short blush rule, the H1 in white with light accent words, the intro, and any actions.
- `PageHeader` builds it on the inner pages.
- The home banner uses the same structure, keeping its four cross-fading photos and slide controls (no breadcrumb).
- The banner photos are placeholders until the generated images arrive. Prompts, sizes and the people in each are in `docs/banner-image-prompts.md`.

### 8.1 Home — `/` (mirrors the owner's mock-up)

| # | Section | Design |
| --- | --- | --- |
| 1 | Top bar + header | Slim lavender utility line ("Compassionate care across Central Florida since 2017" · "Call our team: 321-217-2409") above the floating glass pill header |
| 2 | Banner | The site-wide banner structure (§8.0): four full-bleed photos cross-fading every 7 s with a slow zoom under the dark plum treatment, behind the floating header; centred ruled eyebrow "Rooted in compassion · Central Florida", the white headline revealed line by line, lead, gradient (shine-on-hover) and outline buttons, the motto; a glass control pill with progress bars, counter and previous/next (`HeroSlides`, client). Autoplay is off for reduced motion |
| 3 | Credentials ticker | Light frosted band of icon chips — one per credential — in a single scrolling row |
| 4 | Welcome | "At home. In the community. *By your side*." with audience pills, beside the glass "Finding care should feel less overwhelming" call card |
| 5 | A personal approach | Arch photo with a glass "2017 · Central Florida" chip; "Your family. Your goals. *Our heart*." and gradient/glass buttons |
| 6 | Our services | Horizontal card track (modelled on mourningdovehomecare.com "What we offer"): on desktop the section pins and scrolling down slides the six photo cards sideways, with a progress bar and "Scroll to explore" hint; on phones a swipeable row that snaps to each card |
| 6b | Questions & answers | Copied from the earlier design: "Questions & *answers*" intro (sticky on desktop, phone + "All FAQs") beside four sticky stacking Q&A cards (number, icon, question, answer, insurance or licence chips, photo on desktop). Earlier cards shrink and dim as later ones slide over them (CSS scroll-driven, `.qa-*`) |
| 7 | Service areas | Rounded deep-plum band with ribbons and two glass area cards |
| 8 | Coming soon | Arch photo + glow cards with gradient "Coming soon" pills |
| 9 | Careers | Rounded lavender panel: photo with glass role chips + copy |
| 10 | Coverage | Insurance tiles with monograms (glow) and a deep-plum screening/licence card |
| 11 | Next steps | Three glass step cards with gradient number circles joined by a gradient line |
| 12 | Contact band | Deep-plum card with a photo wash, ribbons and a glass office card |

### 8.2 Our services — `/services`

- **Page banner** (see §8.0).
- **Services (`ServiceStack`):** a sticky photo with each service's description as stacking cards. The sizes live in `.svc` in globals.css.
  - **Phones (under 640px), top and bottom:**
    - The photo (number and title on it) sticks at the top under the header (`--photo-top`, `--photo-h`). It sits on a cream backing, so departing cards slide under it.
    - The cards stack just below it (`--stick`), all one size (`--card-h`, filling the rest of the screen, up to 26rem).
  - **From 640px, side by side:**
    - The photo card and every stacking card share one size (`--card-h`, up to 34rem, never taller than the space below the header). On desktop the width is `--card-w` = 0.8 × height, and the pair sits centred.
    - Both stick at `--stick`, centred in the space below the header.
  - **Photo (sticky):** a large number and the service title on the photo, plus a glass name pill from `sm`. The service whose cards cross the middle of the screen is active. Its photo uses the exact transition from the earlier About page's story section (git `1732445`): it wipes up from the bottom over the previous photo while easing from a 1.08 zoom and fading in (0.9 s, ease-out-expo; CSS `.svc-layer`).
  - **Stacking cards:** each service's published description (identical to openarmsandheart.org/services) split into cards. Each card sticks a little lower than the one before, and the next slides over it. The cards are:
    - Overview (tagline and description);
    - Program (CBC Summer Respite only);
    - "Services and support", at most 4 items per card so every card fits a phone screen;
    - Next step (note, "Ask about …" and phone).
  - **Stacking:** each card sticks 8px lower than the one before. The cards keep their own content centred, and nothing overflows down to 280 × 653 and 320 × 568.
  - **Release:** the gaps between cards are spacer elements, not margins on the sticky cards. A sticky card's own margin lets the cards beneath it slip away early. With spacers, including one after the last card, the whole stack (Next step on top) holds and then releases together when the service ends.
  - **Headings and links:** every service has a visually hidden `h2`. The group carries the slug as its id, so `/services#slug` links land on it.
- **Then:** Coming soon, Coverage, and **Request more information** (`#request`) with glass step cards beside the Google Form.

### 8.3 About us — `/about`

- **Page banner:** "Your family. Your goals. *Our heart*." (see §8.0).
- **Our mission:** copied from the earlier design's home-page manifesto — the mission statement in large type, each word brightening as it scrolls up the screen (CSS `.mission-word`), beside a "Serving Central Florida since 2017" photo card and stat cards (6 types of care, 5 home-health counties, 10 insurances) (`MissionStatement`).
- **Meet the owner (`#story`):** one rounded lavender panel like the earlier design — portrait in a rotating gradient ring with a "since 2017" badge, name, title, the four story paragraphs as plain prose, and credential pills.
- **Who we serve:** the bento from the earlier design's home page ("Who we care for", `AudienceBento` at git `1732445`), with the same layout at every screen size:
  - **Grid:** 6 columns — a tall lead card, then 3 + 3 and 4 + 2. Rows are 140px on phones, 200px from `sm` and 260px from `md`. It uses that version's container (`max-w-7xl`, 16/24/32px gutters) so the card sizes match exactly.
  - **Cards:** five photo cards with a cursor tilt (`GlowCard tilt`), a zoom on hover, a deep-plum overlay and a frosted icon tile. Each links to its service.
  - **Card text:** on mouse devices from `md` up, the title rises and the description fades in on hover. Touch screens always show the description. On `sm`–`md` the description is limited to two lines so it never spills out of the shorter cards.
  - **Audiences:** Children & families, Adults with disabilities, Seniors, Veterans, and Family caregivers ("Caregiver respite, relief and family support").
  - **Below the grid:** the "Open Arms & Heart Services is only a call away!" strip, with the phone number and a link to Our services.
- **Licensed & trusted:** glass credentials card with a gradient licence chip.
- **Contact band.**

### 8.4 Careers — `/careers`

- **Page header:** "Great Careers *Change Lives*." with "Apply online" (the agency's JotForm) and "Ask about current openings".
- **Positions:** bento — a photo card plus a glow card per role, each linking to the application details.
- **Requirements** (glass card) beside **The application asks for** (deep-plum panel with ribbons, EEO/ADA note and "Start your application").
- **Contact band.**

### 8.5 FAQ — `/faq`

- **Page header.**
- **Topic sidebar** (glass, sticky on desktop) with a deep-plum "Still have questions?" card.
- **13 questions** in four groups as glass `<details>` accordions; the plus button turns into a gradient circle when open.
- **`FAQPage` JSON-LD.**
- **Contact band.**

### 8.6 Contact — `/contact`

- **Page banner:** "Let's find the support that *feels right*." (see §8.0).
- **Contact details:** glass glow cards with gradient icon tiles (Call our team, Email, Fax, Visit our office + directions) and a gradient licence chip, beside the **Google Form** (`#request`).
- **Next steps** and **service areas.**

### 8.7 404

The page banner without a photo (the 404 markup ships with every route, so nothing is preloaded): breadcrumb "404", "Page not found", "We couldn't find that page", a link home and the phone number.

## 9. Component reference

| Component | Kind | Purpose |
| --- | --- | --- |
| `brand/Logo` | server | The client's logo (`/brand/logo.png`, 240×188) linking home. It's served through the image optimiser as AVIF/WebP at 1×/2× of its ~102px display width (`getImageProps`, no inline style). With `withName` the company name labels the link (visible from `xl`, screen-reader text below); otherwise the image alt does. |
| `layout/TopBar` | server | Slim lavender utility line with the since-line and phone number |
| `layout/Header` | client | Floating glass pill header (sticky) with a glass hover/focus dropdown for services (numbered gradient tiles); mobile phone button and menu (closes on route change); active-link highlighting. The service list arrives as plain `{ href, label }` props from the root layout, so `lib/services.ts` never ships to the browser. |
| `layout/Footer` | server | Dark rounded footer: giant outlined ticker of the tagline, motto and closing line · logo (on a white tile), description and licences · Services · Company (+ Apply online) · Visit or call · resources row · copyright |
| `ui/Photo` | server | Photo built on `getImageProps`. It uses real width/height from `lib/photos.ts` and requires `sizes`. It outputs AVIF/WebP `srcset` at quality 60; the fallback `src` is the 828px variant (what crawlers download), not the largest. It adds no inline styles (a `bg-plum-100` placeholder). `preload` (LCP image only) adds a high-priority `<link rel=preload>` plus `fetchpriority="high"` and eager loading. Everything else is lazy. |
| `ui/Link` | server | `next/link` with `prefetch={false}` by default. Use it for every internal link (§18). |
| `ui/PageHeader` | server | Page banner: full-bleed photo (`focus` = object-position class) under `BannerOverlay`, behind the header; centred breadcrumb (home icon), ruled eyebrow, white H1 (light accent words), intro and optional actions |
| `ui/BannerOverlay` | server | The shared dark banner treatment: plum tint, top/bottom gradients, dark pool behind the copy, glowing blobs, faint grid, bottom hairline |
| `ui/SectionHeading` (+ `Lines`) | server | Eyebrow pill, heading and lead text, revealed on scroll. Full stops are dropped and each sentence starts a new line; `\n` is a desktop-only break; `*phrase*` is a gradient accent. Takes `tone="light"` on dark bands. |
| `ui/GlowCard` | client | Card with the cursor-following glow. `as` = `div`/`li`/`article`/`a`, or pass `href` for an internal link |
| `ui/Marquee` | server | Simple single-row CSS ticker |
| `ui/RevealObserver` | client | One `IntersectionObserver` that reveals `[data-reveal]` elements; re-scans on navigation |
| `brand/Ribbons` | server | `RibbonDefs` (gradients, once in the layout), `Ribbons`, `Aurora`, `RotatingBadge` |
| `sections/TrustStrip` | server | Credentials as a single straight gradient ticker |
| `sections/ServiceCards` | server | The whole home "Our services" section: heading + `.hs` horizontal track of six photo glow cards |
| `sections/AreasBand` | server | Rounded deep-plum band with glass area cards |
| `sections/ComingSoon` | server | Skilled Home Health and PPEC |
| `sections/CareersFeature` | server | Photo and careers copy band |
| `sections/Coverage` | server | Insurance, screening and licensing, resources (`withResources`) |
| `sections/Steps` | server | Three glass step cards joined by a gradient line |
| `sections/ContactBand` | server | Deep-plum closing card with photo wash, ribbons and glass office card |
| `sections/StackingCards` | server | Home "Questions & answers": sticky stacking Q&A cards from `trustQAs` (`lib/content.ts`) |
| `sections/HeroSlides` | client | Home banner photos (cross-fade, slow zoom) under `BannerOverlay`, and the glass slide controls |
| `sections/MissionStatement` | server | About "Our mission" manifesto + stat cards |
| `sections/ServiceStack` | client | `/services`: sticky photo + title (old About story transition) beside each service's stacking description cards |
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

* **Dynamic, but simplified.** The client wants the earlier dynamic design language without its heaviest effects. Fine: glass, glow, gradients, ribbons, one straight ticker, CSS reveals. Avoid: smooth-scroll libraries, JS scroll hijacking (the one pinned section, the home services track, is CSS-only), crossing tickers, parallax, tilt, page curtains, animation libraries. Only animate `transform`/`opacity`.
* **Headings:** League Spartan capitals, never a full stop (`Lines` drops them); mark gradient accent words with `*…*`.
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
| *Heading font* | Client disliked the Source Serif headings. After trying Varela, all-caps headings, Helvetica/Arial and Geist, headings and other display text now use League Spartan with a Manrope fallback (medium weight); h1/h2 are in capitals |
| **Dynamic design restored (this version)** | Client feedback: the content was right but the design too simplified. Brought back the earlier design philosophy (iris/blush palette, aurora/ribbon heroes, arch photos, glass, glow cards, photo overlays, deep-plum bands, scroll-spy sidebar, dark footer with outlined ticker) with simplifications: one straight ticker, CSS-only motion, no smooth-scroll/parallax; the home services cards later became a CSS-only pinned horizontal track. Content unchanged; League Spartan capital headings without full stops kept |

---

## 20. Photo credits

The stock photos are from [Unsplash](https://unsplash.com) under the [Unsplash License](https://unsplash.com/license): free for commercial use, no attribution required. They are self-hosted in `public/images/` and should be replaced with the agency's own photography when it's available.

<details><summary>Source of each image (24 photos + logo)</summary>

| File | Source |
| --- | --- |
| `adult-wheelchair-community.jpg` | https://unsplash.com/photos/two-women-talking-in-a-gymnasium-c-LWLkJIV6Q |
| `careers-caregivers.jpg` | https://unsplash.com/photos/a-group-of-women-standing-next-to-each-other-ykiy5Zyv7k0 |
| `caregiver-companion.jpg` | https://unsplash.com/photos/a-man-and-woman-sitting-on-a-bench-9__g_UfBXOA |
| `family-game-night.jpg` | https://unsplash.com/photos/family-playing-board-games-VJVsEnR_vNE |
| `friends-smiling.jpg` | https://unsplash.com/photos/two-women-pose-arm-in-arm-smiling-LTgaxUAGNUk |
| `grandmother-granddaughter.jpg` | https://unsplash.com/photos/woman-in-blue-tank-top-wearing-eyeglasses-smiling-Ig4-rFIl7as |
| `nurse-home-visit.jpg` | https://unsplash.com/photos/a-doctor-checking-a-patients-blood-pressure-dcBO4nt4MRE |
| `senior-conversation.jpg` | https://unsplash.com/photos/a-man-sitting-on-a-couch-talking-to-another-man-N5GljcLSmK4 |
| `service-apd.jpg` | https://unsplash.com/photos/a-man-in-a-wheel-chair-in-a-kitchen-75xbITy2szk |
| `service-cbc.jpg` | https://unsplash.com/photos/girl-running-while-laughing-xtd3zYWxEs4 |
| `service-home-care.jpg` | https://unsplash.com/photos/a-man-and-a-woman-in-a-living-room-HscUZd52tQk |
| `service-veterans.jpg` | https://unsplash.com/photos/two-men-talking-one-wears-a-veteran-hat-ydAyN8eRIDw |
| `service-vulnerable-adult.jpg` | https://unsplash.com/photos/an-old-man-and-a-young-woman-are-smiling-c4Fl1BKDJLQ |
| `therapy-play.jpg` (banner) | https://images.unsplash.com/photo-1708686816818-2b018e0c1296 |
| `personal-supports.jpg` (banner) | https://images.unsplash.com/photo-1709127347874-3f4674be5bc8 |
| `grandpa-granddaughter.jpg` (banner) | https://images.unsplash.com/photo-1609113006359-1e9c378ab54d |
| `friends-talking.jpg` (banner) | https://images.unsplash.com/photo-1773227059784-c1e36cc8c8c9 |
| `family-baking.jpg` (About "Who we serve") | https://images.unsplash.com/photo-1758874960394-afd9ead46eba |
| `activities-coloring.jpg` (Q&A) | https://images.unsplash.com/photo-1762955911431-4c44c7c3f408 |
| `caregiver-portrait.jpg` (Q&A) | https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2 |
| `nurse-blood-pressure.jpg` (Q&A) | https://images.unsplash.com/photo-1631815590058-860e4f83c1e8 |
| `nurses-team.jpg` (Q&A) | https://unsplash.com/photos/AZq99Wqunjs |
| `hands-mission.jpg` (About mission card) | https://images.unsplash.com/photo-1454875392665-2ac2c85e8d3e |
| `live-scan.jpg` | https://images.unsplash.com/photo-1585079374502-415f8516dcc3 |
| `founder-shantana-johnson.jpg` | **Client-owned** — from the agency's original website (About Us) |
| `public/brand/logo.png`, `logo-640.png`, `logo-mark.png`, `src/app/icon.png`, `apple-icon.png` | **Client-owned** — the agency's logo (from the owner's mock-up files) |

</details>

---

© Open Arms & Heart Services Inc. All rights reserved. Website code prepared for the client; brand assets, names and business information belong to Open Arms & Heart Services Inc.
