"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, CircleCheck, LoaderCircle, Phone, TriangleAlert } from "lucide-react";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { programs, type ProgramSlug } from "@/lib/services";
import { site } from "@/lib/site";
import { CARE_KEY } from "./CareLink";
import { EASE } from "../ui/motion";

type Status = "idle" | "sending" | "sent" | "error";

function Field({ label, children, full = false }: { label: string; children: ReactNode; full?: boolean }) {
  return (
    <label className={`group block ${full ? "sm:col-span-2" : ""}`}>
      <span className="mb-1.5 block text-sm font-semibold text-iris-900">{label}</span>
      {children}
    </label>
  );
}

const input =
  "w-full rounded-2xl border border-iris-100 bg-white/80 px-4 py-3.5 text-ink placeholder:text-ink-soft/50 transition focus:border-iris-400 focus:bg-white focus:ring-4 focus:ring-iris-100 focus:outline-none";

/**
 * "Request More Information" form — the same questions as the agency's Google Form
 * (name, email, phone, services of interest) plus an optional note. Posts to /api/contact.
 */
export function InquiryForm({ title = "Request More Information" }: { title?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [picked, setPicked] = useState<ProgramSlug[]>([]);

  useEffect(() => {
    // Pre-selection from <CareLink>.
    try {
      const raw = sessionStorage.getItem(CARE_KEY);
      sessionStorage.removeItem(CARE_KEY);
      const list = raw ? (JSON.parse(raw) as string[]) : [];
      const valid = programs.filter((p) => list.includes(p.slug)).map((p) => p.slug);
      if (valid.length) setPicked(valid);
    } catch {}
  }, []);

  const toggle = (slug: ProgramSlug) =>
    setPicked((p) => (p.includes(slug) ? p.filter((s) => s !== slug) : [...p, slug]));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = {
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      message: fd.get("message"),
      company: fd.get("company"),
      services: fd.getAll("services"),
    };
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      setStatus("sent");
      setPicked([]);
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
            <h2 className="mt-6 text-3xl font-medium">Thank you — we&apos;ve got it.</h2>
            <p className="mt-3 max-w-sm text-ink-soft">
              Our staff will reach out to discuss how we can help your family. If it&apos;s urgent, please call our office.
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
              <h2 className="text-3xl font-medium">{title}</h2>
              <p className="mt-2 text-ink-soft">Our staff will reach out to discuss how we can help your family!</p>
            </div>

            {/* Honeypot */}
            <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

            <Field label="First and last name" full>
              <input name="name" required autoComplete="name" className={input} placeholder="Your name" />
            </Field>
            <Field label="Email">
              <input name="email" type="email" required autoComplete="email" className={input} placeholder="you@example.com" />
            </Field>
            <Field label="Phone number">
              <input name="phone" type="tel" required autoComplete="tel" className={input} placeholder="(000) 000-0000" />
            </Field>

            <fieldset className="sm:col-span-2">
              <legend className="mb-2 text-sm font-semibold text-iris-900">Services you are interested in</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {programs.map((p) => {
                  const on = picked.includes(p.slug);
                  return (
                    <label
                      key={p.slug}
                      className={`relative flex cursor-pointer items-center gap-3 overflow-hidden rounded-2xl border px-4 py-3 text-sm font-medium transition-colors duration-300 ${
                        on ? "border-transparent text-white" : "border-iris-100 bg-white/70 text-iris-900 hover:border-iris-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        name="services"
                        value={p.slug}
                        checked={on}
                        onChange={() => toggle(p.slug)}
                        className="sr-only"
                      />
                      <AnimatePresence>
                        {on && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="absolute inset-0 rounded-2xl bg-linear-to-r from-iris-600 to-blush-500"
                          />
                        )}
                      </AnimatePresence>
                      <span
                        className={`relative grid size-5 shrink-0 place-items-center rounded-md border-2 transition ${
                          on ? "border-white bg-white text-iris-700" : "border-iris-200 text-transparent"
                        }`}
                      >
                        <Check className="size-3.5" />
                      </span>
                      <span className="relative">{p.short}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <Field label="Anything else we should know? (optional)" full>
              <textarea
                name="message"
                rows={3}
                className={`${input} resize-none`}
                placeholder="A little about your loved one and what support would help most…"
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
                      </a>{" "}
                      or email{" "}
                      <a href={`mailto:${site.email}`} className="font-semibold underline">
                        {site.email}
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
                    Send request <ArrowRight className="size-4" />
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
