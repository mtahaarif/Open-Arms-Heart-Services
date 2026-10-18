# Open Arms & Heart Services Inc. — Website

Marketing site for **Open Arms & Heart Services Inc.**, a Central Florida provider of skilled home health and non-skilled home care.

Built with **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Motion · Lenis**.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

> **Windows note:** the project folder name contains `&`, which breaks the `node_modules/.bin` shims that
> `npx` uses. The npm scripts therefore call Next's binary directly (`node node_modules/next/dist/bin/next …`),
> which works everywhere, including Vercel. Avoid `npx next …` in this folder.

## Environment variables

Copy `.env.example` to `.env.local` (or set them in Vercel → Project → Settings → Environment Variables).

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production URL — used for canonical URLs, sitemap and social cards. Falls back to the Vercel production URL. |
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com) for the contact & careers forms. |
| `CONTACT_TO_EMAIL` | Where form submissions are sent (comma-separate for several). |
| `CONTACT_FROM_EMAIL` | Optional verified sender, e.g. `Open Arms Website <website@yourdomain.com>`. |

Until `RESEND_API_KEY` and `CONTACT_TO_EMAIL` are set, the forms show a friendly “please call us” message instead of silently failing.

## Where to edit content

| File | What's in it |
| --- | --- |
| `src/lib/site.ts` | Company facts — phone, fax, address, hours, email, social links, service areas, founder |
| `src/lib/services.ts` | The two pillars (Home Health / Home Care) and all 13 services, with photos & copy |
| `src/lib/content.ts` | Process steps, audiences, promises, care-finder needs, payment options, careers roles |
| `src/lib/faqs.ts` | FAQ questions & answers |
| `public/images/` | Photography |

## Pages

`/` · `/about` · `/services` · `/services/home-health` · `/services/home-care` · `/getting-started` · `/careers` · `/faq` · `/contact` · plus `sitemap.xml`, `robots.txt`, a generated Open Graph image and the SVG favicon.

## Motion & UI patterns

| Pattern | Where |
| --- | --- |
| Route transition curtain (`app/template.tsx`) | Every client-side navigation |
| Lenis smooth scroll + top scroll-progress bar | Global |
| Glass floating nav, hide-on-scroll, services mega-menu, circular-reveal mobile menu | Header |
| Split-word headline reveals, magnetic buttons | Global |
| Mouse-parallax hero with floating glass cards + rotating text badge | Home hero |
| Crossing infinite marquees | Home |
| Expanding hover-reveal panels | Home · two pillars |
| Scroll-scrubbed manifesto text + count-up stats | Home |
| Pinned horizontal-scroll cards | Home · skilled services |
| Sticky stacking cards + sticky sidebar | Home · non-skilled services |
| Interactive care finder (layout animations) | Home, Services |
| Sticky step tracker with progress rail | Home |
| Bento grid with cursor-spotlight glow + 3D tilt | Home, Careers, Payment |
| Segmented pillar switcher, animated comparison table | Services |
| Scroll-spy sticky sidebar + parallax imagery | Home Health |
| Hover-reveal photo cards, scroll-drawn day timeline | Home Care |
| Sticky image story, sliding name typography, 3D flip cards, photo marquee | About |
| Auto-advancing story stepper, interactive checklist with progress ring | Getting Started |
| Live-search FAQ with sticky category filter | FAQ |

All motion respects `prefers-reduced-motion`.

## ⚠️ Verify with the client before launch

These details came from public directory listings (NPI registry, LinkedIn, Facebook) and should be confirmed:

- [ ] **Email address** — none found publicly; add it to `site.email` and set `CONTACT_TO_EMAIL`.
- [ ] **Office hours** — from a single directory listing (Mon–Fri 9–6, Sat–Sun 10–4).
- [ ] **Primary phone** — `(321) 430-8194` (NPI registry). Another listing shows `(321) 217-2409`.
- [ ] **Office address** — `1920 Verano Dr, Ste 105, Haines City, FL 33844` (NPI practice location). Other listings show Minneola, Ocoee, Apopka and Orlando addresses.
- [ ] **Service-area counties & towns** — inferred from those addresses (Polk, Lake, Orange).
- [ ] **Payment options** — Florida Medicaid is confirmed by the NPI record; confirm private insurance, long-term care insurance, waiver programs and private pay.
- [ ] **Founded 2017** — based on the NPI enumeration date (2017-08-31).
- [ ] **Non-skilled service list** — taken from the LinkedIn specialties and NPI taxonomies (incl. Personal Supports & Residential Habilitation).
- [ ] **Founder bio** — kept deliberately brief; ask the client for a real bio, photo and preferred pronouns.
- [ ] **Licence numbers / accreditations** — none are displayed; add any the client wants shown.
- [ ] **Testimonials** — none are included. Add real reviews (Google / Facebook) with permission; do not invent them.
- [ ] **Logo** — the header, footer and favicon use an SVG redraw of the logo. To use the original artwork, drop it in `public/` and swap it into `src/components/brand/Logo.tsx`.
- [ ] **Photography** — placeholder stock (below). Real photos of the team will make the site far more personal.

## Photo credits

All photos are from [Unsplash](https://unsplash.com) under the [Unsplash License](https://unsplash.com/license) (free for commercial use, no attribution required). Replace with client photography when available.

<details><summary>Source of each image</summary>

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

</details>
#   O p e n - A r m s - H e a r t - S e r v i c e s  
 