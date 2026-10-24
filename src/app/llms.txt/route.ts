import { insuranceNote, insurances, mission, resources, screening, steps } from "@/lib/content";
import { faqs } from "@/lib/faqs";
import { comingSoon, programHref, programs } from "@/lib/services";
import { fullAddress, licenseLine, site } from "@/lib/site";

export const dynamic = "force-static";

/** /llms.txt — a plain-text map of the site for AI answer engines (llmstxt.org). */
export function GET() {
  const url = (path: string) => `${site.url}${path}`;

  const body = `# ${site.name}

> ${site.description}

"${site.tagline}." — "${site.motto}"

${site.credentials.join(" | ")} · ${licenseLine} · Serving Central Florida since ${site.since}.

Our Mission: ${mission}

- Phone: ${site.phone.display}
- Fax: ${site.fax.display}
- Email: ${site.email}
- Office: ${fullAddress}
${site.areas.map((a) => `- ${a.label}: ${a.text}`).join("\n")}

${site.areaNote}

## Our services

${programs
  .map(
    (p) => `### ${p.name} — ${url(programHref(p))}

${p.tagline} ${p.intro}
${p.feature ? `\n${p.feature.title}: ${p.feature.text}\n` : ""}
Services and support:
${p.points.map((pt) => `- ${pt}`).join("\n")}

${p.note}`,
  )
  .join("\n\n")}

## Coming soon

${comingSoon.items.map((i) => `- ${i.title}: ${i.text}`).join("\n")}

${comingSoon.note}

## Coverage

Contact us about coverage through: ${insurances.join(", ")}. ${insuranceNote}

${screening}

## How to get started

${steps.map((s, i) => `${i + 1}. ${s.title} — ${s.text}`).join("\n")}

## Pages

- [Home](${url("/")})
- [Our services](${url("/services")})
- [About us](${url("/about")}): Our mission and the story of ${site.owner.name}, owner.
- [Careers](${url("/careers")}): Home Health Aide and Group Home Staff — apply at ${site.applicationUrl}
- [FAQ](${url("/faq")})
- [Contact](${url("/contact")})

## Community resources

${resources.map((r) => `- [${r.name}](${r.href})${r.text ? `: ${r.text}` : ""}`).join("\n")}

## Frequently asked questions

${faqs.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
