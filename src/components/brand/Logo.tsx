import Link from "@/components/ui/Link";

/**
 * The client's hands-holding-heart logo: a small pre-compressed PNG (public/brand/logo.png,
 * 240×188, ~8 KB) served as-is, sharp at 2× display size. With `withName` the visible (xl+) or
 * screen-reader name labels the link; otherwise the image alt does.
 */
export function Logo({ className = "", withName = false, preload = false }: { className?: string; withName?: boolean; preload?: boolean }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-3 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- tiny static PNG, already optimised */}
      <img
        src="/brand/logo.png"
        alt={withName ? "" : "Open Arms & Heart Services Inc. — home"}
        width={240}
        height={188}
        loading={preload ? "eager" : "lazy"}
        className="h-full w-auto"
      />
      {withName && (
        <span className="text-[0.72rem] leading-snug font-bold tracking-[0.12em] text-ink uppercase max-xl:sr-only">
          Open Arms &amp; Heart
          <br />
          Services Inc.
        </span>
      )}
    </Link>
  );
}
