"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

export type CareType = "home-health" | "home-care" | "both" | "unsure";
export const CARE_KEY = "oa-care-type";

/**
 * Link to /contact that pre-selects the care type in the form.
 * The choice travels in sessionStorage rather than a ?care= query string, so the
 * contact page stays a single crawlable URL (no duplicate titles/H1s/canonicals).
 */
export function CareLink({
  care,
  onClick,
  ...rest
}: Omit<ComponentProps<typeof Link>, "href"> & { care: CareType }) {
  return (
    <Link
      href="/contact"
      onClick={(e) => {
        try {
          sessionStorage.setItem(CARE_KEY, care);
        } catch {
          // Storage unavailable (private mode) — the form simply defaults to "Not sure yet".
        }
        onClick?.(e);
      }}
      {...rest}
    />
  );
}
