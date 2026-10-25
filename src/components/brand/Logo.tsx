import { getImageProps } from "next/image";
import Link from "@/components/ui/Link";

/**
 * The client's hands-holding-heart logo (public/brand/logo.png, 240×188), served through the
 * image optimiser as AVIF/WebP at 1×/2× of its ~102px display width. Built with getImageProps
 * so no inline style is emitted. With `withName` the company name labels the link (visible from
 * xl, screen-reader text below); otherwise the image alt does.
 */
export function Logo({ className = "", withName = false, preload = false }: { className?: string; withName?: boolean; preload?: boolean }) {
  const alt = withName ? "" : "Open Arms & Heart Services Inc. — home";
  const { props } = getImageProps({ src: "/brand/logo.png", alt, width: 102, height: 80 });

  return (
    <Link href="/" className={`inline-flex items-center gap-3 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- props come from next/image's getImageProps */}
      <img
        alt={alt}
        src={props.src}
        srcSet={props.srcSet}
        width={props.width}
        height={props.height}
        decoding="async"
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
