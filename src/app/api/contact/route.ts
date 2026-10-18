import { NextResponse } from "next/server";

/**
 * Delivers contact & careers form submissions by email via Resend.
 * Requires RESEND_API_KEY and CONTACT_TO_EMAIL (see .env.example).
 */

const FIELDS: Record<string, string> = {
  name: "Name",
  phone: "Phone",
  email: "Email",
  care: "Type of care",
  for: "Care is for",
  city: "Town / city",
  role: "Position",
  certs: "Licenses / certifications",
  availability: "Availability",
  message: "Message",
};

const clean = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const escape = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function POST(req: Request) {
  // JSON from the enhanced form; urlencoded/multipart when JavaScript is unavailable.
  const isJson = (req.headers.get("content-type") ?? "").includes("application/json");
  let body: Record<string, unknown>;
  try {
    body = isJson ? await req.json() : Object.fromEntries((await req.formData()).entries());
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

  const name = clean(body.name, 120);
  const phone = clean(body.phone, 40);
  const email = clean(body.email, 160);
  if (!name || !phone) return reply(422, "Please include your name and phone number.");
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return reply(422, "That email address doesn't look right.");

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) return reply(503, "Our online form isn't connected yet.");

  const isCareers = body.variant === "careers";
  const rows = Object.entries(FIELDS)
    .map(([key, label]) => [label, clean(body[key])] as const)
    .filter(([, v]) => v);

  const subject = isCareers
    ? `Job application: ${clean(body.role, 120) || "General"} — ${name}`
    : `Care request from ${name}`;

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

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "Open Arms Website <onboarding@resend.dev>",
      to: to.split(",").map((s) => s.trim()),
      reply_to: email || undefined,
      subject,
      html,
      text: rows.map(([l, v]) => `${l}: ${v}`).join("\n"),
    }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text().catch(() => ""));
    return reply(502, "We couldn't send your message right now.");
  }

  return reply(200);
}
