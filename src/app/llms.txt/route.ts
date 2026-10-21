import { insurances, resources } from "@/lib/content";
import { faqs } from "@/lib/faqs";
import { programHref, programs } from "@/lib/services";
import { fullAddress, licenseLine, site } from "@/lib/site";

export const dynamic = "force-static";

/** /llms.txt — a plain-text map of the site for AI answer engines (llmstxt.org). */
export function GET() {
  const url = (path: string) => `${site.url}${path}`;

  const body = `# ${site.name}

> ${site.description}

${site.shortName} is a Central Florida care agency owned by ${site.founder.name}, serving families since ${site.founded}. It is a ${site.credentials.join(" and an ")} (${licenseLine}). "${site.tagline} — ${site.motto}."

Mission: To work in partnership with our consumers to help them achieve their goals of independence, productivity, and meaningful integration within their communities.

- Office phone: ${site.phone.display}
- Fax (referrals): ${site.fax.display}
- Email: ${site.email}
- Office: ${fullAddress}
${site.areas.map((a) => `- ${a.program} counties: ${a.counties.join(", ")}`).join("\n")}

## Types of care

${programs
  .map(
    (p) => `### ${p.name} — ${url(programHref(p))}

${p.intro}

${p.points.map((pt) => `- ${pt}`).join("\n")}

${p.note}`,
  )
  .join("\n\n")}

## Insurances accepted

${insurances.map((i) => `- ${i}`).join("\n")}

## Pages

- [Home](${url("/")}): Overview, types of care, answers to common questions, and service areas.
- [Types of care](${url("/services")}): Every program in detail, insurance, and the request-information form.
- [Non-skilled home care](${url("/services/home-care")}): Personal care, mobility, homemaking, companionship, respite and pediatric support.
- [Skilled home health](${url("/services/home-health")}): Nursing and therapy at home.
- [About us](${url("/about")}): Mission and the founder's story.
- [Getting started](${url("/getting-started")}): How services begin, what to have ready, insurance and resources.
- [Careers](${url("/careers")}): Home Health Aide and Group Home Staff positions; online application.
- [FAQ](${url("/faq")}): Common questions.
- [Contact](${url("/contact")}): Phone, email, fax, address and the request form.

## Community resources

${resources.map((r) => `- [${r.name}](${r.href}): ${r.text}`).join("\n")}

## Frequently asked questions

${faqs.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
