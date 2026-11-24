/**
 * Re-mounts on every navigation (unlike layout.tsx), so each page fades in over 0.4 s — the page
 * transition of benevolencehomeservices.com (`.page-fade-in` in globals.css; off for reduced motion).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-fade-in">{children}</div>;
}
