export function FacebookIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21h2.9Z" />
    </svg>
  );
}

export function LinkedInIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M6.9 8.6H4V20h2.9V8.6ZM5.4 4a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4ZM20 13.6c0-3.1-1.7-5.2-4.4-5.2-1.4 0-2.4.7-2.9 1.5V8.6H9.9V20h2.9v-6c0-1.5.7-2.6 2-2.6s1.9 1 1.9 2.6v6H20v-6.4Z" />
    </svg>
  );
}
