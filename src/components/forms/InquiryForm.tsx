"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, CircleCheck, LoaderCircle, Phone, TriangleAlert } from "lucide-react";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { roles } from "@/lib/content";
import { site } from "@/lib/site";
import { CARE_KEY } from "./CareLink";
import { EASE } from "../ui/motion";

type Status = "idle" | "sending" | "sent" | "error";

const careOptions = [
  { value: "home-health", label: "Home Health (Skilled)" },
  { value: "home-care", label: "Home Care (Non-Skilled)" },
  { value: "both", label: "A mix of both" },
  { value: "unsure", label: "Not sure yet" },
];

function Field({
  label,
  children,
  full = false,
}: {
  label: string;
  children: ReactNode;
  full?: boolean;
}) {
  return (
    <label className={`group block ${full ? "sm:col-span-2" : ""}`}>
      <span className="mb-1.5 block text-sm font-semibold text-iris-900">{label}</span>
      {children}
    </label>
  );
}

const input =
  "w-full rounded-2xl border border-iris-100 bg-white/80 px-4 py-3.5 text-ink placeholder:text-ink-soft/50 transition focus:border-iris-400 focus:bg-white focus:ring-4 focus:ring-iris-100 focus:outline-none";

/** Contact / care request / job application form. Posts to /api/contact. */
export function InquiryForm({
  variant = "care",
  defaultCare,
  role,
  onRoleChange,
  title,
}: {
  variant?: "care" | "careers";
  defaultCare?: string;
  role?: string;
  onRoleChange?: (r: string) => void;
  title?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [care, setCare] = useState(defaultCare ?? "unsure");

  useEffect(() => {
    if (defaultCare) return setCare(defaultCare);
    // Pre-selection from <CareLink> (or a legacy ?care= link).
    let stored: string | null = null;
    try {
      stored = sessionStorage.getItem(CARE_KEY);
      sessionStorage.removeItem(CARE_KEY);
    } catch {}
    const fromQuery = new URLSearchParams(window.location.search).get("care");
    const next = stored ?? fromQuery;
    if (next && careOptions.some((o) => o.value === next)) setCare(next);
  }, [defaultCare]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, variant }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  return (
    <div className="glass relative overflow-hidden rounded-[2rem] p-6 sm:p-9">
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex min-h-[420px] flex-col items-center justify-center text-center"
          >
            <motion.span
              initial={{ scale: 0, rotate: -40 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.1 }}
              className="grid size-20 place-items-center rounded-full bg-linear-to-br from-iris-600 to-blush-500 text-white shadow-xl shadow-blush-500/30"
            >
              <CircleCheck className="size-10" />
            </motion.span>
            <h2 className="mt-6 text-3xl font-medium">Thank you — we've got it.</h2>
            <p className="mt-3 max-w-sm text-ink-soft">
              {variant === "careers"
                ? "Our team will review your details and reach out about next steps."
                : "A member of our team will call you back soon. If it's urgent, please call us now."}
            </p>
            <a href={site.phone.href} className="btn-ghost mt-6">
              <Phone className="size-4 text-blush-700" /> {site.phone.display}
            </a>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            method="post"
            action="/api/contact"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-5 sm:grid-cols-2"
          >
            <div className="sm:col-span-2">
              <h2 className="text-3xl font-medium">
                {title ?? (variant === "careers" ? "Apply to join our team" : "Request a care consultation")}
              </h2>
              <p className="mt-2 text-ink-soft">
                {variant === "careers"
                  ? "Tell us a little about yourself — it only takes a minute."
                  : "Free, no-obligation. We'll call you back to talk through your options."}
              </p>
            </div>

            <input type="hidden" name="variant" value={variant} />
            {/* Honeypot */}
            <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

            <Field label="Full name">
              <input name="name" required autoComplete="name" className={input} placeholder="Your name" />
            </Field>
            <Field label="Phone">
              <input name="phone" type="tel" required autoComplete="tel" className={input} placeholder="(000) 000-0000" />
            </Field>
            <Field label="Email" full>
              <input name="email" type="email" autoComplete="email" className={input} placeholder="you@example.com" />
            </Field>

            {variant === "care" ? (
              <>
                <fieldset className="sm:col-span-2">
                  <legend className="mb-2 text-sm font-semibold text-iris-900">Type of care</legend>
                  <div className="grid grid-cols-2 gap-2">
                    {careOptions.map((o) => (
                      <label
                        key={o.value}
                        className={`relative cursor-pointer rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                          care === o.value
                            ? "border-transparent text-white"
                            : "border-iris-100 bg-white/70 text-iris-900 hover:border-iris-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="care"
                          value={o.value}
                          checked={care === o.value}
                          onChange={() => setCare(o.value)}
                          className="sr-only"
                        />
                        {care === o.value && (
                          <motion.span
                            layoutId="care-radio"
                            className="absolute inset-0 rounded-2xl bg-linear-to-r from-iris-600 to-blush-500"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                        <span className="relative">{o.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <Field label="Care is for">
                  <select name="for" className={input} defaultValue="parent">
                    <option value="myself">Myself</option>
                    <option value="parent">A parent or grandparent</option>
                    <option value="spouse">My spouse or partner</option>
                    <option value="child">My child</option>
                    <option value="client">A patient or client (I'm a professional)</option>
                    <option value="other">Someone else</option>
                  </select>
                </Field>
                <Field label="Town / city">
                  <input name="city" autoComplete="address-level2" className={input} placeholder="e.g. Haines City" />
                </Field>
              </>
            ) : (
              <>
                <Field label="Position" full>
                  <select
                    name="role"
                    className={input}
                    value={role ?? roles[0].title}
                    onChange={(e) => onRoleChange?.(e.target.value)}
                  >
                    {roles.map((r) => (
                      <option key={r.title} value={r.title}>
                        {r.title}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Licenses / certifications">
                  <input name="certs" className={input} placeholder="e.g. CNA, CPR, RN" />
                </Field>
                <Field label="Availability">
                  <select name="availability" className={input} defaultValue="flexible">
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="weekends">Weekends</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </Field>
              </>
            )}

            <Field label={variant === "careers" ? "Tell us about your experience" : "How can we help?"} full>
              <textarea
                name="message"
                rows={4}
                className={`${input} resize-none`}
                placeholder={
                  variant === "careers"
                    ? "Past roles, the kind of clients you love working with, the areas you can travel to…"
                    : "A little about your loved one and what support would help most…"
                }
              />
            </Field>

            <AnimatePresence>
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="sm:col-span-2"
                  role="alert"
                >
                  <div className="flex gap-3 rounded-2xl border border-blush-200 bg-blush-50 p-4 text-sm text-blush-800">
                    <TriangleAlert className="size-5 shrink-0" />
                    <p>
                      {message} Please call us at{" "}
                      <a href={site.phone.href} className="font-semibold underline">
                        {site.phone.display}
                      </a>
                      .
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-ink-soft">
                Please don&apos;t include detailed medical information. In an emergency, call 911.
              </p>
              <button type="submit" disabled={status === "sending"} className="btn-primary shrink-0 disabled:opacity-70">
                {status === "sending" ? (
                  <>
                    <LoaderCircle className="size-4 animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    {variant === "careers" ? "Submit application" : "Send request"} <ArrowRight className="size-4" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
