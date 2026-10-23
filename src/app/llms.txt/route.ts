import { insurances, resources } from "@/lib/content";
import { faqs } from "@/lib/faqs";
import { programHref, programs } from "@/lib/services";
import { fullAddress, licenseLine, site } from "@/lib/site";

export const dynamic = "force-static";

/** /llms.txt — a plain-text map of the site for AI answer engines (llmstxt.org). Verified content only. */
export function GET() {
  const url = (path: string) => `${site.url}${path}`;

  const body = `# ${site.name}

> ${site.description}

"${site.tagline}" — "${site.motto}"

${site.credentials.join(" | ")} · ${licenseLine} · Serving Central Florida since ${site.since}.

Our Mission: To work in partnership with our consumers to help them achieve their goals of independence, productivity, and meaningful integration within their communities. We are committed to fulfilling the needs of our consumers with excellence and care.

- Office: ${site.phone.display}
- Fax: ${site.fax.display}
- Email: ${site.email}
- Address (as published): ${fullAddress}
${site.areas.map((a) => `- ${a.program} — ${a.label}: ${a.counties.join(", ")}`).join("\n")}

## Types of Care

${programs
  .map(
    (p) => `### ${p.name} — ${url(programHref(p))}

${p.intro}

Services and Support:
${p.points.map((pt) => `- ${pt}`).join("\n")}

${p.note}`,
  )
  .join("\n\n")}

## Insurances we accept

${insurances.map((i) => `- ${i}`).join("\n")}

## Pages

- [Home](${url("/")})
- [Types of Care](${url("/services")})
- [About Us](${url("/about")}): Our mission and the story of ${site.owner.name}, owner.
- [Careers](${url("/careers")}): Home Health Aide and Group Home Staff positions — apply at ${site.applicationUrl}
- [FAQ](${url("/faq")})
- [Contact](${url("/contact")})

## Resources

${resources.map((r) => `- [${r.name}](${r.href})${r.text ? `: ${r.text}` : ""}`).join("\n")}

## Frequently asked questions

${faqs.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
