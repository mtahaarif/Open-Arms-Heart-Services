"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import type { ProgramSlug } from "@/lib/services";

export const CARE_KEY = "oa-care-programs";

/**
 * Link to /contact that pre-ticks the given types of care in the inquiry form.
 * The choice travels in sessionStorage rather than a query string, so the
 * contact page stays a single crawlable URL (no duplicate titles/H1s/canonicals).
 */
export function CareLink({
  care,
  onClick,
  ...rest
}: Omit<ComponentProps<typeof Link>, "href"> & { care: ProgramSlug | ProgramSlug[] }) {
  return (
    <Link
      href="/contact"
      onClick={(e) => {
        try {
          sessionStorage.setItem(CARE_KEY, JSON.stringify(Array.isArray(care) ? care : [care]));
        } catch {
          // Storage unavailable (private mode) — the form simply starts with nothing ticked.
        }
        onClick?.(e);
      }}
      {...rest}
    />
  );
}
