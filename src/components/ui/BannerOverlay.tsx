/**
 * The shared banner treatment over a full-bleed photo (every page's banner). Deliberately light so the
 * photo stays bright: a faint violet wash, a soft shade at the top (behind the floating header) and
 * bottom, a gentle violet pool behind the centred headline, two soft brand-colour glows, a faint grid
 * and a hairline along the bottom edge. Purely decorative.
 */
export function BannerOverlay() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-plum-700/10" />
      <div className="absolute inset-0 bg-linear-to-b from-plum-900/35 via-transparent to-plum-900/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(66_28_95/0.42),transparent_65%)]" />
      <div className="animate-blob absolute -top-40 -left-32 size-[34rem] rounded-full bg-plum-400/15 blur-3xl" />
      <div className="animate-blob absolute -right-24 -bottom-48 size-[30rem] rounded-full bg-blush-400/15 blur-3xl [animation-delay:-6s]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.05)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" />
    </div>
  );
}
