import type { ReactNode } from "react";

/**
 * Renders a heading without full stops (the client's style). Each sentence starts a new line
 * on every screen size, so sentences don't run together once the punctuation is gone; a plain
 * "\n" inside a sentence is a desktop-only break, so phones wrap naturally.
 */
export function Lines({ text }: { text: string }) {
  const sentences = text
    .split(/\.(?:\s+|$)/)
    .map((s) => s.trim())
    .filter(Boolean);
  return sentences.map((sentence, i) => (
    <span key={i}>
      {i > 0 && <br />}
      {sentence.split("\n").map((line, j) => (
        <span key={j}>
          {j > 0 && <br className="hidden sm:block" />}
          {j > 0 && " "}
          {line}
        </span>
      ))}
    </span>
  ));
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  as: Tag = "h2",
  align = "left",
  tone = "dark",
  className = "",
  children,
}: {
  eyebrow?: string;
  title: string;
  text?: ReactNode;
  as?: "h1" | "h2";
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
  children?: ReactNode;
}) {
  const light = tone === "light";
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} max-w-[44rem] ${className}`}>
      {eyebrow && <p className={`eyebrow ${light ? "text-blush-300" : ""}`}>{eyebrow}</p>}
      <Tag className={`mt-3 ${light ? "text-white" : ""}`}>
        <Lines text={title} />
      </Tag>
      {text && <div className={`lead mt-5 ${light ? "text-navy-100" : ""}`}>{text}</div>}
      {children}
    </div>
  );
}
