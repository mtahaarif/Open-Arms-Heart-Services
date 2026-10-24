import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { programHref, programs } from "@/lib/services";

/** The six services as photo cards, each linking to its section on /services. */
export function ServiceCards() {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {programs.map((p, i) => (
        <li key={p.slug}>
          <Link href={programHref(p)} className="card group flex h-full flex-col overflow-hidden transition-shadow hover:shadow-[0_14px_34px_-16px_rgb(23_43_72/0.35)]">
            <div className="relative aspect-[16/10] overflow-hidden bg-plum-100">
              <Photo
                src={p.image}
                alt={p.imageAlt}
                sizes="(min-width: 1024px) 370px, (min-width: 640px) 50vw, 100vw"
                className="object-[center_30%] transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-1 flex-col p-6 sm:p-7">
              <span className="grid size-10 place-items-center rounded-full bg-plum-100 text-[0.8rem] font-bold text-plum-700">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4">{p.short}</h3>
              <p className="mt-2 flex-1">{p.tagline}</p>
              <span className="mt-5 text-sm font-bold text-plum-700">
                Explore services <span aria-hidden>→</span>
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
