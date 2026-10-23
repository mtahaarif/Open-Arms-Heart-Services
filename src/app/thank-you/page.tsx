import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CircleCheck, Phone, TriangleAlert } from "lucide-react";
import { Aurora } from "@/components/brand/Ribbons";
import { site } from "@/lib/site";

// Landing page for form posts made without JavaScript. Not useful in search results.
export const metadata: Metadata = {
  title: "Thank You",
  robots: { index: false, follow: true },
};

export default async function ThankYouPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const failed = (await searchParams).status === "error";
  const Icon = failed ? TriangleAlert : CircleCheck;

  return (
    <section className="relative isolate grid min-h-[80svh] place-items-center overflow-hidden px-4 pt-36 pb-24 text-center">
      <Aurora />
      <div className="max-w-lg">
        <span className="mx-auto grid size-20 place-items-center rounded-full bg-linear-to-br from-iris-600 to-blush-500 text-white shadow-xl shadow-blush-500/30">
          <Icon className="size-10" />
        </span>
        <h1 className="mt-6 text-4xl font-medium sm:text-5xl">
          {failed ? "We couldn't send that online." : "Thank you — we've got it."}
        </h1>
        <p className="mt-4 text-lg text-ink-soft">
          {failed
            ? "Sorry about that. Please call our office and we'll help you right away."
            : "A member of our team will contact you. Open Arms & Heart Services is only a call away!"}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={site.phone.href} className="btn-primary">
            <Phone className="size-4" /> {site.phone.display}
          </a>
          <Link href="/" className="btn-ghost">
            Back to home <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
