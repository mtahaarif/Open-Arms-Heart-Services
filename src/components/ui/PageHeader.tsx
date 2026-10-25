import Link from "@/components/ui/Link";
import type { ReactNode } from "react";
import { Photo } from "./Photo";
import { Lines } from "./SectionHeading";

/** Inner-page header: breadcrumb, H1 and intro on cream, with an optional photo on the right. */
export function PageHeader({
  eyebrow,
  title,
  text,
  crumb,
  image,
  imageAlt = "",
  children,
}: {
  eyebrow: string;
  title: string;
  text?: ReactNode;
  crumb: string;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-line bg-cream">
      <div className={`wrap grid items-center gap-10 py-12 sm:py-16 ${image ? "lg:grid-cols-[1.1fr_0.9fr] lg:gap-16" : ""}`}>
        <div>
          <nav aria-label="Breadcrumb" className="text-sm">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-plum-700 hover:underline">
                  Home<span className="sr-only"> page</span>
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="font-semibold text-ink">
                {crumb}
              </li>
            </ol>
          </nav>
          <p className="eyebrow mt-8">{eyebrow}</p>
          <h1 className="mt-3">
            <Lines text={title} />
          </h1>
          {text && <div className="lead mt-5 max-w-[38rem]">{text}</div>}
          {children && <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">{children}</div>}
        </div>
        {image && (
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Photo src={image} alt={imageAlt} preload sizes="(min-width: 1024px) 480px, 100vw" />
          </div>
        )}
      </div>
    </section>
  );
}
