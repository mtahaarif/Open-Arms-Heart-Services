import { Check } from "lucide-react";
import { site } from "@/lib/site";

/** Credentials strip under the hero (owner's mock-up). */
export function TrustStrip() {
  return (
    <section aria-label="Credentials" className="bg-plum-100">
      <ul className="wrap flex flex-wrap items-center gap-x-6 gap-y-3 py-5 text-[0.8125rem] font-bold text-plum-800 sm:justify-center xl:justify-between">
        {site.credentials.map((c) => (
          <li key={c} className="flex items-center gap-2">
            <Check className="size-4 shrink-0 text-plum-700" strokeWidth={3} aria-hidden />
            {c}
          </li>
        ))}
      </ul>
    </section>
  );
}
