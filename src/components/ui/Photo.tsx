import Image, { type ImageProps } from "next/image";
import { photoMeta } from "@/lib/photos";

type PhotoProps = Omit<ImageProps, "src" | "alt" | "width" | "height" | "fill" | "sizes"> & {
  src: string;
  alt?: string;
  /** Required so the browser never falls back to the 1x/2x full-width srcset. */
  sizes: string;
};

/**
 * Cover-fit photo for a positioned, sized parent. Emits real width/height attributes
 * (from lib/photos.ts) and paints the photo's average colour until it loads.
 */
export function Photo({ src, alt = "", className = "", style, ...rest }: PhotoProps) {
  const meta = photoMeta[src];
  if (!meta) {
    return <Image src={src} alt={alt} fill className={`object-cover ${className}`} style={style} {...rest} />;
  }
  const [width, height, color] = meta;
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`absolute inset-0 size-full object-cover ${className}`}
      style={{ backgroundColor: color, ...style }}
      {...rest}
    />
  );
}
