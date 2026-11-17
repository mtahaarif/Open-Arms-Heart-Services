/**
 * The shared banner treatment that sits over a full-bleed photo (every page's banner): a plum tint,
 * a darker top and bottom, a soft dark pool behind the centred headline, three slow glowing blobs,
 * a faint grid and a hairline along the bottom edge. Purely decorative.
 */
export function BannerOverlay() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-plum-950/20" />
      <div className="absolute inset-0 bg-linear-to-b from-plum-950/55 via-plum-950/5 to-plum-950/60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(29_15_53/0.5),transparent_68%)]" />
      <div className="animate-blob absolute -top-40 -left-32 size-[34rem] rounded-full bg-plum-500/20 blur-3xl" />
      <div className="animate-blob absolute -right-24 -bottom-48 size-[30rem] rounded-full bg-blush-500/15 blur-3xl [animation-delay:-6s]" />
      <div className="absolute top-10 right-1/3 size-72 rounded-full bg-plum-300/10 blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.05)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-white/25 to-transparent" />
    </div>
  );
}
