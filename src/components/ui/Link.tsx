import NextLink from "next/link";
import type { ComponentProps } from "react";

/**
 * next/link without automatic prefetching. The pages are small static HTML, so
 * navigation is fast anyway — and skipping the background `?_rsc=` requests for every
 * link in view saves bandwidth and main-thread time (and avoids blocked-request
 * console errors in crawlers).
 */
export default function Link({ prefetch = false, ...props }: ComponentProps<typeof NextLink>) {
  return <NextLink prefetch={prefetch} {...props} />;
}
