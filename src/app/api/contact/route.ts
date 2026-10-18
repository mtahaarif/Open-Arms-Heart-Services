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
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — bots fill every field. Pretend success.
  if (clean(body.company)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 120);
  const phone = clean(body.phone, 40);
  const email = clean(body.email, 160);
  if (!name || !phone) {
    return NextResponse.json({ error: "Please include your name and phone number." }, { status: 422 });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "That email address doesn't look right." }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return NextResponse.json(
      { error: "Our online form isn't connected yet." },
      { status: 503 },
    );
  }

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
    return NextResponse.json({ error: "We couldn't send your message right now." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
