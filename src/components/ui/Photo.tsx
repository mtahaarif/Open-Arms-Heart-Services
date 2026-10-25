import { getImageProps } from "next/image";
import { preload as preloadResource } from "react-dom";
import { photoMeta } from "@/lib/photos";

/** JPEG quality for photos (must be listed in `images.qualities` in next.config.ts). */
const QUALITY = 60;
/** Width of the fallback `src` — what non-srcset clients (crawlers, feed readers) download. */
const FALLBACK_WIDTH = 828;

type PhotoProps = {
  src: string;
  alt?: string;
  /** Required so the browser never falls back to the 1x/2x full-width srcset. */
  sizes: string;
  className?: string;
  /** Above-the-fold LCP image: preloaded with high fetch priority and loaded eagerly. */
  preload?: boolean;
};

/**
 * Cover-fit photo for a positioned, sized parent. Built on getImageProps so the markup stays lean:
 * real width/height from lib/photos.ts (no layout shift), a responsive AVIF/WebP srcset for
 * browsers, a mid-size `src` fallback instead of the largest variant, and no inline styles.
 */
export function Photo({ src, alt = "", sizes, className = "", preload = false }: PhotoProps) {
  const [width, height] = photoMeta[src] ?? [1600, 1067];
  const { props } = getImageProps({ src, alt, width, height, sizes, quality: QUALITY });

  const candidates = (props.srcSet ?? "").split(", ").map((c) => {
    const [url, w] = c.split(" ");
    return { url, w: parseInt(w, 10) };
  });
  const fallback = candidates.find((c) => c.w >= FALLBACK_WIDTH)?.url ?? props.src;

  if (preload) {
    preloadResource(fallback, { as: "image", imageSrcSet: props.srcSet, imageSizes: props.sizes, fetchPriority: "high" });
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- props come from next/image's getImageProps
    <img
      alt={alt}
      src={fallback}
      srcSet={props.srcSet}
      sizes={props.sizes}
      width={props.width}
      height={props.height}
      decoding="async"
      loading={preload ? "eager" : "lazy"}
      fetchPriority={preload ? "high" : undefined}
      className={`absolute inset-0 size-full bg-plum-100 object-cover ${className}`}
    />
  );
}
