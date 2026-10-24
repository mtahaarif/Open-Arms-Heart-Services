import type { ReactNode } from "react";

/** Splits "\n" in a heading into line breaks (desktop only, so phones wrap naturally). */
export function Lines({ text }: { text: string }) {
  return text.split("\n").map((line, i) => (
    <span key={i}>
      {i > 0 && <br className="hidden sm:block" />}
      {i > 0 && " "}
      {line}
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
