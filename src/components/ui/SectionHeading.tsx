import type { ReactNode } from "react";

/** `*phrase*` inside a heading renders in the brand gradient (the old design's accent words). */
function Accents({ text, light }: { text: string; light?: boolean }) {
  return text
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part, i) =>
      part.startsWith("*") ? (
        <span key={i} className={light ? "text-gradient-light" : "text-gradient"}>
          {part.slice(1, -1)}
        </span>
      ) : (
        <span key={i}>{part}</span>
      ),
    );
}

/**
 * Renders a heading without full stops (the client's style). Each sentence starts a new line
 * on every screen size, so sentences don't run together once the punctuation is gone; a plain
 * "\n" inside a sentence is a desktop-only break, so phones wrap naturally.
 */
export function Lines({ text, light }: { text: string; light?: boolean }) {
  // Accent markers go inside the full stop: "Your goals. *Our heart*."
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
          <Accents text={line} light={light} />
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
    <div data-reveal className={`${align === "center" ? "mx-auto text-center" : ""} max-w-[46rem] ${className}`}>
      {eyebrow && <p className={light ? "eyebrow-dark" : "eyebrow"}>{eyebrow}</p>}
      <Tag className={`mt-5 ${light ? "text-white" : ""}`}>
        <Lines text={title} light={light} />
      </Tag>
      {text && <div className={`lead mt-5 ${light ? "text-navy-100/85" : ""}`}>{text}</div>}
      {children}
    </div>
  );
}
