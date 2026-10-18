import { faqs } from "@/lib/faqs";
import { plain } from "@/lib/rich";
import { pillars } from "@/lib/services";
import { fullAddress, site } from "@/lib/site";

export const dynamic = "force-static";

/** /llms.txt — a plain-text map of the site for AI answer engines (llmstxt.org). */
export function GET() {
  const url = (path: string) => `${site.url}${path}`;

  const body = `# ${site.name}

> ${site.description}

${site.shortName} is a Florida home care agency founded in ${site.founded} by ${site.founder.name} (${site.founder.title}). It provides skilled home health and non-skilled home care to families in ${site.areas.map((a) => a.county).join(", ")}, Florida, and is an enrolled Florida Medicaid provider (NPI ${site.npi}).

- Phone: ${site.phone.display}
- Fax (referrals): ${site.fax.display}
- Office: ${fullAddress}
- Hours: ${site.hours.map((h) => `${h.days} ${h.time}`).join("; ")}

## Services

${pillars
  .map(
    (p) => `### ${p.name} (${p.level}) — ${url(p.href)}

${plain(p.intro)}

${p.services.map((s) => `- [${s.name}](${url(`${p.href}#${s.slug}`)}): ${s.summary}`).join("\n")}`,
  )
  .join("\n\n")}

## Pages

- [Home](${url("/")}): Overview of skilled and non-skilled care, who we serve and how care begins.
- [Services](${url("/services")}): Compare home health and home care, with a care finder.
- [About](${url("/about")}): Our story, founder and the promises behind our name.
- [Getting started](${url("/getting-started")}): Steps to begin care, what to have ready and ways to pay.
- [Careers](${url("/careers")}): Open roles for nurses, therapists, aides, companions and respite caregivers.
- [FAQ](${url("/faq")}): Answers about doctor's orders, Medicaid, service areas and caregivers.
- [Contact](${url("/contact")}): Phone, fax, office address and the care request form.

## Frequently asked questions

${faqs.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
