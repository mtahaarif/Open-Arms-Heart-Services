import { NextResponse } from "next/server";
import { programs } from "@/lib/services";

/**
 * Inquiry form handler. Each submission is delivered to:
 *  1. The agency's existing Google Form ("Request More Information") — responses land
 *     where the agency already reads them. No configuration required.
 *  2. Email via Resend, when RESEND_API_KEY and CONTACT_TO_EMAIL are set.
 * The request succeeds if at least one channel accepts it.
 */

const GOOGLE_FORM = {
  action: "https://docs.google.com/forms/d/e/1FAIpQLScTQTwN2QlIn15iXq_LH065IpvekPYgO8AslI_lh0bNm-2hZQ/formResponse",
  name: "entry.157916560",
  email: "entry.899391123",
  phone: "entry.190309484",
  services: "entry.499657858",
};

const clean = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const escape = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

type Inquiry = { name: string; email: string; phone: string; services: string[]; message: string };

/** Posts to the agency's Google Form. Program options use the form's exact labels; anything else goes in "Other". */
async function sendToGoogleForm(q: Inquiry) {
  if (process.env.GOOGLE_FORM_DISABLED === "true") return false;
  const body = new URLSearchParams();
  body.set(GOOGLE_FORM.name, q.name);
  body.set(GOOGLE_FORM.email, q.email);
  body.set(GOOGLE_FORM.phone, q.phone);

  const other: string[] = [];
  for (const slug of q.services) {
    const p = programs.find((x) => x.slug === slug);
    if (!p) continue;
    if (p.formLabel) body.append(GOOGLE_FORM.services, p.formLabel);
    else other.push(p.name);
  }
  if (q.message) other.push(`Note: ${q.message}`);
  if (other.length) {
    body.append(GOOGLE_FORM.services, "__other_option__");
    body.set(`${GOOGLE_FORM.services}.other_option_response`, other.join(" | ").slice(0, 1500));
  }

  try {
    const res = await fetch(GOOGLE_FORM.action, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      redirect: "manual",
    });
    // Google returns 200 (or a 3xx to the confirmation page) when the response is recorded.
    if (res.status >= 200 && res.status < 400) return true;
    console.error("Google Form rejected submission", res.status);
  } catch (err) {
    console.error("Google Form error", err);
  }
  return false;
}

async function sendEmail(q: Inquiry) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) return false;

  const serviceNames = q.services.map((s) => programs.find((p) => p.slug === s)?.name).filter(Boolean) as string[];
  const rows: [string, string][] = (
    [
      ["Name", q.name],
      ["Email", q.email],
      ["Phone", q.phone],
      ["Services", serviceNames.join(", ")],
      ["Message", q.message],
    ] as [string, string][]
  ).filter(([, v]) => v);

  const subject = `Request for information from ${q.name}`;
  const html = `
    <div style="font-family:system-ui,sans-serif;color:#24173a">
      <h2 style="color:#60349f;margin:0 0 16px">${escape(subject)}</h2>
      <table cellpadding="8" style="border-collapse:collapse">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="background:#f8f5fe;font-weight:600;vertical-align:top">${escape(label)}</td><td style="white-space:pre-wrap">${escape(value)}</td></tr>`,
          )
          .join("")}
      </table>
    </div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "Open Arms Website <onboarding@resend.dev>",
        to: to.split(",").map((s) => s.trim()),
        reply_to: q.email || undefined,
        subject,
        html,
        text: rows.map(([l, v]) => `${l}: ${v}`).join("\n"),
      }),
    });
    if (res.ok) return true;
    console.error("Resend error", res.status, await res.text().catch(() => ""));
  } catch (err) {
    console.error("Resend error", err);
  }
  return false;
}

export async function POST(req: Request) {
  // JSON from the enhanced form; urlencoded/multipart when JavaScript is unavailable.
  const isJson = (req.headers.get("content-type") ?? "").includes("application/json");
  let body: Record<string, unknown>;
  let services: string[] = [];
  try {
    if (isJson) {
      body = await req.json();
      services = Array.isArray(body.services) ? body.services.filter((s): s is string => typeof s === "string") : [];
    } else {
      const fd = await req.formData();
      body = Object.fromEntries(fd.entries());
      services = fd.getAll("services").filter((s): s is string => typeof s === "string");
    }
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  /** JSON callers get JSON; plain form posts are redirected to the thank-you page. */
  const reply = (status: number, error?: string) => {
    if (isJson) return NextResponse.json(error ? { error } : { ok: true }, { status });
    const url = new URL(error ? "/thank-you?status=error" : "/thank-you", req.url);
    return NextResponse.redirect(url, 303);
  };

  // Honeypot — bots fill every field. Pretend success.
  if (clean(body.company)) return reply(200);

  const q: Inquiry = {
    name: clean(body.name, 120),
    email: clean(body.email, 160),
    phone: clean(body.phone, 40),
    message: clean(body.message),
    services: [...new Set(services)].filter((s) => programs.some((p) => p.slug === s)),
  };

  if (!q.name || !q.phone || !q.email) return reply(422, "Please include your name, email and phone number.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(q.email)) return reply(422, "That email address doesn't look right.");
  if (!q.services.length && !q.message) return reply(422, "Please choose at least one service, or tell us how we can help.");

  const [form, email] = await Promise.all([sendToGoogleForm(q), sendEmail(q)]);
  if (!form && !email) return reply(502, "We couldn't send your request right now.");
  return reply(200);
}
