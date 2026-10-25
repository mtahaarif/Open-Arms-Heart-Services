import { site } from "@/lib/site";

/** Credentials strip under the hero (owner's mock-up). */
export function TrustStrip() {
  return (
    <section aria-label="Credentials" className="bg-plum-100">
      <ul className="wrap check-list flex flex-wrap items-center gap-x-5 gap-y-3 py-5 xl:gap-x-3 text-[0.8125rem] font-bold text-plum-800 sm:justify-center xl:justify-between">
        {site.credentials.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </section>
  );
}
