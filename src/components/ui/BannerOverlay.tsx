/**
 * The shared banner treatment over a full-bleed photo (inner pages). Neutral and light — no colour
 * cast — so the photo keeps its own colours: a soft shade behind the centred text, a little more at
 * the bottom edge, and a hairline along the bottom. Purely decorative.
 */
export function BannerOverlay() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(0_0_0/0.42),transparent_68%)]" />
      <div className="absolute inset-0 bg-linear-to-b from-black/15 via-transparent to-black/25" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" />
    </div>
  );
}
