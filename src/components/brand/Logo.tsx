import Image from "next/image";
import Link from "next/link";

/** The client's hands-holding-heart logo (public/brand/logo.png, 640×501). */
export function Logo({ className = "", withName = false, preload = false }: { className?: string; withName?: boolean; preload?: boolean }) {
  return (
    <Link href="/" aria-label="Open Arms & Heart Services Inc. — home" className={`inline-flex items-center gap-3 ${className}`}>
      <Image src="/brand/logo.png" alt="" width={640} height={501} preload={preload} className="h-full w-auto" sizes="120px" />
      {withName && (
        <span className="hidden text-[0.72rem] leading-snug font-bold tracking-[0.12em] text-ink uppercase xl:block">
          Open Arms &amp; Heart
          <br />
          Services Inc.
        </span>
      )}
    </Link>
  );
}
