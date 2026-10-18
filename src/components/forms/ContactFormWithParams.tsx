"use client";

import { useSearchParams } from "next/navigation";
import { InquiryForm } from "./InquiryForm";

const allowed = ["home-health", "home-care", "both", "unsure"];

/** Reads ?care= (set by the care finder and service pages) to pre-select the care type. */
export function ContactFormWithParams() {
  const care = useSearchParams().get("care");
  return <InquiryForm defaultCare={care && allowed.includes(care) ? care : undefined} />;
}
