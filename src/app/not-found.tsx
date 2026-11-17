import Link from "@/components/ui/Link";
import { Phone } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { site } from "@/lib/site";

/* This boundary ships in every page's payload, so its banner has no photo (nothing to preload). */
export default function NotFound() {
  return (
    <PageHeader eyebrow="Page not found" title="We couldn't find that page" text="Our arms are still open. Let's get you back on track." crumb="404" preload={false}>
      <Link href="/" className="btn-primary">
        Back to home
      </Link>
      <a href={site.phone.href} className="btn-outline-light">
        <Phone className="size-4 text-blush-300" /> {site.phone.display}
      </a>
    </PageHeader>
  );
}
